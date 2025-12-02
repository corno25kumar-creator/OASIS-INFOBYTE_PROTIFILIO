import { useState, useEffect } from "react";
import PreLoader from "./components/PreLoader/preLoader";
import HeroPage from "./components/hero/heroPage";

function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    // Preloader runs for ~7.5 sec (your GSAP delay)
    const timer = setTimeout(() => {
      setLoadingDone(true);
    }, 7600); // match your animation timing

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!loadingDone ? <PreLoader /> : <HeroPage />}
    </div>
  );
}

export default App;
