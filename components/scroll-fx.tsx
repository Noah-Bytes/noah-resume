"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * 全局 GSAP 滚动效果控制器（声明式）。
 *
 * 通过 data-* 属性驱动：
 *  - data-reveal              元素进入视口时淡入上移；data-reveal-delay (ms)
 *  - data-stagger             直接子元素逐个 stagger 进入；data-stagger-delay (ms)
 *  - data-parallax-y          纵向视差，data-speed=0.25
 *  - data-parallax-x          横向视差，data-speed=0.2
 *  - data-velocity-skew       根据滚动速度施加 skewY，营造 kinetic 感
 *  - data-counter             数字滚动到时计数到 data-counter-to
 *  - data-scrub-rotate        旋转角度跟随滚动进度，data-rotate=10
 */
export function ScrollFX() {
	useGSAP(() => {
		const mm = gsap.matchMedia();

		mm.add(
			{
				reduced: "(prefers-reduced-motion: reduce)",
				normal: "(prefers-reduced-motion: no-preference)",
			},
			(ctx) => {
				const reduced = !!ctx.conditions?.reduced;

				// ── Reveal ───────────────────────────────────────────────
				gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
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
				gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
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
				gsap.utils.toArray<HTMLElement>("[data-parallax-y]").forEach((el) => {
					const speed = Number(el.dataset.speed ?? 0.25);
					const distance = window.innerHeight * speed;
					const trigger = el.closest("[data-parallax-scope]") ?? el;
					gsap.fromTo(
						el,
						{ y: distance },
						{
							y: -distance,
							ease: "none",
							scrollTrigger: {
								trigger,
								start: "top bottom",
								end: "bottom top",
								scrub: 0.6,
							},
						},
					);
				});

				// ── Parallax X ──────────────────────────────────────────
				gsap.utils.toArray<HTMLElement>("[data-parallax-x]").forEach((el) => {
					const speed = Number(el.dataset.speed ?? 0.2);
					const trigger = el.closest("[data-parallax-scope]") ?? el;
					gsap.fromTo(
						el,
						{ xPercent: 0 },
						{
							xPercent: -100 * speed,
							ease: "none",
							scrollTrigger: {
								trigger,
								start: "top bottom",
								end: "bottom top",
								scrub: 0.6,
							},
						},
					);
				});

				// ── Scrub rotate ───────────────────────────────────────
				gsap.utils.toArray<HTMLElement>("[data-scrub-rotate]").forEach((el) => {
					const rot = Number(el.dataset.rotate ?? 12);
					const trigger = el.closest("[data-parallax-scope]") ?? el;
					gsap.fromTo(
						el,
						{ rotate: -rot },
						{
							rotate: rot,
							ease: "none",
							scrollTrigger: {
								trigger,
								start: "top bottom",
								end: "bottom top",
								scrub: 1,
							},
						},
					);
				});

				// ── Velocity skew (kinetic bands) ──────────────────────
				gsap.utils
					.toArray<HTMLElement>("[data-velocity-skew]")
					.forEach((el) => {
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
				gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
					const targetRaw = el.dataset.counterTo ?? el.textContent ?? "0";
					const target = Number(String(targetRaw).replace(/[^\d.-]/g, ""));
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
	}, {});

	return null;
}
