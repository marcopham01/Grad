import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

// cuộn có quán tính cho cả trang, chạy chung nhịp với GSAP để ScrollTrigger không bị lệch; tắt khi người dùng bật giảm chuyển động
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
