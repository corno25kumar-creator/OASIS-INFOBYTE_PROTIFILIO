// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/all'
// import lenis from '@studio-freight/lenis'
// import Matter, { Constraint } from "matter-js";

// document.addEventListener("DOMContentLoaded", () => {
// gsap.registerPlugin(ScrollTrigger);




// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time)=>{
//     lenis.raf(time*1000)
// })

// gsap.ticker.lagSmoothing(0);

// const animateOnScroll = true


// const config = {
//     gravity : {x:0, y:1},
//     restitution: 0.5,
//     friction:0.15,
//     frictionAir: 0.02,
//     density:0.002,
//     wallThickness : 200,
//     mouseStiffness:0.6
// }

// let engine, 
// runner, 
// mouseConstraint,
// bodies = [],
// topWall = null;


// function clamp(val, min, max){
//     engine = Matter.Engine.create();
//     engine.gravity = config.gravity;
//     engine.mouseConstraint = 10;
//     engine.positionIterations = 20;
//     engine.velocityIterations = 10;
//     engine.timing.timeScale = 1;

//     const constainerRect = container.getBoundingClientRect();
//     const wallThickness = config.wallThickness

//     const walls = [
//         Matter.Bodies.rectangle(
//             constainerRect.width /2, 
//             constainerRect.heigth + wallThickness /2, 
//             constainerRect.width + wallThickness *2,
//             wallThickness,
//             {isStatic:true}
//         ),
//         Matter.Bodies.rectangle(
//             -wallThickness /2,
//             constainerRect.heigth /2,
//             wallThickness,
//             constainerRect.heigth + wallThickness /2 ,
//             {isStatic: true} 
//         ),
//          Matter.Bodies.rectangle(
//             constainerRect.width + wallThickness /2,
//             constainerRect.heigth /2,
//             wallThickness,
//             constainerRect.heigth + wallThickness * 2 ,
//             {isStatic: true} 
//         ),
//     ];

//     Matter.World.add(engine.world, walls);

//     const object = container.querySelectorAll(".object");
//     object.forEach((obj , index) => {
//         const objRect = obj.getBoundingClientRect();

//         const startX = Math.random() * (constainerRect.width = objRect.width) * objRect.width /2;
//         const startY = -500 -index * 200;
//         const startRotation = (Math.random()-0.5) * Math.PI

//         const body =   Matter.Bodies.rectangle(
//            startX,
//            startY,
//            objRect.width,
//            objRect.heigth,{
//                 restitution: config.restitution,
//                 friction: config.friction,
//                 frictionAir : config.frictionAir,
//                 density: config.density
//            }  
//         )

//         Matter.Body.setAngle(
//             body, startRotation, 
//         )

//         bodies.push({
//             body: body,
//             element: obj,
//             width: objRect.width,
//             heigth: objRect.heigth,
//         })

//         Matter.World.add(engine.world, body)
//     })


// setTimeout (()=>{
//     topWall  = Matter.Bodies.rectangle(
//         constainerRect.width/2,
//         -wallThickness /2,
//         constainerRect.width + wallThickness * 2,
//         wallThickness,
//         {isStatic:true}
//     );
//     Matter.World.add(engine.world, topWall)
// }, 3000)



// const mouse = Matter.Mouse.create(container);

// mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
// mouse.element.removeEventListener("DomMouseScroll" , mouse, mousewheel)
// }

// mouseConstraint = Matter.mouseConstraint.create(engine, {
//     mouse: mouse,
//     constraint : {
//         stiffness : config.mouseStiffness,
//         render : {visible : flse}
//     }
// })

// mouseConstraint.mouse.element.oncontextmenu = () => false

// let dragging = null ;
// let orignalInertia = null;

// Matter.Events.on(mouseConstraint, "startdrag", function(event){
//     dragging = event.body;
//     if (dragging) {
//         orignalInertia = dragging.inertia;
//         Matter.Body.setInertia(dragging, Infinity)
//         Matter.Body.setVelocity({x:0, y:0})
//         Matter.Body.setInertia(dragging, 0)
//     }
// })

// Matter.Events.on (mouseConstraint, "enddrag", function (event) {
//     if (dragging) {
//         Matter.Body.setInertia(dragging, orignalInertia || 1)
//        dragging = null,
//        orignalInertia = null
//     }
// })
    
// Matter.Events.on(engine , "beforeUpdate", function name(params) {
//      if (dragging) {
//        const found = bodies.find((b) => b.body === dragging)
//        if (found) {
//         const minX = found.width /2;
//         const maxX = constainerRect.width - found.width /2;
//         const minY = found.width /2;
//         const maxY = constainerRect.heigth - found.heigth /2;


//         Matter.Body.setPosition(dragging, {
//             x: clamp(dragging.position.x, minX, maxX),
//             y : clamp(dragging.position.y, minY, maxY)
//         })


//         Matter.Body.setVelocity(dragging, {
//              x: clamp(dragging.velocity.x, -20, 20),
//             y : clamp(dragging.velocity.y, -20, 20)
//         })
//        }
//     }
// })



// container.addEventListener("mouseleave" , () => {
//     mouseConstraint.constraint.bodyB = null
//     mouseConstraint.constraint.pointB = null

// })

// document.addEventListener("mouseup", () =>{
//     mouseConstraint.constraint.bodyB = null
//     mouseConstraint.constraint.pointB = null
// })


// Matter.World.add(engine.world, mouseConstraint)

// runner = Matter.Runner.create();
// Matter.Runner.run(runner, engine)


// function updatePosition() {
//     bodies.forEach(({body, element, width, heigth}) => {
//         const x  = clamp(
//           body.position.x -width /2 ,
//           0,
//           constainerRect.width - width
//         );
//         const y = clamp (
//             body.position.x -heigth /2 ,
//          -heigth * 3 ,
//           constainerRect.heheigth -heigth
//         );

//         element.style.left = x + "px"
//         element.style.top = y + "px"
//         element.style.transform = `rotate(${body.angle}red)`
//     })

//     requestAnimationFrame(updatePosition);
// }
// updatePosition()


// if(animateOnScroll){
//     document.querySelectorAll("section").forEach((section ) => {
//         if (section.querySelector(".object-container")) {
//             ScrollTrigger.create({
//                 trigger: section,
//                 start: "top bottom",
//                 once: true,
//                 onEnter: () => {
//                     const container = section.querySelector(".oject-container")
//                     if (container && !engine) {
//                         initPhysics(container)
//                     }
//                 }
//             })
//         }
//     })
// }else{
//     window.addEventListener("load", () => {
//         const container = document.querySelector(",object-container")
//         if (container) {
//             initPhysics(container)
//         }
//     })
// }
// }

// )

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import Matter from "matter-js";

gsap.registerPlugin(ScrollTrigger);

// EXPORT FUNCTION FOR REACT
export function initSkillPageAnimation(container) {
  if (!container) return;

  // LENIS + SCROLLTRIGGER SETUP
  const lenis = new Lenis({ smooth: true });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // CONFIG
  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.5,
    friction: 0.15,
    frictionAir: 0.02,
    density: 0.002,
    wallThickness: 200,
    mouseStiffness: 0.6,
  };

  // MATTER JS SETUP
  const engine = Matter.Engine.create();
  engine.gravity = config.gravity;

  const world = engine.world;

  const rect = container.getBoundingClientRect();
  const wallThickness = config.wallThickness;

  // WALLS
  const walls = [
    Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height + wallThickness / 2,
      rect.width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    ),
    Matter.Bodies.rectangle(
      -wallThickness / 2,
      rect.height / 2,
      wallThickness,
      rect.height + wallThickness * 2,
      { isStatic: true }
    ),
    Matter.Bodies.rectangle(
      rect.width + wallThickness / 2,
      rect.height / 2,
      wallThickness,
      rect.height + wallThickness * 2,
      { isStatic: true }
    ),
  ];

  Matter.World.add(world, walls);

  // BODIES + HTML ELEMENTS
  let bodies = [];

  const objects = container.querySelectorAll(".object");

  objects.forEach((el, index) => {
    const r = el.getBoundingClientRect();
    const startX = Math.random() * rect.width;
    const startY = -200 - index * 200;
    const startRotation = (Math.random() - 0.5) * Math.PI;

    const body = Matter.Bodies.rectangle(startX, startY, r.width, r.height, {
      restitution: config.restitution,
      friction: config.friction,
      frictionAir: config.frictionAir,
      density: config.density,
    });

    Matter.Body.setAngle(body, startRotation);

    Matter.World.add(world, body);

    bodies.push({
      body,
      element: el,
      width: r.width,
      height: r.height,
    });
  });

  // TOP WALL DROPS LATE
  setTimeout(() => {
    const topWall = Matter.Bodies.rectangle(
      rect.width / 2,
      -wallThickness / 2,
      rect.width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    );

    Matter.World.add(world, topWall);
  }, 3000);

  // DRAGGING SETUP
  const mouse = Matter.Mouse.create(container);

  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: config.mouseStiffness,
      render: { visible: false },
    },
  });

  Matter.World.add(world, mouseConstraint);

  let dragging = null;
  let originalInertia = null;

  Matter.Events.on(mouseConstraint, "startdrag", (event) => {
    dragging = event.body;

    if (dragging) {
      originalInertia = dragging.inertia;

      Matter.Body.setInertia(dragging, Infinity);
      Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(dragging, 0);
    }
  });

  Matter.Events.on(mouseConstraint, "enddrag", () => {
    if (dragging) {
      Matter.Body.setInertia(dragging, originalInertia || 1);
      dragging = null;
      originalInertia = null;
    }
  });

  // UPDATE LOOP
  function update() {
    bodies.forEach(({ body, element, width, height }) => {
      element.style.left = body.position.x - width / 2 + "px";
      element.style.top = body.position.y - height / 2 + "px";
      element.style.transform = `rotate(${body.angle}rad)`;
    });

    Matter.Engine.update(engine);
    requestAnimationFrame(update);
  }

  update();

  // CLEANUP
  return () => {
    Matter.Engine.clear(engine);
    Matter.World.clear(world);
    gsap.ticker.remove(lenis);
  };
}
