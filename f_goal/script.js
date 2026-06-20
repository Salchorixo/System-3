const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");

const card = document.getElementById("card");
const plus = document.getElementById("plus");

// VIDEOS (idle / push)
const idle = document.getElementById("zyra-idle");
const push = document.getElementById("zyra-push");

// STATE
let currentFollowers = 0;
let goal = 500;

// init goal text
goalEl.textContent = goal;

// ensure initial state
idle.classList.add("active");
push.classList.remove("active");

/* -------------------------
   MAIN EVENT: FOLLOW
-------------------------- */
function triggerFollow(newCount = null) {

  // update counter
  if (newCount !== null) {
    currentFollowers = newCount;
  } else {
    currentFollowers++;
  }

  currentEl.textContent = currentFollowers;

  // -------------------------
  // ZYRA PUSH (no flicker)
  // -------------------------
  push.currentTime = 0;
  push.play();

  push.classList.add("active");
  idle.classList.remove("active");

  // -------------------------
  // CARD ANIMATION
  // -------------------------
  card.classList.add("push");

  // -------------------------
  // +1 POP EFFECT
  // -------------------------
  plus.classList.add("show-plus");

  // -------------------------
  // RESET (SYNC 0.9s)
  // -------------------------
  setTimeout(() => {

    // back to idle
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
   TEST LOOP (REMOVE LATER)
-------------------------- */
setInterval(() => {
  triggerFollow();
}, 5000);