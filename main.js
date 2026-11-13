// theme (set early)
(function(){let t='dark';try{t=localStorage.getItem('theme')||'dark'}catch(e){}document.documentElement.dataset.theme=t})();
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// typing
const words=['> law.understand()','> city.observe()','> code.build(tool)','> connect(ideas) → value'];
const ty=document.getElementById('typed');let wi=0,ci=0,del=false;
if(ty)(function loop(){const w=words[wi];ty.textContent=w.slice(0,ci);
  if(!del&&ci<w.length){ci++;setTimeout(loop,70)}
  else if(!del){del=true;setTimeout(loop,1600)}
  else if(ci>0){ci--;setTimeout(loop,30)}
  else{del=false;wi=(wi+1)%words.length;setTimeout(loop,300)}})();

// cursor glow
const cur=document.getElementById('cursor');
addEventListener('pointermove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});

// clock
const ck=document.getElementById('clock');
function tick(){ck.textContent=new Date().toLocaleTimeString('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',second:'2-digit'})}
tick();setInterval(tick,1000);

// language switch (JA / EN)
const tr=[...document.querySelectorAll('[data-en]')];
tr.forEach(el=>el.dataset.ja=el.innerHTML);
function setLang(l){
  tr.forEach(el=>el.innerHTML=l==='en'?el.dataset.en:el.dataset.ja);
  document.documentElement.lang=l;
  const t=document.body.dataset;document.title=(l==='en'?t.titleEn:t.titleJa)||document.title;
  document.querySelectorAll('#lang b').forEach(b=>b.classList.toggle('on',b.dataset.l===l));
  try{localStorage.setItem('lang',l)}catch(e){}
}
let cur_l='ja';try{cur_l=localStorage.getItem('lang')||(navigator.language.startsWith('ja')?'ja':'en')}catch(e){}
setLang(cur_l);
document.getElementById('lang').addEventListener('click',()=>{cur_l=cur_l==='ja'?'en':'ja';setLang(cur_l)});

// mobile menu
document.getElementById('menu').addEventListener('click',()=>document.body.classList.toggle('open'));
document.querySelectorAll('.drawer a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('open')));

// theme toggle
document.getElementById('theme').addEventListener('click',()=>{
  const t=document.documentElement.dataset.theme==='light'?'dark':'light';
  document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}
});

// page transition
document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||a.target)return;
  e.preventDefault();document.body.classList.add('leaving');
  setTimeout(()=>location.href=a.href,320);
}));
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});

// scroll progress
const pr=document.createElement('div');pr.className='progress';document.body.appendChild(pr);
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;pr.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
