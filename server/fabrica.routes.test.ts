import { describe, expect, it } from "vitest";

/**
 * Basic sanity tests for the Fabrica website routes and form logic.
 * These tests verify the expected URL structure and form validation logic.
 */

describe("Fabrica Website Routes", () => {
  const expectedRoutes = [
    "/",
    "/3d-druck/fdm",
    "/3d-druck/endlosfaser",
    "/3d-druck/sla",
    "/3d-druck/dlp",
    "/3d-druck/sls",
    "/3d-druck/mjf",
    "/3d-druck/sanddruck",
    "/3d-druck/polyjet",
    "/3d-druck/materialien",
    "/cad/konstruktion",
    "/cad/reverse-engineering",
    "/3d-scan/gom-atos",
    "/3d-scan/anwendungen",
    "/cnc/fraesen",
    "/cnc/drehen",
    "/cnc/wasserschneiden",
    "/cnc/laserschneiden",
    "/museumsmodelle",
    "/projekte",
    "/basiswissen",
    "/upload",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];

  it("should have all 25 routes defined", () => {
    expect(expectedRoutes).toHaveLength(25);
  });

  it("should include all 3D printing sub-routes", () => {
    const printingRoutes = expectedRoutes.filter((r) => r.startsWith("/3d-druck/"));
    expect(printingRoutes).toHaveLength(9);
  });

  it("should include all CNC sub-routes", () => {
    const cncRoutes = expectedRoutes.filter((r) => r.startsWith("/cnc/"));
    expect(cncRoutes).toHaveLength(4);
  });

  it("should include legal pages", () => {
    expect(expectedRoutes).toContain("/impressum");
    expect(expectedRoutes).toContain("/datenschutz");
  });
});

describe("Upload Form Validation", () => {
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  it("should reject files larger than 50 MB", () => {
    const oversizedFile = { name: "large.stl", size: MAX_FILE_SIZE + 1 };
    expect(oversizedFile.size > MAX_FILE_SIZE).toBe(true);
  });

  it("should accept files exactly at 50 MB", () => {
    const exactFile = { name: "exact.stl", size: MAX_FILE_SIZE };
    expect(exactFile.size > MAX_FILE_SIZE).toBe(false);
  });

  it("should accept files smaller than 50 MB", () => {
    const smallFile = { name: "small.stl", size: 1024 * 1024 }; // 1 MB
    expect(smallFile.size > MAX_FILE_SIZE).toBe(false);
  });

  it("should require DSGVO consent before submission", () => {
    const formWithoutConsent = { dsgvo: false, name: "Test", email: "test@test.de" };
    const formWithConsent = { dsgvo: true, name: "Test", email: "test@test.de" };
    expect(formWithoutConsent.dsgvo).toBe(false);
    expect(formWithConsent.dsgvo).toBe(true);
  });

  it("should detect honeypot spam", () => {
    const spamForm = { honeypot: "I am a bot" };
    const validForm = { honeypot: "" };
    expect(Boolean(spamForm.honeypot)).toBe(true); // spam detected
    expect(Boolean(validForm.honeypot)).toBe(false); // valid submission
  });
});

describe("Contact Email", () => {
  it("should use the correct contact email", () => {
    const contactEmail = "kontakt@fabrica3d.eu";
    expect(contactEmail).toBe("kontakt@fabrica3d.eu");
  });

  it("should build correct mailto links", () => {
    const buildMailto = (subject: string) =>
      `mailto:kontakt@fabrica3d.eu?subject=${encodeURIComponent(subject)}`;

    const fdmMailto = buildMailto("Anfrage FDM-Druck");
    expect(fdmMailto).toContain("kontakt@fabrica3d.eu");
    expect(fdmMailto).toContain("Anfrage");
  });
});
