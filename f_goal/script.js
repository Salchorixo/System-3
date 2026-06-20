const CHANNEL = "tu_canal_kick";

let lastFollowers = 0;
let goal = 500;

async function checkFollowers() {

  const currentFollowers = await getChannelData();

  document.getElementById("current").textContent = currentFollowers;

  if (currentFollowers > lastFollowers) {
    triggerFollow(currentFollowers);
  }

  lastFollowers = currentFollowers;
}

setInterval(checkFollowers, 5000);

function triggerFollow(newCount) {

  // actualizar número
  document.getElementById("current").textContent = newCount;

  // cambiar Zyra a push
  const zyra = document.getElementById("zyra");
  zyra.src = "zyra_push.webm";
  zyra.play();

  // mover tarjeta
  const card = document.getElementById("card");
  card.classList.add("push");

  // +1 efecto
  const plus = document.getElementById("plus");
  plus.classList.add("show-plus");

  setTimeout(() => {

    // volver idle
    zyra.src = "zyra_idle.webm";
    zyra.play();

    card.classList.remove("push");
    plus.classList.remove("show-plus");

  }, 1000);
}
