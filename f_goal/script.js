/* -------------------------
   CONFIGURACIÓN INICIAL
-------------------------- */
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
   LA FUNCIÓN QUE HACE EL ATAQUE
-------------------------- */
function triggerFollow(newCount) {
  // Solo actualizamos si el número es distinto para evitar errores
  if (newCount !== null) currentFollowers = newCount;
  else currentFollowers++;

  // Lógica visual del "golpe"
  card.classList.remove("push");
  plus.classList.remove("show-plus");
  push.currentTime = 0;
  push.play();
  
  idle.classList.remove("active");
  push.classList.add("active");

  setTimeout(() => {
    currentEl.textContent = currentFollowers; // Actualiza el número aquí
    card.classList.add("push");
    plus.classList.add("show-plus");
  }, 500);

  push.onended = () => {
    idle.classList.add("active");
    push.classList.remove("active");
    setTimeout(() => card.classList.remove("push"), 50);
  };
}

/* -------------------------
   CONEXIÓN EN VIVO A KICK
-------------------------- */
// Asegúrate de poner aquí tu ID real de canal (el de los números)
const chatroomId = "TU_ID_NUMERICO_AQUI"; 

const pusher = new Pusher('32cbd69e4b950bf97679', {
  cluster: 'us2',
  forceTLS: true
});

const kickChannel = pusher.subscribe(`channel.${chatroomId}`);

// Escucha el evento de actualización de seguidores
kickChannel.bind('App\\Events\\FollowersUpdated', function(data) {
  // data.followersCount es el número total que Kick nos envía
  triggerFollow(data.followersCount);
});

// Carga inicial (para que no empiece en 0 al prender el stream)
async function getInitialFollowers() {
  try {
    const response = await fetch("https://kick.com/api/v1/channels/salchorizo");
    const data = await response.json();
    currentFollowers = data.followersCount;
    currentEl.textContent = currentFollowers;
  } catch (e) { console.error(e); }
}

getInitialFollowers();