import { BrowserRouter } from "react-router-dom"
import { Hero, GalaxyModel, TopNavbar, AnimatedSection } from "./components"
import SpacemanModel from "./components/SpacemanModel"
import { About } from "./pages/About"
import { Experience } from "./pages/Experience"
import { useState, useEffect } from "react"
import { Contact } from "./pages/Contact"
import { Projects } from "./pages/Projects"

const App = () => {
  const [scrollY, setScrollY] = useState(0)

  // ============================================================
  // 🎯 SCROLL TRACKING CONFIGURATION
  // ============================================================

  const SCROLL_THROTTLE_DELAY = 16 // (kept for clarity / future use)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ============================================================
  // 🎯 GALAXY BACKGROUND CONFIGURATION
  // ============================================================

  const showGalaxyBackground = true // Always show galaxy background

  const heroSectionHeight =
    typeof window !== "undefined" ? window.innerHeight : 800
  const galaxyOpacity = scrollY < heroSectionHeight ? 1.0 : 0.4

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Top Navbar - Only appears when about section is at 100vh */}
        <TopNavbar />

        {/* Spaceman overlay */}
        <SpacemanModel scrollY={scrollY} />

        {/* Galaxy background */}
        <div
          className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10"
          style={{
            opacity: galaxyOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <GalaxyModel
            scrollY={scrollY}
            showBackground={showGalaxyBackground}
          />
        </div>

        {/* CONTENT SECTIONS */}
        <div className="relative bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen z-20">
          <Hero scrollY={scrollY} />
        </div>

        <AnimatedSection
          id="about"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{
            isolation: "isolate",
            pointerEvents: "auto",
          }}
          animationType="fadeUp"
          delay={0.2}
        >
          <About />
        </AnimatedSection>

        <AnimatedSection
          id="experience"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
          animationType="slideLeft"
          delay={0.1}
        >
          <Experience />
        </AnimatedSection>

        <AnimatedSection
          id="projects"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
          animationType="slideRight"
          delay={0.1}
        >
          <Projects />
        </AnimatedSection>

        <AnimatedSection
          id="contact"
          className="relative z-30 bg-primary/80 backdrop-blur-sm"
          style={{ isolation: "isolate", pointerEvents: "auto" }}
          animationType="fadeUp"
          delay={0.1}
        >
          <Contact />
        </AnimatedSection>
      </div>
    </BrowserRouter>
  )
}

export default App
