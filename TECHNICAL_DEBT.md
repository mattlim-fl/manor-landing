# Technical Debt & Hardcoded Values

## Overview
This document tracks known technical debt and hardcoded design values that should be refactored in the future.

## Hardcoded Design Values

### Homepage Layout (`src/pages/Index.tsx`)
The homepage contains many hardcoded positioning and sizing values that were fine-tuned to match the designer's vision. These should be extracted to constants or a configuration object for easier maintenance.

**Areas with hardcoded values:**
- Image positioning (top, left, right percentages and pixel values)
- Image sizes (width percentages)
- Z-index layering (5, 15, 20, 25)
- Spacing calculations (calc() expressions with percentages and pixels)
- Responsive breakpoints using clamp() with hardcoded min/max values

**Examples:**
- Mobile disco balls: `top: '80px'`, `left: '10%'`, `w-[58%]`
- Desktop images: `clamp(280px, 38vw, 420px)` for widths
- Badge positioning: `top: 'calc(68% + 200px)'`
- Center content: `top: '35%'` (mobile), `top: 'clamp(200px, 32vh, 300px)'` (desktop)

### Color Values
Several color values are hardcoded throughout components instead of using CSS variables:

**Hardcoded colors:**
- `#E59D50` (gold) - appears in multiple components
- `#FF3B1F` (vibrant coral/red) - used in navigation and buttons
- `#271308` (brown) - background color

**Recommendation:** These should use the CSS custom properties defined in `src/index.css` (`--manor-gold`, `--manor-coral`, `--manor-brown`)

### Component-Specific Issues

#### `src/pages/Index.tsx`
- **RotatingBadge component**: SVG dimensions (120x120) and text path are hardcoded
- **Sparkle component**: Size defaults and animation delays are hardcoded
- **NavigationButtons**: Width constraints (`minWidth: '200px', maxWidth: '280px'`) are hardcoded

#### `src/components/MobileNav.tsx`
- Color values hardcoded: `#E59D50`, `#FF3B1F`
- Animation delays calculated inline: `${index * 100}ms`
- Z-index values: `z-[100]`, `z-[90]`

#### `src/components/Header.tsx`
- Logo sizes hardcoded: `h-8`, `h-12 lg:h-14`
- Spacing values: `mt-2`, `mt-3`, `pt-4`, `pt-6 md:pt-8`
- Social icon sizes: `size={18}`, `size={16}`

## CSS Issues

### `src/index.css`
- Leopard background filter values: `brightness(0.55) saturate(1.3)` - these were fine-tuned and could be variables
- Overlay opacity: `rgba(39, 19, 8, 0.35)` - hardcoded
- Animation durations: `12s` for spin-slow, `2s` for sparkle

## Recommendations

1. **Extract positioning constants**: Create a constants file for image positions, sizes, and z-index values
2. **Use CSS variables**: Replace all hardcoded color values with CSS custom properties
3. **Create a theme configuration**: Centralize spacing, sizing, and animation values
4. **Document magic numbers**: Add comments explaining why specific values were chosen
5. **Consider a layout configuration**: For the chaotic homepage layout, consider a JSON config that defines image positions and sizes

## Priority
**Low** - These hardcoded values are intentional to match the designer's precise vision. Refactoring can be done when:
- Design system is more established
- Multiple pages need similar layouts
- Maintenance becomes difficult

## Related Files
- `src/pages/Index.tsx` - Main homepage with most hardcoded values
- `src/components/Header.tsx` - Header positioning and sizing
- `src/components/MobileNav.tsx` - Navigation overlay styling
- `src/components/Footer.tsx` - Footer spacing
- `src/index.css` - Global styles and animations


