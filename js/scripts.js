// === LOGIN, REGISTRO Y SESIÓN ===
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
  // === SESIÓN ===
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", cerrarSesion);

  // === MODAL Y FORMULARIOS ===
  const btnAgregar = document.getElementById("btnAgregar");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".modal .close");
  const btnSensor = document.getElementById("btnSensor");
  const btnManual = document.getElementById("btnManual");
  const formSensor = document.getElementById("formSensor");
  const formManual = document.getElementById("formManual");
  const deviceList = document.getElementById("deviceList");

  // Mostrar modal
  btnAgregar.addEventListener("click", () => {
    modal.style.display = "block";
    formSensor.classList.add("form-hidden");
    formManual.classList.add("form-hidden");
  });

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    formSensor.classList.add("form-hidden");
    formManual.classList.add("form-hidden");
  });

  // Cerrar modal al hacer click fuera
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      formSensor.classList.add("form-hidden");
      formManual.classList.add("form-hidden");
    }
  });

  // Mostrar formulario de sensor
  btnSensor.addEventListener("click", () => {
    formSensor.classList.remove("form-hidden");
    formManual.classList.add("form-hidden");
  });

  // Mostrar formulario manual
  btnManual.addEventListener("click", () => {
    formManual.classList.remove("form-hidden");
    formSensor.classList.add("form-hidden");
  });

  // === AGREGAR DISPOSITIVO CON SENSOR ===
  formSensor.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreSensor").value;
    const codigo = document.getElementById("codigoSensor").value;
    // Simulamos un consumo aleatorio para efectos demo
    const consumoAleatorio = (Math.random() * 5 + 1).toFixed(2);
    dispositivos.push({ nombre, tipo: "Sensor", consumo: parseFloat(consumoAleatorio) });
    renderizarDispositivos();
    actualizarGraficoDonut();
    modal.style.display = "none";
    formSensor.reset();
    formSensor.classList.add("form-hidden");
  });

  // === AGREGAR DISPOSITIVO MANUAL ===
  formManual.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreManual").value;
    const tipo = document.getElementById("tipoManual").value;
    const kwh = parseFloat(document.getElementById("kwHora").value);
    const horas = parseFloat(document.getElementById("horasUso").value);
    const consumoTotal = kwh * horas;
    dispositivos.push({ nombre, tipo, consumo: consumoTotal });
    renderizarDispositivos();
    actualizarGraficoDonut();
    modal.style.display = "none";
    formManual.reset();
    formManual.classList.add("form-hidden");
  });

  // Inicializar lista y gráfico
  renderizarDispositivos();
  actualizarGraficoDonut();
});

// === VARIABLES ===
let dispositivos = [];
let donutChart;

// === RENDERIZAR DISPOSITIVOS ===
function renderizarDispositivos() {
  const lista = document.getElementById("deviceList");
  if (!lista) return;
  lista.innerHTML = "";
  dispositivos.forEach((d) => {
    const item = document.createElement("li");
    item.innerHTML = `<i class="fas fa-plug"></i> ${d.nombre} (${d.tipo}) - ${d.consumo.toFixed(2)} kWh`;
    lista.appendChild(item);
  });
}

// === ACTUALIZAR GRÁFICO DONUT ===
function actualizarGraficoDonut() {
  const nombres = dispositivos.map(d => d.nombre);
  const consumos = dispositivos.map(d => d.consumo);

  if (donutChart) {
    donutChart.data.labels = nombres;
    donutChart.data.datasets[0].data = consumos;
    donutChart.update();
  } else {
    const ctx = document.getElementById("donutChart").getContext("2d");
    donutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: nombres,
        datasets: [{
          label: "Consumo por dispositivo",
          data: consumos,
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          }
        }
      }
    });
  }
}