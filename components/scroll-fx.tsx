"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * 全局 GSAP 滚动效果控制器。
 * 通过 data-* 属性声明式驱动，避免到处散布 useEffect。
 *
 * 支持的指令：
 *  - data-reveal              元素进入视口时淡入上移；可与 data-reveal-delay (ms) 搭配
 *  - data-stagger             直接子元素逐个 stagger 进入；data-stagger-delay (ms) 起始延迟
 *  - data-parallax-y          纵向视差，data-speed=0.2 表示元素以 20% 反向位移
 *  - data-parallax-x          横向视差，data-speed=0.2 表示元素横向漂移
 *  - data-velocity-skew       根据滚动速度施加 skewY，营造 kinetic 感
 *  - data-counter             数字滚动到时计数到 textContent 的整数值
 *  - data-pin-fade            在 section 内固定时随滚动进度淡出/上移（适合 hero）
 *  - data-scrub-rotate        旋转角度跟随滚动进度，data-rotate=10
 */
export function ScrollFX() {
	const ref = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(
				{
					reduced: "(prefers-reduced-motion: reduce)",
					normal: "(prefers-reduced-motion: no-preference)",
				},
				(ctx) => {
					const reduced = !!ctx.conditions?.reduced;

					// ── Reveal ───────────────────────────────────────────────
					const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
					reveals.forEach((el) => {
						const delay = Number(el.dataset.revealDelay ?? 0) / 1000;
						gsap.fromTo(
							el,
							{ y: reduced ? 0 : 28, opacity: 0, filter: "blur(6px)" },
							{
								y: 0,
								opacity: 1,
								filter: "blur(0px)",
								duration: reduced ? 0.4 : 0.95,
								ease: "expo.out",
								delay,
								scrollTrigger: {
									trigger: el,
									start: "top 88%",
									once: true,
								},
							},
						);
					});

					// ── Stagger children ────────────────────────────────────
					const staggers = gsap.utils.toArray<HTMLElement>("[data-stagger]");
					staggers.forEach((el) => {
						const delay = Number(el.dataset.staggerDelay ?? 0) / 1000;
						const children = Array.from(el.children) as HTMLElement[];
						if (!children.length) return;
						gsap.fromTo(
							children,
							{ y: reduced ? 0 : 24, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								duration: reduced ? 0.3 : 0.8,
								ease: "expo.out",
								stagger: reduced ? 0 : 0.07,
								delay,
								scrollTrigger: {
									trigger: el,
									start: "top 85%",
									once: true,
								},
							},
						);
					});

					if (reduced) return;

					// ── Parallax Y ──────────────────────────────────────────
					const parallaxY = gsap.utils.toArray<HTMLElement>("[data-parallax-y]");
					parallaxY.forEach((el) => {
						const speed = Number(el.dataset.speed ?? 0.25);
						const distance = window.innerHeight * speed;
						gsap.fromTo(
							el,
							{ yPercent: 0 },
							{
								y: -distance,
								ease: "none",
								scrollTrigger: {
									trigger: el.closest("[data-parallax-scope]") ?? el,
									start: "top bottom",
									end: "bottom top",
									scrub: 0.6,
								},
							},
						);
					});

					// ── Parallax X ──────────────────────────────────────────
					const parallaxX = gsap.utils.toArray<HTMLElement>("[data-parallax-x]");
					parallaxX.forEach((el) => {
						const speed = Number(el.dataset.speed ?? 0.2);
						gsap.fromTo(
							el,
							{ xPercent: 0 },
							{
								xPercent: -100 * speed,
								ease: "none",
								scrollTrigger: {
									trigger: el.closest("[data-parallax-scope]") ?? el,
									start: "top bottom",
									end: "bottom top",
									scrub: 0.6,
								},
							},
						);
					});

					// ── Pin fade (hero) ────────────────────────────────────
					const pinFade = gsap.utils.toArray<HTMLElement>("[data-pin-fade]");
					pinFade.forEach((el) => {
						gsap.to(el, {
							y: -80,
							opacity: 0.0,
							ease: "none",
							scrollTrigger: {
								trigger: el,
								start: "top top+=80",
								end: "bottom top+=20",
								scrub: 0.8,
							},
						});
					});

					// ── Scrub rotate ───────────────────────────────────────
					const rotaters = gsap.utils.toArray<HTMLElement>("[data-scrub-rotate]");
					rotaters.forEach((el) => {
						const rot = Number(el.dataset.rotate ?? 12);
						gsap.fromTo(
							el,
							{ rotate: -rot },
							{
								rotate: rot,
								ease: "none",
								scrollTrigger: {
									trigger: el.closest("[data-parallax-scope]") ?? el,
									start: "top bottom",
									end: "bottom top",
									scrub: 1,
								},
							},
						);
					});

					// ── Velocity skew (kinetic bands) ──────────────────────
					const velocityNodes =
						gsap.utils.toArray<HTMLElement>("[data-velocity-skew]");
					velocityNodes.forEach((el) => {
						const max = Number(el.dataset.maxSkew ?? 8);
						const setSkew = gsap.quickTo(el, "skewY", {
							duration: 0.6,
							ease: "expo.out",
						});
						const setShift = gsap.quickTo(el, "x", {
							duration: 0.6,
							ease: "expo.out",
						});
						ScrollTrigger.create({
							trigger: el,
							start: "top bottom",
							end: "bottom top",
							onUpdate: (self) => {
								const v = gsap.utils.clamp(
									-max,
									max,
									self.getVelocity() / -260,
								);
								setSkew(v);
								setShift(v * -8);
							},
						});
					});

					// ── Number counters ────────────────────────────────────
					const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");
					counters.forEach((el) => {
						const targetRaw = el.dataset.counterTo ?? el.textContent ?? "0";
						const target = Number(
							String(targetRaw).replace(/[^\d.-]/g, ""),
						);
						if (Number.isNaN(target)) return;
						const suffix = el.dataset.counterSuffix ?? "";
						const decimals = Number(el.dataset.counterDecimals ?? 0);
						const obj = { v: 0 };
						gsap.to(obj, {
							v: target,
							duration: 1.6,
							ease: "expo.out",
							scrollTrigger: { trigger: el, start: "top 90%", once: true },
							onUpdate: () => {
								el.textContent = `${obj.v.toFixed(decimals)}${suffix}`;
							},
						});
					});

					return () => {
						ScrollTrigger.getAll().forEach((s) => s.kill());
					};
				},
			);

			// 文档高度可能因图片/字体变化而改变
			const refresh = () => ScrollTrigger.refresh();
			window.addEventListener("load", refresh);
			const t = setTimeout(refresh, 600);

			return () => {
				window.removeEventListener("load", refresh);
				clearTimeout(t);
				mm.revert();
			};
		},
		{ scope: ref },
	);

	return <div ref={ref} aria-hidden className="contents" />;
}
