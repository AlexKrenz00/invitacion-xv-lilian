import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import "./DressCode.css";

export default function DressCode() {
  return (
    <section className="dressSection">
      <motion.div
        className="dressContent"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <div className="dressIcon">
          <Gem size={24} strokeWidth={1} />
        </div>

        <p className="dressMini">DRESS CODE</p>

        <h2>ELEGANTE</h2>

        <div className="dressLine">
          <span />
          <Sparkles size={11} />
          <span />
        </div>

        <p className="dressText">
          Elegí tu mejor look para una noche inolvidable.
        </p>

        <div className="reservedColor">
          <span className="blueDot" />

          <div>
            <p>COLOR RESERVADO</p>
            <strong>CELESTE</strong>
          </div>
        </div>

        <p className="dressNote">
          El celeste queda reservado exclusivamente para LILIAN.
          <br />
          Todos los demás colores son bienvenidos.
        </p>
      </motion.div>
    </section>
  );
}
