// ──────────────────────────────────────────────────────────────────────────
// A4-Datenblatt – exakt nach Siepe-Vorlage. Genutzt für Live-Vorschau + PDF.
// Alle Maße in mm/pt für vektorscharfen A4-Druck (window.print()).
// ──────────────────────────────────────────────────────────────────────────
import { Datasheet, CompanyConfig, DocLang, tl } from './data';

const C = {
  title: '#76787a',
  sub: '#76787a',
  body: '#333333',
  groupHeading: '#5b5d5f',
  note: '#8a8c8e',
  footHeading: '#3a3a3a',
  footAddr: '#57585a',
  sep: '#c9cacb',
  logo: '#005596',
  zebra: '#f4f4f4',
  line: '#dcdddd',
};

interface Props {
  doc: Datasheet;
  company: CompanyConfig;
  lang: DocLang;
}

/**
 * Eine vollständige A4-Seite (210 × 297 mm). Wird sowohl in der Vorschau
 * (skaliert) als auch unsichtbar für den PDF-Druck gerendert.
 */
export default function DatenblattDocument({ doc, company, lang }: Props) {
  const headline = tl(doc.headline, lang) || '—';
  const subline = tl(doc.subline, lang);
  const features = doc.features.filter((g) => tl(g.title, lang) || g.points.some((p) => tl(p, lang)));
  const techRows = doc.techData.filter((r) => tl(r.type, lang) || tl(r.value, lang));
  const note = tl(doc.note, lang);

  return (
    <div
      className="ds-doc"
      style={{
        width: '210mm',
        height: '297mm',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '16mm 12mm 8mm 27mm',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        color: C.body,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Kopf: Titel + Unterzeile ── */}
      <div style={{ marginBottom: '6mm' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '18pt',
            fontWeight: 300,
            lineHeight: 1.12,
            letterSpacing: '0.3pt',
            color: C.title,
            textTransform: 'uppercase',
            maxWidth: '95mm',
          }}
        >
          {headline}
        </h1>
        {subline && (
          <div
            style={{
              marginTop: '2mm',
              fontSize: '10pt',
              fontWeight: 300,
              color: C.sub,
              textTransform: 'uppercase',
              letterSpacing: '0.2pt',
              maxWidth: '95mm',
            }}
          >
            {subline}
          </div>
        )}
      </div>

      {/* ── Hauptbereich: Produktbild links, Merkmale rechts ── */}
      <div style={{ display: 'flex', gap: '8mm', flex: '0 0 auto' }}>
        {/* Produktbild */}
        <div style={{ width: '95mm', flex: '0 0 95mm' }}>
          <div
            style={{
              width: '100%',
              height: '120mm',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
            }}
          >
            {doc.image ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img
                src={doc.image}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  transform: `translate(${doc.imageX}%, ${doc.imageY}%) scale(${doc.imageZoom / 100})`,
                  transformOrigin: 'center',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  border: `0.3mm dashed ${C.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#bdbdbd',
                  fontSize: '9pt',
                }}
              >
                Produktbild
              </div>
            )}
          </div>
          {tl(doc.imageDescription, lang) && (
            <div style={{ marginTop: '2mm', fontSize: '7.5pt', color: C.note, textAlign: 'center' }}>
              {tl(doc.imageDescription, lang)}
            </div>
          )}
        </div>

        {/* Produktmerkmale */}
        <div style={{ flex: '1 1 auto', paddingTop: '1mm' }}>
          {features.map((g) => {
            const pts = g.points.filter((p) => tl(p, lang));
            return (
              <div key={g.id} style={{ marginBottom: '4.5mm' }}>
                <div
                  style={{
                    fontSize: '9pt',
                    fontWeight: 400,
                    color: C.groupHeading,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3pt',
                    marginBottom: '1mm',
                  }}
                >
                  {tl(g.title, lang)}
                </div>
                {pts.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '1.5mm',
                      fontSize: '9pt',
                      lineHeight: 1.3,
                      color: C.body,
                      marginBottom: '0.4mm',
                    }}
                  >
                    <span style={{ flex: '0 0 auto' }}>•</span>
                    <span>{tl(p, lang)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Technische Daten ── */}
      <div style={{ marginTop: '6mm' }}>
        <div
          style={{
            fontSize: '10pt',
            color: C.groupHeading,
            textTransform: 'uppercase',
            letterSpacing: '0.4pt',
            paddingBottom: '1.5mm',
            marginBottom: '0',
          }}
        >
          {lang === 'en' ? 'TECHNICAL DATA' : lang === 'fr' ? 'DONNÉES TECHNIQUES' : lang === 'pl' ? 'DANE TECHNICZNE' : 'TECHNISCHE DATEN'}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8.5pt' }}>
          <tbody>
            {techRows.map((r, i) => (
              <tr key={r.id} style={{ background: i % 2 === 1 ? C.zebra : 'transparent' }}>
                <td style={{ padding: '1.4mm 2mm', color: C.body, width: '70%' }}>{tl(r.type, lang)}</td>
                <td style={{ padding: '1.4mm 2mm', color: C.body, textAlign: 'right', fontWeight: 400 }}>
                  {tl(r.value, lang)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Spacer schiebt den Footer nach unten ── */}
      <div style={{ flex: '1 1 auto' }} />

      {/* ── Hinweistext ── */}
      {note && (
        <div style={{ fontSize: '7pt', color: C.note, lineHeight: 1.35, marginBottom: '4mm', maxWidth: '170mm' }}>
          {note}
        </div>
      )}

      {/* ── Footer ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6mm', fontSize: '8pt', color: C.footAddr, lineHeight: 1.45 }}>
          {/* Firma */}
          <div style={{ minWidth: '32mm' }}>
            <div style={{ fontWeight: 700, color: C.footHeading, marginBottom: '1.5mm' }}>{company.name}</div>
            <div>{company.web}</div>
            <div>{company.email}</div>
          </div>
          {/* Werke */}
          {company.werke.map((w, i) => (
            <div key={i} style={{ paddingLeft: '4mm', borderLeft: `0.3mm solid ${C.sep}`, minWidth: '32mm' }}>
              <div style={{ fontWeight: 700, color: C.footHeading, marginBottom: '1.5mm' }}>{w.name}</div>
              <div>{w.street}</div>
              <div>{w.city}</div>
              {w.tel && <div>{w.tel}</div>}
            </div>
          ))}
        </div>

        {/* Logo */}
        <div
          style={{
            fontSize: '22pt',
            fontWeight: 800,
            letterSpacing: '1pt',
            color: C.logo,
            fontStyle: 'italic',
            lineHeight: 1,
            paddingLeft: '4mm',
          }}
        >
          SIEPE
        </div>
      </div>

      {/* ── Prospekt-Zeile ── */}
      <div style={{ marginTop: '3mm', fontSize: '7.5pt', color: C.footAddr }}>
        {doc.datum}
        {doc.prospektNr && (
          <>
            {'  | '}
            {lang === 'en' ? 'Brochure No. ' : lang === 'fr' ? 'Brochure n° ' : lang === 'pl' ? 'Nr prospektu ' : 'Prospekt Nr. '}
            {doc.prospektNr}
          </>
        )}
      </div>
    </div>
  );
}
