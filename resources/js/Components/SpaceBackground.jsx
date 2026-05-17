import { useEffect, useRef } from 'react';

const STAR_LAYERS = [
    { density: 0.00008, speed: 0.08, size: [0.45, 1.2], alpha: [0.25, 0.75] },
    { density: 0.00005, speed: 0.18, size: [0.8, 1.8], alpha: [0.35, 0.95] },
    { density: 0.00002, speed: 0.32, size: [1.2, 2.5], alpha: [0.45, 1] },
];

const randomBetween = (min, max) => Math.random() * (max - min) + min;

function createStar(width, height, layer) {
    const [minSize, maxSize] = layer.size;
    const [minAlpha, maxAlpha] = layer.alpha;

    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: randomBetween(minSize, maxSize),
        alpha: randomBetween(minAlpha, maxAlpha),
        twinkle: randomBetween(0.004, 0.018),
        phase: Math.random() * Math.PI * 2,
        speed: layer.speed * randomBetween(0.7, 1.35),
    };
}

export default function SpaceBackground({ theme = 'dark' }) {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isLight = theme === 'light';

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let animationFrame;
        let stars = [];
        let width = 0;
        let height = 0;
        let dpr = 1;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Layered density keeps desktop rich while avoiding too many particles on mobile.
            stars = STAR_LAYERS.flatMap((layer) => {
                const count = Math.max(18, Math.floor(width * height * layer.density));
                return Array.from({ length: count }, () => createStar(width, height, layer));
            });
        };

        const onPointerMove = (event) => {
            mouseRef.current = {
                x: (event.clientX / width - 0.5) * 18,
                y: (event.clientY / height - 0.5) * 18,
            };
        };

        const render = (time = 0) => {
            context.clearRect(0, 0, width, height);

            const gradient = context.createRadialGradient(width * 0.5, height * 0.2, 0, width * 0.5, height * 0.3, width * 0.9);
            gradient.addColorStop(0, isLight ? 'rgba(14, 165, 233, 0.18)' : 'rgba(34, 211, 238, 0.10)');
            gradient.addColorStop(0.42, isLight ? 'rgba(217, 70, 239, 0.09)' : 'rgba(168, 85, 247, 0.055)');
            gradient.addColorStop(1, isLight ? 'rgba(248, 250, 252, 0)' : 'rgba(5, 5, 6, 0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);

            stars.forEach((star, index) => {
                if (!reducedMotion) {
                    star.y += star.speed;
                    star.x += Math.sin(time * 0.00018 + star.phase) * 0.08;

                    if (star.y > height + 8) {
                        star.y = -8;
                        star.x = Math.random() * width;
                    }
                }

                const depth = star.radius / 2.5;
                const parallaxX = mouseRef.current.x * depth;
                const parallaxY = mouseRef.current.y * depth;
                const pulse = reducedMotion ? 1 : 0.65 + Math.sin(time * star.twinkle + star.phase) * 0.35;

                context.beginPath();
                context.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
                context.fillStyle = isLight
                    ? `rgba(15, 23, 42, ${star.alpha * pulse * 0.34})`
                    : `rgba(226, 245, 255, ${star.alpha * pulse})`;
                context.fill();

                // Subtle constellation links make the background feel intentional, not just dotted.
                const next = stars[index + 1];
                if (next && index % 9 === 0) {
                    const distance = Math.hypot(star.x - next.x, star.y - next.y);
                    if (distance < 120) {
                        context.beginPath();
                        context.moveTo(star.x + parallaxX, star.y + parallaxY);
                        context.lineTo(next.x + parallaxX, next.y + parallaxY);
                        context.strokeStyle = isLight
                            ? `rgba(14, 116, 144, ${0.11 * (1 - distance / 120)})`
                            : `rgba(103, 232, 249, ${0.08 * (1 - distance / 120)})`;
                        context.lineWidth = 1;
                        context.stroke();
                    }
                }
            });

            animationFrame = window.requestAnimationFrame(render);
        };

        resize();
        render();

        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointerMove);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [isLight]);

    return (
        <div className="space-background pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#03040b]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
            <div className="space-nebula absolute inset-0" />
            <span className="shooting-star shooting-star-1" />
            <span className="shooting-star shooting-star-2" />
            <span className="shooting-star shooting-star-3" />
            <div className="space-grid absolute inset-0" />
        </div>
    );
}
