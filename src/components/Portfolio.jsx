import RevealOnScroll from './RevealOnScroll';
import VideoCarousel from './VideoCarousel';

const projects = [
    {
        id: 1,
        title: "Edição Dinâmica",
        category: "Retenção",
        src: "https://www.youtube.com/embed/GGuzcLaSrqA"
    },
    {
        id: 6,
        title: "Edição Impactante",
        category: "Visuals",
        src: "https://www.youtube.com/embed/cxTJsL4ykDA"
    },
    {
        id: 7,
        title: "VFX Showcase",
        category: "Motion",
        src: "https://www.youtube.com/embed/481-Zvh8ROY"
    },
    {
        id: 8,
        title: "Edição Cinematic",
        category: "Style",
        src: "https://www.youtube.com/embed/BuNZxzD-P-g"
    },
    {
        id: 4,
        title: "Edição Criativa",
        category: "Concept",
        src: "https://www.youtube.com/embed/dKvzlmju_Sc"
    },
    {
        id: 5,
        title: "Motion Graphics",
        category: "Design",
        src: "https://www.youtube.com/embed/aW3pl6_WlTA"
    },
    {
        id: 2,
        title: "Cortes Rápidos",
        category: "Social",
        src: "https://www.youtube.com/embed/gMDAMt-tFo4"
    },
    {
        id: 3,
        title: "VFX & Motion",
        category: "Advanced",
        src: "https://www.youtube.com/embed/bfkqtuUz0bY"
    }
];

const Portfolio = () => {
    return (
        <section className="py-32 bg-transparent overflow-hidden" id="portfolio">
            <div className="container mx-auto px-4">
                <RevealOnScroll>
                    <div className="flex flex-col items-center mb-12">
                        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Portfolio</span>
                        <h2 className="text-5xl md:text-7xl font-heading text-center tracking-tighter">
                            TRABALHOS <span className="text-brand-accent">SELECIONADOS</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <VideoCarousel projects={projects} />
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Portfolio;
