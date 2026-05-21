import * as React from "react"
import { useRef, useEffect, useLayoutEffect } from "react"

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

// ~35s per full platform list (matches prior design)
const SCROLL_PX_PER_SEC = 85
const LOOP_COPIES = 3

function PlatformItems({ copyIndex }: { copyIndex: number }) {
    return (
        <>
            {PLATFORMS.map((platform, i) => (
                <div key={`${copyIndex}-${i}`} style={item}>
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
        </>
    )
}

export default function MarqueeRail() {
    const trackRef = useRef<HTMLDivElement>(null)
    const loopRef = useRef<HTMLDivElement>(null)
    const offsetRef = useRef(0)
    const loopWidthRef = useRef(0)
    const lastTimeRef = useRef<number | null>(null)
    const rafRef = useRef(0)

    useLayoutEffect(() => {
        const measure = () => {
            loopWidthRef.current = loopRef.current?.offsetWidth ?? 0
        }
        measure()

        const loop = loopRef.current
        if (!loop) return

        const observer = new ResizeObserver(measure)
        observer.observe(loop)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const tick = (time: number) => {
            const track = trackRef.current
            if (!track) {
                rafRef.current = requestAnimationFrame(tick)
                return
            }

            const loopWidth = loopWidthRef.current
            if (loopWidth > 0) {
                if (lastTimeRef.current !== null) {
                    const deltaSec = (time - lastTimeRef.current) / 1000
                    offsetRef.current -= SCROLL_PX_PER_SEC * deltaSec

                    // Wrap inside one copy width — identical content, no visible jump
                    while (offsetRef.current <= -loopWidth) {
                        offsetRef.current += loopWidth
                    }
                }

                track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
            }

            lastTimeRef.current = time
            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    return (
        <div style={container}>
            <div style={gradientOverlay} />

            <div ref={trackRef} style={track}>
                {Array.from({ length: LOOP_COPIES }, (_, copyIndex) => (
                    <div
                        key={copyIndex}
                        ref={copyIndex === 0 ? loopRef : undefined}
                        aria-hidden={copyIndex > 0 || undefined}
                        style={loopSegment}
                    >
                        <PlatformItems copyIndex={copyIndex} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const container: React.CSSProperties = {
    overflow: "hidden",
    width: "100%",
    height: "90px",
    padding: "18px 0",
    position: "relative",
    background: "transparent",
}

const track: React.CSSProperties = {
    display: "flex",
    width: "max-content",
    alignItems: "center",
    willChange: "transform",
}

const loopSegment: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
}

const item: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    paddingRight: "40px",
    whiteSpace: "nowrap",
}

const dot: React.CSSProperties = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
    opacity: 0.9,
    filter: "saturate(0.9)",
}

const text: React.CSSProperties = {
    fontSize: "14px",
    color: "#FFFFFF",
    fontWeight: 800,
    letterSpacing: "0.02em",
    fontFamily: "'Sora', sans-serif",
}

const gradientOverlay: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    background: `linear-gradient(to right, rgba(25,149,254,0.85), transparent 15%, transparent 85%, rgba(25,149,254,0.85))`,
}
