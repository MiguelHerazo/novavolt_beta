function loginUser(event) {
  event.preventDefault();
  window.location.href = "dashboard.html";
}

function registerUser(event) {
  event.preventDefault();
  alert("Registro exitoso. Ya puedes iniciar sesión.");
  window.location.href = "index.html";
}

function cerrarSesion() {
  alert("Sesión cerrada.");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");
  if (!header) return;
  const userLoggedIn = true;
  if (!userLoggedIn) window.location.href = "index.html";
});