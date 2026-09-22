// Configuración de MathJax para arithmatex (modo generic) + navegación instantánea.
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

// Material recarga el contenido sin recargar la página: re-tipografiamos cada vez.
if (typeof document$ !== "undefined") {
  document$.subscribe(function () {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetClear && MathJax.typesetClear();
      MathJax.texReset && MathJax.texReset();
      MathJax.typesetPromise();
    }
  });
}
