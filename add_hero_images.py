#!/usr/bin/env python3
"""Add heroImage prop to all TechPageLayout usages."""

import re

# Map: file path -> CDN URL (compressed webp)
HERO_MAP = {
    "client/src/pages/printing/FDM.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_fdm_panorama-XjUkNA3AYA9xFmbaiRBi3y.webp",
    "client/src/pages/printing/SLA.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sla_panorama-XGVXRKSsM2Tz8j8vCESQwj.webp",
    "client/src/pages/printing/DLP.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_dlp_panorama-GHpNGLESRvqpyCrq2JPZQB.webp",
    "client/src/pages/printing/SLS.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sls_panorama-2LJpJBGnxfFBu7udib4N4b.webp",
    "client/src/pages/printing/MJF.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_mjf_panorama-9SsUkwhULkNZXS2AmwkEUJ.webp",
    "client/src/pages/printing/Sanddruck.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_sanddruck_panorama-mxobzZdxCqzGFANvCCWUrr.webp",
    "client/src/pages/printing/Polyjet.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_polyjet_panorama-bJC78HVkCv4DXftzyir9Xi.webp",
    "client/src/pages/printing/Endlosfaser.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_endlosfaser_panorama-RYDpxAcwVpo3HiGRMocvPJ.webp",
    "client/src/pages/cad/Konstruktion.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cad_panorama-LL85c2KDLjQk6uJYDQhbBK.webp",
    "client/src/pages/cad/ReverseEngineering.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_reverse_engineering_panorama-ZktQwSqLTcuGMggkpygyBK.webp",
    "client/src/pages/scan/GomAtos.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_3dscan_panorama-enR5FWV3DmycJ8anGV2ZYL.webp",
    "client/src/pages/scan/Anwendungen.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_3dscan_panorama-enR5FWV3DmycJ8anGV2ZYL.webp",
    "client/src/pages/cnc/Fraesen.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cnc_panorama-Pneytx7DHJd5oKkDwYNmTt.webp",
    "client/src/pages/cnc/Drehen.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cnc_panorama-Pneytx7DHJd5oKkDwYNmTt.webp",
    "client/src/pages/cnc/Wasserschneiden.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cnc_panorama-Pneytx7DHJd5oKkDwYNmTt.webp",
    "client/src/pages/cnc/Laserschneiden.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_cnc_panorama-Pneytx7DHJd5oKkDwYNmTt.webp",
    "client/src/pages/Museumsmodelle.tsx": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031764330/hjDE334DRgUQ9x8faFXbRG/hero_museum_panorama-2VZGD7iT3RNDmFFs4auDDZ.webp",
}

BASE = "/home/ubuntu/fabrica3d"

for rel_path, cdn_url in HERO_MAP.items():
    full_path = f"{BASE}/{rel_path}"
    with open(full_path, "r") as f:
        content = f.read()
    
    # Find the TechPageLayout opening tag and add heroImage prop after mailtoSubject
    # Pattern: find "mailtoSubject=" line and add heroImage on next line
    if "heroImage=" in content:
        print(f"SKIP (already has heroImage): {rel_path}")
        continue
    
    # Insert heroImage prop after mailtoSubject prop
    new_content = re.sub(
        r'(mailtoSubject="[^"]*")',
        f'\\1\n      heroImage="{cdn_url}"',
        content,
        count=1
    )
    
    if new_content == content:
        print(f"WARN: no change made to {rel_path}")
    else:
        with open(full_path, "w") as f:
            f.write(new_content)
        print(f"OK: {rel_path}")

print("Done.")
