import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PixelButton } from "./PixelatedComponents"
import { TechStackList } from "./TechStackBadge"

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(false)

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        goToPrevImage()
      } else if (e.key === "ArrowRight") {
        goToNextImage()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isOpen, currentImageIndex, project])

  if (!project || !isOpen) return null

  const images = project.images || [project.thumbnail]
  const hasMultipleImages = images.length > 1

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  const handleImageLoadStart = () => {
    setIsImageLoading(true)
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: { duration: 0.3 },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              backgroundColor: "#2a3441",
              border: "4px solid #4a9b8e",
              borderRadius: "20px",
              padding: "0",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "hidden",
              boxShadow: `
                0 0 40px rgba(74, 155, 142, 0.4), 
                8px 8px 0 #4a9b8e,
                0 25px 50px -12px rgba(0, 0, 0, 0.8)
              `,
              // Floating effect
              animation: "modalFloat 6s ease-in-out infinite",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px 16px",
                borderBottom: "2px solid rgba(74, 155, 142, 0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    color: "#fee1c7",
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: 0,
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                  }}
                >
                  {project.name}
                </h2>
                {project.isPrivate && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "4px",
                      padding: "2px 8px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#ff8c42",
                      border: "1px solid #ff8c42",
                      borderRadius: "4px",
                      backgroundColor: "rgba(255, 140, 66, 0.1)",
                      fontFamily: '"Roboto Mono", "Courier New", monospace',
                    }}
                  >
                    🔒 PRIVATE
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "2px solid #ff6b47",
                  borderRadius: "8px",
                  color: "#fee1c7",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "8px 12px",
                  fontWeight: "bold",
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                  transition: "all 0.2s ease",
                  boxShadow: "2px 2px 0 #ff6b47",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(1px, 1px)"
                  e.currentTarget.style.boxShadow = "1px 1px 0 #ff6b47"
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "2px 2px 0 #ff6b47"
                }}
              >
                ✕
              </button>
            </div>

            {/* Image Carousel */}
            <div
              style={{
                position: "relative",
                height: "450px", // Optimized for wide SCADA interface displays
                overflow: "hidden",
                backgroundColor: "#1a1a1a",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={`${project.name} - Image ${currentImageIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Changed from cover to contain for better fit
                    transition: "opacity 0.3s ease",
                    opacity: isImageLoading ? 0.5 : 1,
                  }}
                  onLoad={handleImageLoad}
                  onLoadStart={handleImageLoadStart}
                />

                {/* Loading indicator */}
                {isImageLoading && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fee1c7",
                      fontSize: "14px",
                      fontFamily: '"Roboto Mono", "Courier New", monospace',
                    }}
                  >
                    Loading...
                  </div>
                )}

                {/* Navigation arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={goToPrevImage}
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(42, 52, 65, 0.8)",
                        border: "2px solid #4a9b8e",
                        borderRadius: "8px",
                        color: "#fee1c7",
                        cursor: "pointer",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.2s ease",
                        boxShadow: "2px 2px 0 #4a9b8e",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 18l-6-6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={goToNextImage}
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(42, 52, 65, 0.8)",
                        border: "2px solid #4a9b8e",
                        borderRadius: "8px",
                        color: "#fee1c7",
                        cursor: "pointer",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.2s ease",
                        boxShadow: "2px 2px 0 #4a9b8e",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image counter */}
                {hasMultipleImages && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      background: "rgba(42, 52, 65, 0.9)",
                      border: "1px solid #4a9b8e",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      color: "#fee1c7",
                      fontSize: "12px",
                      fontFamily: '"Roboto Mono", "Courier New", monospace',
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Image dots */}
              {hasMultipleImages && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        border: `2px solid ${
                          index === currentImageIndex ? "#4a9b8e" : "#666"
                        }`,
                        backgroundColor:
                          index === currentImageIndex
                            ? "#4a9b8e"
                            : "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        transform:
                          index === currentImageIndex
                            ? "scale(1.25)"
                            : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div
              style={{
                padding: "24px",
                maxHeight: "calc(90vh - 550px)", // Adjusted for taller image container
                overflowY: "auto",
              }}
            >
              {/* Description */}
              <p
                style={{
                  color: "#fee1c7",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  marginBottom: "24px",
                  fontFamily: '"Roboto Mono", "Courier New", monospace',
                  opacity: 0.9,
                }}
              >
                {project.description}
              </p>

              {/* Tech Stack */}
              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    color: "#4a9b8e",
                    fontSize: "16px",
                    marginBottom: "12px",
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                    fontWeight: "bold",
                  }}
                >
                  Technologies Used:
                </h4>
                <TechStackList
                  tags={project.tags}
                  variant="primary"
                  size="md"
                  isActive={true}
                  showAll={true}
                />
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <PixelButton
                  variant="accent"
                  size="md"
                  filled={true}
                  disabled={!project.live_demo_link}
                  onClick={() =>
                    project.live_demo_link &&
                    window.open(project.live_demo_link, "_blank")
                  }
                >
                  <svg
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </PixelButton>

                <PixelButton
                  variant="secondary"
                  size="md"
                  filled={true}
                  disabled={!project.source_code_link}
                  onClick={() =>
                    project.source_code_link &&
                    window.open(project.source_code_link, "_blank")
                  }
                >
                  <svg
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Source Code
                </PixelButton>
              </div>
            </div>
          </motion.div>

          {/* Floating animation keyframes */}
          <style>{`
            @keyframes modalFloat {
              0%, 100% { 
                transform: translateY(0px) rotate(0deg);
              }
              25% { 
                transform: translateY(-4px) rotate(0.5deg);
              }
              50% { 
                transform: translateY(-2px) rotate(0deg);
              }
              75% { 
                transform: translateY(-6px) rotate(-0.5deg);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
