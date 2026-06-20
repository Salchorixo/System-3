const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");
const zyra = document.getElementById("zyra");
const card = document.getElementById("card");
const plus = document.getElementById("plus");

let currentFollowers = 0;
let goal = 500;

/* SET INITIAL */
goalEl.textContent = goal;

/* ZYRA STATES */
const IDLE = "zyra_idle.webm";
const PUSH = "zyra_push.webm";

/* TEST FOLLOW (simulación) */
function triggerFollow() {

  currentFollowers++;
  currentEl.textContent = currentFollowers;

  // Zyra push
  zyra.src = PUSH;
  zyra.play();

  // card push
  card.classList.add("push");

  // +1 animation
  plus.classList.add("show-plus");

  setTimeout(() => {

    // back to idle
    zyra.src = IDLE;
    zyra.play();

    card.classList.remove("push");
    plus.classList.remove("show-plus");

  }, 1000);
}

/* TEST AUTOMÁTICO (para probar) */
setInterval(() => {
  triggerFollow();
}, 5000);