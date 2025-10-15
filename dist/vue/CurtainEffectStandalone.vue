<!--
  Vue Curtain Effect Component - Standalone Version
  Author: Tulsiram Kushwah
  LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
  Facebook: https://www.facebook.com/ramp00786
  
  This version includes inline styles to avoid CSS import issues with Vite
-->

<template>
  <div 
    v-if="!isOpen"
    ref="curtainRef"
    :class="[
      'curtain-container',
      `curtain-theme-${theme}`,
      { 'opening': isAnimating },
      className
    ]"
    :style="containerStyle"
  >
    <!-- Left Curtain Panel -->
    <div 
      class="curtain-panel curtain-left"
      :style="leftPanelStyle"
    />
    
    <!-- Right Curtain Panel -->
    <div 
      class="curtain-panel curtain-right"
      :style="rightPanelStyle"
    />
    
    <!-- Curtain Content -->
    <div class="curtain-content" :style="contentStyle">
      <div>
        <h1 class="curtain-title" :style="titleStyle">{{ title }}</h1>
        <p class="curtain-subtitle" :style="subtitleStyle">{{ subtitle }}</p>
      </div>
      <button 
        :style="buttonStyle"
        @click="handleOpen"
        :disabled="isAnimating"
      >
        <span>▶</span>
        {{ buttonText }}
      </button>
    </div>
    
    <!-- Audio element for sound effects -->
    <audio 
      v-if="sound && audioSrc" 
      ref="audioRef" 
      preload="auto"
    >
      <source :src="audioSrc" type="audio/wav" />
    </audio>
  </div>
  
  <!-- Content after curtains open -->
  <div v-else>
    <slot />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const themes = {
  default: 'linear-gradient(135deg, #8B0000, #DC143C)',
  royal: 'linear-gradient(135deg, #4B0082, #8A2BE2)', 
  elegant: 'linear-gradient(135deg, #2F4F4F, #708090)',
  gold: 'linear-gradient(135deg, #DAA520, #FFD700)',
  saffron: 'linear-gradient(135deg, #FF8C00, #FFA500)'
}

export default {
  name: 'CurtainEffect',
  props: {
    title: {
      type: String,
      default: 'Welcome'
    },
    subtitle: {
      type: String,
      default: 'Click to Enter'
    },
    buttonText: {
      type: String,
      default: 'Open Curtains'
    },
    theme: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'royal', 'elegant', 'gold', 'saffron'].includes(value)
    },
    speed: {
      type: Number,
      default: 2000,
      validator: (value) => value >= 1000 && value <= 10000
    },
    autoOpen: {
      type: Boolean,
      default: false
    },
    autoOpenDelay: {
      type: Number,
      default: 5000
    },
    sparkles: {
      type: Boolean,
      default: true
    },
    sound: {
      type: Boolean,
      default: false
    },
    leftCurtainImage: {
      type: String,
      default: ''
    },
    rightCurtainImage: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default: () => ({})
    },
    audioSrc: {
      type: String,
      default: ''
    }
  },
  emits: ['open', 'complete'],
  setup(props, { emit }) {
    // Reactive state
    const isOpen = ref(false)
    const isAnimating = ref(false)
    const curtainRef = ref(null)
    const audioRef = ref(null)
    
    // Intervals and timeouts
    let sparkleInterval = null
    let autoOpenTimeout = null
    
    // Inline styles
    const containerStyle = computed(() => ({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 10000,
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      '--speed': props.speed + 'ms',
      ...props.style
    }))
    
    const leftPanelStyle = computed(() => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '100%',
      background: props.leftCurtainImage 
        ? `url(${props.leftCurtainImage})` 
        : themes[props.theme] || themes.default,
      backgroundSize: props.leftCurtainImage ? 'cover' : 'initial',
      backgroundPosition: props.leftCurtainImage ? 'center' : 'initial',
      transition: 'transform var(--speed, 2s) cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformOrigin: 'left center',
      zIndex: 2,
      transform: isAnimating.value ? 'translateX(-100%) rotateY(-15deg)' : 'none'
    }))
    
    const rightPanelStyle = computed(() => ({
      position: 'absolute',
      top: 0,
      right: 0,
      width: '50%',
      height: '100%',
      background: props.rightCurtainImage 
        ? `url(${props.rightCurtainImage})` 
        : themes[props.theme] || themes.default,
      backgroundSize: props.rightCurtainImage ? 'cover' : 'initial',
      backgroundPosition: props.rightCurtainImage ? 'center' : 'initial',
      transition: 'transform var(--speed, 2s) cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformOrigin: 'right center',
      zIndex: 2,
      transform: isAnimating.value ? 'translateX(100%) rotateY(15deg)' : 'none'
    }))
    
    const contentStyle = computed(() => ({
      position: 'relative',
      zIndex: 3,
      textAlign: 'center',
      color: 'white',
      padding: '2rem',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }))
    
    const titleStyle = computed(() => ({
      fontSize: '3rem',
      margin: '0 0 1rem 0',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      animation: 'glow 2s ease-in-out infinite alternate'
    }))
    
    const subtitleStyle = computed(() => ({
      fontSize: '1.2rem',
      margin: '0 0 2rem 0',
      opacity: 0.9
    }))
    
    const buttonStyle = computed(() => ({
      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
      color: '#000',
      border: 'none',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      borderRadius: '50px',
      cursor: isAnimating.value ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 auto',
      opacity: isAnimating.value ? 0.6 : 1
    }))
    
    // Create sparkle particles
    const createSparkles = () => {
      if (!props.sparkles || !curtainRef.value) return
      
      const container = curtainRef.value
      const sparkle = document.createElement('div')
      
      Object.assign(sparkle.style, {
        position: 'absolute',
        width: '4px',
        height: '4px',
        background: '#FFD700',
        borderRadius: '50%',
        animation: 'sparkle linear forwards',
        pointerEvents: 'none',
        left: Math.random() * 100 + '%',
        animationDuration: (Math.random() * 3 + 2) + 's'
      })
      
      container.appendChild(sparkle)
      
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle)
        }
      }, 5000)
    }
    
    // Handle curtain opening
    const handleOpen = () => {
      if (isAnimating.value || isOpen.value) return
      
      isAnimating.value = true
      emit('open')
      
      // Play sound if enabled
      if (props.sound && audioRef.value) {
        audioRef.value.play().catch(e => console.log('Audio play failed:', e))
      }
      
      // Start sparkle animation
      if (props.sparkles) {
        sparkleInterval = setInterval(createSparkles, 200)
      }
      
      // Complete animation
      setTimeout(() => {
        isOpen.value = true
        isAnimating.value = false
        
        // Stop sparkles
        if (sparkleInterval) {
          clearInterval(sparkleInterval)
          sparkleInterval = null
        }
        
        emit('complete')
      }, props.speed)
    }
    
    // Auto-open watcher
    watch(
      () => [props.autoOpen, props.autoOpenDelay, isOpen.value, isAnimating.value],
      ([autoOpen, autoOpenDelay, currentIsOpen, currentIsAnimating]) => {
        if (autoOpenTimeout) {
          clearTimeout(autoOpenTimeout)
          autoOpenTimeout = null
        }
        
        if (autoOpen && !currentIsOpen && !currentIsAnimating) {
          autoOpenTimeout = setTimeout(handleOpen, autoOpenDelay)
        }
      },
      { immediate: true }
    )
    
    // Cleanup on unmount
    onUnmounted(() => {
      if (sparkleInterval) {
        clearInterval(sparkleInterval)
      }
      if (autoOpenTimeout) {
        clearTimeout(autoOpenTimeout)
      }
    })
    
    // Expose methods for template refs
    const reset = () => {
      isOpen.value = false
      isAnimating.value = false
    }
    
    const forceOpen = () => {
      handleOpen()
    }
    
    return {
      // Reactive data
      isOpen,
      isAnimating,
      curtainRef,
      audioRef,
      
      // Computed styles
      containerStyle,
      leftPanelStyle,
      rightPanelStyle,
      contentStyle,
      titleStyle,
      subtitleStyle,
      buttonStyle,
      
      // Methods
      handleOpen,
      reset,
      forceOpen
    }
  }
}
</script>

<style scoped>
@keyframes glow {
  from { 
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.3); 
  }
  to { 
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.6); 
  }
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
    font-size: 2rem !important;
  }
  
  .curtain-content {
    padding: 1.5rem !important;
  }
  
  button {
    padding: 0.8rem 1.5rem !important;
    font-size: 1rem !important;
  }
}
</style>