import * as React from "react"

export default function ShimmerText() {
    // Font loaded globally

    return (
        <div style={wrapper}>
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    50%  { background-position: 200% center; }
                    100% { background-position: 200% center; }
                }
                .shimmer-text {
                    background: linear-gradient(
                        120deg,
                        rgba(255,255,255,0.9) 0%,
                        rgba(255,255,255,0.9) 40%,
                        rgba(255,255,255,1.0) 47%,
                        rgba(255,255,255,1.0) 53%,
                        rgba(255,255,255,0.9) 60%,
                        rgba(255,255,255,0.9) 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 6s ease-in-out infinite;
                }
            `}</style>
            <div style={textBlock}>
                <p className="shimmer-text" style={line}>
                    You already trade.
                </p>
                <p className="shimmer-text" style={line}>
                    Start getting paid
                </p>
                <p className="shimmer-text" style={line}>
                    for it.
                </p>
            </div>
        </div>
    )
}

const wrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
}

const textBlock: React.CSSProperties = {
    textAlign: "center",
}

const line: React.CSSProperties = {
    fontSize: "clamp(36px, 6vw, 46px)",
    fontWeight: 800,
    fontFamily: "'Sora', sans-serif",
    margin: 0,
    lineHeight: 1.15,
}
