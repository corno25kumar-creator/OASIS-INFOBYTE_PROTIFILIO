gsap.registerPlugin(ScrollTrigger);

// --- LENIS SMOOTH SCROLL SETUP ---
const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- MAIN LOGIC ---
window.onload = () => {
    
    // 1. LOCK SCROLLING & HIDE SCROLLBAR IMMEDIATELY
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden'; 
    lenis.stop();
    
    document.body.classList.add('is-loading');

    // Selectors
    const follower = document.querySelector(".cursor-follower");
    const lens = document.querySelector(".cursor-lens");
    const lensImg = document.querySelector(".lens-img");
    const loader = document.querySelector(".loader");
    const home = document.querySelector("#home-content");
    const container = document.querySelector(".counters-container");
    const tracks = document.querySelectorAll(".count");
    const heroBox = document.querySelector(".hero-text-box");
    const root = document.documentElement;

    const mainTl = gsap.timeline();

    // Mouse Tracking Variables
    let mX = 0, mY = 0, fX = 0, fY = 0;
    let isServiceSection = false;
    let cursorSize = 25; 

    // Quick setters for performance
    const xLensTo = gsap.quickTo(lens, "x", { duration: 0.7, ease: "power2.out" });
    const yLensTo = gsap.quickTo(lens, "y", { duration: 0.7, ease: "power2.out" });

    // --- DEVICE CHECK ---
    // We consider laptops/desktops as screens wider than 1024px
    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

    // Hide cursor elements immediately if on mobile/tablet
    if (!isDesktop) {
        if (follower) follower.style.display = "none";
        if (lens) lens.style.display = "none";
    }

    // --- CLOCK FUNCTIONALITY ---
    const clockEl = document.querySelector("#clock");
    if (clockEl) {
        setInterval(() => {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            clockEl.innerText = `${hh}:${mm}:${ss}`;
        }, 1000);
    }

    // --- MOUSE MOVE & CURSOR LOGIC (ONLY DESKTOP) ---
    if (isDesktop) {
        window.addEventListener("mousemove", (e) => {
            mX = e.clientX; 
            mY = e.clientY;

            // Hero Parallax Effect
            if (heroBox && home && window.getComputedStyle(home).visibility !== "hidden") {
                const xPercent = (mX - window.innerWidth / 2) / (window.innerWidth / 2);
                const yPercent = (mY - window.innerHeight / 2) / (window.innerHeight / 2);
                gsap.to(heroBox, {
                    rotationY: xPercent * 15,
                    rotationX: -yPercent * 15,
                    x: xPercent * 30,
                    y: yPercent * 30,
                    duration: 1.2,
                    ease: "power2.out"
                });
            }

            // Custom Cursor Logic
            const inServiceZone = e.target.closest("#services-interactive");
            const isOverText = e.target.classList.contains("reveal-text") || 
                               e.target.classList.contains("scramble-text") || 
                               e.target.classList.contains("p-step-title") || 
                               e.target.classList.contains("menu-link") ||
                               e.target.classList.contains("social-link") ||
                               e.target.classList.contains("menu-close") ||
                               e.target.tagName === "A" || 
                               e.target.tagName === "SPAN";

            if (inServiceZone) {
                isServiceSection = true;
                gsap.to(follower, { opacity: 0, scale: 0.5, duration: 0.3 });
                gsap.to(lens, { opacity: 1, scale: 1, duration: 0.3 });
                
                const lensWidth = 400; const lensHeight = 400; const safeGap = 160;
                let tX = mX + safeGap; let tY = mY - (lensHeight / 2);
                if (tX + lensWidth > window.innerWidth) tX = mX - lensWidth - safeGap;
                xLensTo(tX); yLensTo(tY);

                const row = e.target.closest(".service-row");
                if (row && lensImg) {
                    const newImg = row.getAttribute("data-img");
                    if (newImg) lensImg.src = newImg;
                }
            } else {
                isServiceSection = false;
                gsap.to(lens, { opacity: 0, scale: 0.8, duration: 0.3 });
                
                // Only show follower if animation is done (checked via data-active)
                if (follower.getAttribute('data-active') === 'true') {
                    gsap.to(follower, { opacity: 1, duration: 0.3 });
                }

                if (isOverText) {
                    follower.classList.add("is-active");
                    cursorSize = 120; 
                } else {
                    follower.classList.remove("is-active");
                    cursorSize = 25;  
                }
            }
        });

        // Update cursor position via Ticker
        gsap.ticker.add(() => {
            fX += (mX - fX) * 0.15;
            fY += (mY - fY) * 0.15;
            gsap.set(follower, { x: fX, y: fY, xPercent: -50, yPercent: -50 });
            root.style.setProperty('--size', `${cursorSize}px`);
        });
    }

    // --- INTRO LOADER ANIMATION ---
    if (container) {
        mainTl.to(container, { 
            x: window.innerWidth - container.offsetWidth - 50, 
            duration: 4, ease: "power3.inOut" 
        }, 0);

        tracks.forEach(track => {
            const digit = track.querySelector('.digit');
            if (digit) {
                const digitWidth = digit.offsetWidth;
                mainTl.to(track, { 
                    x: -(digitWidth * (track.children.length - 1)), 
                    duration: 4, ease: "power3.inOut" 
                }, 0);
            }
        });
        mainTl.to(container, { opacity: 0, y: 20, duration: 0.5 });
    }

    const svgs = document.querySelectorAll(".revealer svg");
    svgs.forEach((svg, i) => {
        mainTl.to(svg, { scale: 400, duration: 2.2, ease: "expo.inOut" }, (i === 0 ? ">" : "-=1.8")); 
    });

    mainTl.to(home, { autoAlpha: 1, duration: 0.1 }, "-=1.0")
      .to(loader, { display: "none" })
      .from(".navbar", { y: -100, opacity: 0, duration: 1.2 }, "-=0.8")
      .from(".reveal-text", { y: 150, skewY: 7, stagger: 0.1, duration: 1.5, ease: "power4.out" }, "-=1.2");

    // Only animate the follower appearing if we are on desktop
    if (isDesktop) {
        mainTl.to(follower, { 
            opacity: 1, 
            duration: 0.8, 
            onStart: () => follower.setAttribute('data-active', 'true')
        }, "-=0.5");
    }

    mainTl.add(() => {
          // 2. RE-ENABLE SCROLLING ONLY WHEN ANIMATION IS DONE
          window.scrollTo(0, 0);
          document.body.style.overflow = ''; 
          lenis.start();
          
          initProjectAnimations();
          initServiceInteractions(); 
      });

    // --- HELPER FUNCTIONS ---
    function scramble(el, targetText) {
        let iterations = 0;
        if (el.scrambleInterval) clearInterval(el.scrambleInterval);
        el.scrambleInterval = setInterval(() => {
            el.innerText = targetText.split("").map((letter, index) => {
                if (index < iterations) return targetText[index];
                return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
            }).join("");
            if (iterations >= targetText.length) clearInterval(el.scrambleInterval);
            iterations += 1 / 3;
        }, 30);
    }

    function initProjectAnimations() {
        const isMobile = window.innerWidth <= 768;
        document.querySelectorAll(".project-card").forEach((card) => {
            const curtain = card.querySelector(".img-curtain");
            const img = card.querySelector("img");
            gsap.set(img, { scale: isMobile ? 1.2 : 1.5 });
            gsap.timeline({ 
                scrollTrigger: { 
                    trigger: card, 
                    start: isMobile ? "top 90%" : "top 80%", 
                    toggleActions: "play none none reverse" 
                } 
            })
            .to(curtain, { yPercent: -105, duration: 1.2, ease: "expo.inOut" })
            .to(img, { scale: 1, duration: 1.4, ease: "expo.out" }, "-=1.0");
        });
    }

    function initServiceInteractions() {
        // Scramble interactions work fine on touch too, but often better on hover.
        // We leave them active generally, as they are text effects.
        const rows = document.querySelectorAll(".service-row");
        rows.forEach((row) => {
            const title = row.querySelector(".scramble-text");
            if (!title) return;
            const originalText = title.innerText;
            row.addEventListener("mouseenter", () => scramble(title, originalText));
            row.addEventListener("mouseleave", () => { 
                if (title.scrambleInterval) clearInterval(title.scrambleInterval);
                title.innerText = originalText; 
            });
        });

        const steps = document.querySelectorAll(".process-step");
        steps.forEach((step) => {
            const title = step.querySelector(".p-step-title"); 
            if (!title) return;
            const originalText = title.innerText;
            step.addEventListener("mouseenter", () => scramble(title, originalText));
            step.addEventListener("mouseleave", () => { 
                if (title.scrambleInterval) clearInterval(title.scrambleInterval);
                title.innerText = originalText; 
            });
        });
    }

    const menuTrigger = document.querySelector(".menu-trigger");
    const menuClose = document.querySelector(".menu-close");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuLinks = document.querySelectorAll(".menu-link");

    if (menuTrigger && menuOverlay) {
        const menuTl = gsap.timeline({ paused: true });
        gsap.set(menuOverlay, { xPercent: 100 }); 
        menuTl.to(menuOverlay, { display: "flex", xPercent: 0, duration: 0.8, ease: "expo.inOut" })
              .from(menuLinks, { x: 50, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

        menuTrigger.addEventListener("click", () => {
            menuTl.play();
        });

        if (menuClose) menuClose.addEventListener("click", () => menuTl.reverse());
        menuLinks.forEach(link => link.addEventListener("click", () => {
            menuTl.reverse();
        }));
    }
};