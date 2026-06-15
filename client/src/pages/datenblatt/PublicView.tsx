import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRoute } from 'wouter';
import { Download } from 'lucide-react';
import { Datasheet, DocLang, DOC_LANGS, LANG_FLAG, LANG_LABEL, loadOne, loadCompany } from './data';
import DatenblattDocument from './DatenblattDocument';

/**
 * Öffentliche, dauerhafte Ansicht eines Datenblatts unter /datenblatt/p/:id.
 * Diese URL ist der Permanentlink für Webseite & ERP (Lotus Notes) – sie zeigt
 * immer den aktuellen Stand aus der Datenbank. ?embed=1 blendet die Toolbar aus,
 * ?pdf=1 öffnet direkt den PDF-Druckdialog, ?lang=en|pl|fr setzt die Sprache.
 */
export default function PublicView() {
  const [, params] = useRoute('/datenblatt/p/:id');
  const id = params?.id ?? '';
  const search = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const embed = search.get('embed') === '1';
  const initialLang = (search.get('lang') as DocLang) || 'de';

  const [doc, setDoc] = useState<Datasheet | null | undefined>(undefined);
  const [lang, setLang] = useState<DocLang>(DOC_LANGS.includes(initialLang) ? initialLang : 'de');
  const company = loadCompany();

  useEffect(() => {
    loadOne(id).then((d) => setDoc(d ?? null));
  }, [id]);

  const print = () => {
    document.body.classList.add('ds-printing');
    window.print();
  };
  useEffect(() => {
    const after = () => document.body.classList.remove('ds-printing');
    window.addEventListener('afterprint', after);
    return () => window.removeEventListener('afterprint', after);
  }, []);
  useEffect(() => {
    if (doc && search.get('pdf') === '1') {
      const t = setTimeout(print, 400);
      return () => clearTimeout(t);
    }
  }, [doc]);

  if (doc === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Lädt …</div>;
  }
  if (doc === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Datenblatt nicht gefunden.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6 px-2">
      {!embed && (
        <div className="ds-no-print w-full max-w-[210mm] flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-sm">
            {DOC_LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  lang === l ? 'text-white bg-[#2563eb]' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {LANG_FLAG[l]} {LANG_LABEL[l]}
              </button>
            ))}
          </div>
          <button
            onClick={print}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-[#2563eb] shadow-sm"
          >
            <Download size={16} /> PDF herunterladen
          </button>
        </div>
      )}

      <div className="ds-no-print shadow-2xl bg-white">
        <DatenblattDocument doc={doc} company={company} lang={lang} />
      </div>

      {/* Druck-Container */}
      {createPortal(
        <div id="dsPrintRoot">
          <DatenblattDocument doc={doc} company={company} lang={lang} />
        </div>,
        document.body,
      )}
    </div>
  );
}
