import * as React from "react"

// ============================================
// TWEAK HERE
// ============================================

const CONFIG = {
    step: {
        label: "STEP 01",
        fontSize: 13,
        color: "#B8D2D6",
        fontWeight: 600,
        letterSpacing: "0.08em",
    },
    heading: {
        text: "Create your free Askew account.",
        fontSize: 42,
        color: "#0a0a0a",
        fontWeight: 800,
        lineHeight: 1.1,
    },
    brand: {
        name: "Askew",
        logoSrc: "", // paste your logo URL here
        logoSize: 28,
        fontSize: 16,
        fontWeight: 700,
        color: "#0a0a0a",
        show: true,
    },
    tabs: {
        options: ["Sign Up", "Sign In"],
        defaultTab: "Sign Up",
        activeBg: "#ffffff",
        inactiveBg: "transparent",
        activeColor: "#0a0a0a",
        inactiveColor: "#aaaaaa",
        containerBg: "#f0f1f5",
        borderRadius: 14,
        fontSize: 15,
        fontWeight: 600,
    },
    input: {
        placeholder: "info@askew.com",
        fontSize: 15,
        color: "#0a0a0a",
        placeholderColor: "#aaaaaa",
        borderColor: "#e0e0e0",
        borderRadius: 14,
        bg: "#ffffff",
        iconColor: "#aaaaaa",
        successColor: "#22c55e",
    },
    button: {
        label: "Continue",
        bg: "#0a0a0a",
        color: "#ffffff",
        fontSize: 17,
        fontWeight: 700,
        borderRadius: 16,
        showArrow: true,
    },
    footer: {
        text: "No credit card. No deposit.",
        fontSize: 13,
        color: "#B8D2D6",
        fontWeight: 400,
    },
    width: 420,
    gap: 16,
}

// ============================================

export default function AuthCard() {
    // Font loaded globally

    const [activeTab, setActiveTab] = React.useState(CONFIG.tabs.defaultTab)
    const [email, setEmail] = React.useState("")
    const [valid, setValid] = React.useState(false)

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setEmail(val)
        setValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
    }

    const c = CONFIG
    const sora = "'Sora', sans-serif"

    return (
        <div
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

            {/* Brand row */}
            {c.brand.show && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {c.brand.logoSrc && (
                        <img
                            src={c.brand.logoSrc}
                            style={{
                                width: c.brand.logoSize,
                                height: c.brand.logoSize,
                            }}
                        />
                    )}
                    <span
                        style={{
                            fontSize: c.brand.fontSize,
                            fontWeight: c.brand.fontWeight,
                            color: c.brand.color,
                            fontFamily: sora,
                        }}
                    >
                        {c.brand.name}
                    </span>
                </div>
            )}

            {/* Tab toggle */}
            <div
                style={{
                    display: "flex",
                    backgroundColor: c.tabs.containerBg,
                    borderRadius: c.tabs.borderRadius,
                    padding: 4,
                }}
            >
                {c.tabs.options.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            padding: "10px 0",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: c.tabs.borderRadius - 2,
                            background:
                                activeTab === tab
                                    ? c.tabs.activeBg
                                    : c.tabs.inactiveBg,
                            color:
                                activeTab === tab
                                    ? c.tabs.activeColor
                                    : c.tabs.inactiveColor,
                            fontSize: c.tabs.fontSize,
                            fontWeight: c.tabs.fontWeight,
                            fontFamily: sora,
                            boxShadow:
                                activeTab === tab
                                    ? "0 1px 4px rgba(0,0,0,0.1)"
                                    : "none",
                            transition: "all 0.2s ease",
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Email input */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 16px",
                    border: `1.5px solid ${c.input.borderColor}`,
                    borderRadius: c.input.borderRadius,
                    backgroundColor: c.input.bg,
                }}
            >
                {/* Envelope icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke={c.input.iconColor}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M22 6l-10 7L2 6"
                        stroke={c.input.iconColor}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <input
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder={c.input.placeholder}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: c.input.fontSize,
                        color: c.input.color,
                        fontFamily: sora,
                        background: "transparent",
                    }}
                />

                {/* Checkmark */}
                {valid && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill={c.input.successColor}
                        />
                        <path
                            d="M8 12l3 3 5-5"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>

            {/* Continue button */}
            <button
                style={{
                    width: "100%",
                    padding: "18px",
                    backgroundColor: c.button.bg,
                    color: c.button.color,
                    fontSize: c.button.fontSize,
                    fontWeight: c.button.fontWeight,
                    fontFamily: sora,
                    border: "none",
                    borderRadius: c.button.borderRadius,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                {c.button.label}
                {c.button.showArrow && <span>→</span>}
            </button>

            {/* Footer */}
            <span
                style={{
                    fontSize: c.footer.fontSize,
                    color: c.footer.color,
                    fontWeight: c.footer.fontWeight,
                    fontFamily: sora,
                    textAlign: "center",
                }}
            >
                {c.footer.text}
            </span>
        </div>
    )
}
