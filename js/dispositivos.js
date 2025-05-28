const form = document.getElementById("device-form");
const lista = document.getElementById("device-list");
const ctx = document.getElementById("donutChart").getContext("2d");

const nombreInput = document.getElementById("device-name");
const tipoInput = document.getElementById("device-type");
const consumoInput = document.getElementById("device-consumption");
const tiempoInput = document.getElementById("device-time");

let dispositivos = JSON.parse(localStorage.getItem("dispositivos")) || [];

function guardarDispositivos() {
  localStorage.setItem("dispositivos", JSON.stringify(dispositivos));
}

function calcularConsumos() {
  return dispositivos.map(d => ({
    nombre: d.nombre,
    consumo: d.consumo * d.horas
  }));
}

function actualizarLista() {
  lista.innerHTML = "";
  dispositivos.forEach((d, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${d.nombre} (${d.tipo}) - ${d.consumo} kWh x ${d.horas} h/día`;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.classList.add("btn-eliminar");
    btn.addEventListener("click", () => {
      eliminarDispositivo(index);
    });

    li.appendChild(span);
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function eliminarDispositivo(index) {
  dispositivos.splice(index, 1);
  guardarDispositivos();
  actualizarLista();
  actualizarGrafico();
}

function actualizarGrafico() {
  const data = calcularConsumos();
  const labels = data.map(d => d.nombre);
  const valores = data.map(d => d.consumo);

  donutChart.data.labels = labels;
  donutChart.data.datasets[0].data = valores;
  donutChart.update();
}

// Inicializar gráfico
const donutChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [{
      label: "Consumo por dispositivo",
      data: [],
      backgroundColor: [
        "#007acc", "#00bcd4", "#4caf50", "#ff9800", "#e91e63", "#9c27b0"
      ]
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value;
  const tipo = tipoInput.value;
  const consumo = parseFloat(consumoInput.value);
  const horas = parseFloat(tiempoInput.value);

  if (isNaN(consumo) || isNaN(horas)) {
    alert("Por favor ingresa valores numéricos válidos.");
    return;
  }

  dispositivos.push({ nombre, tipo, consumo, horas });

  guardarDispositivos();
  actualizarLista();
  actualizarGrafico();

  form.reset();
});

// Cargar al inicio
actualizarLista();
actualizarGrafico();
