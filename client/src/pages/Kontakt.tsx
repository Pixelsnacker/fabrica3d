import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Kontakt() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', dsgvo: false, honeypot: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    const subject = encodeURIComponent(form.subject || 'Kontaktanfrage');
    const body = encodeURIComponent(`Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:kontakt@fabrica3d.eu?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section
        className="py-14 md:py-20 text-white"
        style={{ background: 'linear-gradient(135deg, var(--fabrica-anthrazit) 0%, oklch(25% 0.05 260) 100%)' }}
      >
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('Kontakt', 'Contact')}</h1>
          <p className="text-white/80 max-w-xl">
            {t('Haben Sie Fragen oder möchten ein Projekt besprechen? Wir freuen uns auf Ihre Nachricht.', 'Do you have questions or would like to discuss a project? We look forward to hearing from you.')}
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Kontaktdaten', 'Contact Information')}
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: 'var(--fabrica-red)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>E-Mail</p>
                  <a href="mailto:kontakt@fabrica3d.eu" className="text-sm hover:underline" style={{ color: 'var(--fabrica-red)' }}>
                    kontakt@fabrica3d.eu
                  </a>
                </div>
              </div>
              {/* Kerpen */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: 'var(--fabrica-red)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {t('Büro Kerpen-Sindorf', 'Office Kerpen-Sindorf')}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Fabrica GmbH<br />
                    Hüttenstraße 205<br />
                    D-50170 Kerpen-Sindorf
                  </p>
                  <a href="tel:+4922739529429" className="text-sm hover:underline mt-1 block" style={{ color: 'var(--fabrica-red)' }}>
                    +49 (0) 2273 / 9529429
                  </a>
                </div>
              </div>
              {/* Köln */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: 'var(--fabrica-red)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>
                    {t('Büro Köln (neu)', 'Office Cologne (new)')}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Fabrica GmbH<br />
                    Gilabchstr. 29a<br />
                    50672 Köln
                  </p>
                  <a href="tel:+4922117051695" className="text-sm hover:underline mt-1 block" style={{ color: 'var(--fabrica-red)' }}>
                    +49 (0) 221 / 17051695
                  </a>
                </div>
              </div>
              {/* Fax */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: 'var(--fabrica-red)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--fabrica-anthrazit)' }}>Fax</p>
                  <p className="text-sm text-gray-600">+49 (0) 221 / 790760092</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: 'var(--fabrica-red)' }}>
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Öffnungszeiten', 'Opening Hours')}</p>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <div className="flex justify-between gap-8">
                      <span>{t('Mo – Fr', 'Mon – Fri')}</span>
                      <span>08:00 – 17:00</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>{t('Sa', 'Sat')}</span>
                      <span>{t('Nach Vereinbarung', 'By appointment')}</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>{t('So', 'Sun')}</span>
                      <span>{t('Geschlossen', 'Closed')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-xl" style={{ backgroundColor: 'var(--fabrica-gray)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>
                {t('Antwortzeit', 'Response Time')}
              </p>
              <p className="text-sm text-gray-600">
                {t('Wir antworten in der Regel innerhalb von 24 Stunden auf Anfragen. Für dringende Anfragen nutzen Sie bitte direkt unsere E-Mail-Adresse.', 'We typically respond to inquiries within 24 hours. For urgent requests, please use our email address directly.')}
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--fabrica-anthrazit)' }}>
              {t('Nachricht senden', 'Send Message')}
            </h2>
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fabrica-anthrazit)' }}>
                  {t('Nachricht gesendet!', 'Message sent!')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('Vielen Dank. Wir melden uns innerhalb von 24 Stunden.', 'Thank you. We will get back to you within 24 hours.')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Name *', 'Name *')}</label>
                  <input required type="text" name="name" value={form.name} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    placeholder={t('Ihr Name', 'Your name')} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('E-Mail *', 'Email *')}</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    placeholder="ihre@email.de" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Betreff', 'Subject')}</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
                    placeholder={t('Worum geht es?', 'What is it about?')} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--fabrica-anthrazit)' }}>{t('Nachricht *', 'Message *')}</label>
                  <textarea required name="message" value={form.message} onChange={handleChange} rows={5}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-y"
                    placeholder={t('Ihre Nachricht...', 'Your message...')} />
                </div>
                <div className="p-4 rounded-lg border">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="dsgvo" checked={form.dsgvo} onChange={handleChange} required className="mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      {t('Ich stimme der Verarbeitung meiner Daten gemäß der ', 'I agree to the processing of my data in accordance with the ')}
                      <a href="/datenschutz" className="underline" style={{ color: 'var(--fabrica-red)' }}>
                        {t('Datenschutzerklärung', 'Privacy Policy')}
                      </a>
                      {t(' zu. *', '. *')}
                    </span>
                  </label>
                </div>
                <button type="submit" disabled={!form.dsgvo}
                  className="w-full py-3 font-bold text-white rounded-lg transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: 'var(--fabrica-red)' }}>
                  {t('Nachricht senden', 'Send Message')}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  {t('* Pflichtfelder', '* Required fields')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
