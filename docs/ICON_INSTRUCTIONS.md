# How to Create Your App Icons

All app icons live in `assets/icons/`.

## Quick Option: Use Online Tool

1. **Open the SVG file** `assets/icons/icon.svg` in your browser
2. **Go to**: https://realfavicongenerator.net/
3. **Upload** `assets/icons/icon.svg`
4. **Generate** the icons
5. **Download** the package
6. **Replace** `assets/icons/icon-192.png` and `assets/icons/icon-512.png` with the generated files

## Or Create Your Own Logo:

### Option 1: Use Canva (Easy)
1. Go to https://canva.com
2. Create a 512x512px design
3. Add "EU" text or your own logo
4. Export as PNG
5. Save as `assets/icons/icon-512.png`
6. Resize to 192x192px → save as `assets/icons/icon-192.png`

### Option 2: Use Any Image Editor
1. Create a 512x512px image
2. Use purple gradient background (#667eea to #764ba2)
3. Add white "EU" text or your logo
4. Export as PNG
5. Create both sizes (512x512 and 192x192)

### Option 3: Use the SVG I Created
1. Open `assets/icons/icon.svg` in your browser
2. Right-click → "Save as PNG" (if available)
3. Or take a screenshot and crop to 512x512
4. Use an online resizer for the 192x192 version

## Files Needed:
- `assets/icons/icon-192.png` - 192x192px (for mobile home screen)
- `assets/icons/icon-512.png` - 512x512px (for high-res displays)

## After Creating Icons:
```bash
git add assets/icons/ manifest.json
git commit -m "Update app icons"
git push origin main
```

Wait 1-2 minutes, then add the app to your home screen again!
