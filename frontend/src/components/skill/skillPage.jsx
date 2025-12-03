 import { useEffect, useRef } from "react";
import "./skillPage.css";
import { initSkillPageAnimation } from "./skillPageAnimation.js";

export default function SkillPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cleanup = initSkillPageAnimation(containerRef.current);

    return () => cleanup && cleanup();
  }, []);

  return (
    <section className="footer">
      <div className="object-container" ref={containerRef}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="object">
            <p>html</p>
          </div>
        ))}
      </div>

      <div className="footer-content">
        <h1>skills i have</h1>
      </div>
    </section>
  );
}
