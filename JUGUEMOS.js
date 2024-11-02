let correctOrder = ["imagen2", "imagen1", "imagen3"]; // Orden correcto de las imágenes
let currentOrder = [];
const resetButton = document.querySelector("button");

function iniciar() {
    const imagenes = document.querySelectorAll("#cajaimagenes img");
    const dropZones = [
        document.getElementById("cajasoltar"),
        document.getElementById("cajasoltar2"),
        document.getElementById("cajasoltar3")
    ];

    // Añade eventos de arrastrado a las imágenes
    imagenes.forEach(img => {
        img.addEventListener("dragstart", arrastrado, false);
    });

    // Añade eventos a las zonas de suelta
    dropZones.forEach((zone, index) => {
        zone.addEventListener("dragenter", e => e.preventDefault(), false);
        zone.addEventListener("dragover", e => e.preventDefault(), false);
        zone.addEventListener("drop", (e) => soltado(e, index), false);
    });
}

function arrastrado(e) {
    e.dataTransfer.setData("id", e.target.id);
}

function soltado(e, index) {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const imagen = document.getElementById(id);

    // Solo añade la imagen si el contenedor está vacío
    if (!e.target.querySelector("img")) {
        e.target.innerHTML = "";  // Limpia el mensaje de arrastrar aquí
        e.target.appendChild(imagen.cloneNode(true));  // Clona y añade la imagen
        imagen.style.visibility = "hidden";  // Oculta la imagen original en la caja de imágenes

        currentOrder[index] = id;  // Guarda el orden actual
        checkOrder();  // Verifica el orden después de cada inserción
    }
}

function checkOrder() {
    // Compara el orden actual con el orden correcto
    if (currentOrder.length === correctOrder.length &&
        currentOrder.every((id, idx) => id === correctOrder[idx])) {
        resetButton.textContent = "BIEN HECHO";
    } else {
        resetButton.textContent = "REINICIAR";
    }
}

function reinicio() {
    document.querySelectorAll(".caja").forEach(caja => {
        caja.innerHTML = '<p>Arrastre y suelte la imagen aquí</p>';
    });

    const imagenes = document.querySelectorAll("#cajaimagenes img");
    imagenes.forEach(img => {
        img.style.visibility = "visible";  // Vuelve a hacer visibles las imágenes originales
    });

    currentOrder = [];  // Resetea el orden actual
    resetButton.textContent = "REINICIAR";  // Cambia el texto del botón a "REINICIAR"
}

// Agrega el evento de reinicio al botón
resetButton.addEventListener("click", reinicio);
iniciar();
