// Shared helpers for loading Google Fonts as raw TTF byte buffers,
// usable by next/og's <ImageResponse> (Satori) which only accepts TTF/OTF.
//
// The trick: send an old User-Agent so Google Fonts returns TTF instead of
// WOFF2 (which Satori cannot decode).

const LEGACY_UA =
	"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";

async function fetchGoogleFont(cssUrl: string): Promise<ArrayBuffer> {
	const css = await fetch(cssUrl, {
		headers: { "User-Agent": LEGACY_UA },
	}).then((r) => r.text());

	const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?truetype/);
	const fontUrl = match?.[1];
	if (!fontUrl) {
		throw new Error(`Could not parse TTF font URL from CSS: ${cssUrl}`);
	}

	return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export function loadInstrumentSerifItalic() {
	return fetchGoogleFont(
		"https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap",
	);
}

export function loadInter(weight: 400 | 500 | 600 | 700 = 500) {
	return fetchGoogleFont(
		`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`,
	);
}

export function loadJetBrainsMono(weight: 400 | 500 | 600 = 500) {
	return fetchGoogleFont(
		`https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}&display=swap`,
	);
}
