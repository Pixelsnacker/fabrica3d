import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { Upload as UploadIcon, CheckCircle, AlertCircle, X, FileText } from 'lucide-react';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const services = [
  { de: 'FDM-Druck', en: 'FDM Printing' },
  { de: 'Endlosfaser FDM', en: 'Continuous Fiber FDM' },
  { de: 'SLA-Druck', en: 'SLA Printing' },
  { de: 'DLP-Druck', en: 'DLP Printing' },
  { de: 'SLS-Druck', en: 'SLS Printing' },
  { de: 'MJF-Druck', en: 'MJF Printing' },
  { de: 'Sanddruck', en: 'Sand Printing' },
  { de: 'Polyjet', en: 'Polyjet' },
  { de: 'CAD-Konstruktion', en: 'CAD Engineering' },
  { de: 'Reverse Engineering', en: 'Reverse Engineering' },
  { de: '3D-Scan', en: '3D Scan' },
  { de: 'CNC-Fräsen', en: 'CNC Milling' },
  { de: 'CNC-Drehen', en: 'CNC Turning' },
  { de: 'Wasserschneiden', en: 'Water Jet Cutting' },
  { de: 'Laserschneiden', en: 'Laser Cutting' },
  { de: 'Museumsmodelle', en: 'Museum Models' },
  { de: 'Sonstiges / Beratung', en: 'Other / Consultation' },
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  quantity: string;
  material: string;
  deadline: string;
  description: string;
  dsgvo: boolean;
  honeypot: string; // anti-spam
}

export default function Upload() {
  const { lang, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    quantity: '',
    material: '',
    deadline: '',
    description: '',
    dsgvo: false,
    honeypot: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFileError('');
    const arr = Array.from(newFiles);
    const oversized = arr.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      setFileError(t(`Datei "${oversized[0].name}" ist zu groß (max. 50 MB).`, `File "${oversized[0].name}" is too large (max. 50 MB).`));
      return;
    }
    setFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check
    if (form.honeypot) return;

    setSubmitting(true);
    setError('');

    try {
      // Build mailto link as fallback (no backend email integration yet)
      const subject = encodeURIComponent(`Anfrage: ${form.service || 'Allgemein'} – ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nFirma: ${form.company}\nE-Mail: ${form.email}\nTelefon: ${form.phone}\n\nLeistung: ${form.service}\nMenge: ${form.quantity}\nMaterial: ${form.material}\nDeadline: ${form.deadline}\n\nProjektbeschreibung:\n${form.description}\n\nDateien: ${files.map((f) => f.name).join(', ') || 'Keine'}`
      );
      window.location.href = `mailto:kontakt@fabrica3d.eu?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      setError(t('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.', 'An error occurred. Please try again or contact us directly.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="container py-20 max-w-lg mx-auto text-center">
          <CheckCircle size={56} className="mx-auto mb-4 text-green-500" />
          <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--fabrica-anthrazit)' }}>
            {t('Anfrage gesendet!', 'Request Sent!')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden mit einem verbindlichen Angebot.', 'Thank you for your request. We will respond within 24 hours with a binding quote.')}
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', service: '', quantity: '', material: '', deadline: '', description: '', dsgvo: false, honeypot: '' }); setFiles([]); }}
            className="px-6 py-3 text-white font-semibold rounded"
            style={{ backgroundColor: 'var(--fabrica-red)' }}
          >
            {t('Neue Anfrage', 'New Request')}
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-14 md:py-20 text-white"
        style={{ background: 'linear-gradient(135deg, var(--fabrica-anthrazit) 0%, oklch(25% 0.05 260) 100%)' }}
      >
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t('Datei hochladen & Angebot erhalten', 'Upload File & Get Quote')}
          </h1>
          <p className="text-white/80 max-w-xl">
            {t('Laden Sie Ihre CAD-Datei hoch und beschreiben Sie Ihr Projekt. Wir prüfen Ihre Daten kostenlos und senden Ihnen innerhalb von 24 Stunden ein verbindliches Angebot.', 'Upload your CAD file and describe your project. We will check your data free of charge and send you a binding quote within 24 hours.')}
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot – hidden anti-spam field */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Kontaktdaten', 'Contact Information')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Name *', 'Name *')}
                </label>
                <input required type="text" name="name" value={form.name} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  placeholder={t('Ihr Name', 'Your name')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Firma', 'Company')}
                </label>
                <input type="text" name="company" value={form.company} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  placeholder={t('Firmenname (optional)', 'Company name (optional)')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('E-Mail *', 'Email *')}
                </label>
                <input required type="email" name="email" value={form.email} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  placeholder="ihre@email.de" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Telefon', 'Phone')}
                </label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  placeholder="+49 ..." />
              </div>
            </div>
          </div>

          {/* Project details */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Projektdetails', 'Project Details')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Gewünschte Leistung *', 'Requested Service *')}
                </label>
                <select required name="service" value={form.service} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white">
                  <option value="">{t('Bitte wählen...', 'Please select...')}</option>
                  {services.map((s) => (
                    <option key={s.de} value={s.de}>{lang === 'en' ? s.en : s.de}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Menge', 'Quantity')}
                </label>
                <input type="text" name="quantity" value={form.quantity} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  placeholder={t('z.B. 1 Stück, 50 Stück', 'e.g. 1 piece, 50 pieces')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Material (Wunsch)', 'Material (Preference)')}
                </label>
                <input type="text" name="material" value={form.material} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  placeholder={t('z.B. PLA, PA12, Aluminium', 'e.g. PLA, PA12, Aluminum')} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Gewünschter Liefertermin', 'Desired Delivery Date')}
                </label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Projektbeschreibung *', 'Project Description *')}
                </label>
                <textarea required name="description" value={form.description} onChange={handleChange} rows={5}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-y"
                  placeholder={t('Beschreiben Sie Ihr Projekt, Anforderungen, Toleranzen, Oberflächenqualität etc.', 'Describe your project, requirements, tolerances, surface quality etc.')} />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Datei hochladen', 'File Upload')}
            </h2>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-red-300 transition-colors"
              style={{ borderColor: 'var(--fabrica-gray)' }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="font-medium text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {t('Dateien hierher ziehen oder klicken zum Auswählen', 'Drag files here or click to select')}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {t('STL, STEP, IGES, OBJ, 3MF, ZIP – max. 50 MB pro Datei', 'STL, STEP, IGES, OBJ, 3MF, ZIP – max. 50 MB per file')}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".stl,.step,.stp,.iges,.igs,.obj,.3mf,.zip,.pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
            {fileError && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={14} />
                {fileError}
              </div>
            )}
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
                    <FileText size={14} className="text-gray-400" />
                    <span className="flex-1 truncate" style={{ color: 'var(--fabrica-anthrazit)' }}>{f.name}</span>
                    <span className="text-gray-400 text-xs">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500">
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DSGVO */}
          <div className="p-4 rounded-lg border">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="dsgvo"
                checked={form.dsgvo}
                onChange={handleChange}
                required
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                {t(
                  'Ich habe die ',
                  'I have read the '
                )}
                <a href="/datenschutz" className="underline" style={{ color: 'var(--fabrica-red)' }}>
                  {t('Datenschutzerklärung', 'Privacy Policy')}
                </a>
                {t(
                  ' gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *',
                  ' and agree to the processing of my data for handling my request. *'
                )}
              </span>
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm p-3 rounded-lg bg-red-50">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !form.dsgvo}
            className="w-full py-3 font-bold text-white rounded-lg transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--fabrica-red)' }}
          >
            {submitting
              ? t('Wird gesendet...', 'Sending...')
              : t('Anfrage senden', 'Send Request')}
          </button>

          <p className="text-xs text-gray-400 text-center">
            {t('* Pflichtfelder. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.', '* Required fields. Your data will only be used to process your request and will not be passed on to third parties.')}
          </p>
        </form>
      </div>
    </PageLayout>
  );
}
