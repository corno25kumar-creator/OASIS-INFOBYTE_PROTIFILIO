gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);

window.onload = () => {
    // Selectors
    const follower = document.querySelector(".cursor-follower");
    const satellite = document.querySelector(".satellite");
    const loader = document.querySelector(".loader");
    const home = document.querySelector("#home-content");
    const container = document.querySelector(".counters-container");
    const tracks = document.querySelectorAll(".count");
    const aboutSection = document.querySelector(".about-section");

    const tl = gsap.timeline();

    // 1. CURSOR ANIMATION
    let mX = 0, mY = 0, fX = 0, fY = 0, rot = 0;
    const speed = 0.12;

    window.addEventListener("mousemove", (e) => {
        mX = e.clientX; mY = e.clientY;
    });

    function animateCursor() {
        fX += (mX - fX) * speed;
        fY += (mY - fY) * speed;
        if(follower) {
            follower.style.left = fX + "px";
            follower.style.top = fY + "px";
        }
        rot += 2.5;
        if(satellite) satellite.style.transform = `translateX(-50%) rotate(${rot}deg)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 2. HOVER LOGIC
    const hoverElements = document.querySelectorAll(".reveal-text, .nav-item, .nav-logo, .project-panel");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => follower?.classList.add("is-active"));
        el.addEventListener("mouseleave", () => follower?.classList.remove("is-active"));
    });

    const allText = document.querySelectorAll("h1, h2, h3, p, a, .nav-item, .project-links a, .project-num");

allText.forEach(el => {
    el.addEventListener("mouseenter", () => {
        follower.classList.add("is-active");
    });
    el.addEventListener("mouseleave", () => {
        follower.classList.remove("is-active");
    });
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

   
   // 4. HORIZONTAL WORK SECTION
const panels = gsap.utils.toArray(".project-panel");
if (workTrack && panels.length > 0) {
    gsap.to(workTrack, {
        // We move the track left by its width minus the one screen already visible
        x: () => -(workTrack.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".work-section",
            start: "top top", // When the top of the section hits the top of the viewport
            // 'end' determines the "speed". Larger number = Slower scroll
            end: () => "+=" + workTrack.scrollWidth,
            scrub: 2,         // Smoothly links the animation to the scrollbar
            pin: true,        // Locks the section in place while horizontal movement happens
            anticipatePin: 1,
            invalidateOnRefresh: true,
        }
    });
}
    // 5. ABOUT SECTION (Safety check added)
    if (aboutSection) {
        gsap.from(".about-section .reveal-text", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 80%",
            }
        });
    }

    ScrollTrigger.refresh();
};