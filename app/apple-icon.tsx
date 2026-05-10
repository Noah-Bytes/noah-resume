import { ImageResponse } from "next/og";

const PAPER = "#FBF7F2";
const INK = "#2A2724";
const ACCENT = "#C0644E";
const BORDER = "#DCD6CD";
const MUTED = "#A89F92";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Hand-drawn 180×180 mark for iOS home screen / large favicon.
 * Same monogram geometry as the React <Logo /> component, scaled up
 * with crosshair and corner markers visible.
 */
export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: PAPER,
				position: "relative",
			}}
		>
			{/* subtle paper grid */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `linear-gradient(to right, ${BORDER}80 1px, transparent 1px), linear-gradient(to bottom, ${BORDER}80 1px, transparent 1px)`,
					backgroundSize: "30px 30px",
					opacity: 0.45,
				}}
			/>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={180}
				height={180}
				viewBox="0 0 64 64"
				fill="none"
				style={{ position: "relative" }}
			>
				<title>Noah</title>

				{/* corner registration ticks (engineer touch) */}
				<g stroke={MUTED} strokeWidth="0.6" strokeLinecap="round">
					<line x1="6" y1="6" x2="11" y2="6" />
					<line x1="6" y1="6" x2="6" y2="11" />
					<line x1="58" y1="6" x2="53" y2="6" />
					<line x1="58" y1="6" x2="58" y2="11" />
					<line x1="6" y1="58" x2="11" y2="58" />
					<line x1="6" y1="58" x2="6" y2="53" />
					<line x1="58" y1="58" x2="53" y2="58" />
					<line x1="58" y1="58" x2="58" y2="53" />
				</g>

				{/* small crosshair top-left of the N (registration mark) */}
				<g stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
					<line x1="9" y1="13" x2="13" y2="13" />
					<line x1="11" y1="11" x2="11" y2="15" />
				</g>

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

				{/* baseline tick — engineer registration */}
				<line
					x1="14"
					y1="55"
					x2="22"
					y2="55"
					stroke={INK}
					strokeWidth="0.8"
					strokeLinecap="round"
					opacity="0.45"
				/>

				{/* period dot (terracotta seal) */}
				<circle cx="54" cy="49" r="3.5" fill={ACCENT} />
			</svg>
		</div>,
		{ ...size },
	);
}
