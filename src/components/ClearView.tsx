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
    const sora = "'Sora', sans-serif"
    const dur = c.card1.animationDuration

    const total = useCountUp(c.card1.amount, dur, triggered)
    const live = useCountUp(c.card2.amount, dur, triggered)

    return (
        <div
            ref={rootRef}
            style={{
                width: "100%",
                maxWidth: 1000,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                fontFamily: sora,
                color: "#ffffff",
                padding: "20px 0",
            }}
        >
            <div className="max-md:!flex-col" style={{ display: "flex", gap: "60px" }}>
                {/* Left Side: Main Analytics */}
                <div style={{
                    flex: 1.2,
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                }}>
                    <div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.05em" }}>MONTHLY PERFORMANCE</div>
                        <div style={{ fontSize: 64, fontWeight: 800, color: "#ffffff", lineHeight: 1, letterSpacing: "-2px" }}>
                            ${fmt(total)}
                        </div>
                        <div style={{ fontSize: 15, color: "#16a34a", fontWeight: 600, marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                            {c.card1.growth}
                        </div>
                    </div>

                    <div style={{
                        width: "100%",
                        height: 200,
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-end",
                    }}>
                        {/* A very subtle underlying grid or just the graph */}
                        <AnimatedGraph triggered={triggered} duration={dur} />
                    </div>

                    <div className="max-sm:!grid-cols-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                        {[
                            { label: c.card2.statsLabel1, value: c.card2.statsValue1 },
                            { label: c.card2.statsLabel2, value: c.card2.statsValue2 },
                            { label: c.card2.statsLabel3, value: c.card2.statsValue3 },
                            { label: c.card2.statsLabel4, value: c.card2.statsValue4 },
                        ].map((s, i) => (
                            <div key={i}>
                                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Sidebar */}
                <div style={{
                    flex: 0.8,
                    display: "flex",
                    flexDirection: "column",
                    gap: "60px",
                }}>
                    <div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.05em" }}>LIVE CASHBACK</div>
                        <div style={{ fontSize: 44, fontWeight: 800, color: "#ffffff", lineHeight: 1, letterSpacing: "-1px" }}>
                            ${fmt(live)}
                        </div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>{c.card2.updatedText}</div>
                    </div>

                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.05em" }}>RECENT ACTIVITY</div>
                            <div style={{ fontSize: 13, color: "#ffffff", fontWeight: 600, cursor: "pointer", opacity: 0.8 }}>{c.card4.viewAll}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {c.card4.activities.map((a, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 4, background: a.dot }} />
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", marginBottom: 4 }}>{a.title}</div>
                                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{a.time}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: a.dot }}>{a.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16 }}>REFERRAL ENGINE</div>
                        <div style={{ fontSize: 52, fontWeight: 800, color: "#ffffff", lineHeight: 1, letterSpacing: "-1px" }}>{c.card3.rate}</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8, marginBottom: 24 }}>{c.card3.rateLabel}</div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button style={{ flex: 1, padding: "14px 0", background: "#ffffff", color: "#111827", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{c.card3.btn1}</button>
                            <button style={{ flex: 1, padding: "14px 0", background: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{c.card3.btn2}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
