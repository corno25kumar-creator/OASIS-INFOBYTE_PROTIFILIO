// import gsap, { random } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";

// gsap.registerPlugin(ScrollTrigger);

// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time)=>{
//     lenis.raf(time*1000)
// })

// gsap.ticker.lagSmoothing(0);

// const animationIcons = document.querySelector(".animated-icons");
// const iconElements = document.querySelector(".animated-icon");
// const textSegments = document.querySelector(".text-segment");
// const placeHolders = document.querySelector(".placeholder-icon");
// const heroHeader = document.querySelector(".hero-header");
// const heroSection = document.querySelector(".hero")

// const textAnimationOrder = []
// textSegments.forEach((segment, index) => {
//     textAnimationOrder.push({segment, originalIndex:index})
// });

// for (let i = textAnimationOrder.length-1; i>0; i--) {
//     const j = Math.floor(Math.random()*(i+1));
//     [textAnimationOrder[i],textAnimationOrder[j]] = [
//         textAnimationOrder(j), textAnimationOrder(i)
//     ]
// }
// const isMobile = window.innerWidth <= 1000;
// const headerIconSize = isMobile ? 30 : 60;

// const currentIconSize = iconElements[0].getBoundingClientRect().width;
// const exactScale = headerIconSize/currentIconSize

// ScrollTrigger.create({
//     trigger:".hero",
//     start:"top top",
//     end:`+=${window.innerHeight*8}px`,
//     pin:true,
//     pinSpacing:true,
//     scrub:1,
//     onUpdate: (self) => {
//         const progress = self.progress;

//         textSegments.forEach((segment)=>{
//             gsap.set(segment, {opacity:0});
//         });

//         if(progress <= 0.3){
//             const moveProgress = progress/0.3;
//             const containerMoveY = -window.innerHeight*0.3*moveProgress

//             if (progress<=0.15) {

//                 const headerprogress = progress/0.3;
//                 const headerMoveY = -50*headerprogress
//                 const hedaerOpacity = 1 - headerprogress

//                 gsap.set(heroHeader, {
//                     transform: `translate(-50%, clac(-50% + ${headerMoveY}))`,
//                     opacity:hedaerOpacity,
//             })
//             }else{
//                 gsap.set(heroHeader, {
//                     transform:`translate(-50%, clac(-50% + -50px))`,
//                     opacity:0,
//                 })
//             }
//             if (window.duplicateIcons) {
//                 window.duplicateIcons.forEach((duplicate)=>{
//                     if(duplicate.parentNode){
//                         duplicate.parentNode.removeChild(duplicate)
//                     }
//                 })
//                 window.duplicateIcons = null;
//             }

//             gsap.set(animationIcons, {
//                 x:0,
//                 y:containerMoveY,
//                 scale:1,
//                 opacity:1,
//             })

//             iconElements.forEach((icon, index) => {
//                 const staggerDelay = index*0.1;
//                 const iconStart = staggerDelay;
//                 const iconend = staggerDelay+0.5;

//                 const iconProgress = gsap.utils.mapRange(
//                     iconStart,
//                     iconend,
//                     0,
//                     1, 
//                     moveProgress
//                 );
//                 const clampedProgress = Math.max(0, Math.min(1, iconProgress));

//                 const startOffset = -containerMoveY;
//                 const individualY = startOffset *(1-clampedProgress)

//                 gsap.set(icon, {
//                     x:0,
//                     y:individualY,
//                 });
//             });

           
//         }
//         else if (progress<=0.6){
//             const scaleProgress = (progress-0.3)/0.03;

//             gsap.set(heroHeader, {
//                 transform:`translate(-50%, clac(-50% + -50px))`,
//                 opacity:0,
//             });

//             if (progress >= 0.5) {
//                 heroSection.style.backgroundColor = "#e3e3db";
//             }else{
//                 heroSection.style.backgroundColor = "#141414";
//             }
//             if(window.duplicateIcons){
//                 window.duplicateIcons.forEach((duplicate) => {
//                     if (duplicate.parentNode) {
//                         duplicate.parentNode.removeChild(duplicate)
//                     }
//                 });
//                 window.duplicateIcons = null
//             }
//             const tragetCenterY = window.innerHeight/2;
//             const targetCenterX = window.innerHeight /2;
//             const constainerRect = animationIcons.getBoundingClientRect();
//             const currentCenterX = constainerRect.left + constainerRect.width /2;
//             const currentCenterY = constainerRect.top + constainerRect /2;
//             const deltaX = (targetCenterX -currentCenterX) * scaleProgress;
//             const deltaY = (tragetCenterY -currentCenterY) * scaleProgress;
//             const baseY = -window.innerHeight * 0.3;
//             const currentScale =  1 + (exactScale - 1) * scaleProgress;

//             gsap.set(animationIcons, {
//                 x:deltaX,
//                 y: baseY + deltaY,
//                 scale: currentScale,
//             });

//             iconElements.forEach((icon) => {
//                 gsap.set(icon, {x:0, y:0 });
//             })
//         }else if (progress <= 0.75) {
//             const moveProgress = (progress - 0.6) / 0.15;

//             gsap.set(heroHeader, {
//                 transform:`translate(-50%, clac(-50% + -50px))`,
//                 opacity: 0 ,
//             });

//             heroSection.style.backgroundColor = "#e3e3db";

//             const tragetCenterY = window.innerHeight /2;
//             const targetCenterX = window.innerHeight /2;
//             const constainerRect = animationIcons.getBoundingClientRect();
//             const currentCenterX = constainerRect.left + constainerRect.width/2;
//             const currentCenterY = constainerRect.top + constainerRect.height /2;
//             const deltaX = targetCenterX - currentCenterX;
//             const deltaY = tragetCenterY - currentCenterY;
//             const baseY = -window.innerHeight * 0.3;


//             gsap.set(animationIcons, {
//                 x:deltaX,
//                 y:baseY + deltaY,
//                 scale: exactScale,
//                 opacity:0,
//             });
//             iconElements.forEach((icon) => {
//                 gsap.set(icon, {x:0, y: 0})
//             });

//             if (!window.duplicateIcons) {
//                 window.duplicateIcons = [];

//                 iconElements.forEach((icon, index) => {
//                     const duplicate =  icon.cloneNode(true);
//                     duplicate.className = "duplicate-icon";
//                     duplicate.style.postition = "absolute";
//                     duplicate.style.width = headerIconSize + "px";
//                     duplicate.style.height = headerIconSize + "px";

//                     document.body.appendChild(duplicate);
//                     window.duplicateIcons.push(duplicate)
//                 })
//             }

//             if (window.duplicateIcons) {
//                 window.duplicateIcons.forEach((duplicate, index)=> {
//                     if (index < placeHolders.length) {
//                         const iconRect = iconElements[index].getBoundingClientRect();
//                         const startCenterX = iconRect.left + iconRect.width /2 ;
//                         const startCenterY = iconRect.top + iconRect.height /2;
//                         const startPageX = startCenterX + window.pageXOffset;
//                         const startPageY = startCenterY + window.pageXOffset;

//                         const targetRect = placeHolders[index].getBoundingClientRect();
//                         const targetCenterX = targetRect.left + targetRect.width /2;
//                         const tragetCenterY = targetRect.top + targetRect.height/2;
//                         const  targetPageX = targetCenterX + window.pageXOffset;
//                         const targetPageY = tragetCenterY + window.pageXOffset;

//                         const moveX = targetPageX - startPageX;
//                         const moveY = targetPageY - startPageY;

//                         let currentX = 0;
//                         let currentY = 0;

//                         if (moveProgress <= 0.5) {
//                             const verticalProgress = moveProgress / 0.5;
//                             currentY = moveY * verticalProgress;
//                         }else{
//                             const horizontalProgress = (moveProgress -0.5) / 0.5
//                             currentY = moveY;
//                             currentX = moveX * horizontalProgress
//                         }

//                         const finalPageX = startPageX + currentX;
//                         const finalPageY = startPageY + currentY;


//                         duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
//                         duplicate.style.top = finalPageY = headerIconSize /2 + "px";
//                         duplicate.style.opacity = "1";
//                         duplicate.style.display = 'flex'
//                     }
//                 })
//             }
//         }else{
//             gsap.set(heroHeader, {
//                 transform: `translate(-50% , clac(-50% + -100px))`,
//                 opacity:0,
//             });

//             heroSection.style.backgroundColor = "#e3e3db";

//             gsap.set(animationIcons, {opacity:0})


//             if (window.duplicateIcons) {
//                 window.duplicateIcons.forEach((duplicate, index) => {
//                     if (index < placeHolders.length) {
//                         const targetRect = placeHolder[index].getBoundingClientRect();
//                         const targetCenterX = targetRect.left + targetRect.width/2;
//                         const tragetCenterY = targetRect.top + targetRect.height /2 ;
//                         const targetPageX = targetCenterX + window.pageXOffset;
//                         const targetPageY = tragetCenterY + window.pageXOffset;


//                         duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
//                         duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
//                         duplicate.style.opacity = "1";
//                         duplicate.style.display = "flex"
//                     }
//                 });
//             }

//             textAnimationOrder.forEach((item, randomIndex)=> {
//                 const segmentstart = 0.75 + randomIndex * 0.03;
//                 const segmentEnd = segmentstart + 0.015;

//                 const segmentProgress = gsap.utils.mapRange(
//                     segmentstart,
//                     segmentEnd,
//                     0, 
//                     1, 
//                     progress
//                 );
//                 const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

//                 gsap.set(item.segment, {
//                     opacity: clampedProgress,

//                 })
//             })
//         }
//     }
// })

// heroPageAnimation.js// heroPageAnimation.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function setupHeroAnimation(heroSection) {
  console.clear();
  console.log("[heroAnim] setup start");

  if (!heroSection) {
    console.warn("[heroAnim] heroSection missing — abort");
    return () => {};
  }

  // -----------------------
  // Lenis init + stable RAF
  // -----------------------
  const lenis = new Lenis({ smooth: true, lerp: 0.08 });
  // we'll run lenis.raf inside requestAnimationFrame loop (stable)
  let rafId = null;
  const raf = (time) => {
    // Lenis expects milliseconds
    if (lenis && typeof lenis.raf === "function") lenis.raf(time);
    // Update ScrollTrigger as Lenis changes scroll
    ScrollTrigger.update();
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // Also keep gsap ticker lag smoothing similar to your original
  gsap.ticker.lagSmoothing(0);

  // -----------------------
  // Query DOM inside heroSection (React-safe)
  // -----------------------
  const animationIcons = heroSection.querySelector(".animated-icons");
  const iconNodeList = heroSection.querySelectorAll(".animated-icon");
  const textNodeList = heroSection.querySelectorAll(".text-segment");
  const placeHolderNodeList = heroSection.querySelectorAll(".placeholder-icon");
  const heroHeader = heroSection.querySelector(".hero-header");
  const heroSectionEl = heroSection;

  const iconElements = Array.from(iconNodeList);
  const textSegments = Array.from(textNodeList);
  const placeHolders = Array.from(placeHolderNodeList);

  console.log(
    "[heroAnim] nodes:",
    "icons:",
    iconElements.length,
    "texts:",
    textSegments.length,
    "placeholders:",
    placeHolders.length,
    "header:",
    !!heroHeader
  );

  if (!animationIcons || iconElements.length === 0) {
    console.warn("[heroAnim] required nodes missing — aborting animation setup");
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy && lenis.destroy();
    };
  }

  // -----------------------
  // Shuffle text order exactly as your original
  // -----------------------
  const textAnimationOrder = [];
  textSegments.forEach((segment, index) => {
    textAnimationOrder.push({ segment, originalIndex: index });
  });
  for (let i = textAnimationOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [textAnimationOrder[i], textAnimationOrder[j]] = [textAnimationOrder[j], textAnimationOrder[i]];
  }

  // preserve original mobile logic and headerIconSize
  const isMobile = window.innerWidth <= 1000;
  const headerIconSize = isMobile ? 30 : 60;

  // guard: prevent crash
  const currentIconSize = iconElements[0].getBoundingClientRect().width || 1;
  const exactScale = headerIconSize / currentIconSize;

  // -----------------------
  // IMPORTANT: scrollerProxy so Lenis + ScrollTrigger sync
  // -----------------------
  // Use document.scrollingElement (safer cross-browser)
  const scroller = document.scrollingElement || document.documentElement;
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });

  // When Lenis scrolls, inform ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => {
    try {
      lenis && typeof lenis.update === "function" && lenis.update();
    } catch (e) {}
  });

  // Force a refresh now so ScrollTrigger grabs correct sizes
  ScrollTrigger.refresh();

  // -----------------------
  // The ScrollTrigger with your original logic (typos / syntax fixed)
  // -----------------------
  const st = ScrollTrigger.create({
    trigger: heroSectionEl,
    start: "top top",
    end: `+=${window.innerHeight * 8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    // markers: true, // uncomment for debugging markers
    onUpdate: (self) => {
      try {
        const progress = self.progress;

        textSegments.forEach((segment) => gsap.set(segment, { opacity: 0 }));

        // === Stage 1 ===
        if (progress <= 0.3) {
          const moveProgress = progress / 0.3;
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          if (progress <= 0.15) {
            const headerprogress = progress / 0.15;
            const headerMoveY = -50 * headerprogress;
            const hedaerOpacity = 1 - headerprogress;

            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: hedaerOpacity,
            });
          } else {
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              duplicate.parentNode && duplicate.parentNode.removeChild(duplicate);
            });
            window.duplicateIcons = null;
          }

          gsap.set(animationIcons, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          });

          iconElements.forEach((icon, index) => {
            const staggerDelay = index * 0.1;
            const iconStart = staggerDelay;
            const iconend = staggerDelay + 0.5;

            const iconProgress = gsap.utils.mapRange(iconStart, iconend, 0, 1, moveProgress);
            const clampedProgress = Math.max(0, Math.min(1, iconProgress));

            const startOffset = -containerMoveY;
            const individualY = startOffset * (1 - clampedProgress);

            gsap.set(icon, { x: 0, y: individualY });
          });
        }

        // === Stage 2 ===
        else if (progress <= 0.6) {
          const scaleProgress = (progress - 0.3) / 0.03;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });

          heroSectionEl.style.backgroundColor = progress >= 0.5 ? "#e3e3db" : "#141414";

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => duplicate.parentNode?.removeChild(duplicate));
            window.duplicateIcons = null;
          }

          const tragetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerHeight / 2;
          const constainerRect = animationIcons.getBoundingClientRect();
          const currentCenterX = constainerRect.left + constainerRect.width / 2;
          const currentCenterY = constainerRect.top + constainerRect.height / 2;
          const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
          const deltaY = (tragetCenterY - currentCenterY) * scaleProgress;
          const baseY = -window.innerHeight * 0.3;
          const currentScale = 1 + (exactScale - 1) * scaleProgress;

          gsap.set(animationIcons, { x: deltaX, y: baseY + deltaY, scale: currentScale });

          iconElements.forEach((icon) => gsap.set(icon, { x: 0, y: 0 }));
        }

        // === Stage 3 ===
        else if (progress <= 0.75) {
          const moveProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeader, { transform: `translate(-50%, calc(-50% + -50px))`, opacity: 0 });
          heroSectionEl.style.backgroundColor = "#e3e3db";

          const tragetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerHeight / 2;
          const constainerRect = animationIcons.getBoundingClientRect();
          const currentCenterX = constainerRect.left + constainerRect.width / 2;
          const currentCenterY = constainerRect.top + constainerRect.height / 2;
          const deltaX = targetCenterX - currentCenterX;
          const deltaY = tragetCenterY - currentCenterY;
          const baseY = -window.innerHeight * 0.3;

          gsap.set(animationIcons, { x: deltaX, y: baseY + deltaY, scale: exactScale, opacity: 0 });
          iconElements.forEach((icon) => gsap.set(icon, { x: 0, y: 0 }));

          if (!window.duplicateIcons) {
            window.duplicateIcons = [];
            iconElements.forEach((icon) => {
              const duplicate = icon.cloneNode(true);
              duplicate.className = "duplicate-icon";
              duplicate.style.position = "absolute";
              duplicate.style.width = headerIconSize + "px";
              duplicate.style.height = headerIconSize + "px";
              document.body.appendChild(duplicate);
              window.duplicateIcons.push(duplicate);
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index >= placeHolders.length) return;
              const iconRect = iconElements[index].getBoundingClientRect();
              const startCenterX = iconRect.left + iconRect.width / 2;
              const startCenterY = iconRect.top + iconRect.height / 2;
              const startPageX = startCenterX + window.pageXOffset;
              const startPageY = startCenterY + window.pageXOffset;

              const targetRect = placeHolders[index].getBoundingClientRect();
              const targetCenterX = targetRect.left + targetRect.width / 2;
              const tragetCenterY = targetRect.top + targetRect.height / 2;
              const targetPageX = targetCenterX + window.pageXOffset;
              const targetPageY = tragetCenterY + window.pageXOffset;

              const moveX = targetPageX - startPageX;
              const moveY = targetPageY - startPageY;

              let currentX = 0;
              let currentY = 0;

              if (moveProgress <= 0.5) {
                const verticalProgress = moveProgress / 0.5;
                currentY = moveY * verticalProgress;
              } else {
                const horizontalProgress = (moveProgress - 0.5) / 0.5;
                currentY = moveY;
                currentX = moveX * horizontalProgress;
              }

              const finalPageX = startPageX + currentX;
              const finalPageY = startPageY + currentY;

              duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
              duplicate.style.top = finalPageY - headerIconSize / 2 + "px";
              duplicate.style.opacity = "1";
              duplicate.style.display = "flex";
            });
          }
        }

        // === Final Stage ===
        else {
          gsap.set(heroHeader, { transform: `translate(-50% , calc(-50% + -100px))`, opacity: 0 });

          heroSectionEl.style.backgroundColor = "#e3e3db";
          gsap.set(animationIcons, { opacity: 0 });

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index >= placeHolders.length) return;
              const targetRect = placeHolders[index].getBoundingClientRect();
              const targetCenterX = targetRect.left + targetRect.width / 2;
              const tragetCenterY = targetRect.top + targetRect.height / 2;
              const targetPageX = targetCenterX + window.pageXOffset;
              const targetPageY = tragetCenterY + window.pageXOffset;

              duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
              duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
              duplicate.style.opacity = "1";
              duplicate.style.display = "flex";
            });
          }

          textAnimationOrder.forEach((item, randomIndex) => {
            const segmentstart = 0.75 + randomIndex * 0.03;
            const segmentEnd = segmentstart + 0.015;

            const segmentProgress = gsap.utils.mapRange(segmentstart, segmentEnd, 0, 1, progress);
            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

            gsap.set(item.segment, { opacity: clampedProgress });
          });
        }
      } catch (err) {
        console.error("[heroAnim] runtime error inside onUpdate:", err);
      }
    },
  });

  // refresh sizes after setup
  ScrollTrigger.refresh();

  // cleanup for React unmount
  return () => {
    try {
      st && st.kill && st.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill && s.kill());
      gsap.killTweensOf("*");
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((d) => d && d.parentNode && d.parentNode.removeChild(d));
        window.duplicateIcons = null;
      }
      if (rafId) cancelAnimationFrame(rafId);
      lenis && typeof lenis.destroy === "function" && lenis.destroy();
      console.log("[heroAnim] cleaned");
    } catch (e) {
      console.warn("[heroAnim] cleanup error", e);
    }
  };
}
