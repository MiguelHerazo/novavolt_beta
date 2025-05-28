document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo cargar navbar.html");
      }
      return res.text();
    })
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
      console.log("✅ Navbar cargado correctamente");

      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          alert("Sesión cerrada");
          window.location.href = "index.html";
        });
      } else {
        console.warn("⚠️ No se encontró el botón de cerrar sesión");
      }
    })
    .catch(error => {
      console.error("❌ Error al cargar navbar:", error);
    });
});
