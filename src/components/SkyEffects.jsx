import { useEffect, useState } from "react";
import "./SkyEffects.css";

export default function SkyEffects() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;

      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      className="skyEffects"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      <span className="shootingStar shootingStar1" />
      <span className="shootingStar shootingStar2" />
      <span className="shootingStar shootingStar3" />
      <span className="shootingStar shootingStar4" />
    </div>
  );
}
