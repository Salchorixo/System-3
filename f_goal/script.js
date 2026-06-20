const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");

const card = document.getElementById("card");
const plus = document.getElementById("plus");

// VIDEOS (sin cambiar src nunca)
const idle = document.getElementById("zyra-idle");
const push = document.getElementById("zyra-push");

// estado
let currentFollowers = 0;
let goal = 500;

// init
goalEl.textContent = goal;

// asegurar estado inicial
idle.classList.add("active");
push.classList.remove("active");

function triggerFollow(newCount = null) {

  // actualizar contador
  if (newCount !== null) {
    currentFollowers = newCount;
  } else {
    currentFollowers++;
  }

  currentEl.textContent = currentFollowers;

  // ------------------------
  // ZYRA PUSH (sin flicker)
  // ------------------------
  push.currentTime = 0;
  push.play();

  push.classList.add("active");
  idle.classList.remove("active");

  // ------------------------
  // CARD ANIMATION
  // ------------------------
  card.classList.add("push");

  // ------------------------
  // +1 POP
  // ------------------------
  plus.classList.add("show-plus");

  // reset después
  setTimeout(() => {

    // volver idle
    idle.currentTime = 0;
    idle.play();

    idle.classList.add("active");
    push.classList.remove("active");

    // reset UI
    card.classList.remove("push");
    plus.classList.remove("show-plus");

  }, 900);
}

/* -------------------------
   TEST MODE (puedes quitarlo luego)
-------------------------- */
setInterval(() => {
  triggerFollow();
}, 5000);