# P05 · Contenerizar un modelo de IA

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulo 08</span>
<span>:material-clock-outline: 120 minutos</span>
<span>:material-tools: Docker, Trivy</span>
</div>

## Objetivo

Empaquetar el servicio de inferencia de AgroVisión en una imagen de producción: pequeña, segura, reproducible y con apagado ordenado. Medir cada optimización.

## Desarrollo

### 1. Establece la línea base

Escribe `Dockerfile.v0` de la forma más ingenua posible:

```dockerfile
FROM python:3.12
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD python -m src.servicio.main
```

Construye y **mide**:

```bash
docker build -f Dockerfile.v0 -t agrovision:v0 .
docker images agrovision:v0
time docker build -f Dockerfile.v0 -t agrovision:v0 .   # con caché fría
```

### 2. Diagnostica

Antes de mejorar nada, escribe los problemas que ves. Debe haber al menos cinco. Compáralos después con la sección 5 del módulo 08.

### 3. Optimiza en pasos medibles

Aplica **una mejora a la vez** y mide después de cada una:

| Versión | Cambio | Tamaño | Reconstrucción tras cambio de código | CVE críticos+altos |
| --- | --- | --- | --- | --- |
| v0 | Línea base | | | |
| v1 | Base `-slim` específica | | | |
| v2 | `.dockerignore` | | | |
| v3 | Reordenar: dependencias antes que código | | | |
| v4 | Construcción multietapa | | | |
| v5 | Usuario no root | | | |
| v6 | Forma exec + `HEALTHCHECK` | | | |

```bash
trivy image --severity CRITICAL,HIGH agrovision:vN
```

### 4. El modelo fuera de la imagen

Saca el modelo de la imagen y móntalo como volumen. Justifica en dos líneas por qué, con números: ¿cuánto pesa la imagen con y sin él? ¿cuánto tarda el `push`?

```bash
docker run -v "$PWD/modelos:/modelos:ro" \
  -e MODELO_RUTA=/modelos/clasificador.onnx agrovision:v6
```

### 5. Sondas separadas

Implementa dos endpoints distintos:

| Endpoint | Responde | Cuándo devuelve error |
| --- | --- | --- |
| `/salud` | El proceso está vivo | Solo si el proceso está colgado |
| `/listo` | Puede atender peticiones | Mientras el modelo no esté cargado |

Simula una carga de modelo de 40 segundos y verifica que el contenedor no entra en bucle de reinicio.

### 6. Apagado ordenado

Implementa la captura de `SIGTERM`: dejar de aceptar peticiones nuevas, terminar las en curso, cerrar conexiones, salir.

```bash
docker run -d --name t agrovision:v6
time docker stop t
```

**Debe tardar menos de 3 segundos.** Si tarda 10, tu proceso no está recibiendo la señal: revisa la forma de `CMD`.

### 7. Verificación de seguridad

```bash
docker run --rm agrovision:v6 id                    # no debe ser root
docker run --rm agrovision:v6 sh -c 'touch /prueba' # debe fallar si el FS es de solo lectura
docker history agrovision:v6                        # ninguna capa debe contener secretos
docker scout cves agrovision:v6
```

### 8. Stack completo con Compose

Levanta el sistema entero: servicio de inferencia, base de datos, broker MQTT y el nodo de borde de P03. Con sondas de salud y dependencias ordenadas.

Verifica que el servicio alcanza la base de datos **por nombre de servicio**, no por IP.

## Entregable

1. La tabla completa de las siete versiones con métricas reales.
2. `Dockerfile` final, `.dockerignore` y `compose.yaml`.
3. Salida de `docker history` del `Dockerfile` final, con la capa más pesada identificada y comentada.
4. Comparación de CVE entre `python:3.12` y `python:3.12-slim`.
5. Evidencia de: usuario no root, apagado en menos de 3 segundos, sondas funcionando durante la carga de 40 s.
6. Un párrafo: **¿cuál fue la optimización con mayor retorno y por qué?**

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | `docker compose up` levanta el stack completo desde cero |
| Justificación (30 %) | Cada optimización tiene una razón, no es una receta copiada |
| Medición (20 %) | La tabla de siete versiones está completa con números reales |
| Documentación (10 %) | El `Dockerfile` es legible y sus decisiones son evidentes |

!!! tip "Lo que la tabla suele revelar"
    La reducción de tamaño más grande viene de la multietapa. Pero la mejora que más notarás en tu día a día es la de reordenar las capas: pasar de 90 segundos a 7 segundos por reconstrucción, veinte veces al día, cambia la experiencia de desarrollo por completo.
