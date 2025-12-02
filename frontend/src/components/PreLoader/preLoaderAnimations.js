// document.addEventListener("DOMContentLoaded", function(){
//     const counter3 = document.querySelector(".counter-3")

//     for (let i = 0; i < 2; i++) {
//         for (let j = 0; j < 10; j++) {
//             const div = document.createElementa("div")
//             div.className = 'num'
//             div.textContent = j;
//             counter3.appendChild(div)
            
//         }
//     }

//     const finalDiv = document.createElement('div');
//     finalDiv.className = 'num'
//     finalDiv.textContent = "0"
//     counter3.appendChild(finalDiv)

//     function animate(counter, duration, delay = 0){
//         const numHeight = counter.querySelector(".num").
//         clientHeight;
//         const totalDistance = (counter.querySelector('.num').length-1)* numHeight;

//         gasp.to(counter, {
//             y:-totalDistance,
//             duration:duration,
//             delay: delay,
//             ease:'power2.inOut'
//         })
//     }

//     animate(counter3, 5)
//     animate(document.querySelector(".counter-2"), 6)
//     animate(document.querySelector(".counter-1"), 2, 4)

// })

// gasp.to(".digit",{
//     top: "-150px",
//     stagger:{
//         amount:0.25
//     },
//     delay:6,
//     duration:1,
//     ease:"power4.inOut"
// })

// gasp.from(".loader-1",{
//     width: 0,
//     duration:6,
//     ease:"power2.inOut"
// })

// gasp.from(".loader-2",{
//     width: 0,
//     duration:2,
//     delay:1.9,
//     ease:"power2.inOut"
// })

// gsap.to(".loader", {
//     background: "none",
//     delay:6,
//      duration:0.1,
// })

// gsap.to(".loader-1", {
//     rotate:90,
//     y:-50,
//     delay:6,
//     duration:0.5,
// })

// gsap.to(".loader-2", {
//     x:-75,
//     y:75,
//     duration:0.5,
// })

// gsap.to(".loader", {
//     scale:40,
//     duration:1,
//     delay:7,
//     ease:"power2.inOut"
// })


// gsap.to(".loader", {
//     rotate:45,
//     y:500,
//     x:2000,
//     duration:1,
//     delay:7,
//     ease:"power2.inOut"
// })

// gsap.to(".loading-screen", {
//     opacity:0,
//     duration:0.5,
//     delay:7.5,
//     ease:"power1.inOut"
// })
// gsap.to("h1", 1.5,{
//     y:-80,
//     delay:7,
//     ease:"power4.inOut",
//     stagger:{
//         amount:0.1,
//     }
// })// src/components/PreLoader/preLoaderAnimations.js
import gsap from "gsap";

export const preLoaderAnimations = (container) => {
  const ctx = gsap.context(() => {
    // COUNTER 3
    const counter3 = container.querySelector(".counter-3");

    // Auto-generate numbers like your plain JS
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }

    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
      const nums = counter.querySelectorAll(".num");
      const numHeight = nums[0].clientHeight;
      const totalDistance = (nums.length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power2.inOut",
      });
    }

    // ANIMATE ALL 3 COUNTERS
    animate(container.querySelector(".counter-3"), 5);
    animate(container.querySelector(".counter-2"), 6);
    animate(container.querySelector(".counter-1"), 2, 4);

    // REST OF YOUR GSAP ANIMATIONS
    gsap.to(".digit", {
      top: "-150px",
      stagger: { amount: 0.25 },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.from(".loader-1", {
      width: 0,
      duration: 6,
      ease: "power2.inOut",
    });

    gsap.from(".loader-2", {
      width: 0,
      duration: 2,
      delay: 1.9,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      background: "none",
      delay: 6,
      duration: 0.1,
    });

    gsap.to(".loader-1", {
      rotate: 90,
      y: -50,
      delay: 6,
      duration: 0.5,
    });

    gsap.to(".loader-2", {
      x: -75,
      y: 75,
      duration: 0.5,
    });

    gsap.to(".loader", {
      scale: 40,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      rotate: 45,
      x: 2000,
      y: 500,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loading-screen", {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      ease: "power1.inOut",
    });

   
  }, container);

  return ctx; // important cleanup
};
