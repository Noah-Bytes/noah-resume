import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
	/** Pixel size for both width and height. */
	size?: number;
	className?: string;
	/** Render the rounded paper frame around the mark (used for icon/apple-icon). */
	showFrame?: boolean;
	/** Show the small registration crosshair top-left (engineer touch). */
	showCrosshair?: boolean;
	/** Show the trailing terracotta period dot bottom-right (editorial seal). */
	showPeriod?: boolean;
	/** Override ink color. Defaults to currentColor so it inherits text color. */
	inkColor?: string;
	/** Override accent color. Defaults to the design token --accent. */
	accentColor?: string;
	/** Frame fill (only used when showFrame). */
	paperColor?: string;
	/** Frame border (only used when showFrame). */
	borderColor?: string;
	/** Stroke weight of the N — auto-scaled when undefined. */
	strokeWidth?: number;
};

/**
 * Hand-drawn SVG monogram for Noah / 杨晨.
 *
 * Geometry (viewBox 64×64):
 *  - Left vertical bar (ink)  → x = 18, y = 15..49, stroke 6
 *  - Diagonal (terracotta)    → (18,15) → (46,49), stroke 6
 *  - Right vertical bar (ink) → x = 46, y = 15..49, stroke 6
 *  - Period dot (terracotta)  → cx 54, cy 49, r 3.5
 *  - Crosshair (ink @ 50%)    → top-left registration mark
 */
export function Logo({
	size = 32,
	className,
	showFrame = false,
	showCrosshair = true,
	showPeriod = true,
	inkColor = "currentColor",
	accentColor = "var(--accent)",
	paperColor = "var(--background)",
	borderColor = "var(--border)",
	strokeWidth = 6,
}: LogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 64 64"
			width={size}
			height={size}
			fill="none"
			role="img"
			aria-label="Noah"
			className={cn("shrink-0", className)}
		>
			{showFrame ? (
				<rect
					x="2"
					y="2"
					width="60"
					height="60"
					rx="12"
					fill={paperColor}
					stroke={borderColor}
					strokeWidth="1.5"
				/>
			) : null}

			{showCrosshair ? (
				<g
					stroke={inkColor}
					strokeWidth="1.4"
					strokeLinecap="round"
					opacity="0.55"
				>
					<line x1="9" y1="13" x2="13" y2="13" />
					<line x1="11" y1="11" x2="11" y2="15" />
				</g>
			) : null}

			{/* N — left vertical bar (ink) */}
			<line
				x1="18"
				y1="15"
				x2="18"
				y2="49"
				stroke={inkColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>

			{/* N — diagonal accent stroke (terracotta) */}
			<line
				x1="18"
				y1="15"
				x2="46"
				y2="49"
				stroke={accentColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>

			{/* N — right vertical bar (ink) */}
			<line
				x1="46"
				y1="15"
				x2="46"
				y2="49"
				stroke={inkColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>

			{/* trailing period dot (editorial seal) */}
			{showPeriod ? <circle cx="54" cy="49" r="3.5" fill={accentColor} /> : null}
		</svg>
	);
}
