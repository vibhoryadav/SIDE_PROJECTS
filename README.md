# VIBE DISTRICT — Cinematic Premium Audio

> A production-quality, Apple-inspired e-commerce web platform for premium headphones, wireless earbuds, and precision acoustic instruments.

---

## 🌟 Brand & Visual Identity

- **Brand Philosophy:** Minimalism, cinematic storytelling, precision, and premium simplicity.
- **Palette:** Predominantly pure white (`#FFFFFF`) and architectural off-white (`#F5F5F5`), contrasted with matte black (`#101010`), charcoal (`#686868`), metallic silver accents (`#BFC3C7`), and delicate hairline dividers (`#E7E7E7`).
- **Typography:** Contemporary editorial sans-serif (Plus Jakarta Sans & Space Grotesk) with controlled tracking and disciplined letter-spacing.
- **Motion:** Subtle scroll-linked parallax, gentle desktop 3.5° cursor tilt with smooth resting returns, progressive storytelling, and full `prefers-reduced-motion` compliance.

---

## 🎧 Audio Portfolio

| Product | Form Factor | Driver Architecture | ANC / Isolation | Battery | Price (INR) |
|---|---|---|---|---|---|
| **Vibe District Overdrive** | Over-Ear Flagship | 40mm Custom Beryllium Diaphragm | Hybrid ANC (-42dB) | 40 Hours | ₹7,999 |
| **Vibe District Pulse** | True Wireless In-Ear | 11mm Graphene Dual Dynamic | Smart ANC (-35dB) | 32 Hours | ₹3,999 |
| **Vibe District Studio** | Reference Monitor | 50mm Titanium-Coated Drivers | Acoustic Chamber (-28dB) | 50 Hours | ₹5,999 |
| **Vibe District Air** | Semi-In-Ear Featherlight | 13mm Bio-Cellulose Composite | Dual ENC Mic Shield | 28 Hours | ₹2,499 |

---

## 🚀 Key Features

1. **Cinematic Hero:**
   - Ultra-crisp studio matte black flagship headphones on pure white canvas.
   - Restrained scroll depth and desktop cursor-tracking tilt.
   - Editorial headline *"HEAR WHAT YOU'VE BEEN MISSING."*
   - Immediate responsive CTAs.

2. **Interactive "Our Sound" Spectrum Lab:**
   - Opt-in Web Audio API tone generator testing 40Hz sub-bass, 1,000Hz vocal presence, 8,000Hz air detail, and harmonic multi-frequency chord coherence.
   - Real-time animated frequency visualizer.

3. **Signature Cinematic Scroll Storytelling:**
   - 3-feature progressive showcase (*"Silence the noise."*, *"Feel every detail."*, *"Comfort without compromise."*) with smooth transitions and interactive progress tracking.

4. **Product Detail Pages (PDP):**
   - High-resolution interactive gallery with thumbnail switching.
   - Color swatch selector synchronized with cart state.
   - Technical specifications matrix, engineered features, unboxing inventory, and warranty terms.

5. **Functional E-Commerce Architecture:**
   - Slide-out Cart Drawer with live item counting, quantity manipulation, and persistent `localStorage`.
   - Free shipping calculation threshold (Complimentary on orders above ₹2,000).
   - Coupon discount code engine (`VIBE10` for 10% off, `FIRSTVIBE` for ₹500 off).
   - Multi-step checkout simulation with Indian address and PIN code validation.
   - Demo payment gateways (UPI, Cards, NetBanking, Cash on Delivery).
   - Confetti celebratory fireworks and comprehensive printable order confirmation receipt.

6. **Instant Search & Filters:**
   - Global modal search with keyword auto-matching and category filtering.

---

## 💻 Technical Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Custom Keyframe Engine
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Audio Engine:** HTML5 Web Audio API (Opt-in, strictly non-autoplay)
- **Local Persistence:** Browser `localStorage`

---

## 🛠️ Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Compile production bundle
npm run build

# Preview production build
npm run preview
```
