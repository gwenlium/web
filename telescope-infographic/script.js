// Starfield animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 180;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.15 + 0.05,
      alpha: Math.random() * 0.5 + 0.5
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateStars);
}
animateStars();

// --- German topics and much more info ---
const topics = {
  'geschichte': {
    title: 'Geschichte der Teleskope',
    html: `<b>Erfindung:</b> Anfang des 17. Jahrhunderts in den Niederlanden. <br>
    <b>Erste Nutzung:</b> Galileo Galilei richtete 1609 erstmals ein Teleskop zum Himmel.<br>
    <b>Meilensteine:</b> Entwicklung von Linsen- zu Spiegelteleskopen, Bau von Riesenteleskopen, Weltraumteleskope wie Hubble und James Webb.`
  },
  'erfinder': {
    title: 'Erfinder',
    html: `<b>Hans Lippershey</b> (Niederlande, 1608) gilt als offizieller Erfinder.<br>
    <b>Weitere Namen:</b> Zacharias Janssen, Jacob Metius.<br>
    <b>Galileo Galilei</b> verbesserte das Design und machte das Teleskop berühmt.`
  },
  'zweck': {
    title: 'Zweck',
    html: `Teleskope wurden erfunden, um weit entfernte Objekte sichtbar zu machen.<br>
    <b>Früher:</b> Militär, Navigation.<br>
    <b>Heute:</b> Astronomie, Forschung, Entdeckung neuer Welten.`
  },
  'entdeckungen': {
    title: 'Wichtige Entdeckungen',
    html: `<ul><li>Jupitermonde (Galilei, 1610)</li><li>Ringe des Saturn</li><li>Uranus, Neptun, Pluto</li><li>Galaxien, Nebel, Schwarze Löcher</li><li>Expansion des Universums</li><li>Exoplaneten</li></ul>`
  },
  'physik': {
    title: 'Physik der Teleskope',
    html: `<b>Prinzip:</b> Licht wird durch Linsen oder Spiegel gesammelt und gebündelt.<br>
    <b>Wichtige Begriffe:</b> Brennweite, Öffnung, Auflösung, Lichtstärke.<br>
    <b>Spektralbereiche:</b> Optisch, Infrarot, Radio, Röntgen, Gamma.<br>
    <b>Atmosphärische Störungen:</b> Adaptive Optik, Weltraumteleskope.`
  },
  'typen': {
    title: 'Teleskop-Typen',
    html: `<ul><li><b>Linsenteleskop (Refraktor):</b> Nutzt Linsen</li><li><b>Spiegelteleskop (Reflektor):</b> Nutzt Spiegel</li><li><b>Radioteleskop:</b> Riesige Schüsseln für Radiowellen</li><li><b>Weltraumteleskop:</b> Umgeht die Erdatmosphäre</li></ul>`
  },
  'funktion': {
    title: 'Funktionsweise',
    html: `Teleskope sammeln Licht und fokussieren es zu einem Bild.<br>
    <b>Wichtige Komponenten:</b> Objektiv (Linse/Spiegel), Okular, Montierung.<br>
    <b>Beobachtungsarten:</b> Visuell, Fotografie, Spektroskopie.`
  },
  'beruehmt': {
    title: 'Berühmte Teleskope',
    html: `<ul><li><b>Hubble-Weltraumteleskop</b> (seit 1990)</li><li><b>James Webb Space Telescope</b> (seit 2021)</li><li><b>Very Large Telescope (VLT)</b> in Chile</li><li><b>Gran Telescopio Canarias</b> (größtes Spiegelteleskop)</li><li><b>Arecibo-Observatorium</b> (Radioteleskop, 1963–2020)</li></ul>`
  }
};

// Modal logic (German)
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

function openModal(topic) {
  if (topics[topic]) {
    modalBody.innerHTML = `<h2>${topics[topic].title}</h2><div>${topics[topic].html}</div>`;
    modal.classList.remove('hidden');
  }
}
function closeModal() {
  modal.classList.add('hidden');
}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.querySelectorAll('.star-node').forEach(node => {
  node.addEventListener('click', () => openModal(node.dataset.topic));
});

document.getElementById('telescopeIcon').addEventListener('click', () => openModal('geschichte'));

// Draw a simple SVG telescope in the center
const telescopeDiv = document.getElementById('telescopeIcon');
telescopeDiv.innerHTML = `
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="60" rx="55" ry="55" fill="#eaf6ff" fill-opacity="0.7"/>
  <rect x="40" y="50" width="40" height="18" rx="9" fill="#4a90e2" stroke="#1a2238" stroke-width="3"/>
  <rect x="70" y="54" width="22" height="10" rx="5" fill="#b3c6e0" stroke="#1a2238" stroke-width="2"/>
  <circle cx="92" cy="59" r="7" fill="#fff" stroke="#1a2238" stroke-width="2"/>
  <rect x="38" y="56" width="8" height="6" rx="3" fill="#b3c6e0" stroke="#1a2238" stroke-width="2"/>
</svg>
`;

// --- TELESCOPE MINI-GAME ---
// Add a draggable telescope lens to discover hidden facts
const telescopeGame = document.createElement('div');
telescopeGame.id = 'telescope-game';
telescopeGame.innerHTML = `
  <span class="close-btn">&times;</span>
  <div id="telescope-lens"><div id="telescope-fact"></div></div>
`;
document.body.appendChild(telescopeGame);

const facts = [
  'Das Hubble-Teleskop umkreist die Erde in ca. 540 km Höhe.',
  'Das größte optische Einzelteleskop ist das Gran Telescopio Canarias (10,4 m Spiegel).',
  'Radioteleskope können so groß wie ein Fußballfeld sein!',
  'Galileo baute 1609 sein erstes Teleskop.',
  'Das James Webb Space Telescope sieht Infrarotlicht aus der Frühzeit des Universums.',
  'Einige Teleskope stehen im Weltall, um die Atmosphäre zu umgehen.',
  'Adaptive Optik gleicht Luftunruhe aus und macht Bilder schärfer.',
  'Mit Teleskopen wurden über 5000 Exoplaneten entdeckt.',
  'Das VLT in Chile besteht aus vier 8,2-m-Teleskopen.',
  'Das Arecibo-Observatorium war das größte Radioteleskop der Welt.'
];
const lens = document.getElementById('telescope-lens');
const factDiv = document.getElementById('telescope-fact');
let dragging = false, offsetX = 0, offsetY = 0;

function randomFact() {
  return facts[Math.floor(Math.random() * facts.length)];
}
function showTelescopeGame() {
  telescopeGame.classList.add('active');
  moveLens(window.innerWidth/2-110, window.innerHeight/2-110);
  factDiv.textContent = randomFact();
}
function hideTelescopeGame() {
  telescopeGame.classList.remove('active');
}
telescopeGame.querySelector('.close-btn').onclick = hideTelescopeGame;

document.getElementById('telescopeIcon').ondblclick = showTelescopeGame;

function moveLens(x, y) {
  lens.style.left = x + 'px';
  lens.style.top = y + 'px';
}
lens.onmousedown = function(e) {
  dragging = true;
  offsetX = e.clientX - lens.offsetLeft;
  offsetY = e.clientY - lens.offsetTop;
  lens.style.cursor = 'grabbing';
};
document.onmousemove = function(e) {
  if (!dragging) return;
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;
  moveLens(x, y);
};
document.onmouseup = function() {
  if (dragging) {
    dragging = false;
    lens.style.cursor = 'grab';
    factDiv.textContent = randomFact();
  }
};

// --- Solar System Infographic (Animated Orbits, Improved SVG) ---
const infographic = document.getElementById('infographic');
const nodes = Array.from(document.querySelectorAll('.star-node'));
const center = document.getElementById('telescopeIcon');

// Remove previous orbit SVG if any
let oldOrbits = document.getElementById('orbit-svg');
if (oldOrbits) oldOrbits.remove();

// Create SVG for orbits (with glow and dashed lines)
const orbitSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
orbitSVG.setAttribute('id', 'orbit-svg');
orbitSVG.style.position = 'absolute';
orbitSVG.style.left = '0';
orbitSVG.style.top = '0';
orbitSVG.style.width = '100%';
orbitSVG.style.height = '100%';
orbitSVG.style.zIndex = '1';
// SVG filter for glow
orbitSVG.innerHTML = `
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
`;
infographic.appendChild(orbitSVG);

// Arrange nodes in orbits (2D, always front view)
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const orbitRadii = [180, 240, 300, 360, 420, 480, 540, 600];
const nodeAngles = [0, 45, 90, 135, 180, 225, 270, 315];

// Draw orbits as glowing dashed ellipses
orbitRadii.forEach((r, i) => {
  const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  ellipse.setAttribute('cx', centerX);
  ellipse.setAttribute('cy', centerY);
  ellipse.setAttribute('rx', r);
  ellipse.setAttribute('ry', r * 0.5);
  ellipse.setAttribute('stroke', '#ffe066');
  ellipse.setAttribute('stroke-width', '2.5');
  ellipse.setAttribute('fill', 'none');
  ellipse.setAttribute('opacity', '0.45');
  ellipse.setAttribute('stroke-dasharray', '16 10');
  ellipse.setAttribute('filter', 'url(#glow)');
  orbitSVG.appendChild(ellipse);
});

// Animate nodes around orbits
let startTime = null;
function animateOrbits(ts) {
  if (!startTime) startTime = ts;
  const t = (ts - startTime) / 1000; // seconds
  nodes.forEach((node, i) => {
    // Each node orbits at a different speed
    const speed = 0.12 + 0.04 * i;
    const angle = nodeAngles[i] * Math.PI / 180 + t * speed;
    const r = orbitRadii[i % orbitRadii.length];
    // Bobbing effect
    const bob = Math.sin(t * 1.2 + i) * 8;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r * 0.5 + bob;
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.style.transform = 'translate(-50%, -50%)';
  });
  // Animate telescope glow
  const pulse = 1 + 0.08 * Math.sin(t * 2);
  center.style.transform = `translate(-50%, -50%) scale(${1.2 * pulse})`;
  requestAnimationFrame(animateOrbits);
}
requestAnimationFrame(animateOrbits);

// Center telescope as the "sun" (with improved SVG)
center.style.left = centerX + 'px';
center.style.top = centerY + 'px';
center.style.transform = 'translate(-50%, -50%) scale(1.2)';
center.style.zIndex = 10;
center.innerHTML = `
<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="70" cy="70" r="60" fill="#ffe066" filter="url(#glow)"/>
  <ellipse cx="70" cy="70" rx="54" ry="54" fill="#eaf6ff" fill-opacity="0.7"/>
  <g filter="url(#glow)">
    <rect x="40" y="60" width="60" height="20" rx="10" fill="#4a90e2" stroke="#1a2238" stroke-width="4"/>
    <rect x="90" y="64" width="28" height="12" rx="6" fill="#b3c6e0" stroke="#1a2238" stroke-width="2.5"/>
    <circle cx="118" cy="70" r="8" fill="#fff" stroke="#1a2238" stroke-width="2.5"/>
    <rect x="36" y="66" width="10" height="8" rx="4" fill="#b3c6e0" stroke="#1a2238" stroke-width="2.5"/>
  </g>
  <circle cx="70" cy="70" r="60" fill="none" stroke="#ffe066" stroke-width="4" filter="url(#glow)"/>
</svg>
`;

// --- Solar System Infographic (SVG polish & custom planet icons) ---
// Remove custom SVG planet icons, restore text labels only
nodes.forEach((node, i) => {
  node.innerHTML = `<span class="planet-label">${node.textContent.replace(/<[^>]+>/g, '')}</span>`;
});

// --- Add zooming (mouse wheel and pinch) ---
let zoom = 1;
const minZoom = 0.5;
const maxZoom = 2.5;
const infographicContainer = document.body;

function setZoom(newZoom) {
  zoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
  infographic.style.transform = `scale(${zoom})`;
}

// Mouse wheel zoom
infographic.addEventListener('wheel', (e) => {
  e.preventDefault();
  setZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1));
}, { passive: false });

// Pinch zoom for touch devices
let lastDist = null;
infographic.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (lastDist) {
      setZoom(zoom * (dist / lastDist));
    }
    lastDist = dist;
  }
}, { passive: false });
infographic.addEventListener('touchend', () => { lastDist = null; });

// --- Visual & Interactive Enhancements ---
// 1. Planetary Motion Animation: Bobbing
function animateOrbits(ts) {
  if (!startTime) startTime = ts;
  const t = (ts - startTime) / 1000; // seconds
  nodes.forEach((node, i) => {
    // Each node orbits at a different speed
    const speed = 0.12 + 0.04 * i;
    const angle = nodeAngles[i] * Math.PI / 180 + t * speed;
    const r = orbitRadii[i % orbitRadii.length];
    // Bobbing effect
    const bob = Math.sin(t * 1.2 + i) * 8;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r * 0.5 + bob;
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.style.transform = 'translate(-50%, -50%)';
  });
  // Animate telescope glow
  const pulse = 1 + 0.08 * Math.sin(t * 2);
  center.style.transform = `translate(-50%, -50%) scale(${1.2 * pulse})`;
  requestAnimationFrame(animateOrbits);
}
requestAnimationFrame(animateOrbits);

// 2. Background: Nebula & Shooting Star
const nebula = document.createElement('div');
nebula.style.position = 'fixed';
nebula.style.left = '0';
nebula.style.top = '0';
nebula.style.width = '100vw';
nebula.style.height = '100vh';
nebula.style.background = 'radial-gradient(ellipse at 70% 30%, #a0bfff44 0%, #0a102600 70%), radial-gradient(ellipse at 20% 80%, #ffe06622 0%, #0a102600 80%)';
nebula.style.zIndex = '0';
document.body.insertBefore(nebula, canvas);

function shootingStar() {
  const star = document.createElement('div');
  star.style.position = 'fixed';
  star.style.width = '2px';
  star.style.height = '80px';
  star.style.background = 'linear-gradient(180deg, #fff, #ffe06600)';
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.top = (Math.random() * 0.5 + 0.1) * window.innerHeight + 'px';
  star.style.opacity = '0.7';
  star.style.zIndex = '3';
  star.style.pointerEvents = 'none';
  document.body.appendChild(star);
  star.animate([
    { transform: 'translateY(0) scaleY(1)' },
    { transform: 'translateY(120px) scaleY(0.5)', opacity: 0 }
  ], { duration: 1200, easing: 'ease-out' });
  setTimeout(() => star.remove(), 1200);
}
setInterval(() => { if (Math.random() < 0.25) shootingStar(); }, 2000);

// 3. Planet Hover Effects: Grow, Glow, Tooltip
nodes.forEach((node, i) => {
  node.addEventListener('mouseenter', () => {
    node.style.boxShadow = '0 0 60px 20px #ffe066, 0 0 0 12px #4a90e2';
    node.style.background = 'radial-gradient(circle at 60% 40%, #ffe066 70%, #fff 100%)';
    node.style.color = '#4a90e2';
    // Tooltip
    let tip = document.createElement('div');
    tip.className = 'planet-tooltip';
    tip.textContent = topics[node.dataset.topic]?.title || '';
    document.body.appendChild(tip);
    const rect = node.getBoundingClientRect();
    tip.style.left = (rect.left + rect.width/2 - tip.offsetWidth/2) + 'px';
    tip.style.top = (rect.top - 36) + 'px';
    node._tip = tip;
  });
  node.addEventListener('mouseleave', () => {
    node.style.boxShadow = '';
    node.style.background = '';
    node.style.color = '';
    if (node._tip) { node._tip.remove(); node._tip = null; }
  });
});

// 4. Accessibility: Keyboard navigation & ARIA
nodes.forEach((node, i) => {
  node.setAttribute('tabindex', '0');
  node.setAttribute('role', 'button');
  node.setAttribute('aria-label', topics[node.dataset.topic]?.title || node.textContent);
  node.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      openModal(node.dataset.topic);
    }
  });
});

// 5. Modal Enhancements: Next/Prev arrows
const modalContent = document.querySelector('.modal-content');
const prevBtn = document.createElement('span');
const nextBtn = document.createElement('span');
prevBtn.textContent = '⟨';
nextBtn.textContent = '⟩';
prevBtn.className = 'modal-arrow left';
nextBtn.className = 'modal-arrow right';
modalContent.appendChild(prevBtn);
modalContent.appendChild(nextBtn);
let currentTopicIndex = 0;
function showTopicByIndex(idx) {
  const keys = Object.keys(topics);
  if (idx < 0) idx = keys.length - 1;
  if (idx >= keys.length) idx = 0;
  openModal(keys[idx]);
  currentTopicIndex = idx;
}
prevBtn.onclick = () => showTopicByIndex(currentTopicIndex - 1);
nextBtn.onclick = () => showTopicByIndex(currentTopicIndex + 1);

// 6. Sound Effects
const clickSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7e2.mp3');
nodes.forEach(node => node.addEventListener('click', () => { clickSound.currentTime = 0; clickSound.play(); }));

// 7. Mobile: Reset zoom button
const resetZoomBtn = document.createElement('button');
resetZoomBtn.textContent = 'Zoom zurücksetzen';
resetZoomBtn.className = 'reset-zoom-btn';
resetZoomBtn.style.position = 'fixed';
resetZoomBtn.style.bottom = '24px';
resetZoomBtn.style.right = '24px';
resetZoomBtn.style.zIndex = '20';
resetZoomBtn.style.padding = '0.7em 1.2em';
resetZoomBtn.style.fontSize = '1.1em';
resetZoomBtn.style.background = '#ffe066';
resetZoomBtn.style.border = 'none';
resetZoomBtn.style.borderRadius = '1em';
resetZoomBtn.style.boxShadow = '0 0 12px #ffe06688';
resetZoomBtn.style.cursor = 'pointer';
resetZoomBtn.onclick = () => setZoom(1);
document.body.appendChild(resetZoomBtn);

// 8. Easter egg: secret animation on telescope
let telescopeClicks = 0;
center.addEventListener('click', () => {
  telescopeClicks++;
  if (telescopeClicks === 7) {
    const egg = document.createElement('div');
    egg.textContent = '🌠 Geheimnis entdeckt!';
    egg.style.position = 'fixed';
    egg.style.left = '50%';
    egg.style.top = '30%';
    egg.style.transform = 'translate(-50%, -50%) scale(1.5)';
    egg.style.fontSize = '2.5em';
    egg.style.color = '#ffe066';
    egg.style.textShadow = '0 0 24px #fff, 0 0 8px #4a90e2';
    egg.style.zIndex = '100';
    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), 2500);
    telescopeClicks = 0;
  }
});

// 9. Random fact button
const randomBtn = document.createElement('button');
randomBtn.textContent = 'Zufälliges Thema';
randomBtn.className = 'random-btn';
randomBtn.style.position = 'fixed';
randomBtn.style.bottom = '24px';
randomBtn.style.left = '24px';
randomBtn.style.zIndex = '20';
randomBtn.style.padding = '0.7em 1.2em';
randomBtn.style.fontSize = '1.1em';
randomBtn.style.background = '#b3c6e0';
randomBtn.style.border = 'none';
randomBtn.style.borderRadius = '1em';
randomBtn.style.boxShadow = '0 0 12px #b3c6e088';
randomBtn.style.cursor = 'pointer';
randomBtn.onclick = () => {
  const idx = Math.floor(Math.random() * nodes.length);
  nodes[idx].focus();
  openModal(nodes[idx].dataset.topic);
};
document.body.appendChild(randomBtn);
