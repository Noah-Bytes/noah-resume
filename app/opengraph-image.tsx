import { ImageResponse } from "next/og";
import {
	loadInstrumentSerifItalic,
	loadInter,
	loadJetBrainsMono,
} from "@/lib/og-fonts";

const PAPER = "#F7F2E6";
const PAPER_LIGHT = "#FBF8EE";
const INK = "#2B231A";
const ACCENT = "#C66237";
const MUTED = "#7A7165";
const BORDER = "#D9D2C0";

export const alt =
	"Noah · Yang Chen — Senior Full-stack / Electron Infrastructure Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
	const [serifItalic, inter500, inter600, mono] = await Promise.all([
		loadInstrumentSerifItalic(),
		loadInter(500),
		loadInter(600),
		loadJetBrainsMono(500),
	]);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				background: PAPER,
				padding: 64,
				fontFamily: "Inter",
				color: INK,
				position: "relative",
			}}
		>
			{/* hairline grid */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `linear-gradient(to right, ${BORDER}55 1px, transparent 1px), linear-gradient(to bottom, ${BORDER}55 1px, transparent 1px)`,
					backgroundSize: "64px 64px",
					opacity: 0.5,
				}}
			/>
			{/* soft accent glow */}
			<div
				style={{
					position: "absolute",
					top: -160,
					right: -120,
					width: 520,
					height: 520,
					borderRadius: 999,
					background: `${ACCENT}22`,
					filter: "blur(60px)",
				}}
			/>

			{/* Top bar */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					position: "relative",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 14,
					}}
				>
					<svg
						width={52}
						height={52}
						viewBox="0 0 64 64"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Noah</title>
						<g
							stroke={INK}
							strokeWidth="1.4"
							strokeLinecap="round"
							opacity="0.55"
						>
							<line x1="9" y1="13" x2="13" y2="13" />
							<line x1="11" y1="11" x2="11" y2="15" />
						</g>
						<line
							x1="18"
							y1="15"
							x2="18"
							y2="49"
							stroke={INK}
							strokeWidth="6"
							strokeLinecap="round"
						/>
						<line
							x1="18"
							y1="15"
							x2="46"
							y2="49"
							stroke={ACCENT}
							strokeWidth="6"
							strokeLinecap="round"
						/>
						<line
							x1="46"
							y1="15"
							x2="46"
							y2="49"
							stroke={INK}
							strokeWidth="6"
							strokeLinecap="round"
						/>
						<circle cx="54" cy="49" r="3.5" fill={ACCENT} />
					</svg>
					<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<span style={{ fontSize: 18, fontWeight: 600 }}>
							Yang Chen{" "}
							<span style={{ color: MUTED, fontWeight: 500 }}>/ Noah</span>
						</span>
						<span
							style={{
								fontFamily: "JetBrainsMono",
								fontSize: 11,
								letterSpacing: 2,
								color: MUTED,
								textTransform: "uppercase",
							}}
						>
							full-stack engineer
						</span>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						padding: "8px 16px",
						background: PAPER_LIGHT,
						border: `1px solid ${BORDER}`,
						borderRadius: 999,
					}}
				>
					<div
						style={{
							width: 8,
							height: 8,
							borderRadius: 999,
							background: ACCENT,
						}}
					/>
					<span
						style={{
							fontFamily: "JetBrainsMono",
							fontSize: 12,
							letterSpacing: 2,
							color: MUTED,
							textTransform: "uppercase",
						}}
					>
						Open to · Senior Full-stack
					</span>
				</div>
			</div>

			{/* Main */}
			<div
				style={{
					marginTop: 70,
					display: "flex",
					flexDirection: "column",
					position: "relative",
				}}
			>
				<span
					style={{
						fontFamily: "JetBrainsMono",
						fontSize: 13,
						letterSpacing: 3,
						color: MUTED,
						textTransform: "uppercase",
					}}
				>
					Portfolio · Noah Bytes
				</span>

				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						flexWrap: "wrap",
						marginTop: 18,
						fontSize: 104,
						fontWeight: 500,
						letterSpacing: -3,
						lineHeight: 1.02,
					}}
				>
					<span>Hi, I&rsquo;m&nbsp;</span>
					<span
						style={{
							fontFamily: "InstrumentSerif",
							fontStyle: "italic",
							color: ACCENT,
							fontWeight: 400,
						}}
					>
						Noah
					</span>
					<span style={{ color: `${INK}55`, fontWeight: 500 }}>&nbsp;/&nbsp;</span>
					<span>Yang Chen</span>
					<span style={{ color: ACCENT }}>.</span>
				</div>

				<div
					style={{
						marginTop: 28,
						fontSize: 28,
						color: MUTED,
						maxWidth: 980,
						lineHeight: 1.4,
						display: "flex",
					}}
				>
					<span>
						Senior Full-stack / Electron Infrastructure Engineer — building
						scalable desktop & full-stack systems since 2014.
					</span>
				</div>
			</div>

			{/* Footer */}
			<div
				style={{
					marginTop: "auto",
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "space-between",
					position: "relative",
				}}
			>
				<div style={{ display: "flex", gap: 56 }}>
					{[
						{ value: "11", suffix: "yrs", label: "Building" },
						{ value: "6", suffix: "yrs", label: "Leading" },
						{ value: "1M+", suffix: "", label: "Merchants" },
						{ value: "$5B+", suffix: "", label: "GMV served" },
					].map((s) => (
						<div
							key={s.label}
							style={{ display: "flex", flexDirection: "column", gap: 4 }}
						>
							<div
								style={{
									display: "flex",
									alignItems: "baseline",
									gap: 4,
								}}
							>
								<span
									style={{
										fontSize: 44,
										fontWeight: 600,
										letterSpacing: -1,
									}}
								>
									{s.value}
								</span>
								{s.suffix ? (
									<span style={{ fontSize: 18, color: MUTED }}>
										{s.suffix}
									</span>
								) : null}
							</div>
							<span
								style={{
									fontFamily: "JetBrainsMono",
									fontSize: 11,
									letterSpacing: 2,
									color: MUTED,
									textTransform: "uppercase",
								}}
							>
								{s.label}
							</span>
						</div>
					))}
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						gap: 8,
					}}
				>
					<span
						style={{
							fontFamily: "JetBrainsMono",
							fontSize: 13,
							letterSpacing: 2,
							color: MUTED,
							textTransform: "uppercase",
						}}
					>
						Xi&rsquo;an · Remote
					</span>
					<span
						style={{
							fontFamily: "JetBrainsMono",
							fontSize: 16,
							color: INK,
						}}
					>
						github.com/Noah-Bytes
					</span>
				</div>
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
				{ name: "Inter", data: inter500, style: "normal", weight: 500 },
				{ name: "Inter", data: inter600, style: "normal", weight: 600 },
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
