# 🎭 Curtain Opening Effect - Reusable CSS & JavaScript

A beautiful, reusable curtain opening animation that can be easily integrated into any website. Perfect for splash screens, welcome pages, event websites, and creating dramatic reveals!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Features

- 🎪 **5 Built-in Themes** - Default, Royal, Elegant, Gold, and Saffron
- 🖼️ **Custom Images** - Use your own curtain textures
- ⚡ **Speed Control** - Adjustable animation duration (1s - 10s)
- 🎵 **Sound Effects** - Optional audio feedback
- ✨ **Particle Effects** - Beautiful falling sparkles
- ⏰ **Auto-Open** - Automatic opening after delay
- 📱 **Mobile Responsive** - Works on all screen sizes
- 🌐 **Zero Dependencies** - Pure CSS & JavaScript
- 🔧 **Easy Integration** - 2-minute setup
- 🎨 **Fully Customizable** - Colors, text, images, timing

## 🚀 Quick Start (2 Minutes)

### Step 1: Include Files
```html
<!-- Include CSS -->
<link rel="stylesheet" href="curtain-assets/css/curtain-effect.css">

<!-- Include Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Include JavaScript -->
<script src="curtain-assets/js/curtain-effect.js"></script>
```

### Step 2: Configure & Initialize
```html
<script>
// Set curtain configuration
window.curtainConfig = {
    title: 'Welcome to My Website',
    subtitle: 'Click to explore amazing content',
    buttonText: 'Enter Now'
};
</script>
```

**That's it!** Your curtain effect is ready. 🎉

## � Framework Support

This library supports multiple JavaScript frameworks:

### 📦 NPM Installation
```bash
npm install curtain-opening-effect
```

### ⚛️ React Usage
```jsx
import CurtainEffect from 'curtain-opening-effect/react';

function App() {
  return (
    <CurtainEffect
      title="Welcome to React App"
      subtitle="Click to continue"
      theme="royal"
      onComplete={() => console.log('Curtains opened!')}
    >
      <div>Your main content here</div>
    </CurtainEffect>
  );
}
```

### 🌿 Vue Usage
```vue
<template>
  <CurtainEffect
    title="Welcome to Vue App"
    subtitle="Click to continue"
    theme="elegant"
    @complete="onComplete"
  >
    <div>Your main content here</div>
  </CurtainEffect>
</template>

<script>
import CurtainEffect from 'curtain-opening-effect/vue';

export default {
  components: { CurtainEffect },
  methods: {
    onComplete() {
      console.log('Curtains opened!');
    }
  }
}
</script>
```

### 🧩 Web Components (Universal)
```html
<!-- Works with any framework or vanilla JavaScript -->
<curtain-effect
  title="Welcome"
  subtitle="Click to enter"
  theme="gold"
  auto-open="true"
  auto-open-delay="3000"
>
</curtain-effect>

<script src="curtain-opening-effect/web-component"></script>
```

### 🏃‍♂️ Vanilla JavaScript
```html
<script src="curtain-opening-effect/vanilla"></script>
<script>
CurtainEffect.init({
  title: 'Welcome',
  subtitle: 'Click to enter',
  theme: 'saffron'
});
</script>
```

## �🎨 Themes Preview

| Theme | Colors | Best For |
|-------|--------|----------|
| **Default** | Deep red with brown tones | Classic theaters, general use |
| **Royal** | Purple gradient | Premium sites, luxury brands |
| **Elegant** | Gray-blue gradient | Professional, corporate sites |
| **Gold** | Golden gradient | Celebrations, awards, VIP |
| **Saffron** | Orange-golden gradient | Indian festivals, cultural events |

## 📋 Configuration Options

```javascript
window.curtainConfig = {
    // Content
    title: 'Welcome',                    // Main heading text
    subtitle: 'Click to Enter',          // Secondary text
    buttonText: 'Open Curtains',         // Button label
    
    // Appearance
    theme: 'default',                    // 'default', 'royal', 'elegant', 'gold', 'saffron'
    leftCurtainImage: '',               // Custom left curtain image path
    rightCurtainImage: '',              // Custom right curtain image path
    
    // Animation
    speed: 2000,                        // Duration in milliseconds (1000-10000)
    sparkles: true,                     // Show particle effects
    
    // Auto-open
    autoOpen: false,                    // Auto-open without user click
    autoOpenDelay: 5000,                // Delay before auto-opening (ms)
    
    // Audio
    sound: false,                       // Play clapping sound
    
    // Callbacks
    onOpen: function() {                // Called when opening starts
        console.log('Opening!');
    },
    onComplete: function() {            // Called when animation completes
        console.log('Welcome!');
    }
};
```

## 🛠️ Advanced Usage

### Method 1: JavaScript API
```javascript
// Initialize with custom options
CurtainEffect.init({
    title: 'IISF 2025',
    subtitle: 'India International Science Festival',
    buttonText: 'Enter Festival',
    theme: 'saffron',
    sparkles: true,
    speed: 2000,
    onComplete: function() {
        alert('Welcome to IISF 2025! 🎉');
    }
});

// Control methods
CurtainEffect.forceOpen();           // Open programmatically
CurtainEffect.setTitle('New Title'); // Change title
CurtainEffect.setTheme('gold');      // Change theme
CurtainEffect.destroy();             // Remove curtains
```

### Method 2: HTML Data Attributes
```html
<div data-curtain-auto="true"
     data-curtain-title="My Website"
     data-curtain-subtitle="Welcome!"
     data-curtain-button="Enter"
     data-curtain-theme="saffron"
     data-curtain-speed="2000"
     data-curtain-sparkles="true"
     data-curtain-sound="false">
</div>
```

## 🌟 Real-World Examples

### E-commerce Sale Page
```javascript
CurtainEffect.init({
    title: 'Black Friday Sale',
    subtitle: '50% Off Everything - Limited Time!',
    buttonText: 'Shop Now',
    theme: 'gold',
    autoOpen: true,
    autoOpenDelay: 2000,
    sparkles: true
});
```

### Event Landing Page
```javascript
CurtainEffect.init({
    title: 'IISF 2025',
    subtitle: 'India International Science Festival',
    buttonText: 'Enter Festival',
    theme: 'saffron',
    leftCurtainImage: 'images/indian-flag-left.jpg',
    rightCurtainImage: 'images/indian-flag-right.jpg',
    sparkles: true,
    sound: true
});
```

### Portfolio Website
```javascript
CurtainEffect.init({
    title: 'John Doe',
    subtitle: 'Creative Web Developer',
    buttonText: 'View Portfolio',
    theme: 'elegant',
    speed: 2500
});
```

## 📁 Project Structure

```
curtains-effect-js-and-css/
├── curtain-examples.html          # Demo page with all examples
├── package.json                   # NPM package configuration
├── dist/                          # Distribution files
│   ├── vanilla/                   # Vanilla JS version
│   │   ├── css/curtain-effect.css
│   │   └── js/curtain-effect.js
│   ├── react/                     # React components
│   │   ├── CurtainEffect.jsx
│   │   ├── CurtainEffect.css
│   │   └── index.js
│   ├── vue/                       # Vue components
│   │   ├── CurtainEffect.vue
│   │   ├── CurtainEffect.css
│   │   └── index.js
│   └── web-component/             # Universal Web Component
│       └── curtain-effect.js
├── types/                         # TypeScript definitions
│   └── index.d.ts
├── examples/                      # Framework-specific examples
├── curtain-assets/                # Legacy structure (maintained)
│   ├── css/, js/, images/, sounds/
├── README.md                      # This file
└── .gitignore                     # Git ignore rules
```

## 🎯 Use Cases

- **Welcome Screens** - Greet visitors with style
- **Event Websites** - Perfect for conferences, festivals
- **Product Launches** - Create anticipation and excitement  
- **Portfolio Sites** - Make a memorable first impression
- **E-commerce** - Announce sales and special offers
- **Theaters & Arts** - Perfect thematic match
- **Restaurants** - Elegant dining experience intro
- **Gaming Sites** - Dramatic game reveals

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Chrome/Safari
- ✅ Internet Explorer 11+ (partial support)

## 📱 Mobile Optimization

- Responsive design adapts to all screen sizes
- Touch-friendly button sizing
- Optimized animations for mobile performance
- Prevents unwanted scrolling during animation

## 🔧 Customization Tips

### Custom Colors
```css
.curtain-theme-custom .curtain-panel {
    background: linear-gradient(45deg, #your-color-1, #your-color-2);
}
```

### Custom Animations
```css
.curtain-container.opening .curtain-left {
    transform: translateX(-100%) rotateY(45deg);
}
```

### Custom Fonts
```css
.curtain-title {
    font-family: 'Your Custom Font', serif;
}
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Curtains not showing | Check CSS/JS file paths and loading order |
| Sound not playing | Browser blocks autoplay - user interaction required |
| Mobile issues | Ensure viewport meta tag is set |
| Images not loading | Verify image paths are correct and accessible |
| Z-index conflicts | Curtain uses z-index 10000+ - adjust if needed |

## �‍💻 Author

**Tulsiram Kushwah** - Software Engineer
- 🔗 LinkedIn: [tulsiram-kushwah-software-engineer](https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/)
- 📘 Facebook: [ramp00786](https://www.facebook.com/ramp00786)
- 🐙 GitHub: [@ramp00786](https://github.com/ramp00786)

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Credits

- Created with ❤️ by **Tulsiram Kushwah** for the web development community
- Icons by [Font Awesome](https://fontawesome.com/)
- Inspired by theater curtains and dramatic reveals

## 📧 Support

If you like this project, please ⭐ star it on GitHub!

For support, questions, or feature requests, please open an issue.

---

**Made with 🎭 by Tulsiram Kushwah for creating magical web experiences**