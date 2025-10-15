/**
 * Web Component Curtain Effect
 * Author: Tulsiram Kushwah
 * LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
 * Facebook: https://www.facebook.com/ramp00786
 * 
 * A universal Web Component for curtain opening animations
 * that works with any framework or vanilla JavaScript.
 */

class CurtainEffectElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Component state
    this.isOpen = false;
    this.isAnimating = false;
    this.sparkleInterval = null;
    this.autoOpenTimeout = null;
    
    // Bind methods
    this.handleOpen = this.handleOpen.bind(this);
    this.createSparkles = this.createSparkles.bind(this);
  }
  
  // Define observed attributes
  static get observedAttributes() {
    return [
      'title', 'subtitle', 'button-text', 'theme', 'speed',
      'auto-open', 'auto-open-delay', 'sparkles', 'sound',
      'left-curtain-image', 'right-curtain-image'
    ];
  }
  
  // Getters for attributes with defaults
  get title() { return this.getAttribute('title') || 'Welcome'; }
  get subtitle() { return this.getAttribute('subtitle') || 'Click to Enter'; }
  get buttonText() { return this.getAttribute('button-text') || 'Open Curtains'; }
  get theme() { return this.getAttribute('theme') || 'default'; }
  get speed() { return parseInt(this.getAttribute('speed')) || 2000; }
  get autoOpen() { return this.hasAttribute('auto-open'); }
  get autoOpenDelay() { return parseInt(this.getAttribute('auto-open-delay')) || 5000; }
  get sparkles() { return !this.hasAttribute('sparkles') || this.getAttribute('sparkles') !== 'false'; }
  get sound() { return this.hasAttribute('sound'); }
  get leftCurtainImage() { return this.getAttribute('left-curtain-image') || ''; }
  get rightCurtainImage() { return this.getAttribute('right-curtain-image') || ''; }
  
  connectedCallback() {
    this.render();
    this.bindEvents();
    this.setupAutoOpen();
  }
  
  disconnectedCallback() {
    this.cleanup();
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      if (name === 'auto-open' || name === 'auto-open-delay') {
        this.setupAutoOpen();
      }
    }
  }
  
  render() {
    const leftImageStyle = this.leftCurtainImage 
      ? `background-image: url(${this.leftCurtainImage});` 
      : '';
    const rightImageStyle = this.rightCurtainImage 
      ? `background-image: url(${this.rightCurtainImage});` 
      : '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          font-family: 'Arial', sans-serif;
        }
        
        :host([hidden]) {
          display: none !important;
        }
        
        .curtain-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .curtain-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(135deg, #8B0000, #DC143C);
          background-size: cover;
          background-position: center;
          transition: transform var(--speed, 2s) cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 2;
        }
        
        .curtain-left {
          left: 0;
          transform-origin: left center;
          ${leftImageStyle}
        }
        
        .curtain-right {
          right: 0;
          transform-origin: right center;
          ${rightImageStyle}
        }
        
        .opening .curtain-left {
          transform: translateX(-100%) rotateY(-15deg);
        }
        
        .opening .curtain-right {
          transform: translateX(100%) rotateY(15deg);
        }
        
        .curtain-content {
          position: relative;
          z-index: 3;
          text-align: center;
          color: white;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .curtain-title {
          font-size: 3rem;
          margin: 0 0 1rem 0;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        .curtain-subtitle {
          font-size: 1.2rem;
          margin: 0 0 2rem 0;
          opacity: 0.9;
        }
        
        .curtain-button {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          color: #000;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
        }
        
        .curtain-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
        }
        
        .curtain-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .curtain-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFD700;
          border-radius: 50%;
          animation: sparkle linear forwards;
          pointer-events: none;
        }
        
        /* Theme variations */
        .curtain-theme-royal .curtain-panel {
          background: linear-gradient(135deg, #4B0082, #8A2BE2);
        }
        
        .curtain-theme-elegant .curtain-panel {
          background: linear-gradient(135deg, #2F4F4F, #708090);
        }
        
        .curtain-theme-gold .curtain-panel {
          background: linear-gradient(135deg, #DAA520, #FFD700);
        }
        
        .curtain-theme-saffron .curtain-panel {
          background: linear-gradient(135deg, #FF8C00, #FFA500);
        }
        
        @keyframes glow {
          from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.3); }
          to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.6); }
        }
        
        @keyframes sparkle {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) scale(1);
          }
          100% {
            transform: translateY(-10vh) scale(0);
            opacity: 0;
          }
        }
        
        @media (max-width: 768px) {
          .curtain-title {
            font-size: 2rem;
          }
          
          .curtain-content {
            padding: 1.5rem;
          }
          
          .curtain-button {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }
      </style>
      
      <div class="curtain-container curtain-theme-${this.theme}" style="--speed: ${this.speed}ms">
        <div class="curtain-panel curtain-left"></div>
        <div class="curtain-panel curtain-right"></div>
        
        <div class="curtain-content">
          <h1 class="curtain-title">${this.title}</h1>
          <p class="curtain-subtitle">${this.subtitle}</p>
          <button class="curtain-button" ${this.isAnimating ? 'disabled' : ''}>
            <span>▶</span>
            ${this.buttonText}
          </button>
        </div>
        
        ${this.sound ? '<audio preload="auto"><source src="/curtain-assets/sounds/clapping.wav" type="audio/wav"></audio>' : ''}
      </div>
    `;
  }
  
  bindEvents() {
    const button = this.shadowRoot.querySelector('.curtain-button');
    if (button) {
      button.addEventListener('click', this.handleOpen);
    }
  }
  
  setupAutoOpen() {
    if (this.autoOpenTimeout) {
      clearTimeout(this.autoOpenTimeout);
      this.autoOpenTimeout = null;
    }
    
    if (this.autoOpen && !this.isOpen && !this.isAnimating) {
      this.autoOpenTimeout = setTimeout(() => {
        this.handleOpen();
      }, this.autoOpenDelay);
    }
  }
  
  handleOpen() {
    if (this.isAnimating || this.isOpen) return;
    
    this.isAnimating = true;
    
    // Dispatch open event
    this.dispatchEvent(new CustomEvent('curtain-open', {
      detail: { element: this },
      bubbles: true
    }));
    
    // Add opening class
    const container = this.shadowRoot.querySelector('.curtain-container');
    container.classList.add('opening');
    
    // Play sound if enabled
    if (this.sound) {
      const audio = this.shadowRoot.querySelector('audio');
      if (audio) {
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    }
    
    // Start sparkles
    if (this.sparkles) {
      this.sparkleInterval = setInterval(this.createSparkles, 200);
    }
    
    // Complete animation
    setTimeout(() => {
      this.isOpen = true;
      this.isAnimating = false;
      
      // Stop sparkles
      if (this.sparkleInterval) {
        clearInterval(this.sparkleInterval);
        this.sparkleInterval = null;
      }
      
      // Hide element
      this.style.display = 'none';
      
      // Dispatch complete event
      this.dispatchEvent(new CustomEvent('curtain-complete', {
        detail: { element: this },
        bubbles: true
      }));
      
    }, this.speed);
  }
  
  createSparkles() {
    const container = this.shadowRoot.querySelector('.curtain-container');
    if (!container) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'curtain-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 5000);
  }
  
  // Public methods
  open() {
    this.handleOpen();
  }
  
  reset() {
    this.isOpen = false;
    this.isAnimating = false;
    this.style.display = 'block';
    
    const container = this.shadowRoot.querySelector('.curtain-container');
    if (container) {
      container.classList.remove('opening');
    }
    
    this.cleanup();
    this.setupAutoOpen();
  }
  
  cleanup() {
    if (this.sparkleInterval) {
      clearInterval(this.sparkleInterval);
      this.sparkleInterval = null;
    }
    
    if (this.autoOpenTimeout) {
      clearTimeout(this.autoOpenTimeout);
      this.autoOpenTimeout = null;
    }
  }
}

// Register the custom element
if (!customElements.get('curtain-effect')) {
  customElements.define('curtain-effect', CurtainEffectElement);
}

// Export for module usage
export default CurtainEffectElement;