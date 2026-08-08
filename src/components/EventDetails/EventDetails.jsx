import AddToCalendar from "../AddToCalendar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";
import "./EventDetails.css";

const EVENT_DATE = new Date("2026-08-16T21:30:00-03:00");

function calculateTimeLeft() {
  const difference = EVENT_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownBox({ number, label }) {
  return (
    <motion.div
      className="countdownBox"
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <span className="countdownNumber">
        {String(number).padStart(2, "0")}
      </span>

      <span className="countdownLabel">{label}</span>
    </motion.div>
  );
}

export default function EventDetails() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="eventSection">
      <div className="eventNebula eventNebulaOne" />
      <div className="eventNebula eventNebulaTwo" />

      <div className="eventContent">

        <motion.div
          className="eventTinyTitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <span />
          <Sparkles size={14} strokeWidth={1} />
          <p>GUARDÁ ESTA FECHA</p>
          <Sparkles size={14} strokeWidth={1} />
          <span />
        </motion.div>

        <motion.div
          className="constellation15"
          initial={{
            opacity: 0,
            scale: 0.65,
            filter: "blur(15px)",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="fifteenGlow" />

          <span className="big15">15</span>

          <span className="constellationStar starA">✦</span>
          <span className="constellationStar starB">✧</span>
          <span className="constellationStar starC">✦</span>
          <span className="constellationStar starD">✧</span>
        </motion.div>

        <motion.p
          className="dateDay"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          DOMINGO
        </motion.p>

        <motion.h2
          className="eventDate"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          16 DE AGOSTO
        </motion.h2>

        <motion.p
          className="eventYear"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          2026
        </motion.p>

        <motion.div
          className="dateOrnament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <span />
          <b>✦</b>
          <span />
        </motion.div>

        <motion.div
          className="eventSchedule"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.5 }}
        >
          <div className="scheduleItem">
            <Clock3 size={18} strokeWidth={1} />

            <div>
              <span>COMIENZO</span>
              <strong>21:30 HS</strong>
            </div>
          </div>

          <div className="scheduleDivider" />

          <div className="scheduleItem">
            <CalendarDays size={18} strokeWidth={1} />

            <div>
              <span>FINALIZACIÓN</span>
              <strong>05:00 HS</strong>
            </div>
          </div>
        </motion.div>

        <AddToCalendar />

        <motion.div
          className="countdownArea"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, delay: 0.2 }}
        >
          <p className="countdownPre">FALTAN</p>

          <div className="countdown">
            <CountdownBox
              number={timeLeft.days}
              label="DÍAS"
            />

            <span className="countSeparator">:</span>

            <CountdownBox
              number={timeLeft.hours}
              label="HORAS"
            />

            <span className="countSeparator">:</span>

            <CountdownBox
              number={timeLeft.minutes}
              label="MIN"
            />

            <span className="countSeparator">:</span>

            <CountdownBox
              number={timeLeft.seconds}
              label="SEG"
            />
          </div>

          <p className="countdownEnding">
            hasta que las estrellas sean testigos
          </p>
        </motion.div>

      </div>
    </section>
  );
}
