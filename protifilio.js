

document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(".counter-wrapper");
    const countTrack = document.querySelector(".count");
    const windowWidth = window.innerWidth;

    // Get real width dynamically
    const wrapperWidth = wrapper.offsetWidth;      // NOT 180px
    const totalDigits = countTrack.children.length; // ex: 6 digits

    // How far the wrapper should travel across screen
    const finalPosition = windowWidth - wrapperWidth;

    // How far wrapper moves each step
    const stepDistance = finalPosition / totalDigits;

    // Total X for count track (scroll through digits)
    const totalScroll = wrapperWidth * totalDigits;

    const tl = gsap.timeline();

    // FIRST MOVE — shift entire count to start point
    tl.to(".count", {
        x: -totalScroll,
        duration: 0.85,
        delay: 0.8,
        ease: "power4.inOut"
    });

    // LOOP ANIMATION FOR EACH DIGIT
    for (let i = 1; i <= totalDigits; i++) {
        const xPosition = -totalScroll + (i * wrapperWidth);

        tl.to(".count", {
            x: xPosition,
            duration: 0.85,
            ease: "power4.inOut",
            onStart: () => {
                gsap.to(".counter-wrapper", {
                    x: stepDistance * i,
                    duration: 0.85,
                    ease: "power4.inOut"
                });
            }
        });
    }


    // =============================
    //   SVG REVEAL ANIMATION
    // =============================
    gsap.set(".revealer svg", { scale: 0 });

    const delays = [6, 6.5, 7];

    document.querySelectorAll(".revealer svg").forEach((el, i) => {
        gsap.to(el, {
            scale: 45,
            duration: 1.5,
            ease: "power4.inOut",
            delay: delays[i],
            onComplete: () => {
                if (i === delays.length - 1) {
                    document.querySelector(".loader").remove();
                    document.body.style.overflow = "auto";
                     const hero = document.querySelector(".hero");
                     hero.style.zIndex = "1";
                     document.body.style.overflow = "auto";
                }
            }
        });
    });

});
