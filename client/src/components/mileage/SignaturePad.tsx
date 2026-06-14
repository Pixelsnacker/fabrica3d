import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SignaturePadHandle {
  clear: () => void;
  isEmpty: () => boolean;
}

interface SignaturePadProps {
  className?: string;
  onChange?: (empty: boolean) => void;
}

/**
 * Einfaches Unterschriftsfeld auf <canvas>-Basis (Maus + Touch).
 * Ohne externe Abhängigkeiten.
 */
export const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(
  function SignaturePad({ className, onChange }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef(false);
    const empty = useRef(true);
    const last = useRef<{ x: number; y: number } | null>(null);

    // Canvas an Anzeigegröße anpassen (scharfe Linien auf HiDPI)
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(ratio, ratio);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#111827";
      }
    }, []);

    function pos(e: PointerEvent | React.PointerEvent) {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e as PointerEvent).clientX - rect.left,
        y: (e as PointerEvent).clientY - rect.top,
      };
    }

    function start(e: React.PointerEvent<HTMLCanvasElement>) {
      e.preventDefault();
      drawing.current = true;
      last.current = pos(e);
      canvasRef.current?.setPointerCapture(e.pointerId);
    }

    function move(e: React.PointerEvent<HTMLCanvasElement>) {
      if (!drawing.current) return;
      e.preventDefault();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !last.current) return;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last.current = p;
      if (empty.current) {
        empty.current = false;
        onChange?.(false);
      }
    }

    function end() {
      drawing.current = false;
      last.current = null;
    }

    useImperativeHandle(ref, () => ({
      clear() {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          empty.current = true;
          onChange?.(true);
        }
      },
      isEmpty() {
        return empty.current;
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className={cn(
          "h-32 w-full touch-none rounded-md border border-input bg-white",
          className
        )}
      />
    );
  }
);
