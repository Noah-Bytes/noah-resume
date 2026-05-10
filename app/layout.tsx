import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import {
	Instrument_Serif,
	Inter,
	JetBrains_Mono,
	Noto_Sans_SC,
	Noto_Serif_SC,
} from "next/font/google";
import { ResumeNotifyClickCapture } from "@/components/resume-notify-click-capture";
import meta from "@/lib/meta";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-instrument-serif",
	display: "swap",
});

// Chinese sans — used as fallback in --font-sans so Latin glyphs stay in Inter,
// while CJK glyphs render in Noto Sans SC.
const notoSansSC = Noto_Sans_SC({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-noto-sans-sc",
	display: "swap",
});

// Chinese serif — paired with Instrument Serif for editorial italics.
const notoSerifSC = Noto_Serif_SC({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-noto-serif-sc",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: meta.site.metadata.title,
	description: meta.site.metadata.description,
	keywords: meta.site.metadata.keywords,
	authors: meta.site.metadata.authors,
	manifest: "/site.webmanifest",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: meta.site.metadata.openGraph.title,
		description: meta.site.metadata.openGraph.description,
		type: meta.site.metadata.openGraph.type,
	},
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
		apple: "/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="zh-CN"
			className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${notoSansSC.variable} ${notoSerifSC.variable} bg-background`}
		>
			<body className="font-sans antialiased">
				<ResumeNotifyClickCapture />
				{children}
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
