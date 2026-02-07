document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const buttons = document.querySelectorAll(".button"); // only floating buttons
  const typingEl = document.getElementById("typing");
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // 1️⃣ Hero pop-in
  setTimeout(() => hero.classList.add("show"), 200);

  // 2️⃣ Floating button positions
  const positions = [
    {x: width*0.1, y: height*0.1},       // about
    {x: width*0.85, y: height*0.1},      // music
    {x: width*0.1, y: height*0.8},       // research
    {x: width*0.85, y: height*0.8}       // cv
  ];

  buttons.forEach((btn, i) => {
    btn.style.left = positions[i].x + "px";
    btn.style.top = positions[i].y + "px";

    setTimeout(() => {
      btn.style.opacity = 1;
      btn.style.transform = "scale(1)";
    }, 500 + i*200);
  });


  // 4️⃣ Live typing effect
  const terms = [
    "[neuroscience]",
    "[music & emotion]",
    "[computational musicology]",
    "[music cognition]",
    "[psychology]",
    "[corpus studies]",
    "[cross-cultural]"
  ];

  let termIndex = 0;
  let charIndex = 0;
  let typingForward = true;

  function typeLoop() {
    const term = terms[termIndex];
    if(typingForward){
      typingEl.textContent = term.slice(0, charIndex + 1);
      charIndex++;
      if(charIndex === term.length) typingForward = false;
    } else {
      typingEl.textContent = term.slice(0, charIndex - 1);
      charIndex--;
      if(charIndex === 0){
        typingForward = true;
        termIndex = (termIndex + 1) % terms.length;
      }
    }
    setTimeout(typeLoop, 100);
  }
  typeLoop();

  // Particle network (neurons) background
  const particles = [];
  const maxDistance = 120;
  const particleCount = 80;

  for(let i=0;i<particleCount;i++){
    particles.push({
      x: Math.random()*width,
      y: Math.random()*height,
      radius: Math.random()*2 + 1,
      dx: (Math.random()-0.5)*0.3,
      dy: (Math.random()-0.5)*0.3
    });
  }

  function drawParticles(){
    ctx.clearRect(0,0,width,height);
    // draw lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < maxDistance){
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,0,0,${0.2*(1-dist/maxDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    // draw particles
    particles.forEach(p=>{
      p.x += p.dx;
      p.y += p.dy;

      // wrap around edges
      if(p.x<0)p.x=width;
      if(p.x>width)p.x=0;
      if(p.y<0)p.y=height;
      if(p.y>height)p.y=0;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // 6️⃣ Resize handling
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
});
