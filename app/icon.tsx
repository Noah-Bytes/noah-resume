import { ImageResponse } from "next/og";
import { loadInstrumentSerifItalic } from "@/lib/og-fonts";

// Brand tokens (approximations of the oklch values in styles/globals.css).
const PAPER = "#F7F2E6";
const INK = "#2B231A";
const ACCENT = "#C66237"; // warm terracotta

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
	const serifItalic = await loadInstrumentSerifItalic();

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: INK,
				borderRadius: 12,
				position: "relative",
			}}
		>
			<span
				style={{
					fontFamily: "InstrumentSerif",
					fontStyle: "italic",
					fontSize: 48,
					color: PAPER,
					lineHeight: 1,
					marginTop: -2,
					letterSpacing: -1,
				}}
			>
				N
			</span>
			<span
				style={{
					position: "absolute",
					right: 10,
					bottom: 10,
					width: 8,
					height: 8,
					borderRadius: 999,
					background: ACCENT,
				}}
			/>
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
			],
		},
	);
}
