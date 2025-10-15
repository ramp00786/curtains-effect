/**
 * Vue Curtain Effect - Main Export and Composables
 * Author: Tulsiram Kushwah
 * LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
 * Facebook: https://www.facebook.com/ramp00786
 */

import CurtainEffect from './CurtainEffectStandalone.vue'
import { ref, computed, onUnmounted } from 'vue'

/**
 * Composable for curtain effect control
 */
export const useCurtainEffect = (options = {}) => {
  const isOpen = ref(false)
  const isAnimating = ref(false)
  
  let animationTimeout = null
  
  const open = () => {
    if (!isAnimating.value && !isOpen.value) {
      isAnimating.value = true
      
      animationTimeout = setTimeout(() => {
        isOpen.value = true
        isAnimating.value = false
        options.onComplete && options.onComplete()
      }, options.speed || 2000)
    }
  }
  
  const reset = () => {
    if (animationTimeout) {
      clearTimeout(animationTimeout)
      animationTimeout = null
    }
    isOpen.value = false
    isAnimating.value = false
  }
  
  const canOpen = computed(() => !isAnimating.value && !isOpen.value)
  
  // Cleanup on unmount
  onUnmounted(() => {
    if (animationTimeout) {
      clearTimeout(animationTimeout)
    }
  })
  
  return {
    isOpen,
    isAnimating,
    canOpen,
    open,
    reset
  }
}

/**
 * Global curtain effect state management
 */
export const useCurtainStore = () => {
  const curtains = ref(new Map())
  
  const register = (id, curtainRef) => {
    curtains.value.set(id, curtainRef)
  }
  
  const unregister = (id) => {
    curtains.value.delete(id)
  }
  
  const openCurtain = (id) => {
    const curtain = curtains.value.get(id)
    if (curtain && curtain.forceOpen) {
      curtain.forceOpen()
    }
  }
  
  const resetCurtain = (id) => {
    const curtain = curtains.value.get(id)
    if (curtain && curtain.reset) {
      curtain.reset()
    }
  }
  
  const openAll = () => {
    curtains.value.forEach(curtain => {
      if (curtain.forceOpen) curtain.forceOpen()
    })
  }
  
  const resetAll = () => {
    curtains.value.forEach(curtain => {
      if (curtain.reset) curtain.reset()
    })
  }
  
  return {
    curtains: computed(() => curtains.value),
    register,
    unregister,
    openCurtain,
    resetCurtain,
    openAll,
    resetAll
  }
}

/**
 * Plugin for global installation
 */
export const CurtainEffectPlugin = {
  install(app, options = {}) {
    // Register component globally
    app.component('CurtainEffect', CurtainEffect)
    
    // Provide global configuration
    app.provide('curtainConfig', {
      defaultTheme: 'default',
      defaultSpeed: 2000,
      ...options
    })
    
    // Add global properties
    app.config.globalProperties.$curtain = {
      themes: ['default', 'royal', 'elegant', 'gold', 'saffron']
    }
  }
}

// Named exports
export { CurtainEffect }

// Default export
export default CurtainEffect