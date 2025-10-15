<!--
  Vue Curtain Effect Component
  Author: Tulsiram Kushwah
  LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
  Facebook: https://www.facebook.com/ramp00786
  
  A Vue 3 component for beautiful curtain opening animations
  with Composition API and proper reactivity.
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
    :style="style"
  >
    <!-- Left Curtain Panel -->
    <div 
      class="curtain-panel curtain-left"
      :style="leftCurtainStyle"
    />
    
    <!-- Right Curtain Panel -->
    <div 
      class="curtain-panel curtain-right"
      :style="rightCurtainStyle"
    />
    
    <!-- Curtain Content -->
    <div class="curtain-content">
      <div class="curtain-text">
        <h1 class="curtain-title">{{ title }}</h1>
        <p class="curtain-subtitle">{{ subtitle }}</p>
      </div>
      <button 
        class="curtain-button"
        @click="handleOpen"
        :disabled="isAnimating"
      >
        <i class="fas fa-play"></i>
        {{ buttonText }}
      </button>
    </div>
    
    <!-- Audio element for sound effects -->
    <audio 
      v-if="sound" 
      ref="audioRef" 
      preload="auto"
    >
      <source src="/curtain-assets/sounds/clapping.wav" type="audio/wav" />
      <source src="/curtain-assets/sounds/fanfare.wav" type="audio/wav" />
    </audio>
  </div>
  
  <!-- Content after curtains open -->
  <div v-else>
    <slot />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

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
    
    // Computed styles
    const leftCurtainStyle = computed(() => {
      return props.leftCurtainImage 
        ? { backgroundImage: `url(${props.leftCurtainImage})` }
        : {}
    })
    
    const rightCurtainStyle = computed(() => {
      return props.rightCurtainImage 
        ? { backgroundImage: `url(${props.rightCurtainImage})` }
        : {}
    })
    
    // Create sparkle particles
    const createSparkles = () => {
      if (!props.sparkles || !curtainRef.value) return
      
      const container = curtainRef.value
      const sparkle = document.createElement('div')
      sparkle.className = 'curtain-sparkle'
      sparkle.style.left = Math.random() * 100 + '%'
      sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's'
      
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
      
      // Computed
      leftCurtainStyle,
      rightCurtainStyle,
      
      // Methods
      handleOpen,
      reset,
      forceOpen
    }
  }
}
</script>

<style scoped>
/* Import the main CSS file */
@import './CurtainEffect.css';

/* Vue-specific scoped styles if needed */
.curtain-container {
  /* Any Vue-specific overrides */
}
</style>