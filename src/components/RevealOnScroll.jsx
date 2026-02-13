import { motion } from 'framer-motion';

const RevealOnScroll = ({ children, delay = 0, width = "100%" }) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05, margin: "0px 0px -50px 0px" }} // Triggers even earlier
                transition={{ duration: 0.3, delay: delay * 0.5, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RevealOnScroll;
