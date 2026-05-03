// Footer.tsx
// Askew site footer — matches the light-blue palette of the page
// Drop into Framer via Assets → Code → New Component

import { useEffect, useRef } from "react"

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const CONFIG = {
    // Layout
    width: "100%",
    minHeight: "456px",
    paddingX: "80px",
    paddingTop: "60px",
    paddingBottom: "36px",

    // Left — CTA block
    eyebrow: "Your cut. Finally.",
    heading: "Stop leaving\nMoney behind.",
    ctaLabel: "Create free Account",

    // Nav columns — `id` must match the Anchor ID set on each section frame in Framer
    nav: [
        {
            heading: "PLATFORM",
            links: [
                { label: "Home", id: "hero-section" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Dashboard", id: "dashboard" },
                { label: "Get Started", id: "get-started" },
            ],
        },
        {
            heading: "LEGAL",
            links: [
                { label: "Privacy Policy", id: "" },
                { label: "Terms of Service", id: "" },
            ],
        },
    ],

    // Bottom bar
    copyright: `© ${new Date().getFullYear()} Askew. All rights reserved.`,

    // Colors
    bgFrom: "#7fb8f5",
    bgTo: "#9AC1F4",
    textPrimary: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    textNav: "rgba(255,255,255,0.75)",
    textNavHover: "#ffffff",
    eyebrowBg: "rgba(255,255,255,0.18)",
    eyebrowText: "rgba(255,255,255,0.85)",
    ctaBg: "#0f1a3a",
    ctaText: "#ffffff",
    divider: "rgba(255,255,255,0.15)",
}
// ───────────────────────────────────────────────────────────────────────────────

// ─── SCROLL HELPER ────────────────────────────────────────────────────────────
// Finds the element by Framer anchor ID and scrolls to it smoothly.
// Framer renders anchor IDs as the HTML `id` attribute on the frame element.
function scrollToSection(id: string) {
    if (!id) return
    const target = document.getElementById(id)
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
}
// ───────────────────────────────────────────────────────────────────────────────

export default function Footer() {
    const rootRef = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false)

    // Font loaded globally

    // Inject keyframes
    useEffect(() => {
        if (document.getElementById("footer-keyframes")) return
        const style = document.createElement("style")
        style.id = "footer-keyframes"
        style.textContent = `
      @keyframes ft-fade-up {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .ft-link {
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-block;
        cursor: pointer;
      }
      .ft-link:hover {
        color: ${CONFIG.textNavHover} !important;
        transform: translateX(3px);
      }
      .ft-cta-btn {
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }
      .ft-cta-btn:hover {
        transform: scale(1.03);
        box-shadow: 0 8px 32px rgba(0,0,0,0.35) !important;
      }
    `
        document.head.appendChild(style)
    }, [])

    // Reveal on scroll
    useEffect(() => {
        const el = rootRef.current
        if (!el) return
        const items = el.querySelectorAll<HTMLElement>("[data-ft-reveal]")
        items.forEach((c) => {
            c.style.opacity = "0"
            c.style.transform = "translateY(24px)"
        })

        const obs = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting || hasAnimated.current) return
                hasAnimated.current = true
                obs.disconnect()
                items.forEach((c, i) => {
                    c.style.transition = `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`
                    c.style.opacity = "1"
                    c.style.transform = "translateY(0)"
                })
            },
            { threshold: 0.3 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <footer
            ref={rootRef}
            style={{
                width: "100%",
                maxWidth: CONFIG.width,
                minHeight: CONFIG.minHeight,
                background: "transparent",
                fontFamily: "'Sora', sans-serif",
                boxSizing: "border-box",
                padding: `${CONFIG.paddingTop} ${CONFIG.paddingX} ${CONFIG.paddingBottom}`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Subtle noise texture */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E\")",
                    backgroundSize: "256px",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* ── MAIN ROW ──────────────────────────────────────────────────────── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0",
                }}
            >
                {/* ── LEFT: CTA BLOCK ── */}
                <div
                    style={{
                        flex: "0 0 340px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    {/* Eyebrow pill */}
                    <div data-ft-reveal>
                        <span
                            style={{
                                display: "inline-block",
                                padding: "6px 14px",
                                borderRadius: "100px",
                                background: CONFIG.eyebrowBg,
                                fontSize: "13px",
                                fontWeight: 500,
                                color: CONFIG.eyebrowText,
                                letterSpacing: "0.01em",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(255,255,255,0.22)",
                            }}
                        >
                            {CONFIG.eyebrow}
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        data-ft-reveal
                        style={{
                            margin: 0,
                            fontSize: "clamp(34px, 3.8vw, 52px)",
                            fontWeight: 800,
                            lineHeight: 1.08,
                            color: CONFIG.textPrimary,
                            letterSpacing: "-0.025em",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {CONFIG.heading}
                    </h2>

                    {/* CTA button */}
                    <div data-ft-reveal>
                        <button
                            className="ft-cta-btn"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "12px 22px 12px 12px",
                                background: CONFIG.ctaBg,
                                border: "none",
                                borderRadius: "100px",
                                cursor: "pointer",
                                fontFamily: "'Sora', sans-serif",
                                fontSize: "14px",
                                fontWeight: 700,
                                color: CONFIG.ctaText,
                                letterSpacing: "-0.01em",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                            }}
                        >
                            {/* Logo mark */}
                            <span
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.12)",
                                    border: "1.5px solid rgba(255,255,255,0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                {/* Stylised "A" mark for Askew */}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M8 2L14 13H2L8 2Z"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                    <line
                                        x1="5"
                                        y1="9.5"
                                        x2="11"
                                        y2="9.5"
                                        stroke="white"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            {CONFIG.ctaLabel}
                        </button>
                    </div>
                </div>

                {/* ── CENTRE: spacer (shapes render behind via absolute) ── */}
                <div style={{ flex: 1 }} />

                {/* ── RIGHT: NAV COLUMNS ── */}
                <div
                    style={{
                        display: "flex",
                        gap: "80px",
                        alignItems: "flex-start",
                    }}
                >
                    {CONFIG.nav.map((col) => (
                        <div
                            key={col.heading}
                            data-ft-reveal
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {/* Column heading */}
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.13em",
                                    color: CONFIG.textMuted,
                                    textTransform: "uppercase",
                                }}
                            >
                                {col.heading}
                            </p>

                            {/* Links */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                {col.links.map(({ label, id }) => (
                                    <span
                                        key={id || label}
                                        className={id ? "ft-link" : ""}
                                        onClick={() => scrollToSection(id)}
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: 500,
                                            color: id
                                                ? CONFIG.textNav
                                                : "rgba(255,255,255,0.35)",
                                            textDecoration: "none",
                                            cursor: id ? "pointer" : "default",
                                        }}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BOTTOM BAR ────────────────────────────────────────────────────── */}
            <div
                data-ft-reveal
                style={{
                    position: "relative",
                    zIndex: 1,
                    marginTop: "56px",
                    paddingTop: "20px",
                    borderTop: `1px solid ${CONFIG.divider}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: CONFIG.textMuted,
                    }}
                >
                    {CONFIG.copyright}
                </span>

                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: CONFIG.textMuted,
                    }}
                >
                    Built for traders.
                </span>
            </div>
        </footer>
    )
}
