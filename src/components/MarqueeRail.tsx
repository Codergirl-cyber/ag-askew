import * as React from "react"
import { motion } from "framer-motion"

// platform data
const PLATFORMS = [
    { name: "Roobet", color: "#FF2D55" },
    { name: "Bybit", color: "#F7A600" },
    { name: "Binance", color: "#F3BA2F" },
    { name: "Stake", color: "#00FFB2" },
    { name: "1xBet", color: "#1E90FF" },
    { name: "KuCoin", color: "#23AF91" },
    { name: "OKX", color: "#999999" },
    { name: "Bitget", color: "#00E5FF" },
    { name: "Kraken", color: "#5841D8" },
    { name: "Hyperliquid", color: "#A855F7" },
    { name: "MEXC", color: "#0052FF" },
    { name: "PrimeXBT", color: "#00D4FF" },
    { name: "Rollbit", color: "#FFD700" },
    { name: "DraftKings", color: "#53FC18" },
    { name: "Polymarket", color: "#6C5CE7" },
    { name: "Bet365", color: "#008000" },
]

// duplicate for seamless loop
const ITEMS = [...PLATFORMS, ...PLATFORMS]

export default function MarqueeRail() {
    // Font loaded globally

    return (
        <div style={container}>
            {/* FULL EDGE GRADIENT OVERLAY */}
            <div style={gradientOverlay} />

            <motion.div
                style={track}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35,
                }}
            >
                {ITEMS.map((platform, i) => (
                    <div key={i} style={item}>
                        <span
                            style={{
                                ...dot,
                                background: `
                                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 40%),
                                    radial-gradient(circle, ${platform.color}, ${platform.color}99 70%, transparent 100%)
                                `,
                                boxShadow: `0 0 12px ${platform.color}55`,
                                transform: `scale(${0.9 + (i % 3) * 0.05})`,
                            }}
                        />
                        <span style={text}>{platform.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

// container
const container: React.CSSProperties = {
    overflow: "hidden",
    width: "100%",
    height: "90px",
    padding: "18px 0",
    position: "relative",
    background: "transparent",
}

// scrolling track
const track: React.CSSProperties = {
    display: "flex",
    gap: "40px",
    width: "max-content",
    alignItems: "center",
}

// each item
const item: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    whiteSpace: "nowrap",
}

// glowing gradient dot
const dot: React.CSSProperties = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    opacity: 0.9,
    filter: "saturate(0.9)",
}

// text styling
const text: React.CSSProperties = {
    fontSize: "14px",
    color: "#FFFFFF",
    fontWeight: 800,
    letterSpacing: "0.02em",
    fontFamily: "'Sora', sans-serif",
}

// full edge gradient (ALL sides)
const gradientOverlay: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    background: `linear-gradient(to right, rgba(25,149,254,0.85), transparent 15%, transparent 85%, rgba(25,149,254,0.85))`
}
