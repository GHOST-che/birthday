---
name: Royal Radiance
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e3bdc7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#aa8892'
  outline-variant: '#5b3f48'
  surface-tint: '#ffb0ca'
  primary: '#ffb0ca'
  on-primary: '#640036'
  primary-container: '#ff479c'
  on-primary-container: '#58002f'
  inverse-primary: '#b90068'
  secondary: '#fff9ef'
  on-secondary: '#3a3000'
  secondary-container: '#ffdb3c'
  on-secondary-container: '#725f00'
  tertiary: '#ffb0d0'
  on-tertiary: '#63003d'
  tertiary-container: '#ed5ba5'
  on-tertiary-container: '#570035'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e3'
  primary-fixed-dim: '#ffb0ca'
  on-primary-fixed: '#3e001f'
  on-primary-fixed-variant: '#8d004e'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#ffd8e6'
  tertiary-fixed-dim: '#ffb0d0'
  on-tertiary-fixed: '#3d0024'
  on-tertiary-fixed-variant: '#8c0058'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-royal:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-royal-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style
The design system is crafted for a luxurious, romantic celebration centered around the theme of "Ma Reine" (My Queen). It evokes an atmosphere of exclusive nighttime gala events—intimate, magical, and deeply personal. The target audience values high-end aesthetics, emotional storytelling, and regal sophistication.

The visual style is a fusion of **Glassmorphism** and **High-Contrast Bold**. It utilizes a "Midnight Canvas" (Deep Black) to allow vibrant pink glows and shimmering gold accents to pop with cinematic intensity. The emotional response is one of awe and celebration, using light as a metaphor for affection. Expect soft background blurs, ethereal gradients, and sharp, elegant typography that commands respect and admiration.

## Colors
This design system operates exclusively in a dark mode to maintain the "Midnight" aesthetic. 

- **Deep Black (#000000):** The primary background color, providing a bottomless depth that allows accents to glow.
- **Deep Pink (#FF1493):** The "Heartbeat" color. Used for primary actions and core interactive elements.
- **Gold (#FFD700):** The "Regal" accent. Used for borders, iconography, and high-level decorative elements to signify luxury.
- **Vibrant Pink (#FF69B4):** Used for soft glows, gradients, and secondary visual interests to create a sense of dimensionality.

Use "Glow Tiers": Primary elements should emit a soft #FF1493 outer glow (10-20px blur) to simulate neon-lit luxury.

## Typography
The typography strategy contrasts the traditional elegance of the monarchy with modern digital clarity.

- **Playfair Display** (Headings): Chosen for its high-contrast strokes and romantic flair. It should be used for large statements and names. For the most important titles, apply a subtle linear gradient from Gold to Deep Pink.
- **Plus Jakarta Sans** (UI/Body): A soft, approachable sans-serif that balances the sharpness of the serif headings. It ensures readability in functional areas like gift registries, itineraries, or messages.

Maintain generous line heights to preserve a sense of "breathing room" and luxury.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a mobile-first priority. 

- **Mobile:** 4-column grid with 20px side margins. Content is mostly stacked to allow large imagery and bold typography to dominate.
- **Desktop:** 12-column grid with a max-width of 1200px.
- **Rhythm:** Use an 8px base grid, but increase vertical "white" space (black space in this context) to create a premium, editorial feel. 

Elements should often "break" the grid using absolute positioning for decorative gold sparkles or pink light-leaks to create a magical, unconstrained atmosphere.

## Elevation & Depth
Depth is not created by traditional grey shadows, but through **Luminance and Translucency**.

1.  **Backdrop Blurs:** Use `backdrop-filter: blur(20px)` on cards with a 10% opacity white or pink fill. This creates a "frosted glass" effect over the black background.
2.  **Inner Glows:** Instead of drop shadows, use subtle inner borders (1px) in Gold (#FFD700) at 30% opacity to define the edges of containers.
3.  **Light Sources:** Treat the primary action buttons as light sources. They should have a "bloom" effect—a soft, wide-spread outer shadow using the primary Deep Pink color.
4.  **Z-Axis:** Higher elevation elements (like modals or floating action buttons) should have a slightly lighter background (e.g., #0A0A0A) and a more intense Gold border.

## Shapes
The shape language is **Rounded**, balancing the "sharpness" of the luxury theme with a soft, romantic touch. 

- **Containers & Cards:** Use `rounded-lg` (1rem) to soften the UI.
- **Primary Buttons:** Use a full "Pill" shape (3rem) to invite interaction.
- **Interactive Accents:** Use circular shapes for avatars or iconic moments, often framed with a 1px Gold stroke.
- **Decorative Elements:** Incorporate "shimmer" lines—ultra-thin, 1px horizontal lines that fade out at the edges using a transparent-to-gold-to-transparent gradient.

## Components
- **Primary Button:** Pill-shaped, Deep Pink background, white text (bold). On hover/active, it emits a pulsing Gold glow.
- **Royal Cards:** Black background with 10% opacity, a 1px Gold border, and a "pink light leak" gradient in the top-right corner.
- **Chips/Tags:** Small, outlined in Deep Pink with uppercase `label-caps` typography. Used for event categories (e.g., "DINNER", "DANCING").
- **Input Fields:** Bottom-border only in Gold. When focused, the border glows and a soft pink aura appears behind the field.
- **Sparkle Component:** A decorative micro-interaction where small Gold stars or dots drift slowly upward in the background of cards.
- **Image Frames:** Photos of "The Queen" should have a thin Gold border with a 16px offset decorative frame behind them in Deep Pink.