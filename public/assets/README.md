# Assets Folder

Drop your brand photos here. They'll be served from the `/assets/` path.

## Usage in code

```tsx
// In any component:
<img src="/assets/your-photo.jpg" alt="Description" />

// With Next.js Image component (recommended):
import Image from "next/image";
<Image src="/assets/your-photo.jpg" alt="Description" width={600} height={400} />
```

## Recommended files to add
- `hero-product.jpg` — Main product photo for the Hero section
- `about-bg.jpg` — Background or product story image for the About section
- `og-image.jpg` — Open Graph image for social sharing (1200×630px)
