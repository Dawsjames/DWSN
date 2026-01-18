// About.jsx
import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  PixelSectionTitle,
  PixelCard,
  PixelBadge,
  COLORS,
} from "../../components/PixelatedComponents"
import TSU from "../../assets/education_logos/TSU.png"

// ====== TUNABLE SIZING ======
const PANEL_HEIGHT = 620 // fixed height for each of the 3 columns
const EDU_ROW_H = 112 // each education row height
const AVATAR = 88 // avatar size in About panel

// ---------- Floating Tech Logos Portal (unchanged) ----------
function TechLogosPortal({ anchorRef, items, zIndex = 1200 }) {
  const [rect, setRect] = useState(null)

  useEffect(() => {
    const el = anchorRef?.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [anchorRef])

  if (!rect) return null

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        zIndex,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {items.map((tech) => (
          <div
            key={tech.name}
            style={{
              position: "absolute",
              left: tech.x,
              top: tech.y,
              transform: "translate(-50%, -50%)",
              animation: `floatY 3.4s ease-in-out infinite`,
              animationDelay: tech.delay || "0s",
              pointerEvents: "auto",
              width: tech.size || 48,
              height: tech.size || 48,
              display: "grid",
              placeItems: "center",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)",
              border: `2px solid ${tech.ring || COLORS.teal}`,
              boxShadow: `0 0 0 3px rgba(0,0,0,0.08)`,
              transition:
                "transform .15s ease, box-shadow .15s ease, filter .15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translate(-50%, -50%) scale(1.15)"
              e.currentTarget.style.boxShadow = `0 0 20px 4px ${
                tech.glow || "rgba(74,155,142,0.6)"
              }`
              const img = e.currentTarget.querySelector("img")
              if (img) {
                img.style.filter = "drop-shadow(0 0 6px rgba(255,255,255,0.55))"
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(-50%, -50%)"
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,0,0,0.08)`
              const img = e.currentTarget.querySelector("img")
              if (img) img.style.filter = "none"
            }}
          >
            <img
              src={tech.src}
              alt={tech.name}
              width={(tech.size || 48) - 10}
              height={(tech.size || 48) - 10}
              draggable={false}
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
                userSelect: "none",
                pointerEvents: "none",
                transition: "filter .15s ease",
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>
    </div>,
    document.body,
  )
}

const TECH_LOGOS = [
  {
    name: "React",
    src: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
    x: "10%",
    y: "20%",
    delay: "0s",
    ring: "#61dafb",
    glow: "rgba(97,218,251,0.6)",
    size: 76,
  },
  {
    name: "Node.js",
    src: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    x: "70%",
    y: "15%",
    delay: "0.4s",
    ring: "#339933",
    glow: "rgba(51,153,51,0.55)",
    size: 54,
  },
  {
    name: "Three.js",
    src: "https://raw.githubusercontent.com/bestofjs/bestofjs/master/apps/web/public/logos/threejs.svg",
    x: "20%",
    y: "60%",
    delay: "0.8s",
    ring: "#000000",
    glow: "rgba(0,0,0,0.45)",
    size: 50,
  },
  {
    name: "MongoDB",
    src: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
    x: "80%",
    y: "70%",
    delay: "1.2s",
    ring: "#47A248",
    glow: "rgba(71,162,72,0.55)",
    size: 54,
  },
  {
    name: "TypeScript",
    src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    x: "50%",
    y: "40%",
    delay: "1.6s",
    ring: "#3178C6",
    glow: "rgba(49,120,198,0.55)",
    size: 52,
  },
  {
    name: "Vue.js",
    src: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
    x: "30%",
    y: "75%",
    delay: "2.0s",
    ring: "#42b883",
    glow: "rgba(66,184,131,0.5)",
    size: 74,
  },
  {
    name: "n8n",
    src: "https://raw.githubusercontent.com/bestofjs/bestofjs/master/apps/web/public/logos/n8n.svg",
    x: "60%",
    y: "80%",
    delay: "2.4s",
    ring: "#EF652A",
    glow: "rgba(239,101,42,0.5)",
    size: 108,
  },
  {
    name: "Docker",
    src: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
    x: "85%",
    y: "25%",
    delay: "3.6s",
    ring: "#2496ED",
    glow: "rgba(36,150,237,0.5)",
    size: 56,
  },
  {
    name: "Git",
    src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    x: "25%",
    y: "45%",
    delay: "4.0s",
    ring: "#F05032",
    glow: "rgba(240,80,50,0.5)",
    size: 52,
  },
  {
    name: "PostgreSQL",
    src: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg",
    x: "50%",
    y: "85%",
    delay: "4.8s",
    ring: "#336791",
    glow: "rgba(51,103,145,0.5)",
    size: 54,
  },
  {
    name: "Supabase",
    src: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
    x: "85%",
    y: "80%",
    delay: "5.6s",
    ring: "#3ECF8E",
    glow: "rgba(62,207,142,0.5)",
    size: 58,
  },
]

// ---------- UI ----------
const About = () => {
  const [floatingEnabled, setFloatingEnabled] = useState(true)
  const techAreaRef = useRef(null)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        padding: "40px 20px",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ position: "relative", marginBottom: "48px" }}>
          <PixelSectionTitle
            title="ABOUT"
            subtitle="Discover my journey, skills, and passion for creating digital experiences"
            color={COLORS.brightOrange}
          />

          {/* Floating Animation Toggle */}
          <button
            onClick={() => setFloatingEnabled(!floatingEnabled)}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              padding: "8px 16px",
              fontSize: "12px",
              fontWeight: "bold",
              color: floatingEnabled ? "#fee1c7" : "#888",
              backgroundColor: "transparent",
              border: `2px solid ${floatingEnabled ? "#ff8c42" : "#555"}`,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              boxShadow: floatingEnabled
                ? "3px 3px 0 #ff8c42"
                : "3px 3px 0 #555",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(1px, 1px)"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? "2px 2px 0 #ff8c42"
                : "2px 2px 0 #555"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? "3px 3px 0 #ff8c42"
                : "3px 3px 0 #555"
            }}
          >
            {floatingEnabled ? "DISABLE FLOAT" : "ENABLE FLOAT"}
          </button>
        </div>

        {/* 2 columns: About • Tech Stack */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* ABOUT (left) */}
          <div
            style={{
              animation: floatingEnabled
                ? "float-0 8s ease-in-out infinite"
                : "none",
              animationDelay: "0s",
            }}
          >
            <PixelCard
              variant="dark"
              glowColor="rgba(255, 140, 66, 0.30)"
              style={{
                height: PANEL_HEIGHT,
                display: "flex",
                flexDirection: "column",
                borderColor: COLORS.orange,
                backgroundColor: "transparent", // Fully transparent
                backdropFilter: "blur(15px)", // Enhanced glass effect
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: AVATAR,
                    height: AVATAR,
                    borderRadius: 12,
                    border: `3px solid ${COLORS.orange}`,
                    background: COLORS.darkVariant,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: `4px 4px 0 ${COLORS.orange}`,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 900,
                      color: COLORS.light,
                      fontSize: 22,
                      letterSpacing: 1,
                    }}
                  >
                    DOS
                  </span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2
                    style={{
                      color: COLORS.orange,
                      fontSize: 26,
                      margin: 0,
                      lineHeight: 1.1,
                      letterSpacing: 1,
                    }}
                  >
                    Developer
                  </h2>
                  <p
                    style={{
                      color: COLORS.light,
                      opacity: 0.85,
                      fontSize: 14,
                      margin: "6px 0 0 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Vue • React • n8n
                  </p>
                </div>
              </div>

              {/* Bio body (scrollable) */}
              <div style={{ overflowY: "auto", paddingRight: 6, flex: 1 }}>
                <p
                  style={{
                    color: COLORS.light,
                    fontSize: 16,
                    lineHeight: 1.6,
                    marginTop: 6,
                    marginBottom: 20,
                  }}
                >
                  Passionate programmer focused on fast iteration and thoughtful
                  UX. I ship web apps, 3D visuals, and services that scale.
                </p>

                <p
                  style={{
                    color: COLORS.light,
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginBottom: 20,
                    opacity: 0.9,
                  }}
                >
                  With a strong foundation in modern web technologies and a keen
                  eye for detail, I specialize in creating seamless user
                  experiences and robust backend systems. My expertise spans
                  across frontend frameworks, 3D graphics, and cloud-based
                  solutions.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  {["Frontend", "3D/Graphics", "Backend", "Cloud"].map((t) => (
                    <PixelBadge key={t} variant="primary">
                      {t}
                    </PixelBadge>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 18,
                    padding: 16,
                    background: COLORS.darkVariant,
                    border: `3px solid ${COLORS.orange}`,
                    borderRadius: 8,
                    boxShadow: `4px 4px 0 ${COLORS.orange}`,
                  }}
                >
                  <p
                    style={{
                      color: COLORS.brightOrange,
                      fontSize: 15,
                      margin: 0,
                      fontStyle: "italic",
                      textAlign: "center",
                    }}
                  >
                    "Always learning, always growing."
                  </p>
                </div>

                {/* Education Section - Compact Style */}
                <div
                  style={{
                    marginTop: 24,
                    padding: 24,
                    background: COLORS.darkVariant,
                    border: `3px solid ${COLORS.orange}`,
                    borderRadius: 8,
                    boxShadow: `4px 4px 0 ${COLORS.orange}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: 140,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        color: COLORS.orange,
                        fontSize: 18,
                        margin: "0 0 16px 0",
                        fontWeight: 900,
                        letterSpacing: 1,
                      }}
                    >
                      EDUCATION
                    </h4>
                    <div
                      style={{
                        fontSize: 15,
                        color: COLORS.light,
                        lineHeight: 1.6,
                      }}
                    >
                      <div style={{ marginBottom: 12 }}>
                        <strong style={{ color: COLORS.orange }}>
                          Tarlac State University
                        </strong>
                        <br />
                        Bachelor of Science in Information Technology
                        (2019–2023)
                      </div>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>
                        Cum Laude • Tech Clubs • Systems & Web Development
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 12,
                      display: "grid",
                      placeItems: "center",
                      background: COLORS.darkVariant,
                      border: `3px solid ${COLORS.orange}`,
                      boxShadow: `4px 4px 0 ${COLORS.orange}`,
                      marginLeft: 20,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={TSU}
                      alt="Tarlac State University"
                      width={90}
                      height={90}
                      style={{
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
          {/* TECH STACK (right) — fixed height + outline like other cards */}
          <div
            style={{
              animation: floatingEnabled
                ? "float-1 9s ease-in-out infinite"
                : "none",
              animationDelay: "1s",
            }}
          >
            <PixelCard
              variant="light"
              glowColor="rgba(74, 155, 142, 0.30)"
              style={{
                borderColor: COLORS.teal,
                borderRadius: 10,
                height: PANEL_HEIGHT,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", flex: 1 }} ref={techAreaRef}>
                <TechLogosPortal
                  anchorRef={techAreaRef}
                  items={TECH_LOGOS}
                  zIndex={1200}
                />
              </div>
            </PixelCard>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        
        /* Floating animations for cards */
        @keyframes float-0 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(0.5deg);
          }
        }
        
        @keyframes float-1 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-6px) rotate(-0.5deg);
          }
        }
        
        @keyframes float-2 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-10px) rotate(0.3deg);
          }
        }
      `}</style>
    </div>
  )
}

export default About
