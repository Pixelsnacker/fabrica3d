/**
 * FabricaIcons – Feine SVG-Strichzeichnungen für alle Fertigungsbereiche
 * Alle Icons: strokeWidth 1.5, keine Füllung, moderne technische Ästhetik
 */

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
}

const defaultProps = { size: 24, strokeWidth: 1.5, color: 'currentColor' };

// ─── 3D-Druck: FDM-Druckkopf mit Schichten ───────────────────────────────────
export function IconFDM({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Druckkopf-Körper */}
      <rect x="7" y="2" width="10" height="7" rx="1" />
      {/* Düse */}
      <path d="M10 9 L9 13 L12 14 L15 13 L14 9" />
      {/* Filament-Einzug */}
      <line x1="12" y1="2" x2="12" y2="0.5" />
      {/* Schichten unten */}
      <rect x="4" y="16" width="16" height="2" rx="0.5" />
      <rect x="5" y="14" width="14" height="2" rx="0.5" />
      <rect x="6" y="12" width="12" height="2" rx="0.5" />
      {/* Druckbett */}
      <line x1="2" y1="20" x2="22" y2="20" />
      <line x1="4" y1="20" x2="4" y2="22" />
      <line x1="20" y1="20" x2="20" y2="22" />
    </svg>
  );
}

// ─── 3D-Druck allgemein: Schichtaufbau mit Düse ───────────────────────────────
export function Icon3DPrint({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Würfel-Silhouette isometrisch */}
      <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3" y1="7" x2="21" y2="7" />
      {/* Schichtlinien */}
      <line x1="3" y1="10" x2="12" y2="10" />
      <line x1="3" y1="13" x2="12" y2="13" />
      <line x1="3" y1="16" x2="12" y2="16" />
      {/* Düse oben */}
      <path d="M10 2 L10 0 L14 0 L14 2" />
    </svg>
  );
}

// ─── Endlosfaser: Faser-Wicklung mit Verstärkung ─────────────────────────────
export function IconEndlosfaser({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Bauteil-Querschnitt */}
      <rect x="3" y="8" width="18" height="8" rx="1" />
      {/* Endlosfaser-Linien (wellig) */}
      <path d="M5 10 Q7 9 9 10 Q11 11 13 10 Q15 9 17 10 Q19 11 21 10" />
      <path d="M5 12 Q7 11 9 12 Q11 13 13 12 Q15 11 17 12 Q19 13 21 12" />
      <path d="M5 14 Q7 13 9 14 Q11 15 13 14 Q15 13 17 14 Q19 15 21 14" />
      {/* Spule links */}
      <circle cx="2" cy="12" r="1.5" />
      <line x1="3.5" y1="12" x2="5" y2="12" />
    </svg>
  );
}

// ─── SLA/DLP: UV-Lichtkegel + Harzbad ────────────────────────────────────────
export function IconSLA({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Harzbehälter */}
      <rect x="3" y="14" width="18" height="7" rx="1" />
      {/* Harzoberfläche */}
      <line x1="3" y1="17" x2="21" y2="17" />
      {/* Bauplattform */}
      <rect x="7" y="11" width="10" height="2" rx="0.5" />
      {/* UV-Laser-Strahl */}
      <path d="M12 2 L8 11" strokeDasharray="2 1" />
      <path d="M12 2 L16 11" strokeDasharray="2 1" />
      {/* Laser-Quelle */}
      <circle cx="12" cy="2" r="1.5" />
      {/* Strahlen */}
      <line x1="12" y1="0" x2="12" y2="-0.5" />
      <line x1="10.5" y1="0.5" x2="10" y2="0" />
      <line x1="13.5" y1="0.5" x2="14" y2="0" />
    </svg>
  );
}

// ─── SLS/MJF: Pulverbett mit Laser-Scan ──────────────────────────────────────
export function IconSLS({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Pulverbehälter */}
      <rect x="2" y="12" width="20" height="9" rx="1" />
      {/* Pulver-Textur (Punkte) */}
      <circle cx="6" cy="16" r="0.5" fill={color} stroke="none" />
      <circle cx="9" cy="15" r="0.5" fill={color} stroke="none" />
      <circle cx="12" cy="16.5" r="0.5" fill={color} stroke="none" />
      <circle cx="15" cy="15" r="0.5" fill={color} stroke="none" />
      <circle cx="18" cy="16" r="0.5" fill={color} stroke="none" />
      <circle cx="7" cy="18" r="0.5" fill={color} stroke="none" />
      <circle cx="11" cy="19" r="0.5" fill={color} stroke="none" />
      <circle cx="16" cy="18" r="0.5" fill={color} stroke="none" />
      {/* Laser-Scanner oben */}
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <line x1="12" y1="6" x2="12" y2="12" />
      {/* Scan-Linien */}
      <path d="M6 12 L12 8 L18 12" strokeDasharray="2 1" />
    </svg>
  );
}

// ─── Sanddruck / Binder Jetting: Sandkorn-Schichten ──────────────────────────
export function IconSanddruck({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Druckbehälter */}
      <rect x="3" y="10" width="18" height="11" rx="1" />
      {/* Druckkopf */}
      <rect x="6" y="5" width="12" height="4" rx="1" />
      {/* Druckdüsen */}
      <line x1="9" y1="9" x2="9" y2="10" />
      <line x1="12" y1="9" x2="12" y2="10" />
      <line x1="15" y1="9" x2="15" y2="10" />
      {/* Sand-Partikel */}
      <circle cx="7" cy="14" r="0.8" fill={color} stroke="none" />
      <circle cx="10" cy="13" r="0.8" fill={color} stroke="none" />
      <circle cx="13" cy="14.5" r="0.8" fill={color} stroke="none" />
      <circle cx="16" cy="13" r="0.8" fill={color} stroke="none" />
      <circle cx="19" cy="14" r="0.8" fill={color} stroke="none" />
      <circle cx="8" cy="17" r="0.8" fill={color} stroke="none" />
      <circle cx="12" cy="17.5" r="0.8" fill={color} stroke="none" />
      <circle cx="17" cy="17" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

// ─── Polyjet: Multi-Material-Druckkopf ───────────────────────────────────────
export function IconPolyjet({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Druckkopf-Schiene */}
      <rect x="2" y="3" width="20" height="4" rx="1" />
      {/* Mehrere Düsen */}
      <line x1="6" y1="7" x2="6" y2="10" />
      <line x1="9" y1="7" x2="9" y2="10" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="15" y1="7" x2="15" y2="10" />
      <line x1="18" y1="7" x2="18" y2="10" />
      {/* UV-Licht-Balken */}
      <rect x="4" y="10" width="16" height="2" rx="0.5" />
      {/* Bauteil mit Farbschichten */}
      <rect x="5" y="14" width="14" height="2" rx="0.5" />
      <rect x="5" y="16" width="14" height="2" rx="0.5" />
      <rect x="5" y="18" width="14" height="2" rx="0.5" />
      {/* Druckbett */}
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

// ─── CAD-Konstruktion: Technische Zeichnung mit Bemaßung ─────────────────────
export function IconCAD({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Zeichenblatt */}
      <rect x="3" y="2" width="18" height="20" rx="1" />
      {/* Bauteil-Kontur */}
      <path d="M7 7 L13 7 L13 10 L17 10 L17 17 L7 17 Z" />
      {/* Bemaßungslinie horizontal */}
      <line x1="7" y1="19" x2="17" y2="19" />
      <line x1="7" y1="18.5" x2="7" y2="19.5" />
      <line x1="17" y1="18.5" x2="17" y2="19.5" />
      {/* Bemaßungslinie vertikal */}
      <line x1="5" y1="7" x2="5" y2="17" />
      <line x1="4.5" y1="7" x2="5.5" y2="7" />
      <line x1="4.5" y1="17" x2="5.5" y2="17" />
    </svg>
  );
}

// ─── Reverse Engineering: Scan → CAD-Modell ──────────────────────────────────
export function IconReverseEngineering({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Objekt links (physisch, organisch) */}
      <path d="M3 15 Q3 9 7 7 Q9 6 10 9 Q11 12 9 14 Q7 16 5 15 Z" />
      {/* Scan-Linien */}
      <line x1="10" y1="7" x2="14" y2="7" strokeDasharray="1.5 1" />
      <line x1="10" y1="10" x2="14" y2="10" strokeDasharray="1.5 1" />
      <line x1="10" y1="13" x2="14" y2="13" strokeDasharray="1.5 1" />
      {/* Pfeil Mitte */}
      <line x1="13" y1="10" x2="15" y2="10" />
      <polyline points="14,9 15,10 14,11" />
      {/* CAD-Modell rechts (geometrisch) */}
      <rect x="15" y="7" width="7" height="7" rx="0.5" />
      <line x1="15" y1="10.5" x2="22" y2="10.5" />
      <line x1="18.5" y1="7" x2="18.5" y2="14" />
    </svg>
  );
}

// ─── 3D-Scan: GOM ATOS Streifenlicht-Projektor ───────────────────────────────
export function Icon3DScan({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Scanner-Gehäuse */}
      <rect x="8" y="2" width="8" height="6" rx="1" />
      {/* Linse */}
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="5" r="0.8" />
      {/* Scan-Fächer */}
      <path d="M8 8 L4 18" />
      <path d="M12 8 L12 18" />
      <path d="M16 8 L20 18" />
      {/* Scan-Linien auf Objekt */}
      <line x1="4" y1="18" x2="20" y2="18" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="6" y1="12" x2="18" y2="12" />
      {/* Objekt-Basis */}
      <ellipse cx="12" cy="20" rx="8" ry="1.5" />
    </svg>
  );
}

// ─── CNC-Fräsen: Fräser mit Spänen ───────────────────────────────────────────
export function IconCNCFraesen({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Fräser-Schaft */}
      <rect x="10" y="2" width="4" height="8" rx="0.5" />
      {/* Fräser-Schneidteil */}
      <path d="M9 10 L9 16 Q9 18 12 18 Q15 18 15 16 L15 10 Z" />
      {/* Schneidkanten */}
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="14" x2="15" y2="14" />
      <line x1="9" y1="16" x2="15" y2="16" />
      {/* Werkstück */}
      <rect x="3" y="18" width="18" height="4" rx="0.5" />
      {/* Späne */}
      <path d="M15 17 Q17 15 18 16" strokeDasharray="1 0.5" />
      <path d="M16 16 Q18 14 19 15" strokeDasharray="1 0.5" />
    </svg>
  );
}

// ─── CNC-Drehen: Drehmeißel + rotierendes Werkstück ──────────────────────────
export function IconCNCDrehen({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Drehteil (Rotationskörper) */}
      <path d="M4 7 Q4 4 12 4 Q20 4 20 7 L20 17 Q20 20 12 20 Q4 20 4 17 Z" />
      {/* Mittelachse */}
      <line x1="4" y1="12" x2="20" y2="12" strokeDasharray="3 2" />
      {/* Kontur-Detail */}
      <path d="M4 7 L4 17" />
      <path d="M20 7 L20 17" />
      {/* Drehmeißel */}
      <path d="M21 10 L24 10 L24 14 L21 14 L19 12 Z" />
      {/* Rotation-Pfeil */}
      <path d="M8 3 Q12 1 16 3" />
      <polyline points="15.5,2 16,3 15,3.5" />
    </svg>
  );
}

// ─── Wasserschneiden: Wasserstrahl-Düse ──────────────────────────────────────
export function IconWasserschneiden({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Düsen-Körper */}
      <path d="M9 2 L15 2 L14 7 L10 7 Z" />
      {/* Düsen-Spitze */}
      <path d="M10 7 L11 9 L12 9 L13 9 L14 7" />
      {/* Wasserstrahl (konvergierend) */}
      <path d="M11 9 L11.5 22" />
      <path d="M13 9 L12.5 22" />
      {/* Wasserpartikel */}
      <circle cx="10" cy="13" r="0.4" fill={color} stroke="none" />
      <circle cx="14" cy="15" r="0.4" fill={color} stroke="none" />
      <circle cx="10.5" cy="18" r="0.4" fill={color} stroke="none" />
      <circle cx="13.5" cy="20" r="0.4" fill={color} stroke="none" />
      {/* Werkstück */}
      <rect x="3" y="19" width="18" height="3" rx="0.5" />
      {/* Schnittlinie */}
      <line x1="12" y1="19" x2="12" y2="22" strokeDasharray="1 0.5" />
    </svg>
  );
}

// ─── Laserschneiden: Laserstrahl + Schnitt ────────────────────────────────────
export function IconLaserschneiden({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Laser-Kopf */}
      <rect x="8" y="2" width="8" height="5" rx="1" />
      {/* Fokussier-Linse */}
      <path d="M10 7 L11 9 L13 9 L14 7" />
      {/* Laserstrahl */}
      <line x1="12" y1="9" x2="12" y2="17" strokeWidth={strokeWidth * 1.5} />
      {/* Lichtschein */}
      <line x1="10" y1="10" x2="8" y2="9" strokeDasharray="1 0.5" />
      <line x1="14" y1="10" x2="16" y2="9" strokeDasharray="1 0.5" />
      {/* Funken */}
      <path d="M11 17 L9 19 M12 17 L12 20 M13 17 L15 19" />
      {/* Werkstück */}
      <rect x="3" y="19" width="18" height="3" rx="0.5" />
      {/* Schnittlinie */}
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

// ─── Museumsmodelle: Artefakt auf Sockel ─────────────────────────────────────
export function IconMuseum({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Säulen-Giebel */}
      <path d="M2 8 L12 2 L22 8" />
      <line x1="2" y1="8" x2="22" y2="8" />
      {/* Säulen */}
      <line x1="5" y1="8" x2="5" y2="18" />
      <line x1="9" y1="8" x2="9" y2="18" />
      <line x1="15" y1="8" x2="15" y2="18" />
      <line x1="19" y1="8" x2="19" y2="18" />
      {/* Basis */}
      <line x1="2" y1="18" x2="22" y2="18" />
      <rect x="1" y="19" width="22" height="2" rx="0.5" />
      {/* Artefakt (Vase) in der Mitte */}
      <path d="M10 8 Q9 11 10 13 Q11 15 12 15 Q13 15 14 13 Q15 11 14 8" />
    </svg>
  );
}

// ─── Projekte: Mappe mit Stern ────────────────────────────────────────────────
export function IconProjekte({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Mappe */}
      <path d="M3 7 L3 20 Q3 21 4 21 L20 21 Q21 21 21 20 L21 7 Q21 6 20 6 L13 6 L11 4 L4 4 Q3 4 3 5 Z" />
      {/* Stern */}
      <path d="M12 10 L13 13 L16 13 L13.5 15 L14.5 18 L12 16.5 L9.5 18 L10.5 15 L8 13 L11 13 Z" />
    </svg>
  );
}

// ─── Basiswissen: Buch mit Lupe ───────────────────────────────────────────────
export function IconBasiswissen({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Buch */}
      <path d="M4 3 Q4 2 5 2 L12 2 L12 18 L5 18 Q4 18 4 17 Z" />
      <path d="M12 2 L19 2 Q20 2 20 3 L20 17 Q20 18 19 18 L12 18 Z" />
      <line x1="12" y1="2" x2="12" y2="18" />
      {/* Linien (Text) */}
      <line x1="6" y1="6" x2="10" y2="6" />
      <line x1="6" y1="9" x2="10" y2="9" />
      <line x1="6" y1="12" x2="10" y2="12" />
      {/* Lupe */}
      <circle cx="17" cy="17" r="3.5" />
      <line x1="19.5" y1="19.5" x2="22" y2="22" />
    </svg>
  );
}

// ─── Upload: Pfeil nach oben mit Wolke ───────────────────────────────────────
export function IconUpload({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Wolke */}
      <path d="M6 14 Q4 14 4 12 Q4 9 7 9 Q7 6 10 6 Q12 4 15 6 Q18 6 18 9 Q21 9 21 12 Q21 14 19 14" />
      {/* Pfeil nach oben */}
      <line x1="12" y1="22" x2="12" y2="12" />
      <polyline points="8,16 12,12 16,16" />
    </svg>
  );
}

// ─── Kontakt: Sprechblase mit Stift ──────────────────────────────────────────
export function IconKontakt({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Sprechblase */}
      <path d="M3 4 Q3 3 4 3 L20 3 Q21 3 21 4 L21 15 Q21 16 20 16 L8 16 L3 20 L3 4 Z" />
      {/* Stift-Symbol innen */}
      <path d="M8 12 L9 9 L14 9 L14 12 Z" />
      <line x1="10" y1="9" x2="10" y2="7" />
      <line x1="13" y1="9" x2="13" y2="7" />
    </svg>
  );
}

// ─── Kalkulator: Taschenrechner mit Zahnrad ───────────────────────────────────
export function IconKalkulator({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Taschenrechner */}
      <rect x="3" y="2" width="13" height="20" rx="1.5" />
      {/* Display */}
      <rect x="5" y="4" width="9" height="4" rx="0.5" />
      {/* Tasten */}
      <rect x="5" y="10" width="2.5" height="2" rx="0.3" />
      <rect x="8.75" y="10" width="2.5" height="2" rx="0.3" />
      <rect x="5" y="13.5" width="2.5" height="2" rx="0.3" />
      <rect x="8.75" y="13.5" width="2.5" height="2" rx="0.3" />
      {/* Plus-Taste */}
      <rect x="12.5" y="10" width="2.5" height="5.5" rx="0.3" />
      <line x1="13.75" y1="11" x2="13.75" y2="14.5" />
      <line x1="12.5" y1="12.75" x2="15" y2="12.75" />
      {/* Zahnrad */}
      <circle cx="19" cy="19" r="3" />
      <circle cx="19" cy="19" r="1.2" />
      <line x1="19" y1="15.5" x2="19" y2="16.5" />
      <line x1="19" y1="21.5" x2="19" y2="22.5" />
      <line x1="15.5" y1="19" x2="16.5" y2="19" />
      <line x1="21.5" y1="19" x2="22.5" y2="19" />
    </svg>
  );
}

// ─── CNC allgemein: Fräsmaschine Frontansicht ─────────────────────────────────
export function IconCNC({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Maschinenrahmen */}
      <rect x="2" y="2" width="20" height="20" rx="1" />
      {/* Spindel-Träger (horizontal) */}
      <rect x="4" y="5" width="16" height="3" rx="0.5" />
      {/* Spindel (vertikal) */}
      <rect x="10" y="8" width="4" height="7" rx="0.5" />
      {/* Fräser */}
      <path d="M10 15 L11 18 L12 18 L13 18 L14 15" />
      {/* Werkstück-Tisch */}
      <rect x="4" y="19" width="16" height="2" rx="0.5" />
      {/* Führungsschienen */}
      <line x1="4" y1="5" x2="4" y2="19" />
      <line x1="20" y1="5" x2="20" y2="19" />
    </svg>
  );
}

// ─── Materialien: Molekül-Struktur ────────────────────────────────────────────
export function IconMaterialien({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Zentral-Atom */}
      <circle cx="12" cy="12" r="2.5" />
      {/* Bindungen */}
      <line x1="12" y1="9.5" x2="12" y2="5" />
      <line x1="14.2" y1="13.2" x2="17.5" y2="16.5" />
      <line x1="9.8" y1="13.2" x2="6.5" y2="16.5" />
      <line x1="9.8" y1="10.8" x2="6.5" y2="7.5" />
      <line x1="14.2" y1="10.8" x2="17.5" y2="7.5" />
      {/* Außen-Atome */}
      <circle cx="12" cy="3.5" r="1.5" />
      <circle cx="19" cy="18" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
    </svg>
  );
}

// ─── Qualität: Messkluppe / Messschieber ──────────────────────────────────────
export function IconQualitaet({ size = 24, strokeWidth = 1.5, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Messschieber-Körper */}
      <rect x="2" y="10" width="20" height="4" rx="0.5" />
      {/* Skala */}
      <line x1="4" y1="10" x2="4" y2="8" />
      <line x1="6" y1="10" x2="6" y2="9" />
      <line x1="8" y1="10" x2="8" y2="8" />
      <line x1="10" y1="10" x2="10" y2="9" />
      <line x1="12" y1="10" x2="12" y2="8" />
      <line x1="14" y1="10" x2="14" y2="9" />
      <line x1="16" y1="10" x2="16" y2="8" />
      <line x1="18" y1="10" x2="18" y2="9" />
      <line x1="20" y1="10" x2="20" y2="8" />
      {/* Messschenkel */}
      <line x1="2" y1="14" x2="2" y2="20" />
      <line x1="8" y1="14" x2="8" y2="20" />
      {/* Tiefenmesser */}
      <line x1="12" y1="14" x2="12" y2="22" />
      {/* Schieber */}
      <rect x="6" y="9" width="5" height="6" rx="0.3" />
    </svg>
  );
}

// ─── Convenience: Alle Icons als Map ──────────────────────────────────────────
export const FabricaIconMap = {
  '3d-druck': Icon3DPrint,
  'fdm': IconFDM,
  'endlosfaser': IconEndlosfaser,
  'sla': IconSLA,
  'dlp': IconSLA,
  'sls': IconSLS,
  'mjf': IconSLS,
  'sanddruck': IconSanddruck,
  'polyjet': IconPolyjet,
  'cad': IconCAD,
  'reverse-engineering': IconReverseEngineering,
  '3d-scan': Icon3DScan,
  'cnc': IconCNC,
  'fraesen': IconCNCFraesen,
  'drehen': IconCNCDrehen,
  'wasserschneiden': IconWasserschneiden,
  'laserschneiden': IconLaserschneiden,
  'museum': IconMuseum,
  'projekte': IconProjekte,
  'basiswissen': IconBasiswissen,
  'upload': IconUpload,
  'kontakt': IconKontakt,
  'kalkulator': IconKalkulator,
  'materialien': IconMaterialien,
  'qualitaet': IconQualitaet,
} as const;

export type FabricaIconKey = keyof typeof FabricaIconMap;
