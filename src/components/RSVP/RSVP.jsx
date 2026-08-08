import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";
import "./RSVP.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwa05VQxSaiJkveqXH29NPkr0SkKd9neh8yedtviCaLaWUcwQZfBkVpzwl5aMtmrho/exec";

export default function RSVP() {
  const [form, setForm] = useState({
    nombre: "",
    cantidad: "1",
    asiste: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.asiste) {
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      setStatus("success");

      setForm({
        nombre: "",
        cantidad: "1",
        asiste: "",
        mensaje: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="rsvpSection">
      <motion.div
        className="rsvpContent"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <Sparkles size={22} strokeWidth={1} />

        <p className="rsvpMini">
          CONFIRMACIÓN DE ASISTENCIA
        </p>

        <h2>¿NOS ACOMPAÑÁS?</h2>

        <p className="rsvpText">
          Nos encantaría compartir esta noche con vos.
        </p>

        {status === "success" ? (
          <motion.div
            className="rsvpSuccess"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={35} strokeWidth={1} />

            <h3>ASISTENCIA REGISTRADA</h3>

            <p>
              Gracias por confirmar.
              <br />
              Nos vemos bajo las estrellas ✦
            </p>

            <button
              type="button"
              onClick={() => setStatus("idle")}
            >
              ENVIAR OTRA RESPUESTA
            </button>
          </motion.div>
        ) : (
          <form
            className="rsvpForm"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre y apellido"
              required
            />

            <input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              min="1"
              max="20"
              placeholder="Cantidad de personas"
              required
            />

            <select
              name="asiste"
              value={form.asiste}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                ¿Vas a asistir?
              </option>

              <option value="Sí, voy a estar">
                Sí, voy a estar
              </option>

              <option value="No voy a poder asistir">
                No voy a poder asistir
              </option>
            </select>

   

            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows="4"
              placeholder="Mensaje adicional."
            />

            {status === "error" && (
              <p className="rsvpError">
                Completá nombre y asistencia antes de continuar.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
            >
              <Send size={15} />

              {status === "sending"
                ? "ENVIANDO..."
                : "CONFIRMAR ASISTENCIA"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
