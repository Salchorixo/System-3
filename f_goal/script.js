const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");

const card = document.getElementById("card");
const plus = document.getElementById("plus");

const idle = document.getElementById("zyra-idle");
const push = document.getElementById("zyra-push");

let currentFollowers = 0;
let goal = 500;
let cardResetTimeout; // Variable para controlar los clicks rápidos

goalEl.textContent = goal;

idle.classList.add("active");

/* -------------------------
   SAFE TRIGGER
-------------------------- */
function triggerFollow(newCount = null) {

  // update counter
  currentFollowers = newCount ?? (currentFollowers + 1);
  currentEl.textContent = currentFollowers;

  // Limpiamos cualquier temporizador anterior por si hay follows muy rápidos
  clearTimeout(cardResetTimeout);

  /* -------------------------
     CARD ANIMATION & +1
  -------------------------- */
  card.classList.remove("push");
  void card.offsetWidth; 
  card.classList.add("push");

  plus.classList.remove("show-plus");
  void plus.offsetWidth; 
  plus.classList.add("show-plus");

  /* -------------------------
     ZYRA PUSH (SMOOTH SWITCH)
  -------------------------- */
  push.currentTime = 0;

  // Esperamos a que el video REALMENTE empiece a reproducirse antes de hacer el cambio visual
  push.play().then(() => {
    // requestAnimationFrame asegura que el navegador ya pintó el frame
    requestAnimationFrame(() => {
      push.classList.add("active");
      idle.classList.remove("active");
    });
  }).catch(err => console.log("Autoplay bloqueado:", err));

  /* -------------------------
     ESPERAR A QUE EL VIDEO TERMINE (NO MÁS CORTES)
  -------------------------- */
  push.onended = () => {
    // Cuando el video de empujar termina su duración real, volvemos al idle
    idle.currentTime = 0;
    idle.play();
    
    idle.classList.add("active");
    push.classList.remove("active");

    // Retiramos la tarjeta suavemente cuando Zyra termina
    cardResetTimeout = setTimeout(() => {
      card.classList.remove("push");
    }, 50);
  };
}

/* -------------------------
   TEST AUTOMÁTICO (BORRAR EN PRODUCCIÓN)
-------------------------- */
// Subí el tiempo a 5 segundos para que te dé tiempo de ver la animación completa
setInterval(() => {
  triggerFollow();
}, 5000);