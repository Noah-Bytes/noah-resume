import { ImageResponse } from "next/og";
import meta from "@/lib/meta";

export const alt = meta.site.metadata.openGraph.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	const { profile } = meta.resume;
	const title = meta.site.metadata.openGraph.title;
	const description = meta.site.metadata.openGraph.description;

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "72px 80px",
				background: "linear-gradient(145deg, #0c0c0c 0%, #1a1512 48%, #2a1f18 100%)",
				color: "#f5f0eb",
				fontFamily: "system-ui, sans-serif",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
				<div
					style={{
						width: 56,
						height: 56,
						borderRadius: 12,
						background: "rgba(212, 165, 116, 0.2)",
						border: "1px solid rgba(212, 165, 116, 0.45)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 28,
						fontWeight: 600,
						color: "#d4a574",
					}}
				>
					N
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
					<span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
						{profile.name} · {profile.englishName}
					</span>
					<span style={{ fontSize: 18, color: "rgba(245, 240, 235, 0.65)" }}>
						{profile.taglineCN}
					</span>
				</div>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
				<span
					style={{
						fontSize: 52,
						fontWeight: 600,
						lineHeight: 1.1,
						letterSpacing: "-0.03em",
					}}
				>
					{title}
				</span>
				<span style={{ fontSize: 26, lineHeight: 1.45, color: "rgba(245, 240, 235, 0.72)" }}>
					{description}
				</span>
			</div>
			<span
				style={{
					fontSize: 22,
					fontFamily: "monospace",
					color: "rgba(212, 165, 116, 0.85)",
					letterSpacing: "0.12em",
				}}
			>
				www.noahyc.me
			</span>
		</div>,
		{ ...size },
	);
}
