// GetStartedHero.tsx
// Final "Get Started" section for Askew
// Drop into Framer via Assets → Code → New Component

import { useEffect, useRef } from "react"

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
    textMuted: "rgba(255,255,255,0.45)",
    textBody: "rgba(255,255,255,0.78)",
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
                {/* SVG Illustration */}
                <div
                    data-reveal
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <CashbackIllustration />
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

// ─── SVG ILLUSTRATION ─────────────────────────────────────────────────────────
function CashbackIllustration() {
    return (
        <svg
            viewBox="0 0 480 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: "100%",
                maxWidth: "480px",
                overflow: "visible",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
            }}
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
        >
            <defs>
                {/* Glow filter — userSpaceOnUse so elements near the SVG edge don't clip */}
                <filter
                    id="glow"
                    filterUnits="userSpaceOnUse"
                    x="-100"
                    y="-100"
                    width="800"
                    height="600"
                >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Soft glow for numbers — userSpaceOnUse so it never clips against element bbox */}
                <filter
                    id="numglow"
                    filterUnits="userSpaceOnUse"
                    x="-100"
                    y="-100"
                    width="800"
                    height="600"
                >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Card drop shadow — applied only to the rect, not the whole group */}
                <filter
                    id="cardShadow"
                    filterUnits="userSpaceOnUse"
                    x="-120"
                    y="-120"
                    width="800"
                    height="700"
                >
                    <feDropShadow
                        dx="0"
                        dy="18"
                        stdDeviation="22"
                        floodColor="rgba(0,0,0,0.55)"
                    />
                </filter>

                {/* Mini card drop shadow */}
                <filter
                    id="miniCardShadow"
                    filterUnits="userSpaceOnUse"
                    x="200"
                    y="-100"
                    width="600"
                    height="400"
                >
                    <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="14"
                        floodColor="rgba(0,0,0,0.45)"
                    />
                </filter>

                {/* Card glass gradient */}
                <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a65c8" stopOpacity="0.88" />
                    <stop
                        offset="100%"
                        stopColor="#2248a8"
                        stopOpacity="0.95"
                    />
                </linearGradient>

                {/* Inner card gradient */}
                <linearGradient id="innerCardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4a78d8" stopOpacity="0.75" />
                    <stop
                        offset="100%"
                        stopColor="#2d55b8"
                        stopOpacity="0.92"
                    />
                </linearGradient>

                {/* Sparkline gradient fill */}
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3d7fff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3d7fff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#6ea6ff" stopOpacity="0.9" />
                </linearGradient>

                {/* Area fill */}
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d7fff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3d7fff" stopOpacity="0" />
                </linearGradient>

                {/* Progress bar gradient */}
                <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3d7fff" />
                    <stop offset="100%" stopColor="#7eb8ff" />
                </linearGradient>

                {/* Platform pill gradient */}
                <linearGradient id="pillGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
                </linearGradient>

                {/* Clip for sparkline */}
                <clipPath id="lineClip">
                    <rect x="0" y="0" width="200" height="70" />
                </clipPath>

                {/* Clip for area */}
                <clipPath id="areaClip">
                    <rect x="0" y="0" width="200" height="70" />
                </clipPath>
            </defs>

            {/* ── BACKGROUND ambient glow ── */}
            <ellipse
                cx="240"
                cy="170"
                rx="180"
                ry="120"
                fill="#1a3aff"
                fillOpacity="0.07"
            />

            {/* ── MAIN CARD ── */}
            <g>
                {/* Card body — shadow via SVG filter on rect only, not group */}
                <rect
                    x="32"
                    y="20"
                    width="320"
                    height="276"
                    rx="20"
                    fill="url(#cardGrad)"
                    stroke="rgba(135,174,246,0.2)"
                    strokeWidth="1"
                    filter="url(#cardShadow)"
                />

                {/* Card top shimmer line */}
                <rect
                    x="32"
                    y="20"
                    width="320"
                    height="1"
                    rx="1"
                    fill="rgba(255,255,255,0.12)"
                />

                {/* ── CARD HEADER ── */}
                {/* Live dot */}
                <circle cx="56" cy="50" r="4" fill="#3d7fff">
                    <animate
                        attributeName="r"
                        values="4;6;4"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="56"
                    cy="50"
                    r="4"
                    fill="#3d7fff"
                    filter="url(#glow)"
                />

                <text
                    x="68"
                    y="55"
                    fill="rgba(255,255,255,0.5)"
                    fontSize="10"
                    fontWeight="500"
                    fontFamily="Sora, sans-serif"
                    letterSpacing="0.08em"
                >
                    LIVE CASHBACK
                </text>

                {/* Gear/settings dots top right */}
                {[0, 5, 10].map((o) => (
                    <circle
                        key={o}
                        cx={326 + o}
                        cy={50}
                        r="1.8"
                        fill="rgba(255,255,255,0.25)"
                    />
                ))}

                {/* ── MAIN AMOUNT ── */}
                <text
                    x="56"
                    y="105"
                    fill="#ffffff"
                    fontSize="40"
                    fontWeight="800"
                    fontFamily="Sora, sans-serif"
                    letterSpacing="-0.03em"
                    filter="url(#numglow)"
                >
                    $2,847.50
                </text>

                {/* Growth badge */}
                <rect
                    x="56"
                    y="116"
                    width="86"
                    height="22"
                    rx="11"
                    fill="rgba(61,255,130,0.15)"
                    stroke="rgba(61,255,130,0.3)"
                    strokeWidth="1"
                />
                <text
                    x="70"
                    y="131"
                    fill="#4dff9a"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Sora, sans-serif"
                >
                    ↑ +12.4%
                </text>
                <text
                    x="150"
                    y="131"
                    fill="rgba(255,255,255,0.35)"
                    fontSize="11"
                    fontWeight="400"
                    fontFamily="Sora, sans-serif"
                >
                    this month
                </text>

                {/* ── SPARKLINE ── */}
                <g transform="translate(56, 150)">
                    {/* Area fill */}
                    <path
                        d="M0,60 C20,55 30,40 50,35 C70,30 80,20 100,18 C120,16 130,22 150,15 C165,10 175,8 200,5 L200,70 L0,70 Z"
                        fill="url(#areaGrad)"
                    />
                    {/* Line — static, no draw animation to avoid replay/strand issues */}
                    <path
                        d="M0,60 C20,55 30,40 50,35 C70,30 80,20 100,18 C120,16 130,22 150,15 C165,10 175,8 200,5"
                        stroke="url(#lineGrad)"
                        strokeWidth="2"
                        fill="none"
                    />
                    {/* Orb at tip — pulses in place */}
                    <circle
                        cx="200"
                        cy="5"
                        r="5"
                        fill="#6ea6ff"
                        fillOpacity="0.35"
                    >
                        <animate
                            attributeName="r"
                            values="5;8;5"
                            dur="2.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="fill-opacity"
                            values="0.35;0;0.35"
                            dur="2.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle
                        cx="200"
                        cy="5"
                        r="3"
                        fill="#6ea6ff"
                        filter="url(#glow)"
                    />
                    <circle cx="200" cy="5" r="1.8" fill="#ffffff" />
                </g>

                {/* ── PLATFORM ROWS ── */}
                {[
                    {
                        label: "Bybit",
                        amount: "$842.10",
                        pct: 72,
                        color: "#f7a600",
                    },
                    {
                        label: "Binance",
                        amount: "$1,204.80",
                        pct: 88,
                        color: "#f0b90b",
                    },
                    {
                        label: "Roobet",
                        amount: "$800.60",
                        pct: 55,
                        color: "#9b59ff",
                    },
                ].map((p, i) => {
                    const rowY = [240, 262, 284][i]
                    // Layout zones (within translate(56, rowY), card content width = 264):
                    // Dot:    x=0–14
                    // Label:  x=18–68  (fixed 50px zone)
                    // Bar:    x=72–172 (fixed 100px track — max fill never reaches amount zone)
                    // Amount: x=180–264 (right-anchored at 264)
                    const barTrack = 100
                    const barFill = barTrack * (p.pct / 100)
                    return (
                        <g key={p.label} transform={`translate(56, ${rowY})`}>
                            {/* Dot */}
                            <circle
                                cx="7"
                                cy="5"
                                r="6"
                                fill={p.color}
                                fillOpacity="0.2"
                            />
                            <circle cx="7" cy="5" r="3.5" fill={p.color} />

                            {/* Label */}
                            <text
                                x="18"
                                y="9"
                                fill="rgba(255,255,255,0.6)"
                                fontSize="10"
                                fontWeight="500"
                                fontFamily="Sora, sans-serif"
                            >
                                {p.label}
                            </text>

                            {/* Bar track */}
                            <rect
                                x="72"
                                y="1"
                                width={barTrack}
                                height="7"
                                rx="3.5"
                                fill="rgba(255,255,255,0.06)"
                            />
                            {/* Bar fill */}
                            <rect
                                x="72"
                                y="1"
                                width={barFill}
                                height="7"
                                rx="3.5"
                                fill="url(#progressGrad)"
                                fillOpacity="0.85"
                            />

                            {/* Amount — starts at x=180, well clear of bar end at x=172 */}
                            <text
                                x="264"
                                y="9"
                                fill="rgba(255,255,255,0.92)"
                                fontSize="10"
                                fontWeight="600"
                                fontFamily="Sora, sans-serif"
                                textAnchor="end"
                            >
                                {p.amount}
                            </text>
                        </g>
                    )
                })}
            </g>

            {/* ── FLOATING MINI CARD (top right) ── */}
            <g
                style={{
                    animation: "gs-float-inner 4.2s ease-in-out infinite",
                }}
            >
                {/* Card — shadow via SVG filter on rect only */}
                <rect
                    x="308"
                    y="10"
                    width="142"
                    height="76"
                    rx="14"
                    fill="url(#innerCardGrad)"
                    stroke="rgba(135,174,246,0.25)"
                    strokeWidth="1"
                    filter="url(#miniCardShadow)"
                />
                <rect
                    x="308"
                    y="10"
                    width="142"
                    height="1"
                    rx="1"
                    fill="rgba(255,255,255,0.1)"
                />

                {/* Payout label */}
                <text
                    x="322"
                    y="32"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="9"
                    fontWeight="500"
                    fontFamily="Sora, sans-serif"
                    letterSpacing="0.08em"
                >
                    NEXT PAYOUT
                </text>

                {/* Amount */}
                <text
                    x="322"
                    y="55"
                    fill="#ffffff"
                    fontSize="22"
                    fontWeight="800"
                    fontFamily="Sora, sans-serif"
                    letterSpacing="-0.02em"
                    filter="url(#numglow)"
                >
                    $184.20
                </text>

                {/* In label */}
                <text
                    x="322"
                    y="72"
                    fill="rgba(255,255,255,0.35)"
                    fontSize="9.5"
                    fontWeight="400"
                    fontFamily="Sora, sans-serif"
                >
                    in 2 days
                </text>

                {/* Pulse ring on right */}
                <circle
                    cx="428"
                    cy="48"
                    r="8"
                    fill="none"
                    stroke="#3d7fff"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                >
                    <animate
                        attributeName="r"
                        values="6;12;6"
                        dur="2.4s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-opacity"
                        values="0.6;0;0.6"
                        dur="2.4s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    cx="428"
                    cy="48"
                    r="5"
                    fill="#3d7fff"
                    filter="url(#glow)"
                />
                <circle cx="428" cy="48" r="3" fill="#a0c4ff" />
            </g>

            {/* ── FLOATING PILL (bottom right) ── */}
            {/* Outer <g> holds position only — CSS animation must NOT be on the same element as SVG transform */}
            <g transform="translate(330, 220)">
                <g>
                    {/* Pill */}
                    <rect
                        x="0"
                        y="0"
                        width="136"
                        height="38"
                        rx="19"
                        fill="rgba(36,64,148,0.88)"
                        stroke="rgba(135,174,246,0.4)"
                        strokeWidth="1"
                    />
                    {/* Top shimmer */}
                    <rect
                        x="0"
                        y="0"
                        width="136"
                        height="1"
                        rx="1"
                        fill="rgba(255,255,255,0.12)"
                    />

                    {/* Checkmark circle */}
                    <circle
                        cx="20"
                        cy="19"
                        r="10"
                        fill="rgba(61,255,130,0.15)"
                    />
                    <path
                        d="M15,19 L18.5,22.5 L25,15.5"
                        stroke="#4dff9a"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />

                    <text
                        x="36"
                        y="23"
                        fill="rgba(255,255,255,0.85)"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="Sora, sans-serif"
                    >
                        Withdrawal sent
                    </text>
                </g>
            </g>
        </svg>
    )
}
