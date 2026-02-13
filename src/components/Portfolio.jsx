import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "Edição Dinâmica",
        src: "https://www.youtube.com/embed/GGuzcLaSrqA"
    },
    {
        id: 6,
        title: "Edição Impactante",
        src: "https://www.youtube.com/embed/cxTJsL4ykDA"
    },
    {
        id: 7,
        title: "VFX Showcase",
        src: "https://www.youtube.com/embed/481-Zvh8ROY"
    },
    {
        id: 8,
        title: "Edição Cinematic",
        src: "https://www.youtube.com/embed/BuNZxzD-P-g"
    },
    {
        id: 4,
        title: "Edição Criativa",
        src: "https://www.youtube.com/embed/dKvzlmju_Sc"
    },
    {
        id: 5,
        title: "Motion Graphics",
        src: "https://www.youtube.com/embed/aW3pl6_WlTA"
    },
    {
        id: 2,
        title: "Cortes Rápidos",
        src: "https://www.youtube.com/embed/gMDAMt-tFo4"
    },
    {
        id: 3,
        title: "VFX & Motion",
        src: "https://www.youtube.com/embed/bfkqtuUz0bY"
    }
];

const Portfolio = () => {
    return (
        <section className="py-20 bg-brand-dark text-white" id="portfolio">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-12 text-center"
                >
                    Trabalhos Selecionados
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-white/10 group"
                        >
                            <iframe
                                className="w-full h-full object-cover"
                                src={project.src}
                                title={project.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12 text-blue-200/50 text-sm">
                    <p>Role para ver mais</p>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
