import { ImageResponse } from "next/og";

// Brand tokens (hex approximations of the OKLCH values in styles/globals.css).
const PAPER = "#FBF7F2";
const INK = "#2A2724";
const ACCENT = "#C0644E";
const BORDER = "#DCD6CD";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Hand-drawn monogram favicon. Renders the same geometry as <Logo />
 * inline as raw <svg> so Satori does not need any font.
 *
 * At 64×64 we keep the registration crosshair off — too dense for tab icons.
 */
export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: PAPER,
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={64}
				height={64}
				viewBox="0 0 64 64"
				fill="none"
			>
				<title>Noah</title>
				<rect
					x="2"
					y="2"
					width="60"
					height="60"
					rx="12"
					fill={PAPER}
					stroke={BORDER}
					strokeWidth="1.5"
				/>
				{/* N — left vertical (ink) */}
				<line
					x1="18"
					y1="15"
					x2="18"
					y2="49"
					stroke={INK}
					strokeWidth="6"
					strokeLinecap="round"
				/>
				{/* N — diagonal (terracotta) */}
				<line
					x1="18"
					y1="15"
					x2="46"
					y2="49"
					stroke={ACCENT}
					strokeWidth="6"
					strokeLinecap="round"
				/>
				{/* N — right vertical (ink) */}
				<line
					x1="46"
					y1="15"
					x2="46"
					y2="49"
					stroke={INK}
					strokeWidth="6"
					strokeLinecap="round"
				/>
				{/* period dot (terracotta seal) */}
				<circle cx="54" cy="49" r="3.5" fill={ACCENT} />
			</svg>
		</div>,
		{ ...size },
	);
}
