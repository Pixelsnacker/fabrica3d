import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

// ─── helpers ────────────────────────────────────────────────────────────────

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── component ──────────────────────────────────────────────────────────────

export default function ImageAdmin() {
  // ALL hooks must be called unconditionally at the top
  const utils = trpc.useUtils();
  const { data: me, isLoading: meLoading } = trpc.auth.me.useQuery();
  const { data: images, isLoading, error } = trpc.images.list.useQuery(
    undefined,
    { enabled: !!me }
  );
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadMutation = trpc.images.upload.useMutation({
    onSuccess: () => {
      utils.images.list.invalidate();
      toast.success("Bild gespeichert", { description: "Das neue Bild ist jetzt live auf der Website." });
    },
    onError: (err) => {
      toast.error("Fehler beim Upload", { description: err.message });
    },
  });

  // Redirect to login if not authenticated (after hooks)
  useEffect(() => {
    if (!meLoading && !me) {
      window.location.href = getLoginUrl("/admin/bilder");
    }
  }, [me, meLoading]);

  // ─── handlers ─────────────────────────────────────────────────────────────

  async function handleFileChange(imageKey: string, file: File) {
    setUploadingKey(imageKey);
    try {
      const dataBase64 = await fileToBase64(file);
      await uploadMutation.mutateAsync({
        imageKey,
        filename: file.name,
        dataBase64,
        mimeType: file.type || "image/jpeg",
      });
    } finally {
      setUploadingKey(null);
    }
  }

  // ─── early returns (after all hooks) ──────────────────────────────────────

  if (meLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-3 text-gray-500">Weiterleitung zum Login…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">Zugriff verweigert oder Fehler aufgetreten.</p>
          <p className="text-gray-500 text-sm mt-1">{error.message}</p>
          <Link href="/">
            <Button variant="outline" className="mt-4">Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ─── group images by category prefix ──────────────────────────────────────

  const grouped: Record<string, typeof images> = {};
  if (images) {
    for (const img of images) {
      const prefix = img.imageKey.split("_")[0];
      if (!grouped[prefix]) grouped[prefix] = [];
      grouped[prefix]!.push(img);
    }
  }

  const categoryLabels: Record<string, string> = {
    home: "Startseite",
    cnc: "CNC-Bearbeitung",
    print: "3D-Druck",
    cad: "CAD-Daten",
    scan: "3D-Scan",
    museumsmodelle: "Museumsmodelle",
  };

  // ─── render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bildverwaltung</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Klicken Sie auf "Bild austauschen" um ein eigenes Foto hochzuladen. Das Bild wird sofort live geschaltet.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/preise">
              <Button variant="outline" size="sm">Preise verwalten</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">Zur Website</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-3 text-gray-500">Bilder werden geladen…</span>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([prefix, slots]) => (
              <section key={prefix}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                  {categoryLabels[prefix] ?? prefix}
                  <Badge variant="secondary" className="text-xs">{slots?.length} Bilder</Badge>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slots?.map((img) => (
                    <div
                      key={img.imageKey}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Preview */}
                      <div className="relative h-44 bg-gray-100">
                        <img
                          src={img.url}
                          alt={img.labelDe}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {uploadingKey === img.imageKey && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                            <span className="ml-2 text-white text-sm font-medium">Wird hochgeladen…</span>
                          </div>
                        )}
                      </div>

                      {/* Info + action */}
                      <div className="p-4">
                        <p className="text-sm font-medium text-gray-900 truncate">{img.labelDe}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {img.filename ?? "—"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Aktualisiert: {new Date(img.updatedAt).toLocaleDateString("de-DE")}
                        </p>

                        {/* Hidden file input */}
                        <input
                          ref={(el) => { inputRefs.current[img.imageKey] = el; }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileChange(img.imageKey, file);
                            e.target.value = "";
                          }}
                        />

                        <Button
                          className="w-full mt-3 gap-2"
                          size="sm"
                          disabled={uploadingKey === img.imageKey}
                          onClick={() => inputRefs.current[img.imageKey]?.click()}
                        >
                          {uploadingKey === img.imageKey ? (
                            <><Loader2 className="h-4 w-4 animate-spin" /> Wird hochgeladen…</>
                          ) : (
                            <><Upload className="h-4 w-4" /> Bild austauschen</>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Hint */}
        <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <strong>Hinweis:</strong> Empfohlene Bildgröße: mindestens 1920 × 600 px, Querformat (Panorama).
          Unterstützte Formate: JPG, PNG, WebP. Nach dem Upload ist das Bild sofort auf der Website sichtbar –
          ein Seitenneuladen kann nötig sein.
        </div>
      </div>
    </div>
  );
}
