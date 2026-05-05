import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import SplashScreen from './components/SplashScreen'
import CustomCursor from './components/CustomCursor'
import WhatIDo from './components/WhatIDo'

export default function App() {
  return (
    <>
      <CustomCursor />
      <SplashScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </>
  )
}
