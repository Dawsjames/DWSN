import React, { useState } from "react"
import { PixelSectionTitle } from "../../components/PixelatedComponents"
import { ProjectModal } from "../../components/ProjectModal"
import { TechStackList } from "../../components/TechStackBadge"
import { projects } from "../../data/projects"

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalProject, setModalProject] = useState(null)
  const [floatingEnabled, setFloatingEnabled] = useState(true)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    )
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
  }

  const openModal = (project) => {
    setModalProject(project)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalProject(null)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px 20px",
        backgroundColor: "transparent", // Remove background to show Background.glb
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Title (Top-Left) via shared component */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "48px",
            textAlign: "left",
            position: "relative",
          }}
        >
          <PixelSectionTitle title="PROJECTS" />

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
              border: `2px solid ${floatingEnabled ? "#4a9b8e" : "#555"}`,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              boxShadow: floatingEnabled
                ? "3px 3px 0 #4a9b8e"
                : "3px 3px 0 #555",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(1px, 1px)"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? "2px 2px 0 #4a9b8e"
                : "2px 2px 0 #555"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? "3px 3px 0 #4a9b8e"
                : "3px 3px 0 #555"
            }}
          >
            {floatingEnabled ? "DISABLE FLOAT" : "ENABLE FLOAT"}
          </button>
        </div>
      </div>

      {/* Animated Background Elements - Outline Only */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "40px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            border: "2px solid #ff6b47",
            backgroundColor: "transparent",
            animation: "twinkle 2s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "160px",
            right: "80px",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            border: "2px solid #4a9b8e",
            backgroundColor: "transparent",
            animation: "pulse 2s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "128px",
            left: "25%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            border: "2px solid #ff8c42",
            backgroundColor: "transparent",
            animation: "twinkle 2s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* PIXELATED CAROUSEL LAYOUT WITH CHARACTER SELECTION EFFECTS */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "550px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "48px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1400px",
              position: "relative",
              perspective: "1000px",
            }}
          >
            {projects.map((project, index) => {
              const position = index - currentIndex
              const isActive = index === currentIndex

              const getCardTransform = () => {
                if (position === 0)
                  return "scale(1) translateX(0) translateZ(0)"
                const baseSpacing = 300
                const scaleReduction = 0.15
                const depthSpacing = 20
                const absPosition = Math.abs(position)
                const scale = Math.max(0.6, 1 - absPosition * scaleReduction)
                const translateX = position * baseSpacing
                const translateZ = -absPosition * depthSpacing
                return `scale(${scale}) translateX(${translateX}px) translateZ(${translateZ}px)`
              }

              const getCardOpacity = () => {
                const absPosition = Math.abs(position)
                if (absPosition === 0) return 1
                if (absPosition === 1) return 0.85
                if (absPosition === 2) return 0.65
                return 0.4
              }

              const getCardZIndex = () => 50 - Math.abs(position)

              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: "320px",
                    height: "420px",
                    transition: "all 0.4s ease-out", // Faster carousel transition
                    transform: getCardTransform(),
                    opacity: getCardOpacity(),
                    zIndex: getCardZIndex(),
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (isActive) {
                      // If clicking the active card, open modal
                      openModal(project)
                    } else {
                      // If clicking non-active card, navigate to it
                      goToIndex(index)
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CharacterCard
                    data={project}
                    index={index}
                    isSelected={isActive}
                    isHovered={index === hoveredIndex}
                    position={position}
                    onModalOpen={openModal}
                    floatingEnabled={floatingEnabled}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
            marginTop: "32px",
          }}
        >
          <button
            onClick={goToPrevious}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              border: "3px solid #4a9b8e",
              backgroundColor: "transparent",
              color: "#fee1c7",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "4px 4px 0 #4a9b8e",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)"
              e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(74, 155, 142, 0.1)"
              e.currentTarget.style.boxShadow = "6px 6px 0 #4a9b8e"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div style={{ display: "flex", gap: "16px" }}>
            {projects.map((_, index) => (
              <button
                key={index}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: `3px solid ${
                    index === currentIndex ? "#ff8c42" : "#666"
                  }`,
                  backgroundColor:
                    index === currentIndex ? "#ff8c42" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform:
                    index === currentIndex ? "scale(1.25)" : "scale(1)",
                  boxShadow:
                    index === currentIndex
                      ? "0 0 20px rgba(255, 140, 66, 0.4)"
                      : "none",
                }}
                onClick={() => goToIndex(index)}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.borderColor = "#4a9b8e"
                    e.currentTarget.style.backgroundColor =
                      "rgba(74, 155, 142, 0.2)"
                    e.currentTarget.style.transform = "scale(1.1)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.borderColor = "#666"
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.transform = "scale(1)"
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              border: "3px solid #4a9b8e",
              backgroundColor: "transparent",
              color: "#fee1c7",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "4px 4px 0 #4a9b8e",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)"
              e.currentTarget.style.boxShadow = "2px 2px 0 #4a9b8e"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(74, 155, 142, 0.1)"
              e.currentTarget.style.boxShadow = "6px 6px 0 #4a9b8e"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.boxShadow = "4px 4px 0 #4a9b8e"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Project Counter */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              backdropFilter: "blur(10px)",
              border: "3px solid rgba(74, 155, 142, 0.3)",
              borderRadius: "24px",
              padding: "12px 24px",
              backgroundColor: "transparent",
            }}
          >
            <span
              style={{
                color: "#fee1c7",
                fontSize: "18px",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              Project
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#ff8c42",
              }}
            >
              {currentIndex + 1}
            </span>
            <span
              style={{
                color: "#fee1c7",
                fontSize: "18px",
                fontFamily: '"Roboto Mono", "Courier New", monospace',
              }}
            >
              of
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#4a9b8e",
              }}
            >
              {projects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Project Modal */}
      <ProjectModal
        project={modalProject}
        isOpen={showModal}
        onClose={closeModal}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Character Selection Animations */
        @keyframes pulse-number {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 140, 66, 0.4);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 140, 66, 0.8);
          }
        }
        
        @keyframes slide-in-reveal {
          0% { 
            opacity: 0;
            transform: translateX(50px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-lock {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes reveal-sweep {
          0% { 
            left: -100%;
          }
          100% { 
            left: 100%;
          }
        }
        
        @keyframes text-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes tags-reveal {
          0% { 
            opacity: 0;
            transform: translateY(10px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes tag-pop {
          0% { 
            opacity: 0;
            transform: scale(0.5);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes buttons-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes detail-panel-reveal {
          0% { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes badge-reveal {
          0% { 
            opacity: 0;
            transform: scale(0.8);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes title-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes description-reveal {
          0% { 
            opacity: 0;
            transform: translateY(15px);
          }
          100% { 
            opacity: 0.9;
            transform: translateY(0);
          }
        }
        
        @keyframes modal-appear {
          0% { 
            opacity: 0;
            transform: scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Floating animations for cards - preserve z-index */
        @keyframes float-0 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-10px) rotate(1deg);
          }
        }
        
        @keyframes float-1 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-8px) rotate(-1deg);
          }
        }
        
        @keyframes float-2 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-12px) rotate(0.5deg);
          }
        }
      `}</style>
    </div>
  )
}

// Character Selection Card - Dark Silhouette that reveals on selection (for Carousel)
const CharacterCard = ({
  data,
  index,
  isSelected,
  isHovered,
  position,
  onModalOpen,
  floatingEnabled,
}) => {
  const colors = [
    {
      bg: "#2a3441",
      border: "#ff6b47",
      text: "#fee1c7",
      accent: "#ff6b47",
      glow: "rgba(255, 107, 71, 0.6)",
    },
    {
      bg: "#fee1c7",
      border: "#4a9b8e",
      text: "#2a3441",
      accent: "#4a9b8e",
      glow: "rgba(74, 155, 142, 0.6)",
    },
    {
      bg: "#2a3441",
      border: "#ff8c42",
      text: "#fee1c7",
      accent: "#ff8c42",
      glow: "rgba(255, 140, 66, 0.6)",
    },
    {
      bg: "#2a3441",
      border: "#d4a5c7",
      text: "#fee1c7",
      accent: "#d4a5c7",
      glow: "rgba(212, 165, 199, 0.6)",
    },
  ]
  const colorScheme = colors[index % colors.length]

  // Always visible cards with subtle selection enhancement
  const getCardState = () => {
    if (isSelected) {
      return {
        filter: "brightness(1) saturate(1)",
        boxShadow: `0 0 20px ${colorScheme.glow}, 4px 4px 0 ${colorScheme.border}`,
        borderColor: colorScheme.border,
        borderWidth: "4px",
        opacity: 1,
      }
    } else if (isHovered) {
      return {
        filter: "brightness(0.95) saturate(0.9)",
        boxShadow: `0 0 10px ${colorScheme.glow}, 3px 3px 0 ${colorScheme.border}`,
        borderColor: colorScheme.border,
        borderWidth: "3px",
        opacity: 0.9,
      }
    } else {
      // Always visible - no dark silhouette
      return {
        filter: "brightness(0.8) saturate(0.7)",
        boxShadow: "3px 3px 0 #666",
        borderColor: "#666",
        borderWidth: "3px",
        opacity: 0.7,
      }
    }
  }

  const cardState = getCardState()

  // Truncate description
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: isSelected ? `${colorScheme.bg}CC` : "#1a1a1aAA", // Semi-transparent backgrounds
        border: `${cardState.borderWidth} solid ${cardState.borderColor}`,
        borderRadius: "16px",
        boxShadow: cardState.boxShadow,
        overflow: "hidden",
        transition: "all 0.2s ease", // Faster transitions
        cursor: "pointer",
        filter: cardState.filter,
        opacity: cardState.opacity,
        backdropFilter: "blur(10px)", // Glass effect
        animation: floatingEnabled
          ? `float-${index % 3} 6s ease-in-out infinite`
          : "none",
        animationDelay: `${index * 0.5}s`,
      }}
    >
      {/* Simple Project Number - Always visible */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: isSelected ? colorScheme.border : "#555",
          color: isSelected ? colorScheme.bg : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "12px",
          fontFamily: '"Roboto Mono", "Courier New", monospace',
          border: `2px solid ${isSelected ? colorScheme.bg : "#333"}`,
          zIndex: 10,
          transition: "all 0.2s ease",
        }}
      >
        {index + 1}
      </div>

      {/* Private Project Indicator */}
      {data.isPrivate && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "2px 6px",
            fontSize: "8px",
            fontWeight: "bold",
            color: "#ff8c42",
            backgroundColor: "rgba(255, 140, 66, 0.2)",
            border: "1px solid #ff8c42",
            borderRadius: "4px",
            fontFamily: '"Roboto Mono", "Courier New", monospace',
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          🔒 PRIVATE
        </div>
      )}

      {/* Remove lock icon and selection badge - cards are always visible */}

      {/* Project Image - Always visible, no overlay */}
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundImage: `url(${data.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Light overlay only for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isSelected
              ? "linear-gradient(to top, rgba(42, 52, 65, 0.3), transparent)"
              : "linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)",
            transition: "background 0.2s ease",
          }}
        />

        {/* Simple reveal effect - reduced intensity */}
        {isSelected && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${colorScheme.glow}30, transparent)`,
              animation: "reveal-sweep 0.4s ease-out",
            }}
          />
        )}
      </div>

      {/* Project Content - Always visible */}
      <div
        style={{
          padding: "16px",
          height: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: 1, // Always visible
          transition: "opacity 0.2s ease",
        }}
      >
        {/* Title Section - Always visible */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              color: isSelected ? colorScheme.text : "#ccc",
              fontSize: isSelected ? "16px" : "14px",
              fontWeight: "bold",
              marginBottom: "8px",
              lineHeight: "1.3",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              transition: "all 0.2s ease",
            }}
          >
            {data.name}
          </h3>

          {/* Description - Always visible, more visible when selected */}
          <p
            style={{
              color: isSelected ? colorScheme.text : "#aaa",
              fontSize: "11px",
              lineHeight: "1.4",
              margin: 0,
              marginBottom: "8px",
              opacity: isSelected ? 1 : 0.7,
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              transition: "all 0.2s ease",
              height: "44px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {truncateText(data.description, 80)}
          </p>
        </div>

        {/* Tech Stack Tags - Always visible, more prominent when selected */}
        {data.tags && (
          <div
            style={{ marginBottom: "12px", height: "32px", overflow: "hidden" }}
          >
            <TechStackList
              tags={data.tags}
              maxVisible={3}
              variant={isSelected ? "primary" : "secondary"}
              size="xs"
              isActive={isSelected}
              showAll={false}
            />
          </div>
        )}

        {/* Preview Button - Always visible, more prominent when selected */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onModalOpen(data)
            }}
            disabled={!data.live_demo_link && !data.source_code_link}
            style={{
              width: "100%",
              padding: "6px 10px",
              fontSize: "10px",
              fontWeight: "bold",
              color: isSelected ? colorScheme.text : "#bbb",
              backgroundColor: "transparent",
              border: `2px solid ${isSelected ? colorScheme.border : "#777"}`,
              borderRadius: "4px",
              cursor:
                !data.live_demo_link && !data.source_code_link
                  ? "not-allowed"
                  : "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              boxShadow: isSelected
                ? `2px 2px 0 ${colorScheme.border}`
                : "2px 2px 0 #555",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              opacity:
                !data.live_demo_link && !data.source_code_link
                  ? 0.4
                  : isSelected
                  ? 1
                  : 0.7,
            }}
            onMouseDown={(e) => {
              if (!data.live_demo_link && !data.source_code_link) return
              e.currentTarget.style.transform = "translate(1px, 1px)"
              e.currentTarget.style.boxShadow = isSelected
                ? `1px 1px 0 ${colorScheme.border}`
                : "1px 1px 0 #555"
            }}
            onMouseUp={(e) => {
              if (!data.live_demo_link && !data.source_code_link) return
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = isSelected
                ? `2px 2px 0 ${colorScheme.border}`
                : "2px 2px 0 #555"
            }}
          >
            <svg
              style={{ width: "10px", height: "10px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            PREVIEW
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects
