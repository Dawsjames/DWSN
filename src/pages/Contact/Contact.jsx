import React, { useState } from "react"
import {
  PixelContainer,
  PixelSectionTitle,
  PixelInput,
  PixelTextarea,
  PixelButton,
  COLORS,
} from "../../components/PixelatedComponents"
import resumePdf from "../../assets/Dawson_Marcos_Resume.pdf"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [floatingEnabled, setFloatingEnabled] = useState(true)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to send message")

      setFormData({ name: "", email: "", message: "" })
      setSubmitStatus("success")
    } catch (err) {
      console.error(err)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dawsjames",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
            fill="#ff8c42"
          />
        </svg>
      ),
      color: COLORS.orange,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/dawson-james",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6C1.13 6 0.02 4.881 0.02 3.5C0.02 2.12 1.13 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM5 8H0V24H5V8ZM12.982 8H8.014V24H12.982V15.601C12.982 10.831 19.012 10.44 19.012 15.601V24H24V13.869C24 6.989 15.078 7.241 12.982 11.587V8Z"
            fill="#ff8c42"
          />
        </svg>
      ),
      color: COLORS.teal,
    },
    {
      name: "Resume",
      url: resumePdf,
      download: true,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9H15C13.8954 9 13 8.10457 13 7V1H6ZM15 1V7H21L15 1ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H8Z"
            fill="#ff8c42"
          />
        </svg>
      ),
      color: COLORS.pink,
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent", // Remove background to show Background.glb
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title (Top-Left) via shared component */}
        <div
          style={{
            marginBottom: "24px",
            textAlign: "left",
            position: "relative",
          }}
        >
          <PixelSectionTitle
            title="CONTACT"
            subtitle="Let's build something amazing together"
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
              border: `2px solid ${floatingEnabled ? "#ff6b47" : "#555"}`,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              boxShadow: floatingEnabled
                ? "3px 3px 0 #ff6b47"
                : "3px 3px 0 #555",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(1px, 1px)"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? "2px 2px 0 #ff6b47"
                : "2px 2px 0 #555"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = floatingEnabled
                ? "3px 3px 0 #ff6b47"
                : "3px 3px 0 #555"
            }}
          >
            {floatingEnabled ? "DISABLE FLOAT" : "ENABLE FLOAT"}
          </button>
        </div>

        {/* Contact Form - Full Width */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom: "60px",
            animation: floatingEnabled
              ? "float-0 8s ease-in-out infinite"
              : "none",
            animationDelay: "0s",
          }}
        >
          <PixelContainer variant="dark" glowColor="rgba(255, 107, 71, 0.3)">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: COLORS.orange,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Send Message 📨
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <PixelInput
                variant="dark"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <PixelInput
                variant="dark"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <PixelTextarea
                variant="dark"
                name="message"
                placeholder="Hi! Let's discuss your project and bring your ideas to life..."
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                required
              />

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                }}
              >
                <PixelButton
                  variant="primary"
                  filled
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Launching... 🚀" : "Launch Message"}
                </PixelButton>

                <PixelButton
                  variant="accent"
                  type="button"
                  onClick={() => {
                    setFormData({ name: "", email: "", message: "" })
                    setSubmitStatus(null)
                  }}
                  disabled={isSubmitting}
                >
                  Reset
                </PixelButton>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    border: "2px solid #22c55e",
                    borderRadius: "8px",
                    color: "#22c55e",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "2px solid #ef4444",
                    borderRadius: "8px",
                    color: "#ef4444",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ❌ Failed to send message. Please try again or contact me
                  directly.
                </div>
              )}
            </form>
          </PixelContainer>
        </div>

        {/* Social Links */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            animation: floatingEnabled
              ? "float-1 7s ease-in-out infinite"
              : "none",
            animationDelay: "1s",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: COLORS.brightOrange,
              marginBottom: "32px",
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            Connect With Me
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.51428 8.63934C8.125 8.25006 7.49183 8.25006 7.10255 8.63934C6.71327 9.02862 6.71327 9.66178 7.10255 10.0511L8.93989 11.8884C9.81725 12.7658 10.2559 13.2044 10.8232 13.2044C11.3905 13.2044 11.8291 12.7658 12.7065 11.8884L14.544 10.0511C14.9333 9.66178 14.9333 9.02862 14.544 8.63934C14.1547 8.25006 13.5216 8.25006 13.1323 8.63934L11.8823 9.88934C11.5918 10.1798 11.0546 10.1798 10.7641 9.88934L9.51428 8.63934ZM7.10255 13.9489C6.71327 14.3382 6.71327 14.9714 7.10255 15.3607C7.49183 15.7499 8.125 15.7499 8.51428 15.3607L9.76414 14.1108C10.0546 13.8202 10.5918 13.8202 10.8823 14.1108L12.1323 15.3607C12.5216 15.7499 13.1547 15.7499 13.544 15.3607C13.9333 14.9714 13.9333 14.3382 13.544 13.9489L12.7065 13.1116C11.8291 12.2342 11.3905 11.7956 10.8232 11.7956C10.2559 11.7956 9.81725 12.2342 8.93989 13.1116L7.10255 13.9489Z"
                fill="#ff8c42"
              />
            </svg>
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {socialLinks.map((link, index) => (
              <SocialButton key={index} {...link} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  )
}

// Info Item Component
const InfoItem = ({ icon, text }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px",
      backgroundColor: COLORS.lightVariant,
      borderRadius: "6px",
      border: `2px solid ${COLORS.teal}`,
    }}
  >
    <span style={{ fontSize: "18px" }}>{icon}</span>
    <span
      style={{
        color: COLORS.dark,
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      {text}
    </span>
  </div>
)

// Social Button Component
const SocialButton = ({ name, url, icon, color }) => {
  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = "translate(2px, 2px)"
    e.currentTarget.style.boxShadow = `2px 2px 0 ${color}`
  }

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = "none"
    e.currentTarget.style.boxShadow = `4px 4px 0 ${color}`
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = COLORS.darkVariant
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent"
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download={name === "Resume" ? "Dawson_Marcos_Resume.pdf" : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100px",
        height: "100px",
        gap: "8px",
        padding: "12px",
        backgroundColor: "transparent",
        border: `3px solid ${color}`,
        borderRadius: "8px",
        boxShadow: `4px 4px 0 ${color}`,
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.1s ease-in",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          color: COLORS.light,
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </a>
  )
}

export default Contact
