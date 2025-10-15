/**
 * TypeScript Definitions for Curtain Opening Effect
 * Author: Tulsiram Kushwah
 * LinkedIn: https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/
 * Facebook: https://www.facebook.com/ramp00786
 */

// Common types
export type CurtainTheme = 'default' | 'royal' | 'elegant' | 'gold' | 'saffron';

export interface CurtainOptions {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  theme?: CurtainTheme;
  speed?: number;
  autoOpen?: boolean;
  autoOpenDelay?: number;
  sparkles?: boolean;
  sound?: boolean;
  leftCurtainImage?: string;
  rightCurtainImage?: string;
}

export interface CurtainCallbacks {
  onOpen?: () => void;
  onComplete?: () => void;
}

// Vanilla JavaScript API
export interface CurtainEffect {
  init(options?: CurtainOptions & CurtainCallbacks): void;
  open(): void;
  reset(): void;
  destroy(): void;
}

export declare const CurtainEffect: CurtainEffect;

// React Component Types
import { ComponentType, ReactNode, CSSProperties } from 'react';

export interface ReactCurtainProps extends CurtainOptions, CurtainCallbacks {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export declare const CurtainEffect: ComponentType<ReactCurtainProps>;

export interface UseCurtainEffectOptions {
  speed?: number;
  onComplete?: () => void;
}

export interface UseCurtainEffectReturn {
  isOpen: boolean;
  isAnimating: boolean;
  open: () => void;
  reset: () => void;
}

export declare function useCurtainEffect(options?: UseCurtainEffectOptions): UseCurtainEffectReturn;

export declare function withCurtainEffect<P = {}>(
  WrappedComponent: ComponentType<P>,
  curtainProps?: Partial<ReactCurtainProps>
): ComponentType<P>;

// Vue Component Types
import { DefineComponent, Ref, ComputedRef } from 'vue';

export interface VueCurtainProps extends CurtainOptions {
  className?: string;
  style?: Record<string, any>;
}

export interface VueCurtainEmits {
  open: () => void;
  complete: () => void;
}

export declare const CurtainEffect: DefineComponent<VueCurtainProps, {}, {}, {}, {}, {}, {}, VueCurtainEmits>;

export interface VueUseCurtainEffectReturn {
  isOpen: Ref<boolean>;
  isAnimating: Ref<boolean>;
  canOpen: ComputedRef<boolean>;
  open: () => void;
  reset: () => void;
}

export declare function useCurtainEffect(options?: UseCurtainEffectOptions): VueUseCurtainEffectReturn;

export interface CurtainStore {
  curtains: ComputedRef<Map<string, any>>;
  register: (id: string, curtainRef: any) => void;
  unregister: (id: string) => void;
  openCurtain: (id: string) => void;
  resetCurtain: (id: string) => void;
  openAll: () => void;
  resetAll: () => void;
}

export declare function useCurtainStore(): CurtainStore;

export interface CurtainPluginOptions extends Partial<CurtainOptions> {
  defaultTheme?: CurtainTheme;
  defaultSpeed?: number;
}

export declare const CurtainEffectPlugin: {
  install(app: any, options?: CurtainPluginOptions): void;
};

// Web Component Types
export interface CurtainEffectElement extends HTMLElement {
  title: string;
  subtitle: string;
  buttonText: string;
  theme: CurtainTheme;
  speed: number;
  autoOpen: boolean;
  autoOpenDelay: number;
  sparkles: boolean;
  sound: boolean;
  leftCurtainImage: string;
  rightCurtainImage: string;
  
  open(): void;
  reset(): void;
}

export interface CurtainEffectElementConstructor {
  new (): CurtainEffectElement;
}

export declare const CurtainEffectElement: CurtainEffectElementConstructor;

// Custom Events
export interface CurtainOpenEvent extends CustomEvent {
  detail: {
    element: CurtainEffectElement;
  };
}

export interface CurtainCompleteEvent extends CustomEvent {
  detail: {
    element: CurtainEffectElement;
  };
}

// Global declarations for Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'curtain-effect': Partial<CurtainOptions> & {
        'button-text'?: string;
        'auto-open'?: boolean;
        'auto-open-delay'?: number;
        'left-curtain-image'?: string;
        'right-curtain-image'?: string;
        onCurtainOpen?: (event: CurtainOpenEvent) => void;
        onCurtainComplete?: (event: CurtainCompleteEvent) => void;
      };
    }
  }
  
  interface HTMLElementTagNameMap {
    'curtain-effect': CurtainEffectElement;
  }
  
  interface WindowEventMap {
    'curtain-open': CurtainOpenEvent;
    'curtain-complete': CurtainCompleteEvent;
  }
}

// Module declarations
declare module 'curtain-opening-effect' {
  export * from './index';
}

declare module 'curtain-opening-effect/react' {
  export { CurtainEffect, useCurtainEffect, withCurtainEffect } from './index';
}

declare module 'curtain-opening-effect/vue' {
  export { CurtainEffect, useCurtainEffect, useCurtainStore, CurtainEffectPlugin } from './index';
}

declare module 'curtain-opening-effect/web-component' {
  export { CurtainEffectElement } from './index';
}