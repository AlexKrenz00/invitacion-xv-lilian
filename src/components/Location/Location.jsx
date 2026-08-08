import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import "./Location.css";

export default function Location() {
  return (
    <section className="locationSection">
      <motion.div
        className="locationCard"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <MapPin size={22} strokeWidth={1} />

        <p className="locationMini">NOS ENCONTRAMOS EN</p>

        <h2>Fantasy Gold</h2>

        <p className="locationAddress">
          Av. Forest 1422/32
          <br />
          Belgrano R · C.A.B.A.
        </p>

        <a
          href="https://maps.app.goo.gl/CFKh8rC2ptm6exMb8"
          target="_blank"
          rel="noreferrer"
        >
          <Navigation size={15} />
          CÓMO LLEGAR
        </a>
      </motion.div>
    </section>
  );
}
