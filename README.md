# IFRC Volunteer Value Animation

A minimalist, typography-driven animated presentation showcasing the value of IFRC volunteers through visual storytelling.

## 🎯 Purpose

This animated presentation explores the concept of voluntary service - its definition, value, and the challenge of measuring unpaid humanitarian work. Through clean design and symbolic transformations, we highlight how volunteers are united by purpose, not profit.

## ✨ Current Slides

1. **Frame 1** (`/1`): "The Value of a Volunteer" - Typewriter effect with "Value" turning red
2. **Frame 2** (`/2`): "VOLUNTARY SERVICE" definition - Rising text with expanding dot transition
3. **Frame 3** (`/3`): Mosaic grid with "United by purpose, not profit" 
4. **Frame 4** (`/4`): Mosaic transforms into abstract clock (time as service metaphor)
5. **Frame 5** (`/5`): (In development)
6. **Frame 6** (`/6`): Grid visualization - counted vs uncounted volunteers

## 🎨 Design System

### Visual Language
- **Minimalist**: Off-white backgrounds with dark text for clarity
- **Typography-first**: Jost font (Futura alternative) with bold, clean lines
- **Symbolic**: Red Cross/Crescent symbols as recurring visual elements
- **Transformative**: Elements morph and evolve between slides

### Color Palette
- **Background**: Off-white gradients (`#f5f5f4` to `#fafaf9`)
- **Text**: Dark gray (`#111827`)
- **Accent**: Red (`#ef4444`) for emphasis
- **Secondary**: Stone/gray tones for subtle elements

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173/1
```

## 🎮 Navigation

- **Arrow Keys**: ← Previous | → Next
- **Scroll**: Up/Down to navigate
- **Click**: Navigation dots at bottom
- **Direct URL**: `/1`, `/2`, `/3`, etc.

## 🛠 Tech Stack

- **[Vite](https://vitejs.dev/)** - Build tool
- **[React 18](https://react.dev/)** - UI framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[React Router](https://reactrouter.com/)** - Navigation (1-based routing)

## 📁 Project Structure

```
src/
├── components/
│   ├── Frame1.jsx      # Opening title
│   ├── Frame2.jsx      # Definition with colon animation
│   ├── Frame3.jsx      # Mosaic with text
│   ├── Frame4.jsx      # Clock transformation
│   ├── Frame6.jsx      # Grid visualization
│   ├── SlideNavigation.jsx
│   └── archive/        # Previous iterations
├── App.jsx             # Router (1-based indexing)
└── index.css          # Global styles

public/
├── red-cross.png      # Symbol assets
└── red-crescent.png
```

## 🎬 Key Animations

### Frame 1: Title Reveal
- Typewriter effect for "The Value of a Volunteer"
- "Value" remains, turns red, then fades

### Frame 2: Definition
- "VOLUNTARY SERVICE" rises from below
- Colon animates as two red dots
- Text appears with overlapping fades
- Period expands to fill screen as transition

### Frame 3: Mosaic
- 8x8 grid of crosses/crescents
- Text rises from below at edges
- Some symbols flash red (15% randomly)

### Frame 4: Time Metaphor
- Mosaic morphs into circular clock pattern
- Abstract clock with single moving hand
- Represents time given in service

## 📝 Development Notes

### Key Learnings
- **Mask animations**: Use overflow-hidden containers for clean rise effects
- **Text alignment**: Use absolute positioning for precise control
- **Transitions**: Overlapping animations feel more natural than sequential
- **Performance**: Stagger animations with small delays for smooth rendering

### Common Patterns
```jsx
// Rising text animation
<div className="relative overflow-hidden h-32">
  <motion.h1 
    className="absolute bottom-0"
    initial={{ y: '120%' }}
    animate={{ y: 0 }}
    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
  >
    Text
  </motion.h1>
</div>

// Expanding transition
<motion.span 
  className="bg-gray-900 rounded-full"
  animate={{ width: '300vw', height: '300vw' }}
  transition={{ duration: 1.5 }}
/>
```

## 🚧 In Progress

- Frame 5: Impact visualization
- Additional transitions between frames
- Sound design considerations
- Performance optimizations

## 🤝 Contributing

This is a demonstration project for IFRC. For questions or contributions, please refer to CLAUDE.md for technical documentation.

## 📄 License

Created for IFRC (International Federation of Red Cross and Red Crescent Societies) as a demonstration of volunteer value communication.

---

**Remember**: This project aims to make the invisible visible - showing the true value of voluntary service through thoughtful design and animation.