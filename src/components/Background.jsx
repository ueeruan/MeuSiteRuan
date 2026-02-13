import { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let scrollY = window.scrollY;

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();

        const emojis = ['🎬', '🎥', '✂️', '🎞️', '🎧', '💻', '✨', '🔥', '🚀', '💾', '📹', '🕐', '🍎'];
        const particlesArray = [];
        const scrollParticlesArray = [];

        const numberOfEmojis = 25;
        const numberOfScrollParticles = 60;

        // Emoji Class (Floating Ambiently)
        class EmojiParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speedX = (Math.random() * 0.3) - 0.15;
                this.speedY = (Math.random() * 0.3) - 0.15;
                this.size = Math.random() * 20 + 20;
                this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
                this.opacity = Math.random() * 0.3 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width + 50) this.x = -50;
                if (this.x < -50) this.x = canvas.width + 50;
                if (this.y > canvas.height + 50) this.y = -50;
                if (this.y < -50) this.y = canvas.height + 50;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.font = `${this.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
                ctx.fillStyle = '#ffffff';
                ctx.fillText(this.emoji, this.x, this.y);
                ctx.globalAlpha = 1.0;
            }
        }

        // Scroll Particle Class (Reacts to Scroll)
        class ScrollParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5; // Small dots
                this.baseY = this.y;
                this.speed = Math.random() * 0.5 + 0.2; // Parallax factor
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                // Parallax effect: moves opposite to scroll direction
                // We use modulo to wrap around screen
                let parallaxY = this.baseY - (scrollY * this.speed);

                // Wrap around logic
                this.y = (parallaxY % canvas.height);
                if (this.y < 0) this.y += canvas.height;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#DC143C'; // Crimson dots
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        const init = () => {
            particlesArray.length = 0;
            scrollParticlesArray.length = 0;

            for (let i = 0; i < numberOfEmojis; i++) {
                particlesArray.push(new EmojiParticle());
            }
            for (let i = 0; i < numberOfScrollParticles; i++) {
                scrollParticlesArray.push(new ScrollParticle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Emojis
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            // Draw Scroll Particles
            for (let i = 0; i < scrollParticlesArray.length; i++) {
                scrollParticlesArray[i].update();
                scrollParticlesArray[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', () => {
            setCanvasSize();
            init();
        });

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40 mix-blend-screen"
        />
    );
};

export default Background;
