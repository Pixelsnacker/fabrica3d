import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages – lazy loaded for performance
const Home = lazy(() => import("@/pages/Home"));

// 3D-Druck
const FDM = lazy(() => import("@/pages/printing/FDM"));
const Endlosfaser = lazy(() => import("@/pages/printing/Endlosfaser"));
const SLA = lazy(() => import("@/pages/printing/SLA"));
const DLP = lazy(() => import("@/pages/printing/DLP"));
const SLS = lazy(() => import("@/pages/printing/SLS"));
const MJF = lazy(() => import("@/pages/printing/MJF"));
const Sanddruck = lazy(() => import("@/pages/printing/Sanddruck"));
const Polyjet = lazy(() => import("@/pages/printing/Polyjet"));
const Materialien = lazy(() => import("@/pages/printing/Materialien"));

// CAD
const Konstruktion = lazy(() => import("@/pages/cad/Konstruktion"));
const ReverseEngineering = lazy(() => import("@/pages/cad/ReverseEngineering"));

// 3D-Scan
const GomAtos = lazy(() => import("@/pages/scan/GomAtos"));
const ScanAnwendungen = lazy(() => import("@/pages/scan/Anwendungen"));

// CNC
const Fraesen = lazy(() => import("@/pages/cnc/Fraesen"));
const Drehen = lazy(() => import("@/pages/cnc/Drehen"));
const Wasserschneiden = lazy(() => import("@/pages/cnc/Wasserschneiden"));
const Laserschneiden = lazy(() => import("@/pages/cnc/Laserschneiden"));

// Kalkulator
const Kalkulator = lazy(() => import("@/pages/Kalkulator"));
// Admin
const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview"));
const PreisAdmin = lazy(() => import("@/pages/admin/PreisAdmin"));
const ImageAdmin = lazy(() => import("@/pages/admin/ImageAdmin"));

// Other pages
const Museumsmodelle = lazy(() => import("@/pages/Museumsmodelle"));
const Projekte = lazy(() => import("@/pages/Projekte"));
const Basiswissen = lazy(() => import("@/pages/Basiswissen"));
const Upload = lazy(() => import("@/pages/Upload"));
const Kontakt = lazy(() => import("@/pages/Kontakt"));
const Impressum = lazy(() => import("@/pages/Impressum"));
const Datenschutz = lazy(() => import("@/pages/Datenschutz"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--fabrica-red)', borderTopColor: 'transparent' }} />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />

        {/* 3D-Druck */}
        <Route path="/3d-druck/fdm" component={FDM} />
        <Route path="/3d-druck/endlosfaser" component={Endlosfaser} />
        <Route path="/3d-druck/sla" component={SLA} />
        <Route path="/3d-druck/dlp" component={DLP} />
        <Route path="/3d-druck/sls" component={SLS} />
        <Route path="/3d-druck/mjf" component={MJF} />
        <Route path="/3d-druck/sanddruck" component={Sanddruck} />
        <Route path="/3d-druck/polyjet" component={Polyjet} />
        <Route path="/3d-druck/materialien" component={Materialien} />

        {/* CAD */}
        <Route path="/cad/konstruktion" component={Konstruktion} />
        <Route path="/cad/reverse-engineering" component={ReverseEngineering} />

        {/* 3D-Scan */}
        <Route path="/3d-scan/gom-atos" component={GomAtos} />
        <Route path="/3d-scan/anwendungen" component={ScanAnwendungen} />

        {/* CNC */}
        <Route path="/cnc/fraesen" component={Fraesen} />
        <Route path="/cnc/drehen" component={Drehen} />
        <Route path="/cnc/wasserschneiden" component={Wasserschneiden} />
        <Route path="/cnc/laserschneiden" component={Laserschneiden} />

        {/* Kalkulator */}
        <Route path="/kalkulator" component={Kalkulator} />
        {/* Admin */}
        <Route path="/admin" component={AdminOverview} />
        <Route path="/admin/preise" component={PreisAdmin} />
        <Route path="/admin/bilder" component={ImageAdmin} />

        {/* Other */}
        <Route path="/museumsmodelle" component={Museumsmodelle} />
        <Route path="/projekte" component={Projekte} />
        <Route path="/basiswissen" component={Basiswissen} />
        <Route path="/upload" component={Upload} />
        <Route path="/kontakt" component={Kontakt} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
