import { ImageResponse } from "next/og";
import { loadInstrumentSerifItalic, loadJetBrainsMono } from "@/lib/og-fonts";

const PAPER = "#F7F2E6";
const INK = "#2B231A";
const ACCENT = "#C66237";
const MUTED = "#9A9080";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
	const [serifItalic, mono] = await Promise.all([
		loadInstrumentSerifItalic(),
		loadJetBrainsMono(500),
	]);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: INK,
				padding: 22,
				position: "relative",
			}}
		>
			{/* hairline grid */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(to right, rgba(247,242,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,242,230,0.06) 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontFamily: "JetBrainsMono",
					fontSize: 11,
					letterSpacing: 2,
					color: MUTED,
					textTransform: "uppercase",
				}}
			>
				<span>NOAH</span>
				<span style={{ color: ACCENT }}>·</span>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "center",
					flex: 1,
				}}
			>
				<span
					style={{
						fontFamily: "InstrumentSerif",
						fontStyle: "italic",
						fontSize: 150,
						color: PAPER,
						lineHeight: 0.9,
						letterSpacing: -4,
					}}
				>
					N
				</span>
				<span
					style={{
						fontFamily: "InstrumentSerif",
						fontStyle: "italic",
						fontSize: 64,
						color: ACCENT,
						lineHeight: 0.9,
						marginLeft: 2,
					}}
				>
					.
				</span>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					fontFamily: "JetBrainsMono",
					fontSize: 11,
					letterSpacing: 2,
					color: MUTED,
					textTransform: "uppercase",
				}}
			>
				<span>FULL-STACK</span>
				<span>2014</span>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "InstrumentSerif",
					data: serifItalic,
					style: "italic",
					weight: 400,
				},
				{
					name: "JetBrainsMono",
					data: mono,
					style: "normal",
					weight: 500,
				},
			],
		},
	);
}
