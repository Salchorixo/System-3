const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");

const card = document.getElementById("card");
const plus = document.getElementById("plus");

const idle = document.getElementById("zyra-idle");
const push = document.getElementById("zyra-push");

let currentFollowers = 0;
let goal = 500;

goalEl.textContent = goal;

idle.classList.add("active");

/* -------------------------
   SAFE TRIGGER (NO RESET BUG)
-------------------------- */
function triggerFollow(newCount = null) {

  // update counter
  currentFollowers = newCount ?? (currentFollowers + 1);
  currentEl.textContent = currentFollowers;

  /* -------------------------
     ZYRA PUSH (LOCKED PLAY)
  -------------------------- */
  push.pause();
  push.currentTime = 0;

  push.classList.add("active");
  idle.classList.remove("active");

  push.play();

  /* -------------------------
     CARD ANIMATION (FORCED REFLOW SAFE)
  -------------------------- */

  // reset BEFORE applying again (fixes glitch)
  card.classList.remove("push");
  void card.offsetWidth; // 🔥 force reflow hack

  card.classList.add("push");

  /* -------------------------
     +1 EFFECT (SAFE RESTART)
  -------------------------- */

  plus.classList.remove("show-plus");
  void plus.offsetWidth; // 🔥 force restart animation
  plus.classList.add("show-plus");

  /* -------------------------
     RESET SYNC (0.9s)
  -------------------------- */

  setTimeout(() => {

    idle.currentTime = 0;
    idle.play();

    idle.classList.add("active");
    push.classList.remove("active");

    // IMPORTANT: do NOT touch card immediately after animation ends visually
    setTimeout(() => {
      card.classList.remove("push");
    }, 50);

  }, 900);
}