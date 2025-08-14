import React, { useState } from "react"
import { PixelSectionTitle, COLORS } from "../../components/PixelatedComponents"
import { experiences } from "../../data"

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(0)
  const [floatingEnabled, setFloatingEnabled] = useState(true)

  const currentExp = experiences[selectedExperience]

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        padding: "40px 20px",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        position: "relative",
      }}
    >
      <style>{`
        @keyframes hologramFloat {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg); 
            box-shadow: 0 20px 40px ${currentExp.colorScheme.glow}, 
                        0 0 60px ${currentExp.colorScheme.glow},
                        inset 0 0 30px rgba(0, 0, 0, 0.2);
          }
          50% { 
            transform: translateY(-8px) rotateX(2deg); 
            box-shadow: 0 30px 60px ${currentExp.colorScheme.glow}, 
                        0 0 80px ${currentExp.colorScheme.glow},
                        inset 0 0 40px rgba(0, 0, 0, 0.3);
          }
        }
        
        @keyframes hologramPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes hologramShimmer {
          0%, 100% { filter: hue-rotate(0deg) saturate(100%); }
          50% { filter: hue-rotate(15deg) saturate(120%); }
        }
        
        @keyframes hologramScan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes dataStream {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        
        @keyframes textGlitch {
          0%, 95%, 100% { 
            transform: translateX(0);
            filter: hue-rotate(0deg);
            text-shadow: 1px 0 rgba(255, 140, 66, 0.3), -1px 0 rgba(74, 155, 142, 0.3);
          }
          1% { 
            transform: translateX(-1px);
            text-shadow: 1px 0 rgba(255, 140, 66, 0.5), -1px 0 rgba(74, 155, 142, 0.5);
          }
          2% { 
            transform: translateX(1px);
            text-shadow: 1px 0 rgba(255, 140, 66, 0.3), -1px 0 rgba(74, 155, 142, 0.3);
          }
          3% { 
            transform: translateX(0);
            text-shadow: 1px 0 rgba(255, 140, 66, 0.3), -1px 0 rgba(74, 155, 142, 0.3);
          }
        }
        
        @keyframes hologramFlicker {
          0%, 98%, 100% { opacity: 1; }
          99% { opacity: 0.95; }
        }
        
        .glitch-text {
          animation: textGlitch 0.3s infinite linear alternate-reverse;
        }
        
        .experience-details-hologram::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, ${currentExp.colorScheme.glow}, transparent, ${currentExp.colorScheme.glow});
          border-radius: 22px;
          z-index: -1;
          animation: hologramShimmer 2s ease-in-out infinite;
          /* Add a subtle dark overlay for contrast */
          box-shadow: 0 0 0 1000px rgba(20,22,30,0.45) inset;
        }
        
        .hologram-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: ${currentExp.colorScheme.border};
          border-radius: 50%;
          animation: dataStream 3s linear infinite;
        }
        
        /* Floating animations for company cards */
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

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title and Float Toggle */}
        <div
          style={{
            position: "relative",
            marginBottom: "40px",
            textAlign: "left",
          }}
        >
          <PixelSectionTitle title="EXPERIENCE" />
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
              border: `2px solid ${
                floatingEnabled ? currentExp.colorScheme.border : "#555"
              }`,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              boxShadow: floatingEnabled
                ? `3px 3px 0 ${currentExp.colorScheme.border}`
                : "3px 3px 0 #555",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(1px, 1px)"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? `2px 2px 0 ${currentExp.colorScheme.border}`
                : "2px 2px 0 #555"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? `3px 3px 0 ${currentExp.colorScheme.border}`
                : "3px 3px 0 #555"
            }}
          >
            {floatingEnabled ? "DISABLE FLOAT" : "ENABLE FLOAT"}
          </button>
        </div>

        {/* Main Content Layout */}
        <div style={{ padding: "40px" }}>
          <div
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "flex-start",
              minHeight: "600px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Left Side - Company List */}
            <div
              style={{
                width: "300px",
                flexShrink: 0,
              }}
            >
              <h3
                style={{
                  color: "#fee1c7",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Companies
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {experiences.map((exp, index) => {
                  const isSelected = selectedExperience === index
                  const scheme = exp.colorScheme

                  return (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExperience(index)}
                      style={{
                        backgroundColor: "transparent",
                        backdropFilter: "blur(15px)",
                        border: `3px solid ${scheme.border}`,
                        borderRadius: "12px",
                        boxShadow: isSelected
                          ? `0 0 30px ${exp.colorScheme.glow}, 4px 4px 0 ${exp.colorScheme.border}, inset 0 0 20px ${exp.colorScheme.glow}`
                          : `0 0 10px ${scheme.glow}, 3px 3px 0 ${scheme.border}`,
                        padding: "16px",
                        transition:
                          "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        transform: isSelected
                          ? "translate(-2px, -2px) scale(1.02)"
                          : "none",
                        position: "relative",
                        overflow: "hidden",
                        animation: floatingEnabled
                          ? `float-${index % 3} ${
                              6 + index * 0.5
                            }s ease-in-out infinite`
                          : "none",
                        animationDelay: `${index * 0.5}s`,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform =
                            "translate(-1px, -1px) scale(1.01)"
                          e.currentTarget.style.boxShadow = `0 0 15px ${scheme.glow}, 4px 4px 0 ${scheme.border}`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = "none"
                          e.currentTarget.style.boxShadow = `0 0 10px ${scheme.glow}, 3px 3px 0 ${scheme.border}`
                        }
                      }}
                    >
                      {/* Company Logo */}
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "transparent",
                          border: `2px solid ${scheme.border}`,
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={exp.logo}
                          alt={exp.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            imageRendering: "pixelated",
                          }}
                        />
                      </div>

                      {/* Company Info */}
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            color: scheme.text,
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                            textShadow: isSelected
                              ? `0 0 8px ${scheme.glow}`
                              : "none",
                          }}
                        >
                          {exp.name}
                        </h4>
                        <p
                          style={{
                            color: scheme.border,
                            fontSize: "12px",
                            fontWeight: "bold",
                            opacity: 0.9,
                          }}
                        >
                          {exp.joined} - {exp.end}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Side - Experience Details */}
            <div
              className="experience-details-hologram"
              style={{
                flex: 1,
                maxWidth: "650px",
                backgroundColor: "transparent",
                backdropFilter: "blur(20px)",
                border: `4px solid ${currentExp.colorScheme.border}`,
                borderRadius: "20px",
                padding: "32px",
                boxShadow: `
                0 0 40px ${currentExp.colorScheme.glow},
                inset 0 0 30px rgba(0, 0, 0, 0.3),
                6px 6px 0 ${currentExp.colorScheme.border},
                0 0 80px ${currentExp.colorScheme.glow}
              `,
                background: `
                radial-gradient(
                  ellipse 200% 100% at 0% 50%,
                  ${currentExp.colorScheme.glow} 0%,
                  transparent 40%
                ),
                repeating-linear-gradient(
                  45deg,
                  transparent 0px,
                  transparent 2px,
                  ${currentExp.colorScheme.glow} 2px,
                  ${currentExp.colorScheme.glow} 3px
                ),
                linear-gradient(
                  135deg,
                  rgba(42, 52, 65, 0.4),
                  rgba(42, 52, 65, 0.25)
                )
              `,
                minHeight: "420px",
                position: "relative",
                zIndex: 100,
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animation: floatingEnabled
                  ? "hologramFloat 4s ease-in-out infinite, hologramShimmer 3s infinite ease-in-out"
                  : "none",
              }}
            >
              {/* Holographic Particles Background */}
              <div className="hologram-particles">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                      opacity: Math.random() * 0.6 + 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Holographic Projection Lines */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 4px,
                    ${currentExp.colorScheme.glow} 4px,
                    ${currentExp.colorScheme.glow} 5px
                  )
                `,
                  opacity: 0.1,
                  animation: "hologramScan 4s infinite linear",
                  pointerEvents: "none",
                }}
              />

              {/* Corner Light Effects */}
              <div
                style={{
                  position: "absolute",
                  top: "-2px",
                  left: "-2px",
                  width: "40px",
                  height: "40px",
                  background: `radial-gradient(circle, ${currentExp.colorScheme.glow}, transparent)`,
                  borderRadius: "50%",
                  opacity: 0.6,
                  animation: "cornerPulse 2s infinite ease-in-out",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "40px",
                  height: "40px",
                  background: `radial-gradient(circle, ${currentExp.colorScheme.glow}, transparent)`,
                  borderRadius: "50%",
                  opacity: 0.6,
                  animation: "cornerPulse 2s infinite ease-in-out 1s",
                }}
              />
              {/* Company Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "transparent",
                    border: `3px solid ${currentExp.colorScheme.border}`,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxShadow: `0 0 15px ${currentExp.colorScheme.glow}`,
                  }}
                >
                  <img
                    src={currentExp.logo}
                    alt={currentExp.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      imageRendering: "pixelated",
                    }}
                  />
                </div>

                <div>
                  <h2
                    className="glitch-text"
                    style={{
                      color: currentExp.colorScheme.titleText,
                      fontSize: "32px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      textShadow: `
                      0 0 8px ${currentExp.colorScheme.glow},
                      1px 0 ${currentExp.colorScheme.glow}, 
                      -1px 0 ${currentExp.colorScheme.glow}
                    `,
                      animation:
                        "textGlitch 3s infinite linear, hologramFlicker 8s infinite ease-in-out",
                    }}
                  >
                    {currentExp.name}
                  </h2>
                  <p
                    className="glitch-text"
                    style={{
                      color: currentExp.colorScheme.subtitleText,
                      fontSize: "20px",
                      fontWeight: "bold",
                      textShadow: `
                      0 0 5px ${currentExp.colorScheme.glow},
                      1px 0 ${currentExp.colorScheme.glow}, 
                      -1px 0 ${currentExp.colorScheme.glow}
                    `,
                      animation:
                        "textGlitch 4s infinite linear 0.5s, hologramFlicker 10s infinite ease-in-out",
                    }}
                  >
                    {currentExp.title}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div
                className="glitch-text"
                style={{
                  backgroundColor: "rgba(42, 52, 65, 0.3)",
                  border: `2px solid ${currentExp.colorScheme.dateText}`,
                  borderRadius: "8px",
                  color: currentExp.colorScheme.dateText,
                  boxShadow: `
                  3px 3px 0 ${currentExp.colorScheme.dateText},
                  0 0 8px ${currentExp.colorScheme.glow}
                `,
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                  fontWeight: "bold",
                  padding: "12px 20px",
                  fontSize: "16px",
                  margin: "0 0 24px 0",
                  width: "fit-content",
                  textShadow: `
                  0 0 5px ${currentExp.colorScheme.glow},
                  1px 0 ${currentExp.colorScheme.glow}, 
                  -1px 0 ${currentExp.colorScheme.glow}
                `,
                  animation:
                    "textGlitch 5s infinite linear 1s, hologramFlicker 12s infinite ease-in-out",
                }}
              >
                {currentExp.joined} - {currentExp.end}
              </div>

              {/* Description */}
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: "14px",
                  backgroundColor: "rgba(42, 52, 65, 0.4)",
                  color: currentExp.colorScheme.descriptionText,
                  border: `2px solid ${currentExp.colorScheme.border}`,
                  boxShadow: `
                  3px 3px 0 ${currentExp.colorScheme.border},
                  0 0 10px ${currentExp.colorScheme.glow}
                `,
                  borderRadius: "12px",
                  marginBottom: "20px",
                  lineHeight: "1.5",
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                  backdropFilter: "blur(10px)",
                  textShadow: `0 0 4px ${currentExp.colorScheme.glow}`,
                  animation: "hologramFlicker 15s infinite ease-in-out",
                  maxHeight: "120px",
                  overflow: "hidden",
                }}
              >
                <span
                  className="glitch-text"
                  style={{
                    animation: "textGlitch 6s infinite linear 2s",
                  }}
                >
                  {currentExp.bio}
                </span>
              </div>

              {/* Technologies */}
              <div>
                <h3
                  className="glitch-text"
                  style={{
                    color: currentExp.colorScheme.titleText,
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    textShadow: `
                    0 0 5px ${currentExp.colorScheme.glow},
                    1px 0 ${currentExp.colorScheme.glow}, 
                    -1px 0 ${currentExp.colorScheme.glow}
                  `,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    animation:
                      "textGlitch 4s infinite linear 1.5s, hologramFlicker 8s infinite ease-in-out",
                  }}
                >
                  Technologies Used:
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  {currentExp.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="glitch-text"
                      style={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        backgroundColor: "rgba(42, 52, 65, 0.3)",
                        color: currentExp.colorScheme.techText,
                        border: `2px solid ${currentExp.colorScheme.techText}`,
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontFamily: '"Roboto Mono", "Courier New", monospace',
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                        boxShadow: `
                        2px 2px 0 ${currentExp.colorScheme.techText},
                        0 0 5px ${currentExp.colorScheme.glow}
                      `,
                        textShadow: `
                        0 0 4px ${currentExp.colorScheme.glow},
                        1px 0 ${currentExp.colorScheme.glow}, 
                        -1px 0 ${currentExp.colorScheme.glow}
                      `,
                        animation: `textGlitch ${
                          3 + i * 0.5
                        }s infinite linear ${i * 0.3}s, hologramFlicker ${
                          8 + i * 2
                        }s infinite ease-in-out`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
