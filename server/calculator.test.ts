import { describe, expect, it, vi, beforeEach } from "vitest";
import { calculatorInputSchema, type CalculatorInput } from "./routers/calculator";

// Mock the LLM module so tests don't make real API calls
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            costMin: 45,
            costMax: 85,
            currency: "EUR",
            deliveryDays: 3,
            deliveryDaysMax: 5,
            confidence: "medium",
            summary: "Für 5 Stück PETG-Bauteile in FDM-Druck ergibt sich ein Preisrahmen von 45–85 €.",
            breakdown: [
              { label: "Materialkosten", value: "ca. 20–35 €" },
              { label: "Maschinenzeit", value: "ca. 15–30 €" },
              { label: "Rüstkosten", value: "ca. 10–20 €" },
            ],
            recommendations: [
              "PETG eignet sich gut für dieses Bauteil.",
              "Bei Stückzahl > 10 sind Mengenrabatte möglich.",
            ],
            warnings: [],
            disclaimer:
              "Dies ist eine unverbindliche Schätzung. Der tatsächliche Preis wird nach Prüfung Ihrer CAD-Daten verbindlich angeboten.",
          }),
        },
      },
    ],
  }),
}));

describe("calculatorInputSchema validation", () => {
  it("should accept a valid minimal input", () => {
    const input: CalculatorInput = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 5,
      quality: "standard",
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("should accept input with dimensions", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 1,
      quality: "standard",
      lang: "de",
      sizeX: 80,
      sizeY: 60,
      sizeZ: 40,
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("should accept input with volume", () => {
    const input = {
      process: "SLS-Druck (Selektives Lasersintern)",
      material: "PA12 (Nylon)",
      quantity: 10,
      quality: "fine",
      lang: "en",
      volumeCm3: 25.5,
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("should accept FDM input with infill", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PLA",
      quantity: 3,
      quality: "draft",
      lang: "de",
      infillPercent: 20,
      postProcessing: ["Sandstrahlen", "Lackieren"],
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("should reject empty process", () => {
    const input = {
      process: "",
      material: "PETG",
      quantity: 1,
      quality: "standard",
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject empty material", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "",
      quantity: 1,
      quality: "standard",
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject quantity of 0", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 0,
      quality: "standard",
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject quantity above 10000", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 10001,
      quality: "standard",
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject invalid quality value", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 1,
      quality: "super-ultra",
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject invalid language", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 1,
      quality: "standard",
      lang: "fr",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject infill below 5", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PLA",
      quantity: 1,
      quality: "standard",
      lang: "de",
      infillPercent: 4,
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject infill above 100", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PLA",
      quantity: 1,
      quality: "standard",
      lang: "de",
      infillPercent: 101,
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should reject description longer than 1000 chars", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PLA",
      quantity: 1,
      quality: "standard",
      lang: "de",
      description: "a".repeat(1001),
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should default quality to standard if not provided", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 1,
      lang: "de",
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.quality).toBe("standard");
    }
  });

  it("should default lang to de if not provided", () => {
    const input = {
      process: "FDM-Druck (Standard)",
      material: "PETG",
      quantity: 1,
    };
    const result = calculatorInputSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.lang).toBe("de");
    }
  });
});

describe("Calculator tRPC procedure", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a valid CalculatorResult from the LLM", async () => {
    const { invokeLLM } = await import("./_core/llm");
    const mockInvoke = vi.mocked(invokeLLM);

    mockInvoke.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: JSON.stringify({
              costMin: 120,
              costMax: 200,
              currency: "EUR",
              deliveryDays: 5,
              deliveryDaysMax: 8,
              confidence: "high",
              summary: "SLS-Druck für PA12-Bauteile in dieser Größe.",
              breakdown: [{ label: "Materialkosten", value: "ca. 80 €" }],
              recommendations: ["PA12 ist ideal für funktionale Teile."],
              warnings: ["Wandstärke sollte mindestens 1 mm betragen."],
              disclaimer: "Unverbindliche Schätzung.",
            }),
          },
        },
      ],
    } as ReturnType<typeof invokeLLM> extends Promise<infer T> ? T : never);

    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller({
      user: null,
      req: {} as ReturnType<typeof appRouter.createCaller> extends infer T ? never : never,
      res: {} as ReturnType<typeof appRouter.createCaller> extends infer T ? never : never,
    } as Parameters<typeof appRouter.createCaller>[0]);

    const result = await caller.calculator.estimate({
      process: "SLS-Druck (Selektives Lasersintern)",
      material: "PA12 (Nylon)",
      quantity: 3,
      quality: "standard",
      lang: "de",
      sizeX: 100,
      sizeY: 80,
      sizeZ: 50,
    });

    expect(result.costMin).toBe(120);
    expect(result.costMax).toBe(200);
    expect(result.currency).toBe("EUR");
    expect(result.confidence).toBe("high");
    expect(result.breakdown).toHaveLength(1);
    expect(result.recommendations).toHaveLength(1);
    expect(result.warnings).toHaveLength(1);
    expect(mockInvoke).toHaveBeenCalledOnce();
  });

  it("should call LLM with DE system prompt when lang is de", async () => {
    const { invokeLLM } = await import("./_core/llm");
    const mockInvoke = vi.mocked(invokeLLM);

    mockInvoke.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: JSON.stringify({
              costMin: 50, costMax: 90, currency: "EUR",
              deliveryDays: 3, deliveryDaysMax: 5,
              confidence: "medium", summary: "Test",
              breakdown: [], recommendations: [], warnings: [],
              disclaimer: "Test",
            }),
          },
        },
      ],
    } as ReturnType<typeof invokeLLM> extends Promise<infer T> ? T : never);

    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller({
      user: null,
      req: {} as Parameters<typeof appRouter.createCaller>[0]["req"],
      res: {} as Parameters<typeof appRouter.createCaller>[0]["res"],
    } as Parameters<typeof appRouter.createCaller>[0]);

    await caller.calculator.estimate({
      process: "FDM-Druck (Standard)",
      material: "PLA",
      quantity: 1,
      quality: "standard",
      lang: "de",
    });

    const callArgs = mockInvoke.mock.calls[0]?.[0];
    const systemMessage = callArgs?.messages?.[0];
    expect(systemMessage?.content).toContain("Fabrica GmbH");
    expect(systemMessage?.content).toContain("FDM-Druck");
  });
});
