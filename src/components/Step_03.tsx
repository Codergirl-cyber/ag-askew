import * as React from "react"

// ============================================
// TWEAK HERE
// ============================================

const CONFIG = {
    step: {
        label: "STEP 03",
        fontSize: 13,
        color: "#B8D2D6",
        fontWeight: 600,
        letterSpacing: "0.08em",
    },
    heading: {
        text: "Cashback stacks up automatically.",
        fontSize: 42,
        color: "#0a0a0a",
        fontWeight: 800,
        lineHeight: 1.1,
    },
    totalLabel: {
        text: "TOTAL CASHBACK EARNED",
        fontSize: 12,
        color: "#ffffffff",
        fontWeight: 600,
        letterSpacing: "0.1em",
    },
    totalAmount: {
        value: 1835.68,
        prefix: "$",
        fontSize: 72,
        color: "#0a0a0a",
        fontWeight: 800,
        animationDuration: 3000, // ms
    },
    growth: {
        text: "+23% vs last period ↗",
        fontSize: 16,
        color: "#ffffffff",
        fontWeight: 700,
    },
    progressBar: {
        height: 4,
        borderRadius: 99,
        background: "linear-gradient(to right, #00ff3cff, #00ff48ff)",
        trackColor: "#e8e8f0",
    },
    platforms: [
        {
            abbr: "Rb",
            name: "Roobet",
            category: "Casino and Sports",
            color: "#F04E30",
            amount: 284.6,
        },
        {
            abbr: "By",
            name: "Bybit",
            category: "Crypto Exchange",
            color: "#F7A600",
            amount: 156.2,
        },
        {
            abbr: "Bn",
            name: "Binance",
            category: "Crypto Exchange",
            color: "#F3BA2F",
            amount: 98.4,
        },
    ],
    platformRow: {
        abbrFontSize: 14,
        abbrFontWeight: 700,
        abbrColor: "#ffffff",
        abbrSize: 44,
        abbrBorderRadius: 12,
        nameFontSize: 16,
        nameColor: "#0a0a0a",
        nameFontWeight: 700,
        categoryFontSize: 13,
        categoryColor: "#ffffffff",
        categoryFontWeight: 400,
        amountFontSize: 16,
        amountColor: "#00ff48ff",
        amountFontWeight: 700,
        dividerColor: "#e8e8e8",
        rowGap: 20,
    },
    footer: {
        text: "Withdraw whenever you want.",
        fontSize: 13,
        color: "#ffffffff",
        fontWeight: 400,
    },
    width: 480,
    gap: 20,
}

// ============================================

function useCountUp(target: number, duration: number, triggered: boolean) {
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {
        if (!triggered) return
        let start: number | null = null
        const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(parseFloat((eased * target).toFixed(2)))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [triggered])

    return value
}

export default function CashbackStack() {
    // Font loaded globally

    const [visible, setVisible] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Intersection Observer — fires once when element enters viewport
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    const c = CONFIG
    const sora = "'Sora', sans-serif"
    const total = c.totalAmount.value
    const duration = c.totalAmount.animationDuration

    const animatedTotal = useCountUp(total, duration, visible)
    const progressPercent = (animatedTotal / total) * 100

    // Format number with commas
    const formatAmount = (val: number) => {
        const [int, dec] = val.toFixed(2).split(".")
        return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + dec
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                maxWidth: c.width,
                display: "flex",
                flexDirection: "column",
                gap: c.gap,
                fontFamily: sora,
                background: "transparent",
            }}
        >
            {/* Step label */}
            <span
                style={{
                    fontSize: c.step.fontSize,
                    color: c.step.color,
                    fontWeight: c.step.fontWeight,
                    letterSpacing: c.step.letterSpacing,
                    fontFamily: sora,
                }}
            >
                {c.step.label}
            </span>

            {/* Heading */}
            <h1
                style={{
                    fontSize: c.heading.fontSize,
                    color: c.heading.color,
                    fontWeight: c.heading.fontWeight,
                    lineHeight: c.heading.lineHeight,
                    margin: 0,
                    fontFamily: sora,
                }}
            >
                {c.heading.text}
            </h1>

            {/* Total label */}
            <span
                style={{
                    fontSize: c.totalLabel.fontSize,
                    color: c.totalLabel.color,
                    fontWeight: c.totalLabel.fontWeight,
                    letterSpacing: c.totalLabel.letterSpacing,
                    fontFamily: sora,
                    marginBottom: -12,
                }}
            >
                {c.totalLabel.text}
            </span>

            {/* Animated total */}
            <div
                style={{
                    fontSize: c.totalAmount.fontSize,
                    color: c.totalAmount.color,
                    fontWeight: c.totalAmount.fontWeight,
                    fontFamily: sora,
                    lineHeight: 1,
                }}
            >
                {c.totalAmount.prefix}
                {formatAmount(animatedTotal)}
            </div>

            {/* Growth */}
            <span
                style={{
                    fontSize: c.growth.fontSize,
                    color: c.growth.color,
                    fontWeight: c.growth.fontWeight,
                    fontFamily: sora,
                    marginTop: -8,
                }}
            >
                {c.growth.text}
            </span>

            {/* Progress bar */}
            <div
                style={{
                    width: "100%",
                    height: c.progressBar.height,
                    borderRadius: c.progressBar.borderRadius,
                    backgroundColor: c.progressBar.trackColor,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${progressPercent}%`,
                        borderRadius: c.progressBar.borderRadius,
                        background: c.progressBar.background,
                        transition: "width 0.05s linear",
                    }}
                />
            </div>

            {/* Platform rows */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                {c.platforms.map((platform, i) => {
                    const r = c.platformRow
                    const isLast = i === c.platforms.length - 1
                    const animatedAmount = useCountUp(
                        platform.amount,
                        duration,
                        visible
                    )

                    return (
                        <div key={i}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingTop: i === 0 ? 0 : r.rowGap,
                                    paddingBottom: r.rowGap,
                                }}
                            >
                                {/* Left: icon + text */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 14,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: r.abbrSize,
                                            height: r.abbrSize,
                                            borderRadius: r.abbrBorderRadius,
                                            backgroundColor: platform.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: r.abbrFontSize,
                                                fontWeight: r.abbrFontWeight,
                                                color: r.abbrColor,
                                                fontFamily: sora,
                                            }}
                                        >
                                            {platform.abbr}
                                        </span>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 2,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: r.nameFontSize,
                                                color: r.nameColor,
                                                fontWeight: r.nameFontWeight,
                                                fontFamily: sora,
                                            }}
                                        >
                                            {platform.name}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: r.categoryFontSize,
                                                color: r.categoryColor,
                                                fontWeight:
                                                    r.categoryFontWeight,
                                                fontFamily: sora,
                                            }}
                                        >
                                            {platform.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: animated amount */}
                                <span
                                    style={{
                                        fontSize: r.amountFontSize,
                                        color: r.amountColor,
                                        fontWeight: r.amountFontWeight,
                                        fontFamily: sora,
                                    }}
                                >
                                    +${formatAmount(animatedAmount)}
                                </span>
                            </div>

                            {!isLast && (
                                <div
                                    style={{
                                        height: 1,
                                        backgroundColor: r.dividerColor,
                                        width: "100%",
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <span
                style={{
                    fontSize: c.footer.fontSize,
                    color: c.footer.color,
                    fontWeight: c.footer.fontWeight,
                    fontFamily: sora,
                }}
            >
                {c.footer.text}
            </span>
        </div>
    )
}
