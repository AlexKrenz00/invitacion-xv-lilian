#!/usr/bin/env bash
set -e

cd ~/Proyectos/invitacion-xv

echo "=========================================="
echo "  Instalando sección Fecha + Countdown"
echo "=========================================="

# ------------------------------------------------------------
# 1) BACKUP
# ------------------------------------------------------------

mkdir -p backups

STAMP="$(date +%Y%m%d_%H%M%S)"

cp src/App.jsx "backups/App_${STAMP}.jsx"
cp src/App.css "backups/App_${STAMP}.css"

echo "✅ Backup creado"

# ------------------------------------------------------------
# 2) COMPONENTE
# ------------------------------------------------------------

mkdir -p src/components/EventDetails

cat > src/components/EventDetails/EventDetails.jsx <<'EOF'
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
EOF

echo "✅ EventDetails.jsx creado"

# ------------------------------------------------------------
# 3) CSS
# ------------------------------------------------------------

cat > src/components/EventDetails/EventDetails.css <<'EOF'
.eventSection {
  position: relative;
  z-index: 5;
  width: 100%;
  min-height: 115vh;
  margin-top: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 20px 130px;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 45%,
      rgba(33, 48, 104, 0.18),
      transparent 38%
    ),
    linear-gradient(
      180deg,
      rgba(2, 4, 12, 0) 0%,
      rgba(3, 6, 18, 0.58) 20%,
      rgba(3, 6, 18, 0.86) 70%,
      rgba(2, 4, 12, 0.95) 100%
    );
}

.eventContent {
  position: relative;
  z-index: 5;
  width: min(1050px, 94%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.eventNebula {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  opacity: 0.18;
}

.eventNebulaOne {
  width: 520px;
  height: 520px;
  left: -180px;
  top: 18%;
  background: rgba(71, 96, 180, 0.3);
}

.eventNebulaTwo {
  width: 450px;
  height: 450px;
  right: -160px;
  bottom: 10%;
  background: rgba(148, 122, 71, 0.14);
}

.eventTinyTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 25px;
  color: rgba(226, 232, 246, 0.48);
}

.eventTinyTitle span {
  width: 45px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(216, 190, 122, 0.65)
  );
}

.eventTinyTitle span:last-child {
  background: linear-gradient(
    90deg,
    rgba(216, 190, 122, 0.65),
    transparent
  );
}

.eventTinyTitle p {
  font-size: 8px;
  letter-spacing: 0.5em;
  margin-left: 0.5em;
}

.constellation15 {
  position: relative;
  margin: 10px 0 15px;
  width: 310px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.big15 {
  position: relative;
  z-index: 2;
  font-family: "Cormorant Garamond", serif;
  font-size: 220px;
  font-weight: 300;
  line-height: 1;

  background: linear-gradient(
    105deg,
    #f8f7f2,
    #e8ddba 27%,
    #c9ad65 48%,
    #fff7da 62%,
    #c5a85e 80%,
    #ffffff
  );

  background-size: 250% auto;

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  animation: fifteenShimmer 8s linear infinite;

  filter: drop-shadow(
    0 0 35px rgba(216, 190, 122, 0.12)
  );
}

@keyframes fifteenShimmer {
  to {
    background-position: 250% center;
  }
}

.fifteenGlow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(92, 119, 210, 0.16),
    transparent 67%
  );

  filter: blur(15px);
}

.constellationStar {
  position: absolute;
  color: #efd998;

  text-shadow:
    0 0 12px rgba(240, 216, 150, 0.9);

  animation:
    constellationBlink
    2.5s
    ease-in-out
    infinite;
}

.starA {
  left: 8px;
  top: 40px;
  font-size: 10px;
}

.starB {
  right: 5px;
  top: 78px;
  font-size: 16px;
  animation-delay: 0.5s;
}

.starC {
  left: 35px;
  bottom: 35px;
  font-size: 7px;
  animation-delay: 1.2s;
}

.starD {
  right: 36px;
  bottom: 20px;
  font-size: 10px;
  animation-delay: 1.7s;
}

@keyframes constellationBlink {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.35);
  }
}

.dateDay {
  font-size: 9px;
  letter-spacing: 0.65em;
  margin-left: 0.65em;
  color: rgba(224, 230, 244, 0.45);
}

.eventDate {
  font-family: "Cormorant Garamond", serif;

  font-size:
    clamp(
      50px,
      7vw,
      88px
    );

  font-weight: 300;
  line-height: 1;
  margin: 10px 0 0;
  color: #eee9dc;
}

.eventYear {
  font-family: "Cormorant Garamond", serif;
  font-size: 20px;
  letter-spacing: 0.5em;
  margin-left: 0.5em;
  margin-top: 10px;
  color: rgba(216, 190, 122, 0.7);
}

.dateOrnament {
  width: 280px;
  max-width: 70%;
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 32px 0;
}

.dateOrnament span {
  flex: 1;
  height: 1px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(216, 190, 122, 0.55)
  );
}

.dateOrnament span:last-child {
  background: linear-gradient(
    90deg,
    rgba(216, 190, 122, 0.55),
    transparent
  );
}

.dateOrnament b {
  color: #d8be7a;
  font-size: 8px;
  font-weight: 400;
}

.eventSchedule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;
  padding: 22px 35px;

  border: 1px solid
    rgba(216, 190, 122, 0.17);

  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.025),
    rgba(216, 190, 122, 0.025)
  );

  backdrop-filter: blur(12px);
}

.scheduleItem {
  display: flex;
  align-items: center;
  gap: 13px;
  color: rgba(224, 213, 180, 0.72);
}

.scheduleItem div {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 5px;
}

.scheduleItem span {
  font-size: 7px;
  letter-spacing: 0.35em;
  color: rgba(220, 226, 240, 0.36);
}

.scheduleItem strong {
  font-family: "Cormorant Garamond", serif;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #e9e3d4;
}

.scheduleDivider {
  width: 1px;
  height: 40px;

  background: linear-gradient(
    transparent,
    rgba(216, 190, 122, 0.35),
    transparent
  );
}

.countdownArea {
  margin-top: 90px;
  width: 100%;
}

.countdownPre {
  font-size: 8px;
  letter-spacing: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 28px;
  color: rgba(224, 230, 245, 0.42);
}

.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.countdownBox {
  width: 135px;
  height: 120px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border:
    1px solid
    rgba(216, 190, 122, 0.17);

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.035),
      rgba(216, 190, 122, 0.015)
    );

  box-shadow:
    inset 0 0 30px
    rgba(255, 255, 255, 0.015);

  backdrop-filter: blur(15px);
}

.countdownNumber {
  font-family: "Cormorant Garamond", serif;
  font-size: 54px;
  font-weight: 300;
  line-height: 0.9;
  color: #eee9de;
}

.countdownLabel {
  margin-top: 12px;
  font-size: 6px;
  letter-spacing: 0.4em;
  margin-left: 0.4em;
  color: rgba(222, 228, 242, 0.35);
}

.countSeparator {
  font-family: "Cormorant Garamond", serif;
  font-size: 37px;
  font-weight: 300;
  color: rgba(216, 190, 122, 0.4);

  animation:
    countdownPulse
    1s
    ease-in-out
    infinite;
}

@keyframes countdownPulse {
  50% {
    opacity: 0.25;
  }
}

.countdownEnding {
  margin-top: 27px;

  font-family: "Cormorant Garamond", serif;

  font-size: 17px;
  font-style: italic;

  color: rgba(222, 227, 239, 0.42);
}

@media (max-width: 768px) {
  .eventSection {
    padding: 100px 14px;
  }

  .constellation15 {
    width: 240px;
    height: 200px;
  }

  .big15 {
    font-size: 175px;
  }

  .eventDate {
    font-size:
      clamp(
        46px,
        15vw,
        65px
      );
  }

  .eventSchedule {
    gap: 18px;
    padding: 18px 20px;
  }

  .scheduleItem strong {
    font-size: 18px;
  }

  .countdownArea {
    margin-top: 70px;
  }

  .countdown {
    gap: 6px;
  }

  .countdownBox {
    width: 72px;
    height: 90px;
  }

  .countdownNumber {
    font-size: 38px;
  }

  .countSeparator {
    font-size: 25px;
  }

  .eventTinyTitle p {
    font-size: 6px;
    letter-spacing: 0.35em;
  }

  .eventTinyTitle span {
    width: 25px;
  }
}
EOF

echo "✅ EventDetails.css creado"

# ------------------------------------------------------------
# 4) MODIFICAR APP.JSX
# ------------------------------------------------------------

python3 <<'PY'
from pathlib import Path

path = Path("src/App.jsx")
text = path.read_text()

import_line = 'import EventDetails from "./components/EventDetails/EventDetails";'

if import_line not in text:
    marker = 'import "./App.css";'

    if marker not in text:
        raise SystemExit("❌ No encontré import ./App.css en App.jsx")

    text = text.replace(
        marker,
        marker + "\n" + import_line
    )

if "<EventDetails />" not in text:
    target = """        ) : (
          <Reveal key="reveal" />
        )}
      </AnimatePresence>"""

    replacement = """        ) : (
          <Reveal key="reveal" />
        )}
      </AnimatePresence>

      {opened && <EventDetails />}"""

    if target not in text:
        raise SystemExit(
            "❌ No encontré el bloque de Reveal. "
            "App.jsx quedó intacto."
        )

    text = text.replace(
        target,
        replacement
    )

path.write_text(text)

print("✅ App.jsx actualizado")
PY

# ------------------------------------------------------------
# 5) CSS GENERAL PARA HABILITAR SCROLL
# ------------------------------------------------------------

if ! grep -q "SCROLL EVENT DETAILS" src/App.css; then

cat >> src/App.css <<'EOF'


/* ==========================================================
   SCROLL EVENT DETAILS
========================================================== */

.app.isOpened {
  display: block;
  min-height: 220vh;
  overflow: visible;
}

.app.isOpened .stars3d {
  position: fixed;
  inset: 0;
}

.app.isOpened .backgroundGlow {
  position: fixed;
}

EOF

fi

echo "✅ Scroll habilitado"

# ------------------------------------------------------------
# FINAL
# ------------------------------------------------------------

echo ""
echo "=========================================="
echo "           TODO TERMINADO"
echo "=========================================="
echo " Domingo 16 de agosto de 2026"
echo " Inicio: 21:30"
echo " Fin:    05:00"
echo "=========================================="
echo ""
echo "Abrí:"
echo "http://localhost:5173"
echo ""
