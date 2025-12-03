// import image1 from "../../assets/image1.jpg"; 
// import image2 from "../../assets/image2.jpg"; 
// import image3 from "../../assets/image3.jpg"; 
// import image4 from "../../assets/image4.jpg"; 
// import image5 from "../../assets/image5.jpg"; 
// import './heroPage.css'

// function heroPage() {
//   return (
//     <>
//     <section className='hero'>

//       <div className='hero-header'>
//         <h1>chandan kumar jha</h1>
//         <p>one subscription, endless </p>
//       </div>

//       <div className='animated-icons'>
//         <div className="animated-icon icon-1">
//           <img src={image1} alt="image1" />
//         </div>
//         <div className="animated-icon icon-2">
//           <img src={image2} alt="image2" />
//         </div>
//         <div className="animated-icon icon-3">
//           <img src={image3} alt="image3" />
//         </div>
//         <div className="animated-icon icon-4">
//           <img src={image4} alt="image5" />
//         </div>
//         <div className="animated-icon icon-5">
//           <img src={image5} alt="image5" />
//         </div>
//       </div>

//       <h1 className="animated-text">
//         <div className="placeholder-icon"></div>
//         <span className='text-segment'>deleve into coding</span>

//         <div className="placeholder-icon"></div>
//         <span className="text-segment">without clutter</span>
//         <span className="text-segment">Unlock the source code </span>

//         <div className="placeholder-icon"></div>
//         <span className="text-segment">for every totutriol</span>

//         <div className="placeholder-icon"></div>
//         <span className="text-segment">published on the corno dev</span>

//         <div className="placeholder-icon"></div>
//         <span className="text-segment">yputube channel</span>
//       </h1>

//     </section>

//     <section className="outro">
//       <h1>link in discription</h1>
//     </section>
   

//     </>
    
//   )
// }

// export default heroPage// HeroPage.jsx
import { useLayoutEffect, useRef } from "react";
import setupHeroAnimation from "./heroPageAnimation.js";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import "./heropage.css";

export default function HeroPage() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    console.log("[HeroPage] mounted, heroRef:", heroRef.current);
    const cleanup = setupHeroAnimation(heroRef.current);
    return () => {
      cleanup && cleanup();
      console.log("[HeroPage] unmounted, animation cleaned");
    };
  }, []);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-header">
          <h1>chandan kumar jha</h1>
          <p>one subscription, endless</p>
        </div>

        <div className="animated-icons">
          <div className="animated-icon"><img src={image1} alt="i1" /></div>
          <div className="animated-icon"><img src={image2} alt="i2" /></div>
          <div className="animated-icon"><img src={image3} alt="i3" /></div>
          <div className="animated-icon"><img src={image4} alt="i4" /></div>
          <div className="animated-icon"><img src={image5} alt="i5" /></div>
        </div>

        <h1 className="animated-text">
          <div className="placeholder-icon"></div>
          <span className="text-segment">delve into coding</span>

          <div className="placeholder-icon"></div>
          <span className="text-segment">without clutter</span>

          <span className="text-segment">Unlock the source code</span>

          <div className="placeholder-icon"></div>
          <span className="text-segment">for every tutorial</span>

          <div className="placeholder-icon"></div>
          <span className="text-segment">published on the corno dev</span>

          <div className="placeholder-icon"></div>
          <span className="text-segment">youtube channel</span>
        </h1>
      </section>

      <section className="outro">
        <h1>link in description</h1>
      </section>
    </>
  );
}
