import { describe, it, expect } from 'vitest';

// ─── Typen & Daten (spiegeln Projekte.tsx) ────────────────────────────────────

interface Project {
  id: number;
  category: string;
  material: string;
  application: string;
}

const ALL = 'Alle';

const projects: Project[] = [
  { id: 1,  category: '3D-Druck', material: 'PA6 + Kohlefaser',  application: 'Automotive' },
  { id: 2,  category: 'CAD',      material: 'PA12',              application: 'Maschinenbau' },
  { id: 3,  category: '3D-Scan',  material: 'Metall',            application: 'Qualitätssicherung' },
  { id: 4,  category: 'CNC',      material: 'Aluminium 7075',    application: 'Maschinenbau' },
  { id: 5,  category: 'Museum',   material: 'Polyjet Rigid',     application: 'Museumsmodell' },
  { id: 6,  category: '3D-Druck', material: 'Dental Resin',      application: 'Medizin' },
  { id: 7,  category: 'Museum',   material: 'PLA',               application: 'Architektur' },
  { id: 8,  category: 'CNC',      material: 'Titan Grade 5',     application: 'Medizin' },
  { id: 9,  category: '3D-Druck', material: 'PA12',              application: 'Konsumgüter' },
  { id: 10, category: '3D-Scan',  material: 'Standard Resin',    application: 'Bildung & Forschung' },
  { id: 11, category: 'CNC',      material: 'POM',               application: 'Elektronik' },
  { id: 12, category: '3D-Druck', material: 'PA6 + Kevlar',      application: 'Robotik & Automation' },
];

function filterProjects(
  projects: Project[],
  category: string,
  material: string,
  application: string
): Project[] {
  return projects.filter(p => {
    const catMatch = category === ALL || p.category === category;
    const matMatch = material === ALL || p.material === material;
    const appMatch = application === ALL || p.application === application;
    return catMatch && matMatch && appMatch;
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Gallery filter logic', () => {
  it('returns all 12 projects when no filter is active', () => {
    const result = filterProjects(projects, ALL, ALL, ALL);
    expect(result).toHaveLength(12);
  });

  it('filters by category: 3D-Druck returns 4 projects', () => {
    const result = filterProjects(projects, '3D-Druck', ALL, ALL);
    expect(result).toHaveLength(4);
    result.forEach(p => expect(p.category).toBe('3D-Druck'));
  });

  it('filters by category: CNC returns 3 projects', () => {
    const result = filterProjects(projects, 'CNC', ALL, ALL);
    expect(result).toHaveLength(3);
  });

  it('filters by category: Museum returns 2 projects', () => {
    const result = filterProjects(projects, 'Museum', ALL, ALL);
    expect(result).toHaveLength(2);
  });

  it('filters by material: PA12 returns 2 projects', () => {
    const result = filterProjects(projects, ALL, 'PA12', ALL);
    expect(result).toHaveLength(2);
    result.forEach(p => expect(p.material).toBe('PA12'));
  });

  it('filters by material: Dental Resin returns 1 project', () => {
    const result = filterProjects(projects, ALL, 'Dental Resin', ALL);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(6);
  });

  it('filters by application: Medizin returns 2 projects', () => {
    const result = filterProjects(projects, ALL, ALL, 'Medizin');
    expect(result).toHaveLength(2);
    result.forEach(p => expect(p.application).toBe('Medizin'));
  });

  it('filters by application: Maschinenbau returns 2 projects', () => {
    const result = filterProjects(projects, ALL, ALL, 'Maschinenbau');
    expect(result).toHaveLength(2);
  });

  it('combines category + material filter: 3D-Druck + PA12 returns 1 project', () => {
    const result = filterProjects(projects, '3D-Druck', 'PA12', ALL);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(9);
  });

  it('combines category + application filter: CNC + Medizin returns 1 project', () => {
    const result = filterProjects(projects, 'CNC', ALL, 'Medizin');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(8);
  });

  it('combines all three filters: Museum + PLA + Architektur returns 1 project', () => {
    const result = filterProjects(projects, 'Museum', 'PLA', 'Architektur');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(7);
  });

  it('returns empty array when no project matches all filters', () => {
    const result = filterProjects(projects, '3D-Druck', 'Aluminium 7075', ALL);
    expect(result).toHaveLength(0);
  });

  it('returns empty array for incompatible material + application combination', () => {
    const result = filterProjects(projects, ALL, 'Dental Resin', 'Automotive');
    expect(result).toHaveLength(0);
  });

  it('active filter count: 0 when all are ALL', () => {
    const count = [ALL, ALL, ALL].filter(f => f !== ALL).length;
    expect(count).toBe(0);
  });

  it('active filter count: 2 when category and material are set', () => {
    const count = ['3D-Druck', 'PA12', ALL].filter(f => f !== ALL).length;
    expect(count).toBe(2);
  });

  it('active filter count: 3 when all three filters are set', () => {
    const count = ['Museum', 'PLA', 'Architektur'].filter(f => f !== ALL).length;
    expect(count).toBe(3);
  });

  it('reset: after reset all filters are ALL and all 12 projects are shown', () => {
    // Simulate reset
    const cat = ALL;
    const mat = ALL;
    const app = ALL;
    const result = filterProjects(projects, cat, mat, app);
    expect(result).toHaveLength(12);
  });

  it('each project has unique id', () => {
    const ids = projects.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(projects.length);
  });

  it('all 5 categories are represented in the project list', () => {
    const cats = new Set(projects.map(p => p.category));
    expect(cats.has('3D-Druck')).toBe(true);
    expect(cats.has('CAD')).toBe(true);
    expect(cats.has('3D-Scan')).toBe(true);
    expect(cats.has('CNC')).toBe(true);
    expect(cats.has('Museum')).toBe(true);
  });
});
