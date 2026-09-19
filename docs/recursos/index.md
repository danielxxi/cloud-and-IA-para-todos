# Recursos

Material de apoyo transversal a todos los módulos.

<div class="grid cards" markdown>

-   :material-book-alphabet:{ .lg .middle } **Glosario**

    ---

    Todos los términos del curso, con definición breve y el módulo donde se tratan.

    [:octicons-arrow-right-24: Abrir glosario](glosario.md)

-   :material-clipboard-check:{ .lg .middle } **Evaluación y rúbricas**

    ---

    Cómo se califica cada práctica, el proyecto integrador y los cuestionarios.

    [:octicons-arrow-right-24: Ver rúbricas](evaluacion.md)

-   :material-file-document-multiple:{ .lg .middle } **Plantillas**

    ---

    Archivos listos para copiar: ADR, `Dockerfile`, manifiestos, `AGENTS.md`, contratos de datos.

    [:octicons-arrow-right-24: Copiar plantillas](plantillas.md)

-   :material-library:{ .lg .middle } **Bibliografía**

    ---

    Fuentes primarias citadas en cada módulo, organizadas por bloque.

    [:octicons-arrow-right-24: Ver fuentes](bibliografia.md)

</div>

---

## Herramientas por bloque

| Bloque | Imprescindible | Recomendado |
| --- | --- | --- |
| I · Nube | Navegador, calculadoras de precios | Cuenta gratuita en un proveedor |
| II · Arquitectura | Markdown, Mermaid | Un editor con vista previa de Mermaid |
| III · Datos | Python 3.11+, DuckDB, pandas | Mosquitto, Parquet tools |
| IV · Plataforma | Git 2.40+, Docker, kubectl, kind | DVC, pre-commit, Trivy, k9s |
| V · Visión | PyTorch o TensorFlow, OpenCV | ONNX Runtime, Grad-CAM |
| VI · Agentes | Un agente de codificación con CLI | Un motor de grafos |

## Instalación rápida

=== "macOS"

    ```bash
    brew install git docker kubectl kind duckdb mosquitto trivy
    brew install --cask docker
    python3 -m venv .venv && source .venv/bin/activate
    pip install duckdb pandas pyarrow paho-mqtt dvc pre-commit torch torchvision onnxruntime
    ```

=== "Linux (Debian/Ubuntu)"

    ```bash
    sudo apt update && sudo apt install -y git python3-venv mosquitto-clients
    # Docker: seguir la guía oficial de Docker Engine
    curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
    chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind
    python3 -m venv .venv && source .venv/bin/activate
    pip install duckdb pandas pyarrow paho-mqtt dvc pre-commit torch torchvision onnxruntime
    ```

=== "Windows"

    Usa **WSL2 con Ubuntu** y sigue las instrucciones de Linux. Docker Desktop con backend WSL2.

    Trabajar directamente en Windows para los bloques III–VI genera problemas de rutas, permisos y finales de línea que consumen tiempo de clase.

## Verificación del entorno

Ejecuta esto antes de la sesión del módulo 08:

```bash
git --version          # >= 2.40
docker --version       # >= 24
docker run hello-world # debe completar
kubectl version --client
kind --version
python3 --version      # >= 3.11
```

!!! tip "Para el docente"
    Envía esta verificación una semana antes de la sesión 08 y reserva los primeros diez minutos de esa clase para resolver entornos rotos. La brecha de entorno es la causa más común de que un laboratorio se desarme.

## Convenciones del material

| Elemento | Significado |
| --- | --- |
| :material-clock-outline: | Duración estimada |
| :material-stairs: | Nivel de dificultad |
| :material-link-variant: | Prerrequisitos |
| :material-star-outline: | Capítulo nuevo o ampliado respecto al temario original |
| Bloque "Agua fría" | La contraparte crítica; límites reales de la tecnología |
| Bloque "Caso" | Ejemplo aplicado con cifras y contexto |
