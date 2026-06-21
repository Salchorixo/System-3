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

  // 1. MATEMÁTICA: Actualizamos la variable interna al instante (para no perder la cuenta)
  currentFollowers = newCount ?? (currentFollowers + 1);

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
      // Mostramos el video de empuje
      push.classList.add("active");
      idle.classList.remove("active");

      // 2. EL GOLPE PERFECTO (Delay a 500ms)
      impactTimeout = setTimeout(() => {
        
        // VISUAL: ¡Actualizamos el número en pantalla justo en el momento del impacto!
        currentEl.textContent = currentFollowers;

        // Empuja la tarjeta
        card.classList.add("push");

        // Muestra el +1
        void plus.offsetWidth; // Force restart para la animación
        plus.classList.add("show-plus");

      }, 500); 

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
   CONEXIÓN EN VIVO A KICK
-------------------------- */
// 1. Pega aquí tu ID secreto entre las comillas
const chatroomId = "49029223"; 

// 2. Encendemos la antena (Estos datos son públicos de Kick)
const pusher = new Pusher('32cbd69e4b950bf97679', {
  cluster: 'us2',
  forceTLS: true
});

// 3. Nos sintonizamos a tu canal
const kickChannel = pusher.subscribe(`channel.${chatroomId}`);

// 4. Escuchamos en tiempo real. ¡Cuando alguien te siga, Zyra ataca!
kickChannel.bind('App\\Events\\FollowersUpdated', function(data) {
  
  // Le mandamos a tu función de Zyra la cantidad exacta de seguidores actuales
  triggerFollow(data.followersCount);
  
});