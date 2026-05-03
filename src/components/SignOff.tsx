// GetStartedHero.tsx
// Final "Get Started" section for Askew
// Drop into Framer via Assets → Code → New Component

import { useEffect, useRef } from "react"
import HoverImage from "./HoverImage"
import replacementImg from "../assets/edited-replacement.png"
// ─── CONFIG ────────────────────────────────────────────────────────────────────
const CONFIG = {
    // Layout
    width: "1200px",
    minHeight: "510px",
    paddingX: "80px",
    paddingY: "64px",

    // Copy
    eyebrow: "READY WHEN YOU ARE",
    heading: "Start earning on\ntrades you\nalready make.",
    body: "Free forever. No deposits. No subscriptions. Just cashback flowing back from the platforms you already use.",

    // Trust badges
    badges: ["Free forever", "30+ platforms", "Withdraw anytime"],

    // CTA
    ctaLabel: "Earn Cashback – It's Free",
    ctaSubtext: "No credit card required. No minimum balance.",

    // Colors
    bgFrom: "#7fb6f5",
    bgTo: "#8ebef5",
    accentBlue: "#6aaeff",
    accentGlow: "rgba(106,174,255,0.35)",
    textPrimary: "#ffffff",
    textMuted: "rgba(255, 255, 255, 0.77)",
    textBody: "rgba(255, 255, 255, 1)",
    badgeDot: "#6aaeff",

    // Animation
    animDuration: 3000,
    threshold: 0.3,
}
// ───────────────────────────────────────────────────────────────────────────────

export default function GetStartedHero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false)

    // Font loaded globally in index.html

    // Inject keyframes for SVG card animations
    useEffect(() => {
        if (document.getElementById("gs-keyframes")) return
        const style = document.createElement("style")
        style.id = "gs-keyframes"
        style.textContent = `
      @keyframes gs-float {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-14px) rotate(-2deg); }
      }
      @keyframes gs-float-inner {
        0%, 100% { transform: translateY(0px) rotate(1.5deg); }
        50% { transform: translateY(-8px) rotate(1.5deg); }
      }
      @keyframes gs-pulse-ring {
        0% { opacity: 0.6; r: 6; }
        50% { opacity: 0.1; r: 11; }
        100% { opacity: 0.6; r: 6; }
      }
      @keyframes gs-glow-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      @keyframes gs-bar-grow {
        0% { width: 0%; }
        100% { width: var(--bar-w); }
      }
      @keyframes gs-fade-up {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes gs-line-draw {
        from { stroke-dashoffset: 300; }
        to   { stroke-dashoffset: 0; }
      }
      @keyframes gs-orb-travel {
        0%   { offset-distance: 0%; }
        100% { offset-distance: 100%; }
      }
      @keyframes gs-dot-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
      }
    `
        document.head.appendChild(style)
    }, [])

    // Fade-up reveal on intersection
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const children = el.querySelectorAll<HTMLElement>("[data-reveal]")
        children.forEach((c) => {
            c.style.opacity = "0"
            c.style.transform = "translateY(28px)"
        })

        const obs = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting || hasAnimated.current) return
                hasAnimated.current = true
                obs.disconnect()
                children.forEach((c, i) => {
                    c.style.transition = `opacity 0.65s ease ${i * 90}ms, transform 0.65s ease ${i * 90}ms`
                    c.style.opacity = "1"
                    c.style.transform = "translateY(0)"
                })
            },
            { threshold: CONFIG.threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div
            ref={sectionRef}
            className="max-md:!flex-col max-md:!px-4 max-md:!py-10 max-md:!text-center"
            style={{
                width: "100%",
                maxWidth: CONFIG.width,
                margin: "0 auto",
                minHeight: CONFIG.minHeight,
                boxSizing: "border-box",
                background: "transparent",
                fontFamily: "'Sora', sans-serif",
                display: "flex",
                alignItems: "center",
                padding: `${CONFIG.paddingY} ${CONFIG.paddingX}`,
                position: "relative",
                overflow: "visible",
                paddingBottom: "48px",  // ← add here
            }}
        >
            {/* Subtle noise grain overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
                    backgroundSize: "256px 256px",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* ── LEFT COLUMN ─────────────────────────────────────── */}
            <div
                className="max-md:!w-full max-md:!items-center"
                style={{
                    flex: "0 0 48%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Eyebrow */}
                <p
                    data-reveal
                    style={{
                        margin: 0,
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        color: CONFIG.textMuted,
                        textTransform: "uppercase",
                    }}
                >
                    {CONFIG.eyebrow}
                </p>

                {/* Heading */}
                <h2
                    data-reveal
                    style={{
                        margin: 0,
                        fontSize: "clamp(44px, 5.5vw, 72px)",
                        fontWeight: 800,
                        lineHeight: 1.07,
                        color: CONFIG.textPrimary,
                        whiteSpace: "pre-line",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {CONFIG.heading}
                </h2>

                {/* Body */}
                <p
                    data-reveal
                    style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: 1.7,
                        color: CONFIG.textBody,
                        maxWidth: "380px",
                    }}
                >
                    {CONFIG.body}
                </p>
            </div>

            {/* ── RIGHT COLUMN ────────────────────────────────────── */}
            <div
                className="max-md:!w-full max-md:!items-center max-md:!mt-8"
                style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 1,
                    gap: "40px",
                }}
            >
                {/* Image Container */}
                <div
                    data-reveal
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        // ↓ ADJUST THIS TO MOVE ONLY THE IMAGE LEFT OR RIGHT ↓
                        transform: "translateX(196px)",
                    }}
                >
                    <HoverImage
                        src={replacementImg}
                        alt="Cashback Dashboard Illustration"
                        style={{ width: "100%", maxWidth: "480px", borderRadius: "24px" }}
                    />
                </div>

                {/* Badges + CTA */}
                <div
                    data-reveal
                    className="max-md:!items-center max-md:!mt-4"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        // ↓ ADJUST THIS TO MOVE ONLY THE BADGES & CTA BUTTON LEFT OR RIGHT ↓
                        transform: "translateX(136px)",
                    }}
                >
                    {/* Trust badges */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        {CONFIG.badges.map((b) => (
                            <span
                                key={b}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "7px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: CONFIG.textBody,
                                }}
                            >
                                <span
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: CONFIG.badgeDot,
                                        display: "inline-block",
                                        boxShadow: `0 0 6px ${CONFIG.accentGlow}`,
                                    }}
                                />
                                {b}
                            </span>
                        ))}
                    </div>

                    {/* CTA button */}
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "14px 28px",
                            background: "#ffffff",
                            border: "none",
                            borderRadius: "100px",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#0a0f1e",
                            fontFamily: "'Sora', sans-serif",
                            letterSpacing: "-0.01em",
                            boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
                            transition:
                                "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            ; (
                                e.currentTarget as HTMLButtonElement
                            ).style.transform = "scale(1.03)"
                                ; (
                                    e.currentTarget as HTMLButtonElement
                                ).style.boxShadow = "0 8px 40px rgba(0,0,0,0.5)"
                        }}
                        onMouseLeave={(e) => {
                            ; (
                                e.currentTarget as HTMLButtonElement
                            ).style.transform = "scale(1)"
                                ; (
                                    e.currentTarget as HTMLButtonElement
                                ).style.boxShadow = "0 4px 32px rgba(0,0,0,0.35)"
                        }}
                    >
                        {/* Dollar coin icon */}
                        <span
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                background: "#0a0f1e",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <text
                                    x="7"
                                    y="10.5"
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="700"
                                    fontFamily="Sora, sans-serif"
                                >
                                    $
                                </text>
                            </svg>
                        </span>
                        {CONFIG.ctaLabel}
                    </button>

                    {/* Fine print */}
                    <p
                        style={{
                            margin: 0,
                            fontSize: "12px",
                            fontWeight: 400,
                            color: CONFIG.textMuted,
                        }}
                    >
                        {CONFIG.ctaSubtext}
                    </p>
                </div>
            </div>
        </div>
    )
}

