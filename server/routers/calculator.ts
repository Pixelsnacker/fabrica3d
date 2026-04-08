import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

export const calculatorInputSchema = z.object({
  process: z.string().min(1, "Verfahren ist erforderlich"),
  material: z.string().min(1, "Material ist erforderlich"),
  quantity: z.number().int().min(1).max(10000),
  // Dimensions in mm
  sizeX: z.number().min(1).max(2000).optional(),
  sizeY: z.number().min(1).max(2000).optional(),
  sizeZ: z.number().min(1).max(2000).optional(),
  // Volume in cm³ (alternative to dimensions)
  volumeCm3: z.number().min(0.1).max(100000).optional(),
  // Quality / resolution
  quality: z.enum(["draft", "standard", "fine", "ultra"]).default("standard"),
  // Infill for FDM
  infillPercent: z.number().min(5).max(100).optional(),
  // Post-processing
  postProcessing: z.array(z.string()).optional(),
  // Free description
  description: z.string().max(1000).optional(),
  // Language
  lang: z.enum(["de", "en"]).default("de"),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

export interface CalculatorResult {
  costMin: number;
  costMax: number;
  currency: string;
  deliveryDays: number;
  deliveryDaysMax: number;
  confidence: "low" | "medium" | "high";
  summary: string;
  breakdown: Array<{ label: string; value: string }>;
  recommendations: string[];
  warnings: string[];
  disclaimer: string;
}

const SYSTEM_PROMPT_DE = `Du bist ein erfahrener Kalkulator für einen deutschen 3D-Druck- und CNC-Fertigungsdienstleister namens Fabrica GmbH. 
Deine Aufgabe ist es, auf Basis der Projektparameter eine realistische Kostenschätzung zu erstellen.

Wichtige Preisorientierungen (Netto, ohne MwSt.):
- FDM-Druck: 0,05–0,30 €/cm³ Materialvolumen, Mindestpreis 15 €/Teil
- Endlosfaser FDM: 0,20–0,80 €/cm³, Mindestpreis 40 €/Teil
- SLA/DLP: 0,15–0,60 €/cm³, Mindestpreis 20 €/Teil
- SLS/MJF: 0,08–0,25 €/cm³, Mindestpreis 30 €/Teil
- Polyjet: 0,30–1,50 €/cm³, Mindestpreis 50 €/Teil
- Sanddruck: 0,10–0,40 €/cm³, Mindestpreis 80 €/Teil
- CNC-Fräsen: 60–150 €/Stunde, Mindestpreis 80 €
- CNC-Drehen: 50–120 €/Stunde, Mindestpreis 60 €
- Wasserschneiden: 80–200 €/Stunde, Mindestpreis 50 €
- Laserschneiden: 60–150 €/Stunde, Mindestpreis 40 €
- CAD-Konstruktion: 80–120 €/Stunde
- 3D-Scan: 150–500 € pro Objekt

Skalierungseffekte: Ab 10 Stück ca. 10–20% Rabatt, ab 50 Stück ca. 20–35% Rabatt.
Qualitätszuschläge: Draft -20%, Standard 0%, Fine +30%, Ultra +60%.
Nachbearbeitung: Lackierung +20–50%, Sandstrahlen +10–20%, Einfärben +5–15%.

Antworte AUSSCHLIESSLICH mit einem validen JSON-Objekt ohne Markdown-Codeblöcke.`;

const SYSTEM_PROMPT_EN = `You are an experienced calculator for a German 3D printing and CNC manufacturing service provider called Fabrica GmbH.
Your task is to create a realistic cost estimate based on the project parameters.

Key price guidelines (net, excl. VAT):
- FDM printing: €0.05–0.30/cm³ material volume, minimum €15/part
- Continuous fiber FDM: €0.20–0.80/cm³, minimum €40/part
- SLA/DLP: €0.15–0.60/cm³, minimum €20/part
- SLS/MJF: €0.08–0.25/cm³, minimum €30/part
- Polyjet: €0.30–1.50/cm³, minimum €50/part
- Sand printing: €0.10–0.40/cm³, minimum €80/part
- CNC milling: €60–150/hour, minimum €80
- CNC turning: €50–120/hour, minimum €60
- Water jet cutting: €80–200/hour, minimum €50
- Laser cutting: €60–150/hour, minimum €40
- CAD engineering: €80–120/hour
- 3D scan: €150–500 per object

Volume discounts: From 10 pcs ~10–20% discount, from 50 pcs ~20–35% discount.
Quality surcharges: Draft -20%, Standard 0%, Fine +30%, Ultra +60%.
Post-processing: Painting +20–50%, sandblasting +10–20%, dyeing +5–15%.

Respond ONLY with a valid JSON object without Markdown code blocks.`;

function buildUserPrompt(input: CalculatorInput): string {
  const isDe = input.lang === "de";

  const volumeInfo = input.volumeCm3
    ? `Volumen: ${input.volumeCm3} cm³`
    : input.sizeX && input.sizeY && input.sizeZ
    ? `Abmessungen: ${input.sizeX} × ${input.sizeY} × ${input.sizeZ} mm (Hüllvolumen: ${((input.sizeX * input.sizeY * input.sizeZ) / 1000).toFixed(1)} cm³)`
    : isDe ? "Keine Abmessungen angegeben" : "No dimensions provided";

  const qualityLabels: Record<string, string> = {
    draft: isDe ? "Entwurf (grob)" : "Draft (coarse)",
    standard: isDe ? "Standard" : "Standard",
    fine: isDe ? "Fein" : "Fine",
    ultra: isDe ? "Ultra-fein" : "Ultra-fine",
  };

  const postProc = input.postProcessing?.length
    ? input.postProcessing.join(", ")
    : isDe ? "Keine" : "None";

  const prompt = isDe
    ? `Erstelle eine Kostenschätzung für folgendes Projekt:
- Fertigungsverfahren: ${input.process}
- Material: ${input.material}
- ${volumeInfo}
- Menge: ${input.quantity} Stück
- Qualität/Auflösung: ${qualityLabels[input.quality]}
${input.infillPercent ? `- Infill: ${input.infillPercent}%` : ""}
- Nachbearbeitung: ${postProc}
${input.description ? `- Projektbeschreibung: ${input.description}` : ""}

Antworte mit folgendem JSON-Schema:
{
  "costMin": <Zahl, Gesamtkosten Minimum in Euro>,
  "costMax": <Zahl, Gesamtkosten Maximum in Euro>,
  "currency": "EUR",
  "deliveryDays": <Zahl, minimale Lieferzeit in Werktagen>,
  "deliveryDaysMax": <Zahl, maximale Lieferzeit in Werktagen>,
  "confidence": "<low|medium|high>",
  "summary": "<2-3 Sätze Zusammenfassung der Schätzung auf Deutsch>",
  "breakdown": [
    {"label": "<Kostenposition>", "value": "<Betrag oder Beschreibung>"}
  ],
  "recommendations": ["<Empfehlung 1>", "<Empfehlung 2>"],
  "warnings": ["<Hinweis 1 falls relevant>"],
  "disclaimer": "Dies ist eine unverbindliche Schätzung. Der tatsächliche Preis wird nach Prüfung Ihrer CAD-Daten verbindlich angeboten."
}`
    : `Create a cost estimate for the following project:
- Manufacturing process: ${input.process}
- Material: ${input.material}
- ${volumeInfo}
- Quantity: ${input.quantity} piece(s)
- Quality/Resolution: ${qualityLabels[input.quality]}
${input.infillPercent ? `- Infill: ${input.infillPercent}%` : ""}
- Post-processing: ${postProc}
${input.description ? `- Project description: ${input.description}` : ""}

Respond with the following JSON schema:
{
  "costMin": <number, total cost minimum in euros>,
  "costMax": <number, total cost maximum in euros>,
  "currency": "EUR",
  "deliveryDays": <number, minimum delivery time in business days>,
  "deliveryDaysMax": <number, maximum delivery time in business days>,
  "confidence": "<low|medium|high>",
  "summary": "<2-3 sentence summary of the estimate in English>",
  "breakdown": [
    {"label": "<cost item>", "value": "<amount or description>"}
  ],
  "recommendations": ["<recommendation 1>", "<recommendation 2>"],
  "warnings": ["<note 1 if relevant>"],
  "disclaimer": "This is a non-binding estimate. The actual price will be quoted after reviewing your CAD data."
}`;

  return prompt;
}

export const calculatorRouter = router({
  estimate: publicProcedure
    .input(calculatorInputSchema)
    .mutation(async ({ input }): Promise<CalculatorResult> => {
      const systemPrompt = input.lang === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;
      const userPrompt = buildUserPrompt(input);

      const response = await invokeLLM({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "calculator_result",
            strict: true,
            schema: {
              type: "object",
              properties: {
                costMin: { type: "number" },
                costMax: { type: "number" },
                currency: { type: "string" },
                deliveryDays: { type: "number" },
                deliveryDaysMax: { type: "number" },
                confidence: { type: "string", enum: ["low", "medium", "high"] },
                summary: { type: "string" },
                breakdown: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      label: { type: "string" },
                      value: { type: "string" },
                    },
                    required: ["label", "value"],
                    additionalProperties: false,
                  },
                },
                recommendations: { type: "array", items: { type: "string" } },
                warnings: { type: "array", items: { type: "string" } },
                disclaimer: { type: "string" },
              },
              required: [
                "costMin", "costMax", "currency",
                "deliveryDays", "deliveryDaysMax",
                "confidence", "summary", "breakdown",
                "recommendations", "warnings", "disclaimer",
              ],
              additionalProperties: false,
            },
          },
        },
      });

      const rawContent = response.choices?.[0]?.message?.content;
      if (!rawContent) {
        throw new Error("No response from LLM");
      }
      const content = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);

      try {
        const result = JSON.parse(content) as CalculatorResult;
        return result;
      } catch {
        throw new Error("Failed to parse LLM response as JSON");
      }
    }),
});
