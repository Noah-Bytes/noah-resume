import raw from "./meta.json";

/**
 * JSON 模块会把字面量收窄丢失（如 openGraph.type 变成 string）。
 * 与 Next Metadata 对齐：站点 Open Graph 固定为 profile。
 */
type MetaDocument = typeof raw & {
	site: typeof raw.site & {
		metadata: typeof raw.site.metadata & {
			openGraph: typeof raw.site.metadata.openGraph & {
				type: "profile";
			};
		};
	};
};

const meta = raw as MetaDocument;

export default meta;
