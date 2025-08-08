# Claude Development Guide - IFRC Animation Project

## Project Context

This is a minimalist animated presentation about voluntary service for IFRC. The design has shifted from dark/dramatic to clean/professional with off-white backgrounds and dark text.

## User Preferences & Working Style

### Communication Style
- **Be concise and direct** - User prefers minimal explanations unless asked
- **Show, don't tell** - Make changes quickly, user will provide feedback
- **No emojis** unless explicitly requested
- **Avoid overthinking** - User will correct if something is wrong

### Design Preferences
- **Bold and large** - Text should be prominent (text-6xl to text-8xl typical)
- **Breathing room** - Good spacing around elements, not cramped
- **Clean animations** - Smooth bezier curves, overlapping timings
- **Consistent patterns** - Reuse components like BackgroundTexture across frames

## Common Issues & Solutions

### The "g" Cropping Problem
**Issue**: Text gets cropped at bottom, especially letters with descenders
**Solution**: Always add `pb-2` or similar padding to text containers with `overflow-hidden`

### Dark Background Navigation
**Issue**: Navigation invisible on dark slides
**Solution**: Detect dark slides and switch to white colors dynamically

### Audio Playback
**Issue**: Browser blocks autoplay
**Solution**: Require user interaction, show "Click to play" hint

## Critical Lessons Learned

### 1. Animation Fundamentals

#### Rising Text Effect (Most Used Pattern)
```jsx
// CORRECT: Text rises from below a mask
<div className="relative overflow-hidden h-32">
  <motion.h1 
    className="absolute bottom-0 right-0 text-right"
    initial={{ y: '120%' }}  // Start fully hidden below
    animate={{ y: 0 }}
    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
  >
    VOLUNTARY
  </motion.h1>
</div>
```
**Key**: The container has `overflow-hidden` and fixed height. Text needs 120% to be fully hidden initially.

#### Text Alignment Issues & Solutions
- **Problem**: Text getting clipped when right-aligned
- **Solution**: Position text absolutely with `right: 0` and use percentage-based positioning
- **Example**: Frame 2's "VOLUNTARY SERVICE" at 47% viewport width

### 2. Color Scheme Evolution

**Current Palette**:
- Background: `bg-gradient-to-br from-stone-50 via-neutral-100 to-zinc-50`
- Text: `text-gray-900` (#111827)
- Accent: `text-red-500` (#ef4444) - used sparingly
- Mosaic symbols: `filter: grayscale(100%) brightness(0.7)`

### 3. Frame-Specific Patterns

#### Frame 1 (Title)
- Typewriter effect with character-by-character reveal
- Special handling for "Value" - stays visible, turns red, then fades
- No cursor animation (was removed as distracting)

#### Frame 2 (Definition)
- Split-screen layout with text at 47% and 53%
- Colon as two red dots that rise separately
- Period that expands to fill screen for transition
- Text must be properly aligned to baseline for period

#### Frame 3 (Mosaic)
- 8x8 grid is the standard size
- Use fixed pattern (`index % 3`) not random for consistency
- Text rises from below at screen edges
- 15% of symbols flash red randomly

#### Frame 4 (Clock Transformation)
- Start with EXACT same mosaic as Frame 3
- Mosaic pieces morph to form clock circle
- Single clock hand that stays connected to center
- Use SVG with `<g>` groups for proper rotation

### 4. Common Pitfalls & Solutions

#### Problem: Slides not matching end/start states
**Solution**: Copy exact component structure and styles between frames

#### Problem: Text animations overlapping poorly
**Solution**: Use overlapping timings:
```jsx
// Line 1: starts at 2.0s, duration 0.8s
// Line 2: starts at 2.3s (overlaps by 0.5s)
// Line 3: starts at 2.6s (overlaps by 0.5s)
```

#### Problem: Elements not visible on dark backgrounds
**Solution**: Adjust brightness filters:
```jsx
style={{ filter: 'grayscale(100%) brightness(0.7)' }}  // For dark bg
```

#### Problem: Clock hands detaching from center
**Solution**: Use SVG `<g>` groups with proper transform origin:
```jsx
<motion.g
  animate={{ rotate: time * 3 }}
  style={{ originX: '200px', originY: '200px' }}
>
  <line x1="200" y1="200" x2="200" y2="100" />
</motion.g>
```

### 5. Navigation & Routing

- Changed from 0-based to 1-based routing (/1, /2, /3...)
- Frame components no longer handle scroll - Router handles all navigation
- SlideNavigation component updated for 1-based indexing

### 6. Typography

- Font: Jost (Google Fonts) - chosen as free Futura alternative
- Sizes: text-3xl to text-8xl depending on context
- Always use `font-display` class for consistency

### 7. Performance Considerations

- Stagger animations with small delays (0.01s * index)
- Use `initial` states to prevent flashing
- Keep mosaic at 8x8 (64 items) maximum for smooth animations

## File Organization

```
/src/components/
├── Frame1-6.jsx     # Active frames
├── archive/         # Old versions (reference only)
└── SlideNavigation.jsx

Key decisions:
- No Frame0 (confusing)
- Frame5 is placeholder
- Archive folder preserves old approaches
```

## Testing Checklist

Before committing changes:
- [ ] Text fully visible (no clipping)
- [ ] Animations start from correct state
- [ ] Transitions between frames are smooth
- [ ] Navigation works (arrows, scroll, dots)
- [ ] No console errors
- [ ] Colors match design system

## Best Practices for This Project

### When User Says Something Is "Wrong"
1. **Don't argue or explain** - Just fix it
2. **Look for visual references** - User often provides screenshots
3. **Multiple issues = multiple fixes** - Address everything mentioned

### Asset Usage
- **Always use PNG assets** for crosses/crescents (`/red-cross.png`, `/red-crescent.png`)
- **Never create SVG approximations** - User wants the actual logos
- **CSS filters for color variations** - Use `filter` to change colors

### Spacing & Layout
- **"Bolder" = bigger + more space** - Not just font-weight
- **Left-aligned usually needs padding** - Never glue to edges
- **60-75% width for text blocks** - Gives breathing room

### Animation Approach
1. **Start with basic motion** - Add complexity later if needed
2. **Smooth bezier curves** - `[0.22, 1, 0.36, 1]` works well
3. **Overlap animations** - 0.15-0.2s delays between elements
4. **Test the flow** - Ensure animations complete before transitions

## File Organization Patterns

- **Frames are 1-indexed** in routing but components may vary
- **BackgroundTexture** is shared across light frames (1, 2, 5, 6)
- **Archive folder** preserves old approaches for reference
- **Reusable components** for consistent elements

## Quick Debugging Tips

- **Text cutoff?** → Add padding bottom
- **Navigation invisible?** → Check isDarkSlide array
- **Animation jarring?** → Check timing/duration match
- **Shapes overlapping?** → Reduce count or adjust spacing

---

*Remember: User knows what they want. Implement quickly, iterate based on feedback.*