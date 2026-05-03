import * as React from "react"

// ============================================
// TWEAK HERE
// ============================================

const CONFIG = {
    card1: {
        index: "[ 01 ]",
        label: "MONTHLY PERFORMANCE",
        amount: 1835.68,
        growth: "+23% vs last period",
        footerBold: "Growing every month.",
        footerNormal: " The more you trade or bet, the more accrues.",
        gradientFrom: "#3b82f6",
        gradientTo: "#6366f1",
        animationDuration: 3000,
        minHeight: 380, // ← card 1 height
    },
    card2: {
        index: "[ 02 ]",
        label: "LIVE BALANCE",
        liveDot: "#ef4444",
        liveText: "Live Cashback",
        amount: 284.6,
        updatedText: "Updated just now",
        progressColor: "linear-gradient(to right, #6366f1, #a855f7)",
        progressTrack: "#e8e8f0",
        description:
            "Your cashback, live. Every platform. One number. Updated in real time.",
        statsLabel1: "Platforms active",
        statsValue1: "3",
        statsLabel2: "Last payout",
        statsValue2: "2m ago",
        statsLabel3: "This week",
        statsValue3: "+$48.20",
        statsLabel4: "Pending",
        statsValue4: "$12.40",
    },
    card3: {
        index: "[ 03 ]",
        label: "REFERRAL ENGINE",
        rate: "+15%",
        rateLabel: "per referral, forever",
        btn1: "Share link",
        btn2: "Earn together",
        descBold: "Refer friends.",
        descNormal: " Earn a percentage of their cashback permanently.",
        extras: [
            { label: "Total referrals", value: "7" },
            { label: "Referral earnings", value: "$34.20" },
            { label: "Pending invite", value: "2" },
        ],
    },
    card4: {
        index: "[ 04 ]",
        label: "ACTIVITY FEED",
        heading: "Recent activity",
        viewAll: "View all →",
        activities: [
            {
                dot: "#ef4444",
                title: "Roobet – Wager Cashback",
                time: "2 minutes ago",
                amount: "+$12.40",
            },
            {
                dot: "#f59e0b",
                title: "Binance – Trading Fee Askew",
                time: "1 hour ago",
                amount: "+$8.20",
            },
            {
                dot: "#f59e0b",
                title: "Bybit – Perpetual Cashback",
                time: "3 hours ago",
                amount: "+$24.60",
            },
        ],
        footerBold: "Transparent.",
        footerNormal:
            " Every payout logged and trackable in your activity feed.",
    },
    card5: {
        index: "[ 05 ]",
        label: "WITHDRAWALS",
        badgeBg: "#e6f9f0",
        badgeColor: "#22c55e",
        badgeText: "Completed",
        descBold: "It's your money.",
        descNormal: " No minimum. Withdraw whenever you want.",
    },
    layout: {
        width: 1000, // ← overall width
        columns: "1fr 1fr", // ← column split e.g. "1.2fr 1fr"
        gap: 12, // ← gutter between cards
        cardPadding: "20px", // ← inner card padding
        borderRadius: 16, // ← card corner radius
    },
    colors: {
        cardBg: "#ffffff",
        cardBorder: "#e8e8ec",
        textPrimary: "#0a0a0a",
        textSecondary: "#888888",
        accentColor: "#6366f1",
        statsBg: "#f5f5fa",
    },
}

// ============================================

function useIntersect(ref: React.RefObject<HTMLElement>, threshold = 0.3) {
    const [triggered, setTriggered] = React.useState(false)
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return triggered
}

function useCountUp(target: number, duration: number, triggered: boolean) {
    const [value, setValue] = React.useState(0)
    React.useEffect(() => {
        if (!triggered) return
        let start: number | null = null
        const step = (ts: number) => {
            if (!start) start = ts
            const p = Math.min((ts - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(parseFloat((eased * target).toFixed(2)))
            if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [triggered])
    return value
}

function fmt(val: number) {
    const [int, dec] = val.toFixed(2).split(".")
    return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + dec
}

function AnimatedGraph({
    triggered,
    duration,
}: {
    triggered: boolean
    duration: number
}) {
    const W = 340
    const H = 160
    const pathRef = React.useRef<SVGPathElement>(null)
    const [orbPos, setOrbPos] = React.useState({ x: 0, y: H })
    const [clipWidth, setClipWidth] = React.useState(0)

    // Path definition — adjust control points to reshape the curve
    const d = `M 0 ${H} C 60 ${H - 10}, 90 ${H - 30}, 130 ${H - 60} S 220 ${H - 90}, 260 ${H - 100} S 310 ${H - 130}, ${W} 20`

    // Closed area path (same curve + drop down to bottom corners)
    const areaD = `${d} L ${W} ${H} L 0 ${H} Z`

    React.useEffect(() => {
        if (!triggered || !pathRef.current) return
        const path = pathRef.current
        const totalLength = path.getTotalLength()
        path.style.strokeDasharray = `${totalLength}`
        path.style.strokeDashoffset = `${totalLength}`

        let start: number | null = null
        const animate = (ts: number) => {
            if (!start) start = ts
            const p = Math.min((ts - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            const drawn = eased * totalLength

            // Stroke
            path.style.strokeDashoffset = `${totalLength - drawn}`

            // Orb position
            const pt = path.getPointAtLength(drawn)
            setOrbPos({ x: pt.x, y: pt.y })

            // Clip width grows with the orb's x position
            setClipWidth(pt.x)

            if (p < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [triggered])

    return (
        <svg
            width="100%"
            viewBox={`0 0 ${W} ${H}`}
            style={{ overflow: "visible" }}
        >
            <defs>
                {/* Vertical gradient for area fill */}
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                </linearGradient>

                {/* Clip rect that grows left to right with the orb */}
                <clipPath id="areaClip">
                    <rect x="0" y="0" width={clipWidth} height={H + 10} />
                </clipPath>
            </defs>

            {/* Ghost track */}
            <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
            />

            {/* Area fill — clipped to match drawn portion */}
            <path d={areaD} fill="url(#areaGrad)" clipPath="url(#areaClip)" />

            {/* Animated stroke */}
            <path
                ref={pathRef}
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Orb */}
            {triggered && (
                <>
                    {/* Soft glow ring */}
                    <circle
                        cx={orbPos.x}
                        cy={orbPos.y}
                        r="14"
                        fill="rgba(255,255,255,0.12)"
                    />
                    {/* Core orb */}
                    <circle cx={orbPos.x} cy={orbPos.y} r="6" fill="white" />
                </>
            )}
        </svg>
    )
}

export default function DashboardCards() {
    React.useEffect(() => {
        // Font loaded globally
    }, [])

    const rootRef = React.useRef<HTMLDivElement>(null)
    const triggered = useIntersect(rootRef as React.RefObject<HTMLElement>, 0.3)

    const c = CONFIG
    const l = c.layout
    const col = c.colors
    const sora = "'Sora', sans-serif"
    const dur = c.card1.animationDuration

    const total = useCountUp(c.card1.amount, dur, triggered)
    const live = useCountUp(c.card2.amount, dur, triggered)
    const liveProgress = (live / c.card2.amount) * 100

    const card: React.CSSProperties = {
        background: col.cardBg,
        border: `1px solid ${col.cardBorder}`,
        borderRadius: l.borderRadius,
        padding: l.cardPadding,
        fontFamily: sora,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    }

    const indexStyle: React.CSSProperties = {
        fontSize: 11,
        color: col.textSecondary,
        fontWeight: 500,
        fontFamily: sora,
        letterSpacing: "0.05em",
    }

    const labelStyle: React.CSSProperties = {
        fontSize: 11,
        color: col.textSecondary,
        fontWeight: 600,
        letterSpacing: "0.1em",
        fontFamily: sora,
    }

    return (
        <div
            ref={rootRef}
            className="max-md:!grid-cols-1 max-md:!grid-rows-none max-md:!gap-4"
            style={{
                width: "100%",
                maxWidth: l.width,
                display: "grid",
                gridTemplateColumns: l.columns,
                gridTemplateRows: "auto auto",
                gap: l.gap,
                fontFamily: sora,
                background: "transparent",
            }}
        >
            {/* CARD 1 — Monthly Performance */}
            <div
                className="max-md:!col-auto max-md:!row-auto"
                style={{
                    ...card,
                    background: `linear-gradient(135deg, ${c.card1.gradientFrom}, ${c.card1.gradientTo})`,
                    border: "none",
                    gridRow: "1",
                    gridColumn: "1",
                    justifyContent: "space-between",
                    minHeight: c.card1.minHeight,
                }}
            >
                <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                    <span
                        style={{
                            ...indexStyle,
                            color: "rgba(255,255,255,0.6)",
                        }}
                    >
                        {c.card1.index}
                    </span>
                    <span
                        style={{
                            ...labelStyle,
                            color: "rgba(255,255,255,0.6)",
                        }}
                    >
                        {c.card1.label}
                    </span>
                    <div
                        style={{
                            fontSize: 52,
                            fontWeight: 800,
                            color: "#fff",
                            lineHeight: 1,
                            fontFamily: sora,
                            marginTop: 4,
                        }}
                    >
                        ${fmt(total)}
                    </div>
                    <span
                        style={{
                            fontSize: 13,
                            color: "#86efac",
                            fontWeight: 600,
                            fontFamily: sora,
                        }}
                    >
                        {c.card1.growth}
                    </span>
                </div>

                <div style={{ margin: "8px 0" }}>
                    <AnimatedGraph triggered={triggered} duration={dur} />
                </div>

                <p
                    style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                        margin: 0,
                        fontFamily: sora,
                        lineHeight: 1.5,
                    }}
                >
                    <strong style={{ color: "#fff", fontWeight: 700 }}>
                        {c.card1.footerBold}
                    </strong>
                    {c.card1.footerNormal}
                </p>
            </div>

            {/* CARD 2 — Live Balance */}
            <div className="max-md:!col-auto max-md:!row-auto" style={{ ...card, gridRow: "1", gridColumn: "2" }}>
                <span style={indexStyle}>{c.card2.index}</span>
                <span style={labelStyle}>{c.card2.label}</span>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: c.card2.liveDot,
                            display: "block",
                            flexShrink: 0,
                        }}
                    />
                    <span
                        style={{
                            fontSize: 13,
                            color: c.card2.liveDot,
                            fontWeight: 600,
                            fontFamily: sora,
                        }}
                    >
                        {c.card2.liveText}
                    </span>
                </div>

                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 800,
                        color: col.textPrimary,
                        lineHeight: 1,
                        fontFamily: sora,
                    }}
                >
                    ${fmt(live)}
                </div>

                <span
                    style={{
                        fontSize: 12,
                        color: col.textSecondary,
                        fontFamily: sora,
                    }}
                >
                    {c.card2.updatedText}
                </span>

                <div
                    style={{
                        width: "100%",
                        height: 4,
                        borderRadius: 99,
                        background: c.card2.progressTrack,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${liveProgress}%`,
                            background: c.card2.progressColor,
                            borderRadius: 99,
                            transition: "width 0.05s linear",
                        }}
                    />
                </div>

                <p
                    style={{
                        fontSize: 13,
                        color: col.textSecondary,
                        margin: 0,
                        lineHeight: 1.5,
                        fontFamily: sora,
                    }}
                >
                    {c.card2.description}
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                        marginTop: 4,
                    }}
                >
                    {[
                        {
                            label: c.card2.statsLabel1,
                            value: c.card2.statsValue1,
                        },
                        {
                            label: c.card2.statsLabel2,
                            value: c.card2.statsValue2,
                        },
                        {
                            label: c.card2.statsLabel3,
                            value: c.card2.statsValue3,
                        },
                        {
                            label: c.card2.statsLabel4,
                            value: c.card2.statsValue4,
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            style={{
                                background: col.statsBg,
                                borderRadius: 10,
                                padding: "10px 12px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    color: col.textSecondary,
                                    fontWeight: 500,
                                    fontFamily: sora,
                                    marginBottom: 2,
                                }}
                            >
                                {s.label}
                            </div>
                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: col.textPrimary,
                                    fontFamily: sora,
                                }}
                            >
                                {s.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CARD 4 — Activity Feed */}
            <div className="max-md:!col-auto max-md:!row-auto" style={{ ...card, gridRow: "2", gridColumn: "1" }}>
                <span style={indexStyle}>{c.card4.index}</span>
                <span style={labelStyle}>{c.card4.label}</span>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: col.textPrimary,
                            fontFamily: sora,
                        }}
                    >
                        {c.card4.heading}
                    </span>
                    <span
                        style={{
                            fontSize: 13,
                            color: col.accentColor,
                            fontWeight: 600,
                            fontFamily: sora,
                            cursor: "pointer",
                        }}
                    >
                        {c.card4.viewAll}
                    </span>
                </div>

                <div
                    style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                    {c.card4.activities.map((a, i) => (
                        <div key={i}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "12px 0",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: a.dot,
                                            display: "block",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                color: col.textPrimary,
                                                fontFamily: sora,
                                            }}
                                        >
                                            {a.title}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: col.textSecondary,
                                                fontFamily: sora,
                                            }}
                                        >
                                            {a.time}
                                        </div>
                                    </div>
                                </div>
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: col.accentColor,
                                        fontFamily: sora,
                                    }}
                                >
                                    {a.amount}
                                </span>
                            </div>
                            {i < c.card4.activities.length - 1 && (
                                <div
                                    style={{ height: 1, background: "#f0f0f4" }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <p
                    style={{
                        fontSize: 13,
                        color: col.textSecondary,
                        margin: 0,
                        lineHeight: 1.5,
                        fontFamily: sora,
                    }}
                >
                    <strong style={{ color: col.textPrimary, fontWeight: 700 }}>
                        {c.card4.footerBold}
                    </strong>
                    {c.card4.footerNormal}
                </p>
            </div>

            {/* RIGHT COLUMN BOTTOM */}
            <div
                className="max-md:!col-auto max-md:!row-auto"
                style={{
                    gridRow: "2",
                    gridColumn: "2",
                    display: "flex",
                    flexDirection: "column",
                    gap: l.gap,
                }}
            >
                {/* CARD 3 — Referral Engine */}
                <div style={{ ...card }}>
                    <span style={indexStyle}>{c.card3.index}</span>
                    <span style={labelStyle}>{c.card3.label}</span>

                    <div
                        style={{
                            fontSize: 44,
                            fontWeight: 800,
                            color: col.textPrimary,
                            lineHeight: 1,
                            fontFamily: sora,
                        }}
                    >
                        {c.card3.rate}
                    </div>
                    <span
                        style={{
                            fontSize: 12,
                            color: col.textSecondary,
                            fontFamily: sora,
                            marginTop: -6,
                        }}
                    >
                        {c.card3.rateLabel}
                    </span>

                    <div style={{ display: "flex", gap: 8 }}>
                        {[c.card3.btn1, c.card3.btn2].map((btn, i) => (
                            <button
                                key={i}
                                style={{
                                    padding: "8px 16px",
                                    background: "#f0f0f8",
                                    border: "none",
                                    borderRadius: 20,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#444",
                                    fontFamily: sora,
                                    cursor: "pointer",
                                }}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>

                    <p
                        style={{
                            fontSize: 13,
                            color: col.textSecondary,
                            margin: 0,
                            lineHeight: 1.5,
                            fontFamily: sora,
                        }}
                    >
                        <strong
                            style={{ color: col.textPrimary, fontWeight: 700 }}
                        >
                            {c.card3.descBold}
                        </strong>
                        {c.card3.descNormal}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            borderTop: "1px solid #f0f0f4",
                            paddingTop: 10,
                        }}
                    >
                        {c.card3.extras.map((e, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 13,
                                        color: col.textSecondary,
                                        fontFamily: sora,
                                    }}
                                >
                                    {e.label}
                                </span>
                                <span
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: col.textPrimary,
                                        fontFamily: sora,
                                    }}
                                >
                                    {e.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CARD 5 — Withdrawals */}
                <div style={{ ...card }}>
                    <span style={indexStyle}>{c.card5.index}</span>
                    <span style={labelStyle}>{c.card5.label}</span>

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: c.card5.badgeBg,
                            borderRadius: 20,
                            padding: "8px 16px",
                            alignSelf: "flex-start",
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill={c.card5.badgeColor}
                            />
                            <path
                                d="M8 12l3 3 5-5"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: c.card5.badgeColor,
                                fontFamily: sora,
                            }}
                        >
                            {c.card5.badgeText}
                        </span>
                    </div>

                    <p
                        style={{
                            fontSize: 13,
                            color: col.textSecondary,
                            margin: 0,
                            lineHeight: 1.5,
                            fontFamily: sora,
                        }}
                    >
                        <strong
                            style={{ color: col.textPrimary, fontWeight: 700 }}
                        >
                            {c.card5.descBold}
                        </strong>
                        {c.card5.descNormal}
                    </p>
                </div>
            </div>
        </div>
    )
}
