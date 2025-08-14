import React from "react"
import { COLORS } from "./PixelatedComponents"

export const TechStackBadge = ({
  tag,
  variant = "primary",
  size = "sm",
  isActive = false,
  ...props
}) => {
  const variants = {
    primary: {
      bg: isActive ? COLORS.dark : "transparent",
      border: isActive ? COLORS.orange : COLORS.darkVariant,
      text: isActive ? COLORS.light : "#999",
    },
    secondary: {
      bg: isActive ? COLORS.light : "transparent",
      border: isActive ? COLORS.teal : "#777",
      text: isActive ? COLORS.dark : "#aaa",
    },
    accent: {
      bg: isActive ? COLORS.dark : "transparent",
      border: isActive ? COLORS.brightOrange : "#666",
      text: isActive ? COLORS.light : "#bbb",
    },
    pink: {
      bg: isActive ? COLORS.light : "transparent",
      border: isActive ? COLORS.pink : "#888",
      text: isActive ? COLORS.dark : "#ccc",
    },
  }

  const sizes = {
    xs: { padding: "2px 4px", fontSize: "8px", borderWidth: "1px" },
    sm: { padding: "2px 6px", fontSize: "9px", borderWidth: "1px" },
    md: { padding: "4px 8px", fontSize: "11px", borderWidth: "2px" },
    lg: { padding: "6px 12px", fontSize: "13px", borderWidth: "2px" },
  }

  const scheme = variants[variant]
  const sizeStyles = sizes[size]

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: scheme.bg,
    fontSize: sizeStyles.fontSize,
    fontWeight: "bold",
    padding: sizeStyles.padding,
    border: `${sizeStyles.borderWidth} solid ${scheme.border}`,
    borderRadius: "4px",
    color: scheme.text,
    boxShadow: isActive
      ? `2px 2px 0 ${scheme.border}`
      : `1px 1px 0 ${scheme.border}`,
    transition: "all 0.2s ease",
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    imageRendering: "pixelated",
    whiteSpace: "nowrap",
    userSelect: "none",
  }

  return (
    <span style={baseStyles} {...props}>
      {tag}
    </span>
  )
}

export const TechStackList = ({
  tags,
  maxVisible = 3,
  variant = "primary",
  size = "sm",
  isActive = false,
  showAll = false,
}) => {
  const visibleTags = showAll ? tags : tags.slice(0, maxVisible)
  const remainingCount = tags.length - maxVisible

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
      {visibleTags.map((tag, i) => (
        <TechStackBadge
          key={i}
          tag={tag}
          variant={variant}
          size={size}
          isActive={isActive}
        />
      ))}
      {!showAll && remainingCount > 0 && (
        <TechStackBadge
          tag={`+${remainingCount}`}
          variant="secondary"
          size={size}
          isActive={false}
        />
      )}
    </div>
  )
}
