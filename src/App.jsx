import SkyEffects from "./components/SkyEffects";
import Finale from "./components/Finale/Finale";
import RSVP from "./components/RSVP/RSVP";
import DressCode from "./components/DressCode/DressCode";
import Location from "./components/Location/Location";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import EventDetails from "./components/EventDetails/EventDetails";

/* ==========================================================
   DATOS PRINCIPALES
   Después reemplazamos esto con los datos REALES
========================================================== */

const EVENT = {
  name: "LILIAN",
  title: "MIS XV",
  phrase: "Una noche escrita entre las estrellas.",
};

/* ==========================================================
   CAMPO DE ESTRELLAS
========================================================== */

function StarUniverse({ opened }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * (opened ? 0.05 : 0.008);
    group.current.rotation.x += delta * (opened ? 0.015 : 0.002);

    const targetScale = opened ? 1.8 : 1;

    group.current.scale.x +=
      (targetScale - group.current.scale.x) * 0.018;

    group.current.scale.y +=
      (targetScale - group.current.scale.y) * 0.018;

    group.current.scale.z +=
      (targetScale - group.current.scale.z) * 0.018;
  });

  return (
    <group ref={group}>
      <Stars
        radius={100}
        depth={70}
        count={6000}
        factor={4}
        saturation={0}
        fade
        speed={opened ? 3 : 0.6}
      />
    </group>
  );
}

/* ==========================================================
   PORTADA
========================================================== */

function Intro({ onOpen }) {
  return (
    <motion.section
      className="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.25,
        filter: "blur(18px)",
      }}
      transition={{
        exit: {
          duration: 1.5,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <motion.div
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            delay: 0.4,
          }}
        >
          <span />

          <Sparkles
            size={15}
            strokeWidth={1.2}
          />

          <p>
            UNA NOCHE ESPECIAL ESTÁ POR COMENZAR
          </p>

          <Sparkles
            size={15}
            strokeWidth={1.2}
          />

          <span />
        </motion.div>

        <motion.div
          className="diamond"
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: 45,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 45,
          }}
          transition={{
            duration: 1.5,
            delay: 0.8,
          }}
        >
          <div />
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            letterSpacing: "0.35em",
          }}
          animate={{
            opacity: 1,
            letterSpacing: "0.55em",
          }}
          transition={{
            duration: 1.7,
            delay: 1,
          }}
        >
          MIS XV
        </motion.h2>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(15px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2,
            delay: 1.3,
          }}
        >
          NOCHE
          <br />
          ESTRELLADA
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 2,
          }}
        >
          Una noche. Un sueño.
          <br />
          Un recuerdo para siempre.
        </motion.p>

        <motion.button
          className="openButton"
          onClick={onOpen}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 2.5,
          }}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          <span>ABRIR INVITACIÓN</span>

          <div className="buttonStar">
            ✦
          </div>
        </motion.button>

        <motion.div
          className="scrollHint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 3.2,
          }}
        >
          <div className="mouse">
            <div className="wheel" />
          </div>

          <p>DESCUBRÍ LA NOCHE</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ==========================================================
   PANTALLA DE PRESENTACIÓN
========================================================== */

function Reveal() {
  return (
    <motion.section
      className="reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 1.2,
      }}
    >
      <div className="revealLight" />

      <motion.div
        className="revealStar"
        initial={{
          opacity: 0,
          scale: 0,
          rotate: -180,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          duration: 1.7,
          delay: 1.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        ✦
      </motion.div>

      <motion.p
        className="revealPre"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.4,
          delay: 2.1,
        }}
      >
        CELEBREMOS JUNTOS
      </motion.p>

      <motion.div
        className="revealLine"
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 2.4,
        }}
      />

      <motion.p
        className="revealXV"
        initial={{
          opacity: 0,
          letterSpacing: "0.1em",
        }}
        animate={{
          opacity: 1,
          letterSpacing: "0.65em",
        }}
        transition={{
          duration: 2,
          delay: 2.5,
        }}
      >
        MIS XV
      </motion.p>

      <motion.h1
        className="girlName"
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 45,
          filter: "blur(22px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 2.5,
          delay: 2.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {EVENT.name}
      </motion.h1>

      <motion.div
        className="ornament"
        initial={{
          opacity: 0,
          scaleX: 0,
        }}
        animate={{
          opacity: 1,
          scaleX: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 3.7,
        }}
      >
        <span />
        <b>✦</b>
        <span />
      </motion.div>

      <motion.p
        className="revealPhrase"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.7,
          delay: 4,
        }}
      >
        {EVENT.phrase}
      </motion.p>

      <motion.div
        className="continueIndicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.3,
          delay: 5,
        }}
      >
        <span />

        <p>DESLIZÁ PARA CONTINUAR</p>
      </motion.div>
    </motion.section>
  );
}

/* ==========================================================
   APP
========================================================== */

function App() {
  const [opened, setOpened] =
    useState(false);

  const [muted, setMuted] =
    useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "/audio/cancion.mp3"
    );

    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const openInvitation = () => {
    setOpened(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .catch(() => {});
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (muted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    setMuted(!muted);
  };

  return (
    <main
      className={`app ${
        opened ? "isOpened" : ""
      }`}
    >
      <SkyEffects />

      <div className="backgroundGlow" />

      <div className="stars3d">
        <Canvas
          camera={{
            position: [0, 0, 1],
            fov: 60,
          }}
        >
          <StarUniverse
            opened={opened}
          />
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <Intro
            key="intro"
            onOpen={openInvitation}
          />
        ) : (
          <Reveal key="reveal" />
        )}
      </AnimatePresence>

      {opened && (
  <>
    <EventDetails />
    <Location />
    <DressCode />
    <RSVP />
    <Finale />
  </>
)}

      <AnimatePresence>
        {opened && (
          <motion.button
            className="audioButton"
            onClick={toggleAudio}
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 5,
            }}
            aria-label="Música"
          >
            {muted ? (
              <VolumeX size={16} />
            ) : (
              <Volume2 size={16} />
            )}

            <span className="audioPulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="flash"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [
                0,
                1,
                0.8,
                0,
              ],
              scale: [
                0,
                0.3,
                1.5,
                4,
              ],
            }}
            transition={{
              duration: 1.8,
              times: [
                0,
                0.15,
                0.35,
                1,
              ],
            }}
          />
        )}
      </AnimatePresence>

      <div className="vignette" />
      <div className="noise" />
    </main>
  );
}

export default App;
