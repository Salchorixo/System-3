const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");

const card = document.getElementById("card");
const plus = document.getElementById("plus");

const idle = document.getElementById("zyra-idle");
const push = document.getElementById("zyra-push");

let currentFollowers = 0;
let goal = 500;

// Variables para controlar los tiempos exactos de la animación
let cardResetTimeout; 
let impactTimeout; 

goalEl.textContent = goal;

idle.classList.add("active");

/* -------------------------
   SAFE TRIGGER
-------------------------- */
function triggerFollow(newCount = null) {

  // Actualizar contador
  currentFollowers = newCount ?? (currentFollowers + 1);
  currentEl.textContent = currentFollowers;

  // Limpiamos los temporizadores por si hay follows muy rápidos
  clearTimeout(cardResetTimeout);
  clearTimeout(impactTimeout);

  // Ocultamos la tarjeta y el +1 de inmediato (Reset visual antes del golpe)
  card.classList.remove("push");
  plus.classList.remove("show-plus");

  /* -------------------------
     ZYRA PUSH (SMOOTH SWITCH & PERFECT SYNC)
  -------------------------- */
  push.currentTime = 0;

  push.play().then(() => {
    requestAnimationFrame(() => {
      // 1. Mostramos el video de empuje
      push.classList.add("active");
      idle.classList.remove("active");

      // 2. EL GOLPE PERFECTO (Delay controlado por JS)
      // ⏱️ Ajusta este número (ej. 600 = 0.6 segundos) para que cuadre EXACTO con el movimiento de Zyra
      impactTimeout = setTimeout(() => {
        
        // Empuja la tarjeta
        card.classList.add("push");

        // Muestra el +1
        void plus.offsetWidth; // Force restart para la animación
        plus.classList.add("show-plus");

      }, 600); 

    });
  }).catch(err => console.log("Autoplay bloqueado:", err));

  /* -------------------------
     ESPERAR A QUE EL VIDEO TERMINE
  -------------------------- */
  push.onended = () => {
    idle.currentTime = 0;
    idle.play();
    
    idle.classList.add("active");
    push.classList.remove("active");

    // Retiramos la tarjeta suavemente
    cardResetTimeout = setTimeout(() => {
      card.classList.remove("push");
    }, 50);
  };
}

/* -------------------------
   TEST AUTOMÁTICO (BORRAR EN PRODUCCIÓN)
-------------------------- */
// Simula un follow cada 5 segundos para que te dé tiempo de ver toda la animación
setInterval(() => {
  triggerFollow();
}, 5000);