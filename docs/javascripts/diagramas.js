// Mermaid encoge los diagramas anchos hasta hacerlos ilegibles. Este script los
// deja a tamaño natural con scroll horizontal y añade un visor a pantalla completa.

(function () {
  "use strict";

  // Material renderiza cada diagrama dentro de un Shadow DOM CERRADO, invisible a
  // querySelector. Forzamos que se abra para poder leer el SVG y colocar el botón.
  // Debe ejecutarse antes de que Material renderice (al cargar el script).
  if (Element.prototype.attachShadow && !Element.prototype.__shadowAbierto) {
    var _attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (init) {
      if (init && init.mode === "closed") {
        init = Object.assign({}, init, { mode: "open" });
      }
      return _attachShadow.call(this, init);
    };
    Element.prototype.__shadowAbierto = true;
  }

  var MARGEN_LIENZO = 48;
  var ZOOM_MIN = 0.2;
  var ZOOM_MAX = 8;
  // Material renderiza los diagramas al entrar en el viewport, no al cargar.
  var INTERVALO_MS = 400;

  var overlay = null;
  var lienzo = null;
  var observador = null;
  var temporizador = null;
  var estado = { escala: 1, x: 0, y: 0, arrastrando: false, px: 0, py: 0 };

  // --- Visor a pantalla completa -------------------------------------------

  function construirOverlay() {
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "diagrama-visor";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Diagrama ampliado");
    overlay.hidden = true;

    overlay.innerHTML =
      '<div class="diagrama-visor__barra">' +
      '<button class="diagrama-visor__accion" data-accion="menos" aria-label="Alejar">&minus;</button>' +
      '<span class="diagrama-visor__nivel">100%</span>' +
      '<button class="diagrama-visor__accion" data-accion="mas" aria-label="Acercar">+</button>' +
      '<button class="diagrama-visor__accion" data-accion="ajustar" aria-label="Ajustar a la pantalla">Ajustar</button>' +
      '<button class="diagrama-visor__accion diagrama-visor__accion--cerrar" data-accion="cerrar" aria-label="Cerrar (Esc)">&#10005;</button>' +
      "</div>" +
      '<div class="diagrama-visor__area"><div class="diagrama-visor__lienzo"></div></div>' +
      '<p class="diagrama-visor__ayuda">Rueda para acercar · arrastra para mover · <kbd>Esc</kbd> para cerrar</p>';

    document.body.appendChild(overlay);
    lienzo = overlay.querySelector(".diagrama-visor__lienzo");

    var area = overlay.querySelector(".diagrama-visor__area");

    overlay.addEventListener("click", function (ev) {
      if (ev.target === overlay || ev.target === area) cerrar();
    });

    overlay.querySelector(".diagrama-visor__barra").addEventListener("click", function (ev) {
      var boton = ev.target.closest("[data-accion]");
      if (!boton) return;
      var accion = boton.getAttribute("data-accion");
      if (accion === "cerrar") cerrar();
      else if (accion === "mas") aplicarZoom(estado.escala * 1.25);
      else if (accion === "menos") aplicarZoom(estado.escala / 1.25);
      else if (accion === "ajustar") ajustarALaPantalla();
    });

    area.addEventListener(
      "wheel",
      function (ev) {
        ev.preventDefault();
        aplicarZoom(estado.escala * (ev.deltaY < 0 ? 1.12 : 1 / 1.12));
      },
      { passive: false }
    );

    area.addEventListener("pointerdown", function (ev) {
      estado.arrastrando = true;
      estado.px = ev.clientX;
      estado.py = ev.clientY;
      area.setPointerCapture(ev.pointerId);
      overlay.classList.add("is-arrastrando");
    });

    area.addEventListener("pointermove", function (ev) {
      if (!estado.arrastrando) return;
      estado.x += ev.clientX - estado.px;
      estado.y += ev.clientY - estado.py;
      estado.px = ev.clientX;
      estado.py = ev.clientY;
      pintar();
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach(function (evento) {
      area.addEventListener(evento, function () {
        estado.arrastrando = false;
        overlay.classList.remove("is-arrastrando");
      });
    });

    document.addEventListener("keydown", function (ev) {
      if (!overlay || overlay.hidden) return;
      if (ev.key === "Escape") cerrar();
      else if (ev.key === "+" || ev.key === "=") aplicarZoom(estado.escala * 1.25);
      else if (ev.key === "-") aplicarZoom(estado.escala / 1.25);
      else if (ev.key === "0") ajustarALaPantalla();
    });

    return overlay;
  }

  function pintar() {
    lienzo.style.transform =
      "translate(" + estado.x + "px," + estado.y + "px) scale(" + estado.escala + ")";
    overlay.querySelector(".diagrama-visor__nivel").textContent =
      Math.round(estado.escala * 100) + "%";
  }

  function aplicarZoom(valor) {
    estado.escala = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, valor));
    pintar();
  }

  function ajustarALaPantalla() {
    var svg = lienzo.querySelector("svg");
    if (!svg) return;
    var caja = medirSvg(svg);
    var area = overlay.querySelector(".diagrama-visor__area");
    var escalaX = (area.clientWidth - MARGEN_LIENZO) / caja.ancho;
    var escalaY = (area.clientHeight - MARGEN_LIENZO) / caja.alto;
    estado.escala = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.min(escalaX, escalaY)));
    estado.x = 0;
    estado.y = 0;
    pintar();
  }

  function abrir(svgOrigen) {
    construirOverlay();
    if (!svgOrigen) return;

    var caja = medirSvg(svgOrigen);
    var copia = svgOrigen.cloneNode(true);
    copia.removeAttribute("style");
    copia.removeAttribute("width");
    copia.removeAttribute("height");
    copia.style.width = caja.ancho + "px";
    copia.style.height = caja.alto + "px";

    lienzo.innerHTML = "";
    lienzo.appendChild(copia);

    overlay.hidden = false;
    document.body.classList.add("diagrama-visor-abierto");
    ajustarALaPantalla();
    overlay.querySelector('[data-accion="cerrar"]').focus();
  }

  function cerrar() {
    if (!overlay) return;
    overlay.hidden = true;
    lienzo.innerHTML = "";
    document.body.classList.remove("diagrama-visor-abierto");
  }

  // --- Preparación de cada diagrama ----------------------------------------

  function medirSvg(svg) {
    var vb = svg.viewBox && svg.viewBox.baseVal;
    if (vb && vb.width) return { ancho: vb.width, alto: vb.height };
    var caja = svg.getBoundingClientRect();
    return { ancho: caja.width || 800, alto: caja.height || 600 };
  }

  // El SVG puede estar en el shadow root (render de Material) o en luz directa.
  function svgDe(host) {
    if (host.shadowRoot) {
      var s = host.shadowRoot.querySelector("svg");
      if (s) return s;
    }
    return host.querySelector("svg");
  }

  function botonAmpliar(host) {
    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "diagrama-marco__zoom";
    boton.setAttribute("aria-label", "Ampliar diagrama");
    boton.innerHTML =
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14m.5-7h-1v2H7v1h2v2h1v-2h2V9h-2z"/>' +
      "</svg> Ampliar";
    boton.addEventListener("click", function () {
      abrir(svgDe(host));
    });
    return boton;
  }

  function preparar(contenedor) {
    if (!contenedor || contenedor.getAttribute("data-diagrama-listo")) return;
    var svg = svgDe(contenedor);
    if (!svg) return;

    contenedor.setAttribute("data-diagrama-listo", "1");

    var marco = document.createElement("div");
    marco.className = "diagrama-marco";
    contenedor.parentNode.insertBefore(marco, contenedor);
    marco.appendChild(contenedor);

    marco.appendChild(botonAmpliar(contenedor));
  }

  // Refuerzo del CSS: si alguna versión de Mermaid gana la especificidad con sus
  // estilos internos, esto fija la tinta sobre el nodo ya renderizado. El lienzo
  // de los diagramas es claro en ambos esquemas, así que siempre va oscura.
  var TINTA = "#6b3a1f";

  function pintarSvg(svg) {
    if (!svg || svg.getAttribute("data-tinta") === "1") return;
    var etiquetas = svg.querySelectorAll("text, tspan");
    var cajas = svg.querySelectorAll("foreignObject *");
    if (!etiquetas.length && !cajas.length) return;
    etiquetas.forEach(function (nodo) {
      nodo.style.setProperty("fill", TINTA, "important");
    });
    cajas.forEach(function (nodo) {
      nodo.style.setProperty("color", TINTA, "important");
    });
    svg.setAttribute("data-tinta", "1");
  }

  function pintarTextos() {
    document.querySelectorAll(".md-typeset svg").forEach(pintarSvg);
    document.querySelectorAll(".mermaid").forEach(function (host) {
      if (host.shadowRoot) host.shadowRoot.querySelectorAll("svg").forEach(pintarSvg);
    });
  }

  // Un SVG suelto (sin la clase .mermaid) también cuenta como gráfico.
  function esGrafico(svg) {
    if (svg.closest(".diagrama-marco") || svg.closest(".diagrama-visor")) return false;
    if (svg.closest("a") || svg.closest("button") || svg.closest(".md-icon")) return false;
    return svg.querySelector("text, foreignObject") !== null;
  }

  function escanear() {
    // Diagramas de Mermaid: el SVG vive en el shadow root del contenedor .mermaid.
    document.querySelectorAll(".md-typeset .mermaid").forEach(function (host) {
      if (host.closest(".diagrama-marco")) return;
      if (svgDe(host)) preparar(host);
    });
    // Cualquier otro SVG-diagrama que no pase por Mermaid.
    document.querySelectorAll(".md-typeset svg").forEach(function (svg) {
      if (svg.closest(".mermaid")) return;
      if (esGrafico(svg)) preparar(svg.parentNode);
    });
    pintarTextos();
  }

  function vigilar() {
    if (observador) observador.disconnect();
    var pendiente = false;
    // Material inserta el SVG al renderizar: reaccionamos a cualquier cambio.
    observador = new MutationObserver(function () {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () {
        pendiente = false;
        escanear();
      });
    });
    observador.observe(document.body, { childList: true, subtree: true });
  }

  function inicializar() {
    cerrar();
    vigilar();
    escanear();

    // Ráfaga inicial: Mermaid renderiza de forma asíncrona, así que reintentamos
    // durante los primeros segundos para enganchar el botón en cuanto aparezca.
    var intentos = 0;
    (function rafagaInicial() {
      escanear();
      if (++intentos < 30) setTimeout(rafagaInicial, 200);
    })();

    // Red de seguridad: los diagramas fuera de pantalla se renderizan al bajar.
    if (temporizador) clearInterval(temporizador);
    temporizador = setInterval(escanear, INTERVALO_MS);

    window.addEventListener("scroll", escanear, { passive: true });
    window.addEventListener("resize", escanear, { passive: true });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(inicializar);
  } else {
    document.addEventListener("DOMContentLoaded", inicializar);
  }
})();
