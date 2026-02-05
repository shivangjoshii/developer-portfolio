# 🎨 Design System & Customization Guide

## Color Palette

All components use this consistent color scheme:

### Primary Colors
```css
/* Main accent color - Cyan/Teal */
--primary: #16f2b3;

/* Background dark blue */
--bg-dark: #0d1224;

/* Darker variant */
--bg-darker: #0a0d37;

/* Background blue */
--bg-blue: #10172d;

/* Light gray text */
--text-light: #d3d8e8;

/* Muted gray text */
--text-muted: #7a8599;

/* Border color */
--border: #1b2c68a0;
--border-dark: #353a52;
```

### Gradients
```css
/* Accent gradient - Pink to Violet */
--gradient-main: linear-gradient(to right, #FF006E, #6366F1);

/* Background gradient */
--gradient-bg: linear-gradient(to bottom right, #0d1224, #0f1535, #0a0d37);

/* Hover glow */
--glow: 0 0 30px rgba(22, 242, 179, 0.2);
```

### Component-Specific Colors
- **Success:** `#10B981` (Green)
- **Error:** `#EF4444` (Red)
- **Warning:** `#F59E0B` (Amber)
- **Info:** `#3B82F6` (Blue)

---

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Heading Sizes
- **H1:** 48px, bold, uppercase accent color
- **H2:** 36px, bold
- **H3:** 28px, bold
- **H4:** 24px, semibold

### Body Text
- **Large:** 18px, regular
- **Base:** 16px, regular
- **Small:** 14px, regular
- **Tiny:** 12px, regular

---

## Spacing System

Use these consistent spacing values:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

Example:
```jsx
<div className="p-6 mb-8">    {/* padding: 24px, margin-bottom: 32px */}
  <h1 className="mb-4">Title</h1>  {/* margin-bottom: 16px */}
</div>
```

---

## Component Standards

### Borders
```jsx
/* Default border */
className="border border-[#1b2c68a0]"

/* Hover border */
className="hover:border-[#16f2b3] transition-colors duration-300"

/* Gradient border */
className="bg-gradient-to-r from-pink-500 to-violet-600"
```

### Shadows & Glows
```jsx
/* Glow effect on hover */
className="hover:shadow-[0_0_30px_rgba(22,242,179,0.2)]"

/* Smooth shadow */
className="shadow-lg"
```

### Transitions
```jsx
/* Standard transition */
className="transition-all duration-300"

/* Specific property */
className="transition-colors duration-300"
className="transition-transform duration-300"
className="transition-opacity duration-300"
```

### Hover States
```jsx
/* Scale on hover */
className="hover:scale-105 transition-transform duration-300"

/* Color change on hover */
className="text-[#d3d8e8] hover:text-[#16f2b3] transition-colors duration-300"

/* Background change */
className="bg-[#1b2c68a0] hover:bg-[#16f2b3] transition-all duration-300"
```

---

## Responsive Design

### Breakpoints (Tailwind)
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### Responsive Examples
```jsx
/* Mobile first approach */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>

/* Hide on mobile, show on desktop */
<div className="hidden lg:flex">Content</div>

/* Responsive padding */
<div className="p-4 lg:p-8">Content</div>
```

---

## Spline 3D Integration

### Current Setup
The contact form includes a Spline 3D scene:
```jsx
<Spline 
  scene="https://prod.spline.design/cOPCAVLR-TjA0l6z/scene.splinecode"
  onLoad={(splineApp) => {
    console.log("Spline scene loaded");
  }}
/>
```

### How to Customize Your Spline Scene

1. **Go to Spline.design:**
   - Visit https://spline.design
   - Sign in (free account)
   - Create new project

2. **Design Your Scene:**
   - Add 3D objects
   - Apply materials and textures
   - Add animations
   - Use these colors:
     - Background: Dark blue (#0d1224 or transparent)
     - Objects: Cyan (#16f2b3) or gradient colors
     - Accents: Pink/Violet for highlights

3. **Export & Deploy:**
   - Click "Export"
   - Choose "Web (Embed Code)"
   - Get your scene URL
   - Copy the long URL like: `https://prod.spline.design/...`

4. **Update in Code:**
   ```jsx
   <Spline 
     scene="YOUR_NEW_SPLINE_URL"
     onLoad={(splineApp) => {
       console.log("Spline scene loaded");
     }}
   />
   ```

### Spline Scene Ideas
- 💻 Animated computer/code
- 🎨 Abstract 3D shapes
- 🚀 Rocket or spacecraft
- 🌊 Water/wave animation
- 🎮 Game-like environment
- 🔮 Crystal/gemstone
- 🌀 Abstract spiral/vortex

---

## Form Styling Guide

### Input Fields
```jsx
<input
  className="bg-[#10172d] border-2 border-[#353a52] rounded-lg 
    focus:border-[#16f2b3] focus:outline-none transition-all duration-300 
    px-4 py-3 text-white placeholder-[#7a8599] 
    hover:border-[#16f2b3]/50"
  placeholder="Enter text"
/>
```

### Textarea
```jsx
<textarea
  className="bg-[#10172d] border-2 border-[#353a52] rounded-lg 
    focus:border-[#16f2b3] focus:outline-none transition-all duration-300 
    px-4 py-3 text-white placeholder-[#7a8599] 
    hover:border-[#16f2b3]/50 resize-none"
  rows="4"
/>
```

### Button Variants
```jsx
/* Primary button */
<button className="bg-gradient-to-r from-pink-500 to-violet-600 
  hover:from-pink-600 hover:to-violet-700 text-white font-bold 
  py-3 rounded-lg transition-all duration-300">
  Send
</button>

/* Secondary button */
<button className="bg-[#1b2c68a0] text-[#16f2b3] 
  hover:bg-[#16f2b3] hover:text-[#0d1224] rounded-lg 
  transition-all duration-300">
  Cancel
</button>

/* Disabled state */
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>
```

---

## Animation Patterns

### Fade In
```jsx
<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  Content appears on hover
</div>
```

### Scale Effect
```jsx
<div className="scale-100 hover:scale-105 transition-transform duration-300">
  Grows on hover
</div>
```

### Slide In
```jsx
<div className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
  Slides right on hover
</div>
```

### Gradient Animation
```jsx
<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-violet-600/10 to-pink-500/10"></div>
</div>
```

---

## Common Component Patterns

### Card
```jsx
<div className="bg-gradient-to-r from-[#0d1224] to-[#0a0d37] 
  border border-[#1b2c68a0] rounded-lg p-6 
  hover:border-[#16f2b3] hover:shadow-[0_0_30px_rgba(22,242,179,0.2)] 
  transition-all duration-300">
  Content
</div>
```

### Badge
```jsx
<span className="px-3 py-1 bg-[#1b2c68a0] text-[#16f2b3] 
  text-xs font-semibold rounded-full border border-[#353a52] 
  group-hover:border-[#16f2b3] transition-all duration-300">
  Label
</span>
```

### Label
```jsx
<label className="text-base font-semibold text-[#16f2b3] 
  mb-2 block transition-colors duration-300">
  Field Label
</label>
```

### Error Message
```jsx
<p className="text-sm text-red-400 mt-2 flex items-center gap-1">
  ⚠️ Error message here
</p>
```

---

## Best Practices

### 1. **Consistency**
- Use the same colors throughout
- Match hover effects across components
- Keep spacing consistent
- Use the same fonts

### 2. **Accessibility**
- Sufficient color contrast
- Focus states on interactive elements
- Semantic HTML
- Proper ARIA labels

### 3. **Performance**
- Use `transition-all` for multiple properties
- Avoid too many animations
- Optimize images
- Use Tailwind CSS (it's already included)

### 4. **Responsive First**
- Design mobile first
- Use Tailwind's responsive prefixes
- Test on multiple screen sizes
- Hide/show elements appropriately

### 5. **User Experience**
- Clear visual hierarchy
- Feedback on interactions
- Loading states
- Error messages with guidance

---

## Color Customization

To change the primary color from cyan (#16f2b3) to another:

1. **Find all instances:**
   ```bash
   grep -r "#16f2b3" app/
   ```

2. **Update in Tailwind config (if custom):**
   ```javascript
   theme: {
     extend: {
       colors: {
         primary: '#16f2b3'
       }
     }
   }
   ```

3. **Replace in components:**
   - Find: `text-[#16f2b3]`
   - Replace with your color
   - Also update hover states

---

## Typography Customization

To add custom fonts:

1. **In `app/layout.js`:**
   ```jsx
   import { Poppins } from 'next/font/google';
   
   const poppins = Poppins({
     subsets: ['latin'],
     weight: ['400', '600', '700']
   });
   ```

2. **Apply to html:**
   ```jsx
   <html className={poppins.className}>
   ```

---

## Testing Your Customizations

1. **Visual Tests:**
   - Check color contrast with accessibility checker
   - Test on mobile devices
   - Test in different browsers

2. **Performance Tests:**
   - Measure animations smoothness
   - Check bundle size
   - Test on slow networks

3. **Accessibility Tests:**
   - Use keyboard navigation only
   - Test with screen readers
   - Check focus indicators

---

## References

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Spline Design](https://spline.design)
- [Design System Best Practices](https://www.nngroup.com/articles/design-systems-101/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

For more information, see other documentation files in the project!
