import { create } from 'zustand';

interface DecoderState {
  // Global presentation state
  currentSlide: number;
  totalSlides: number;
  
  // Slide 2: Truth Table & Logic State
  inputs: {
    en: boolean;
    a: boolean;
    b: boolean;
  };
  
  // Actions
  nextSlide: () => void;
  prevSlide: () => void;
  setSlide: (index: number) => void;
  toggleInput: (inputName: keyof DecoderState['inputs']) => void;
}

export const useDecoderStore = create<DecoderState>((set) => ({
  currentSlide: 0,
  totalSlides: 7,
  
  inputs: {
    en: false,
    a: false,
    b: false,
  },
  
  nextSlide: () => set((state) => ({ 
    currentSlide: Math.min(state.currentSlide + 1, state.totalSlides - 1) 
  })),
  
  prevSlide: () => set((state) => ({ 
    currentSlide: Math.max(state.currentSlide - 1, 0) 
  })),
  
  setSlide: (index: number) => set((state) => ({ 
    currentSlide: Math.max(0, Math.min(index, state.totalSlides - 1)) 
  })),
  
  toggleInput: (inputName) => set((state) => ({
    inputs: {
      ...state.inputs,
      [inputName]: !state.inputs[inputName]
    }
  }))
}));
