gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

window.onload = () => {
    // Selectors
    const projectPanels = document.querySelectorAll(".project-panel");
    const follower = document.querySelector(".cursor-follower");
    const satellite = document.querySelector(".satellite");
    const loader = document.querySelector(".loader");
    const home = document.querySelector("#home-content");
    const container = document.querySelector(".counters-container");
    const tracks = document.querySelectorAll(".count");
    const workTrack = document.querySelector(".work-track"); // FIXED: Added this
    const aboutSection = document.querySelector(".about-section");

    const tl = gsap.timeline();

    // 1. CURSOR ANIMATION
    let mX = 0, mY = 0, fX = 0, fY = 0, rot = 0;
    window.addEventListener("mousemove", (e) => {
        mX = e.clientX; mY = e.clientY;
    });

    function animateCursor() {
        fX += (mX - fX) * 0.12;
        fY += (mY - fY) * 0.12;
        if(follower) {
            follower.style.left = fX + "px";
            follower.style.top = fY + "px";
        }
        rot += 2.5;
        if(satellite) satellite.style.transform = `translateX(-50%) rotate(${rot}deg)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 2. CURSOR HOVER EFFECTS
    const hoverElements = document.querySelectorAll("h1, h2, a, .nav-item, .nav-logo, .project-panel");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => follower?.classList.add("is-active"));
        el.addEventListener("mouseleave", () => follower?.classList.remove("is-active"));
    });

    // 3. LOADER & HERO ENTRANCE
    if (container) {
        tl.to(container, { x: window.innerWidth - container.offsetWidth - 50, duration: 4, ease: "power3.inOut" }, 0);
        tracks.forEach(track => {
            const w = track.parentElement.offsetWidth;
            tl.to(track, { x: -(w * (track.children.length - 1)), duration: 4, ease: "power3.inOut" }, 0);
        });
    }

    const svgs = document.querySelectorAll(".revealer svg");
    svgs.forEach((svg, i) => {
        tl.to(svg, { scale: 350, duration: 2.5, ease: "expo.inOut" }, 3.8 + (i * 0.4));
    });

    tl.to(home, { autoAlpha: 1, duration: 0 }, "-=1.2")
      .to(loader, { display: "none" })
      .to(follower, { opacity: 1, duration: 0.8 }, "-=0.5")
      .from(".navbar", { y: -100, opacity: 0, duration: 1.2 }, "-=0.8")
      .from(".reveal-text", { y: 150, skewY: 7, stagger: 0.1, duration: 1.5, ease: "power4.out" }, "-=1.2")
      .from(".hero-tag, .hero-sub, .hero-footer", { opacity: 0, y: 20, stagger: 0.1, duration: 1 }, "-=0.8");
// --- Inside wi
   // --- WORK SECTION: PRECISE PINNING ---
    if (workTrack) {
        gsap.to(workTrack, {
            x: () => -(workTrack.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: ".work-section",
                start: "top top",
                // This formula ensures the pin releases exactly when the 3rd project ends
                end: () => "+=" + (workTrack.scrollWidth - window.innerWidth),
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });
    }

    // --- ABOUT SECTION: MICRO-ANIMATIONS ---
    const aboutTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%", // Triggers when the top of About hits 80% of screen height
            toggleActions: "play none none reverse"
        }
    });

    // Gravity for "ABOUT"
    aboutTL.to(".g-letter", {
        y: 0,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 1,
        ease: "bounce.out"
    })
    // Description Slide-up
    .to(".about-reveal", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    // Social Buttons Pop-in
    .from(".magnetic-item", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.4");
};
