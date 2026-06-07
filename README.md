# react-moto-cursor 🚀

A reusable, Awwwards-inspired custom cursor wrapper component for React and Next.js. Now featuring smooth spring/lerp physics, tactile click feedback, dynamic element hover states, a `<Magnetic>` wrapper component, and programmatic control via context hooks.

---

## Features

- **Fluid Trailing Animation:** Smooth linear interpolation (Lerp) using `requestAnimationFrame` for buttery-smooth movement.
- **Tactile Click Feedback:** Animated cursor scale-down on mouse click (`mousedown` / `mouseup`).
- **Dynamic Hover States:** Automatically morphs and displays custom text/styling when hovering over links (`A` tags), buttons, and sliders (e.g. Swiper).
- **Hollow Ring & Text Variants:** Support for `dot` (small circle), `ring` (hollow outline), and `text` (shows text by default) base styles.
- **Magnetic Pull Wrapper:** Easily wrap elements to draw them towards the cursor magnetically.
- **Context Hook API (`useCustomCursor`):** Control the cursor programmatically from any child component.
- **Developer Attributes:** Override cursor text, variant, or icon on any element using simple HTML data-attributes.
- **Accessibility & Touch Optimizations:** Safely unmounts and falls back to system cursor on touch devices or when the user has enabled OS-level `prefers-reduced-motion`.

---

## Installation

```bash
npm install react-moto-cursor
```

Import the stylesheet in your root layout file (e.g., `_app.js`, `layout.js`, or `index.js`):

```javascript
import 'react-moto-cursor/dist/index.css';
```

---

## Quick Start

```jsx
import React from 'react';
import { CustomCursor, Magnetic } from 'react-moto-cursor';
import 'react-moto-cursor/dist/index.css';

export default function App() {
  return (
    <CustomCursor variant="dot">
      <main style={{ padding: '100px', textAlign: 'center' }}>
        <h1>React Moto Cursor</h1>
        
        {/* Standard link (will show "VIEW" and scale up) */}
        <a href="#explore" style={{ margin: '20px', display: 'inline-block' }}>
          Explore Gallery
        </a>

        {/* Magnetic Button (will pull towards mouse, showing "CLICK") */}
        <Magnetic range={80} strength={0.4}>
          <button style={{ padding: '12px 24px', margin: '20px' }}>
            Get Started
          </button>
        </Magnetic>
        
        {/* Override attributes */}
        <div 
          data-cursor-text="ZOOM" 
          data-cursor-variant="custom"
          style={{ width: '200px', height: '200px', background: '#333', margin: '40px auto' }}
        >
          Hover over me to Zoom
        </div>
      </main>
    </CustomCursor>
  );
}
```

---

## CustomCursor Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | *Required* | Children components wrapped inside the custom cursor tracking boundary. |
| `text` | `string` | `"DRAG"` | Default text displayed inside the cursor on drag/slider components. |
| `variant` | `"dot" \| "ring" \| "text"` | `"dot"` | Base style variant of the cursor. |
| `bgColor` | `string` | `var(--primary, #111)` | Default cursor background color. |
| `color` | `string` | `"#ffffff"` | Default cursor text/icon color. |
| `size` | `number` | `10` (dot), `20` (ring) | Default width/height of the cursor in pixels. |
| `hoverBgColor` | `string` | | Background color on hover transitions. |
| `hoverColor` | `string` | | Text/icon color on hover transitions. |
| `hoverSize` | `number` | `70` / `80` | Dimension (px) on hover transitions. |
| `className` | `string` | `""` | Additional CSS class for the wrapper div. |

---

## HTML Data-Attributes

You can add these custom attributes to any HTML element inside `<CustomCursor>` to override the cursor's appearance on-the-fly:

- **`data-cursor-text="YOUR_TEXT"`**: Displays custom text inside the cursor.
- **`data-cursor-variant="YOUR_VARIANT"`**: Adds a `variant-YOUR_VARIANT` CSS class, allowing you to hook in custom CSS animations/styles.
- **`data-cursor-icon="✨"`**: Renders an emoji, text icon, or special character inside the cursor.

```jsx
<div data-cursor-text="EXPLORE" data-cursor-variant="custom">
  Hover for explore style
</div>
```

---

## Magnetic Wrapper Props

Import the `<Magnetic>` component to wrap buttons or navigation nodes to create an Awwwards magnetic pull effect.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactElement` | *Required* | Element to make magnetic (clones element to apply refs/transforms). |
| `range` | `number` | `60` | Pixel radius around the button to activate the pull. |
| `strength` | `number` | `0.35` | Intensity of the pull towards the mouse (0 = none, 1 = direct tracking). |

---

## Programmatic Control Hook (`useCustomCursor`)

You can access programmatic controls from any nested child component using the `useCustomCursor` hook.

```jsx
import { useCustomCursor } from 'react-moto-cursor';

function MyCustomCard() {
  const { setCursorText, setCursorVariant, setCursorIcon, setIsVisible } = useCustomCursor();

  return (
    <div 
      onMouseEnter={() => {
        setCursorText("PLAY");
        setCursorVariant("video");
      }}
      onMouseLeave={() => {
        // Resets automatically
        setCursorText("");
        setCursorVariant("default");
      }}
    >
      Hover to change cursor dynamically
    </div>
  );
}
```

---

## License

MIT
