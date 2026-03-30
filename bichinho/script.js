// ── Referências ──────────────────────────────────────────────
const pet              = document.getElementById("pet");
const botao            = document.getElementById("btn");
const status           = document.getElementById("status");
const tempoTela        = document.getElementById("tempo");
const toggleDiaNite    = document.getElementById("toggleDiaNite");
const btnFoto          = document.getElementById("btnFoto");
const toggleLabel      = document.getElementById("toggleLabel");
const fomePreenchimento= document.getElementById("fomePreenchimento");
const canvas           = document.getElementById("starCanvas");
const ctx              = canvas.getContext("2d");

// ── Estados do pet ───────────────────────────────────────────
const estados = {
  normal:    "b_n.png",
  bravo:     "b_p.png",
  morto:     "b_d.png",
  comendo:   "b_c.png",
  alimentado:"b_a.png"
};

// ── Estado do jogo ───────────────────────────────────────────
let tempo  = 0;
let vivo   = true;
let fome   = 100;   // 0 = morrendo, 100 = cheio
let ehDia  = false;

// ── Estrelas ─────────────────────────────────────────────────
const QTDE_ESTRELAS = 160;
let estrelas = [];

function redimensionarCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function criarEstrelas() {
  estrelas = [];
  for (let i = 0; i < QTDE_ESTRELAS; i++) {
    estrelas.push({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height * 0.75,
      r:       Math.random() * 1.8 + 0.4,
      brilho:  Math.random(),
      delta:   (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      cor:     `hsl(${200 + Math.random() * 60}, 80%, ${75 + Math.random() * 25}%)`
    });
  }
}

function animarEstrelas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  estrelas.forEach(s => {
    s.brilho += s.delta;
    if (s.brilho > 1 || s.brilho < 0) s.delta *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.cor;
    ctx.globalAlpha = s.brilho;
    ctx.fill();

    // Cruz de luz nas estrelas maiores
    if (s.r > 1.5) {
      ctx.globalAlpha = s.brilho * 0.4;
      ctx.strokeStyle = s.cor;
      ctx.lineWidth   = 0.5;
      ctx.beginPath();
      ctx.moveTo(s.x - s.r * 3, s.y);
      ctx.lineTo(s.x + s.r * 3, s.y);
      ctx.moveTo(s.x, s.y - s.r * 3);
      ctx.lineTo(s.x, s.y + s.r * 3);
      ctx.stroke();
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animarEstrelas);
}

window.addEventListener("resize", () => {
  redimensionarCanvas();
  criarEstrelas();
});

redimensionarCanvas();
criarEstrelas();
animarEstrelas();

// ── Barra de fome ─────────────────────────────────────────────
function atualizarFome() {
  fomePreenchimento.style.width = fome + "%";
  if (fome > 60) {
    fomePreenchimento.style.background = "linear-gradient(90deg, #6bcb77, #4caf50)";
  } else if (fome > 30) {
    fomePreenchimento.style.background = "linear-gradient(90deg, #ffd93d, #ff9800)";
  } else {
    fomePreenchimento.style.background = "linear-gradient(90deg, #ff6b6b, #d32f2f)";
  }
}

atualizarFome();

// ── Partículas de comida ──────────────────────────────────────
function spawnParticulas() {
  const emojis = ["🍖","🍗","🦴","⭐","✨","💫"];
  const rect   = pet.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const p = document.createElement("span");
      p.className = "particula";
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = (rect.left + Math.random() * rect.width - 10) + "px";
      p.style.top  = (rect.top  + Math.random() * rect.height * 0.5) + "px";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }, i * 80);
  }
}

// ── Timer principal ───────────────────────────────────────────
function iniciarTempo() {
  setInterval(() => {
    if (!vivo) return;

    tempo++;
    fome = Math.max(0, fome - (100 / 60)); // chega a 0 em 60 segundos
    atualizarFome();

    tempoTela.innerHTML = "Tempo: " + tempo + "s";

    if (tempo === 30 && vivo) {
      pet.src = estados.bravo;
      status.innerHTML = "Status: Bravo 😡";
      pet.classList.remove("piscando");
    }

    if (fome <= 0 && vivo) {
      pet.src = estados.morto;
      status.innerHTML = "Status: Morto 💀";
      pet.classList.remove("piscando");
      vivo = false;
    }
  }, 1000);
}

iniciarTempo();

// ── Alimentar ─────────────────────────────────────────────────
botao.addEventListener("click", () => {
  if (!vivo) {
    // Pequena animação de tristeza no botão
    botao.style.filter = "grayscale(1)";
    setTimeout(() => botao.style.filter = "", 600);
    alert("Seu pet morreu 😢\nRecarregue a página para recomeçar!");
    return;
  }

  spawnParticulas();
  pet.src = estados.comendo;
  pet.classList.remove("piscando");
  status.innerHTML = "Status: Comendo 🍖";

  setTimeout(() => {
    pet.src = estados.alimentado;
    status.innerHTML = "Status: Alimentado 😊";
    tempo = 0;
    fome  = 100;
    atualizarFome();
  }, 2000);

  setTimeout(() => {
    pet.src = estados.normal;
    status.innerHTML = "Status: Normal";
    pet.classList.add("piscando");
  }, 4000);
});

// ── Toggle Dia / Noite ────────────────────────────────────────
function aplicarTema(dia) {
  ehDia = dia;
  if (dia) {
    document.body.classList.add("dia");
    toggleLabel.textContent = "☀️ Dia";
  } else {
    document.body.classList.remove("dia");
    toggleLabel.textContent = "🌙 Noite";
  }
}

toggleDiaNite.addEventListener("change", () => {
  aplicarTema(toggleDiaNite.checked);
});

// Começa no modo noite
aplicarTema(false);

// ── Botão Foto ────────────────────────────────────────────────
btnFoto.addEventListener("click", () => {
  window.open("foto.png", "_blank");
});