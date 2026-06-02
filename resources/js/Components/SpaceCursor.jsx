import { useEffect, useRef } from 'react';

export default function SpaceCursor() {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!finePointer || reducedMotion) {
            return undefined;
        }

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const glow = glowRef.current;
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 2;
        let ringX = pointerX;
        let ringY = pointerY;
        let frame = null;

        document.documentElement.classList.add('has-space-cursor');

        const animate = () => {
            const dx = pointerX - ringX;
            const dy = pointerY - ringY;

            // Snap if very close and stop requestAnimationFrame
            if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                ringX = pointerX;
                ringY = pointerY;
                cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
                dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
                glow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
                frame = null;
                return;
            }

            ringX += dx * 0.18;
            ringY += dy * 0.18;

            cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
            glow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;

            frame = window.requestAnimationFrame(animate);
        };

        const move = (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (!frame) {
                frame = window.requestAnimationFrame(animate);
            }
        };

        const setInteractive = (event) => {
            const active = Boolean(event.target.closest('a, button, input, textarea, select, label, [role="button"]'));
            cursor.classList.toggle('is-interactive', active);
            dot.classList.toggle('is-interactive', active);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerover', setInteractive);
        animate();

        return () => {
            document.documentElement.classList.remove('has-space-cursor');
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerover', setInteractive);
        };
    }, []);

    return (
        <>
            <span ref={glowRef} className="space-cursor-glow" aria-hidden="true" />
            <span ref={cursorRef} className="space-cursor-ring" aria-hidden="true" />
            <span ref={dotRef} className="space-cursor-dot" aria-hidden="true" />
        </>
    );
}
