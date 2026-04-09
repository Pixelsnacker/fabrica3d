import { trpc } from "@/lib/trpc";

/**
 * Returns the current CDN URL for a given image slot key.
 * Falls back to the provided `fallbackUrl` while loading or on error.
 *
 * Usage:
 *   const heroUrl = useSiteImage("cnc_fraesen", "/fallback.jpg");
 */
export function useSiteImage(imageKey: string, fallbackUrl: string): string {
  const { data } = trpc.images.getByKey.useQuery(
    { imageKey },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    }
  );
  return data?.url ?? fallbackUrl;
}
