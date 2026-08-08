import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import "./Finale.css";

export default function Finale() {
  return (
    <section className="finaleSection">
      <motion.div
        className="finaleContent"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      >
        <motion.div
          className="finaleStar"
          animate={{
            opacity: [0.35, 1, 0.35],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>

        <p className="finaleMini">
          UNA NOCHE PARA RECORDAR
        </p>

        <h2>LILIAN</h2>

        <div className="finaleLine">
          <span />
          <Sparkles size={11} />
          <span />
        </div>

        <p className="finalePhrase">
          Nos vemos bajo las estrellas.
        </p>

        <p className="finaleDate">
          16 · 08 · 2026
        </p>

        <motion.p
          className="finaleThankYou"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Gracias por ser parte de esta noche tan especial.
        </motion.p>
      </motion.div>
    </section>
  );
}
