Design-time assets live here.

Rules:
- Do not place non-runtime images in `static/`.
- Only assets that must ship inside the mini program package belong in `static/`.
- Large originals, marketing images, and review materials should stay under `design-assets/` or an external CDN.

Current move:
- `branding/logo小程序.png` was moved out of `static/` to avoid being bundled into the main package.
