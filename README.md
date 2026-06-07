# 🎈 Magic Custom Cursor (react-moto-cursor)

Hey there! Want to add a super cool **Magic Cursor** to your website? It trails behind your mouse smoothly, shrinks when you click, and pulls buttons towards itself like a magnet! 🧲✨

Here is how you can use it in **3 Easy Steps!**

---

## 🚀 Step 1: Install it!
Open your terminal (cmd/terminal) inside your project and run this command:

```bash
npm install react-moto-cursor
```

---

## 🎨 Step 2: Add CSS (Styling)
Put this line at the very top of your main file (like `layout.js`, `_app.js`, or `index.js`):

```javascript
import 'react-moto-cursor/dist/index.css';
```

---

## 💻 Step 3: Copy and Paste this Code!
Wrap your website code inside `<CustomCursor>`. Here is an example:

```jsx
import React from 'react';
import { CustomCursor, Magnetic } from 'react-moto-cursor';

export default function App() {
  return (
    /* 1. Put this wrapper around your page! */
    <CustomCursor variant="dot">
      <div style={{ padding: '100px', textLeave: 'center' }}>
        
        <h1>My Magic Website 🪄</h1>

        {/* 2. Hover here to see the cursor change to "VIEW" automatically! */}
        <a href="#explore">Hover over me!</a>

        <br /><br />

        {/* 3. Wrap any button in <Magnetic> to make it attract like a magnet! */}
        <Magnetic>
          <button style={{ padding: '10px 20px' }}>
            I am a Magnet Button 🧲
          </button>
        </Magnetic>

      </div>
    </CustomCursor>
  );
}
```

---

## 🔮 Cool Tricks (Easy Customs)

### 1. Change Colors & Size 🎨
You can customize the cursor shape easily by adding props:

```jsx
// A cyan ring cursor that turns pink and grows to 80px when you hover on links!
<CustomCursor 
  variant="ring" 
  bgColor="cyan" 
  hoverBgColor="pink" 
  hoverSize={80}
>
  {/* Your code here */}
</CustomCursor>
```

### 2. Custom Hover Text or Emojis 💬
Want the cursor to say something special when you hover over a specific card or image? Just add `data-cursor-text` or `data-cursor-icon` to that element:

```jsx
// This will show "BOOM 💥" inside the cursor when hovered!
<div data-cursor-text="BOOM" data-cursor-icon="💥">
  Hover me for a surprise!
</div>
```

---
Have fun building! 🌟
