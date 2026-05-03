import * as React from "react"

// ============================================
// TWEAK HERE
// ============================================

const CONFIG = {
    size: 8,
    color: "#8625BE",
    opacity: 1,
    glowStrength: 6, // 0 for no glow
    glowColor: "#8625BE", // usually same as color
    shine: true, // 3D specular highlight
}

// ============================================

export default function Bullet() {
    const c = CONFIG

    return (
        <span
            style={{
                display: "block",
                width: c.size,
                height: c.size,
                minWidth: c.size,
                minHeight: c.size,
                borderRadius: "50%",
                opacity: c.opacity,
                boxShadow:
                    c.glowStrength > 0
                        ? `0 0 ${c.glowStrength}px ${c.glowColor}`
                        : "none",
                background: c.shine
                    ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), transparent 50%),
                       radial-gradient(circle, ${c.color}, ${c.color}99 70%, transparent 100%)`
                    : c.color,
            }}
        />
    )
}
