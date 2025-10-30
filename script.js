// Shared script for multi-page site
const canvas = document.getElementById('bgCanvas');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
let w = innerWidth, h = innerHeight;
if (ctx){
  canvas.width = w; canvas.height = h;
  const particles = [];
  const palette = [[155,92,255],[255,92,92],[60,245,138],[92,155,255],[0,229,255]];
  function rand(min,max){return Math.random()*(max-min)+min}
  function makeParticles(count){
    for(let i=0;i<count;i++) particles.push({x:rand(0,w),y:rand(0,h),r:rand(1,3.5),vx:rand(-0.4,0.4),vy:rand(-0.3,0.3),color:palette[Math.floor(rand(0,palette.length))]});
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(6,6,10,0.45)'; ctx.fillRect(0,0,w,h);
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-60) p.x=w+60; if(p.x>w+60) p.x=-60; if(p.y<-60) p.y=h+60; if(p.y>h+60) p.y=-60;
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0,`rgba(${p.color.join(',')},0.9)`);
      g.addColorStop(0.2,`rgba(${p.color.join(',')},0.25)`);
      g.addColorStop(1,'rgba(6,6,10,0)');
      ctx.beginPath(); ctx.fillStyle=g; ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.fillStyle=`rgba(${p.color.join(',')},1)`; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    const g2=ctx.createLinearGradient(0,0,w,h);
    g2.addColorStop(0,'rgba(155,92,255,0.03)'); g2.addColorStop(0.5,'rgba(0,229,255,0.02)'); g2.addColorStop(1,'rgba(92,100,255,0.03)');
    ctx.fillStyle=g2; ctx.fillRect(0,0,w,h);
    requestAnimationFrame(draw);
  }
  makeParticles(Math.min(200, Math.floor((w*h)/5000)));
  draw();
  addEventListener('resize',()=>{w=canvas.width=innerWidth; h=canvas.height=innerHeight;});
}

// Toast helper
function showToast(message){
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id = 'toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = message;
  t.style.transition = 'all 300ms cubic-bezier(.2,.9,.2,1)';
  t.style.transform = 'translateY(0)'; t.style.opacity = '1'; t.style.pointerEvents = 'auto';
  setTimeout(()=>{ t.style.transform='translateY(20px)'; t.style.opacity='0'; t.style.pointerEvents='none'; }, 3200);
}

// Attach handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{ e.preventDefault(); showToast('✅ Message Sent! I will get back to you on Discord or email.'); form.reset(); });
  }
  const y = document.getElementById('year-footer'); if(y) y.textContent = new Date().getFullYear();
});
