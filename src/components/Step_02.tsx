import * as React from "react"

// ============================================
// TWEAK HERE
// ============================================

const CONFIG = {
    step: {
        label: "STEP 02",
        fontSize: 13,
        color: "#B8D2D6",
        fontWeight: 600,
        letterSpacing: "0.08em",
    },
    heading: {
        text: "Link the platforms you already use.",
        fontSize: 42,
        color: "#0a0a0a",
        fontWeight: 800,
        lineHeight: 1.1,
    },
    subheading: {
        text: "Connect your platforms",
        fontSize: 32,
        color: "#0a0a0a",
        fontWeight: 800,
        lineHeight: 1.2,
    },
    description: {
        text: "Link existing accounts. No new signups needed.",
        fontSize: 14,
        color: "#B8D2D6",
        fontWeight: 400,
        lineHeight: 1.5,
        maxWidth: 200,
    },
    platforms: [
        {
            abbr: "Rb",
            name: "Roobet",
            category: "Casino and Sports",
            color: "#F04E30",
            connected: true,
        },
        {
            abbr: "By",
            name: "Bybit",
            category: "Crypto Exchange",
            color: "#F7A600",
            connected: true,
        },
        {
            abbr: "Bn",
            name: "Binance",
            category: "Crypto Exchange",
            color: "#F3BA2F",
            connected: false,
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
        categoryColor: "#B8D2D6",
        categoryFontWeight: 400,
        dividerColor: "#e8e8e8",
        rowGap: 20,
    },
    connectedBadge: {
        label: "Connected",
        bg: "#e6f9f0",
        color: "#22c55e",
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 20,
        paddingX: 16,
        paddingY: 8,
    },
    connectButton: {
        label: "Connect →",
        bg: "#ebebf5",
        color: "#6666aa",
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 20,
        paddingX: 16,
        paddingY: 8,
    },
    width: 480,
    gap: 20,
}

// ============================================

export default function PlatformConnect() {
    // Font loaded globally

    const [platforms, setPlatforms] = React.useState(CONFIG.platforms)

    const toggleConnect = (index: number) => {
        setPlatforms((prev) =>
            prev.map((p, i) =>
                i === index ? { ...p, connected: !p.connected } : p
            )
        )
    }

    const c = CONFIG
    const sora = "'Sora', sans-serif"

    return (
        <div
            style={{
                width: c.width,
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

            {/* Main heading */}
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

            {/* Subheading */}
            <h2
                style={{
                    fontSize: c.subheading.fontSize,
                    color: c.subheading.color,
                    fontWeight: c.subheading.fontWeight,
                    lineHeight: c.subheading.lineHeight,
                    margin: 0,
                    fontFamily: sora,
                }}
            >
                {c.subheading.text}
            </h2>

            {/* Description */}
            <p
                style={{
                    fontSize: c.description.fontSize,
                    color: c.description.color,
                    fontWeight: c.description.fontWeight,
                    lineHeight: c.description.lineHeight,
                    maxWidth: c.description.maxWidth,
                    margin: 0,
                    fontFamily: sora,
                }}
            >
                {c.description.text}
            </p>

            {/* Platform rows */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                {platforms.map((platform, i) => {
                    const r = c.platformRow
                    const isLast = i === platforms.length - 1

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
                                    {/* Abbr icon */}
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

                                    {/* Name + category */}
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

                                {/* Right: badge or button */}
                                {platform.connected ? (
                                    <div
                                        style={{
                                            backgroundColor:
                                                c.connectedBadge.bg,
                                            color: c.connectedBadge.color,
                                            fontSize: c.connectedBadge.fontSize,
                                            fontWeight:
                                                c.connectedBadge.fontWeight,
                                            borderRadius:
                                                c.connectedBadge.borderRadius,
                                            padding: `${c.connectedBadge.paddingY}px ${c.connectedBadge.paddingX}px`,
                                            fontFamily: sora,
                                            cursor: "pointer",
                                        }}
                                        onClick={() => toggleConnect(i)}
                                    >
                                        {c.connectedBadge.label}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => toggleConnect(i)}
                                        style={{
                                            backgroundColor: c.connectButton.bg,
                                            color: c.connectButton.color,
                                            fontSize: c.connectButton.fontSize,
                                            fontWeight:
                                                c.connectButton.fontWeight,
                                            borderRadius:
                                                c.connectButton.borderRadius,
                                            padding: `${c.connectButton.paddingY}px ${c.connectButton.paddingX}px`,
                                            fontFamily: sora,
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {c.connectButton.label}
                                    </button>
                                )}
                            </div>

                            {/* Divider */}
                            {!isLast && (
                                <div
                                    style={{
                                        height: 1,
                                        backgroundColor:
                                            c.platformRow.dividerColor,
                                        width: "100%",
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
