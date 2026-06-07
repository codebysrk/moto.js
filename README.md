# 🎈 Magic Custom Cursor (react-moto-cursor)

Hey there! Want to add a super cool **Magic Cursor** to your website? It trails behind your mouse smoothly, shrinks when you click, and pulls buttons towards itself like a magnet! 🧲✨

Here is how you can use it in **3 Easy Steps!**

---

## ✨ Features (इस लाइब्रेरी के जादुई फीचर्स)

1. **🧈 मलाई जैसा स्मूथ मोशन (Lerp Physics):** कर्सर माउस के पीछे-पीछे थोड़ा सा **देरी (smooth lag)** से चलता है। इससे ऐसा महसूस होता है कि कर्सर हवा में तैर रहा है (Fluid/Springy movement), जो वेबसाइट को बहुत प्रीमियम और Awwwards साइट जैसा लुक देता है।
2. **🧲 बटन चुम्बक प्रभाव (Magnetic Effect):** जब यूजर का माउस किसी बटन या लिंक के पास जाता है, तो बटन खुद-ब-खुद माउस की तरफ खिंचा चला आता है (snaps/pulls) जैसे किसी चुम्बक से चिपका हो।
3. **💥 क्लिक करने पर प्रतिक्रिया (Tactile Click Feedback):** जैसे ही आप स्क्रीन पर कहीं भी क्लिक करते हैं, कर्सर तुरंत थोड़ा सा **सिकुड़ (shrink)** जाता है। इससे यूजर को क्लिक करने का एक मजेदार विजुअल फीडबैक मिलता है।
4. **🎭 ऑटो-रूप बदलना (Smart Morphing):** 
   - साधारण टेक्स्ट पर कर्सर एक छोटा सा **बिंदु (dot)** बनकर रहता है।
   - **लिंक** पर जाने पर यह बड़ा होकर `"VIEW"` दिखाता है।
   - **बटन** पर जाने पर यह `"CLICK"` दिखाता है।
   - **स्लाइडर (जैसे Swiper)** पर जाने पर यह `"DRAG"` दिखाता है।
5. **🏷️ अपनी मर्जी का टेक्स्ट (Data Attributes):** आप किसी भी HTML टैग पर बस `data-cursor-text="HELLO"` लिख सकते हैं। जब माउस उस पर जाएगा, कर्सर के अंदर `"HELLO"` या कोई भी मनपसंद इमोजी (`data-cursor-icon="✨"`) आ जाएगी।
6. **🛠️ कोड से कंट्रोल (useCustomCursor Hook):** डेवलपर्स अपने कोड के जरिए जब चाहें कर्सर को छुपा सकते हैं, उसका रंग बदल सकते हैं या उसका टेक्स्ट बदल सकते हैं।
7. **🎨 मनपसंद रंग और आकार (Custom Styling Props):** आप कर्सर को प्रॉप्स देकर उसका बैकग्राउंड रंग (`bgColor`), टेक्स्ट का रंग (`color`), और साइज (`size`) अपनी पसंद से बदल सकते हैं (जैसे इसे hollow ring बना सकते हैं)।
8. **📱 मोबाइल और बैटरी की सुरक्षा (Touch Friendly):** यह कर्सर **मोबाइल और टैबलेट पर स्वतः बंद** हो जाता है ताकि फोन हैंग न हो और बैटरी बचे। इसके अलावा, यदि किसी यूजर ने कंप्यूटर में एनिमेशन बंद किया हुआ है, तो यह वहां भी बंद होकर सामान्य माउस दिखाने लगता है (Accessibility friendly)।

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
