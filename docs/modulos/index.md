# Módulos

Catorce sesiones de tres horas, organizadas en seis bloques. Cada bloque se apoya en el anterior.

---

## Bloque I · Fundamentos de la nube

<div class="grid cards" markdown>

-   **01 · Fundamentos de la computación en la nube**

    ---

    Qué es la nube, de dónde viene, las cinco características del NIST, modelos de despliegue, CapEx contra OpEx y qué significa realmente un SLA de 99.99 %.

    [:octicons-arrow-right-24: Abrir módulo](01-fundamentos-nube.md)

-   **02 · Modelos de servicio: IaaS, PaaS, SaaS y FaaS**

    ---

    Quién administra qué en cada modelo, cuándo conviene cada uno, precios, serverless, nube híbrida y el costo real de la dependencia del proveedor.

    [:octicons-arrow-right-24: Abrir módulo](02-modelos-servicio.md)

</div>

## Bloque II · Arquitectura y gobierno

<div class="grid cards" markdown>

-   **03 · Arquitectura empresarial con TOGAF para IA**

    ---

    El ciclo ADM aplicado a iniciativas de IA: cómo pasar de "queremos usar IA" a una arquitectura de negocio, datos, aplicación y tecnología con gobierno explícito.

    [:octicons-arrow-right-24: Abrir módulo](03-togaf-ia.md)

-   **04 · Arquitecturas cloud, seguridad y gobernanza**

    ---

    Responsabilidad compartida, patrones de arquitectura, Zero Trust, IAM, alta disponibilidad, las 6 R de migración e infraestructura específica para LLMs.

    [:octicons-arrow-right-24: Abrir módulo](04-arquitectura-seguridad.md)

</div>

## Bloque III · Datos

<div class="grid cards" markdown>

-   **05 · Big Data: almacenamiento y procesamiento**

    ---

    Las 5 V, arquitecturas Lambda y Kappa, Data Lake contra Warehouse contra Lakehouse, ETL frente a ELT, NoSQL, streaming y gobierno del dato.

    [:octicons-arrow-right-24: Abrir módulo](05-big-data.md)

-   **06 · Edge Computing, Fog e IoT**

    ---

    Por qué procesar en el borde, protocolos IoT, 5G, seguridad de dispositivos, arquitectura de extremo a extremo y TinyML.

    [:octicons-arrow-right-24: Abrir módulo](06-edge-iot.md)

</div>

## Bloque IV · Ingeniería de plataforma

<div class="grid cards" markdown>

-   **07 · Fundamentos de Git y control de versiones**

    ---

    El modelo de datos interno de Git, las tres áreas, ramas y fusiones, remotos, flujos de trabajo, resolución de conflictos y versionado de datos y modelos.

    [:octicons-arrow-right-24: Abrir módulo](07-git.md)

-   **08 · Docker y contenedores**

    ---

    De las máquinas virtuales a los contenedores, arquitectura de Docker, `Dockerfile` a fondo, redes, volúmenes, registros, Compose y empaquetado de modelos.

    [:octicons-arrow-right-24: Abrir módulo](08-docker.md)

-   **09 · Kubernetes y orquestación**

    ---

    Plano de control y nodos, Pods, Deployments, Services, ConfigMaps y Secrets, autoescalado, programación de GPU y operación de inferencia a escala.

    [:octicons-arrow-right-24: Abrir módulo](09-kubernetes.md)

-   **10 · DevOps, GitOps, MLOps y AIOps**

    ---

    Cultura CALMS, CI/CD, GitOps declarativo, el ciclo de vida de MLOps, deriva de modelos, feature stores y operación asistida por IA.

    [:octicons-arrow-right-24: Abrir módulo](10-devops-mlops.md)

</div>

## Bloque V · IA aplicada

<div class="grid cards" markdown>

-   **11 · Visión por computadora: fundamentos**

    ---

    Cómo ve una máquina, procesamiento digital de imágenes, convolución paso a paso, arquitecturas CNN, entrenamiento, transfer learning y detección de objetos.

    [:octicons-arrow-right-24: Abrir módulo](11-vision-fundamentos.md)

-   **12 · Visión por computadora: aplicaciones y convergencia**

    ---

    Casos en salud, transporte, retail y agricultura; métricas de evaluación, modelos fundacionales multimodales, visión generativa y ética.

    [:octicons-arrow-right-24: Abrir módulo](12-vision-aplicaciones.md)

</div>

## Bloque VI · Sistemas agénticos

<div class="grid cards" markdown>

-   **13 · Ingeniería de Harness para IA**

    ---

    Por qué un modelo excelente falla igual, qué es un harness, el repositorio como fuente de verdad, verificación independiente, estado persistente y observabilidad.

    [:octicons-arrow-right-24: Abrir módulo](13-harness-engineering.md)

-   **14 · Ingeniería de Grafos para IA**

    ---

    De un loop único a un grafo explícito: nodos, aristas, estado compartido y enrutamiento; grafo frente a workflow; cuándo vale la pena y cuándo no.

    [:octicons-arrow-right-24: Abrir módulo](14-graph-engineering.md)

</div>

---

!!! note "Sobre la reorganización del temario"
    Este temario consolida y amplía un programa original de 12 sesiones. Se eliminaron los solapamientos —una sesión genérica de "contenerización" que duplicaba los módulos de Docker y Kubernetes, y un subtema de Kubernetes dentro del módulo de arquitecturas— y se añadieron cuatro ejes: arquitectura empresarial con TOGAF, fundamentos de Git ampliados, ingeniería de harness e ingeniería de grafos. Ver la [ruta de aprendizaje](../ruta.md) para las dependencias resultantes.
