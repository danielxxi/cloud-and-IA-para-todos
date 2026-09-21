---
tags:
  - Bloque IV
  - Plataforma
  - Contenedores
---

# Módulo 08 · Docker y contenedores

<div class="modulo-meta" markdown>
<span>:material-clock-outline: 3 horas</span>
<span>:material-stairs: Nivel intermedio</span>
<span>:material-link-variant: Requiere módulo 07</span>
</div>

"En mi máquina funciona" es la frase más cara de la ingeniería de software. Detrás de ella hay una versión distinta de Python, una biblioteca del sistema que faltaba, una variable de entorno que solo existía en un portátil y una versión de CUDA que no coincidía.

Los contenedores eliminan esa clase entera de problemas empaquetando **la aplicación junto con todo su entorno de ejecución** en una unidad que corre igual en cualquier parte.

---

## 1. El problema y su solución

### De la máquina virtual al contenedor

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Inter, sans-serif","darkMode":false,"background":"#f3f1ec","mainBkg":"#fbfaf7","primaryColor":"#fbfaf7","primaryTextColor":"#1c1b19","primaryBorderColor":"#b9b1a1","secondaryColor":"#ead9ba","secondaryTextColor":"#1c1b19","secondaryBorderColor":"#b9b1a1","tertiaryColor":"#c2d4cb","tertiaryTextColor":"#1c1b19","tertiaryBorderColor":"#b9b1a1","lineColor":"#8d8676","textColor":"#1c1b19","nodeTextColor":"#1c1b19","nodeBorder":"#b9b1a1","labelTextColor":"#1c1b19","titleColor":"#1c1b19","edgeLabelBackground":"#f3f1ec","clusterBkg":"#efece4","clusterBorder":"#d8d2c6","cScale0":"#e2a98c","cScaleLabel0":"#1c1b19","cScale1":"#bdb6e6","cScaleLabel1":"#1c1b19","cScale2":"#e8d9b6","cScaleLabel2":"#1c1b19","cScale3":"#b5d0c3","cScaleLabel3":"#1c1b19","cScale4":"#e6cfc0","cScaleLabel4":"#1c1b19","cScale5":"#cddcea","cScaleLabel5":"#1c1b19"}}}%%
flowchart TB
    subgraph VM["Máquinas virtuales"]
        VH["Hardware"] --> VHY["Hipervisor"]
        VHY --> V1["SO invitado<br/>+ bibliotecas<br/>+ app A"]
        VHY --> V2["SO invitado<br/>+ bibliotecas<br/>+ app B"]
    end
    subgraph CT["Contenedores"]
        CH["Hardware"] --> CO["Sistema operativo anfitrión"]
        CO --> CR["Runtime de contenedores"]
        CR --> C1["Bibliotecas + app A"]
        CR --> C2["Bibliotecas + app B"]
    end
    classDef default fill:#fbfaf7,stroke:#b9b1a1,stroke-width:1px,color:#1c1b19;
```

| Aspecto | Máquina virtual | Contenedor |
| --- | --- | --- |
| Aísla | Hardware completo | Procesos |
| Incluye | Sistema operativo entero | Solo bibliotecas y binarios necesarios |
| Tamaño | Gigabytes | Megabytes |
| Arranque | Decenas de segundos a minutos | Milisegundos a segundos |
| Densidad por servidor | Decenas | Cientos |
| Aislamiento | Fuerte (hipervisor) | Menor (núcleo compartido) |
| Sobrecarga | 5–15 % | Prácticamente nula |

!!! warning "El núcleo es compartido"
    Esta es la diferencia de seguridad que más importa. Todos los contenedores de un anfitrión comparten el mismo núcleo. Una vulnerabilidad de escape del núcleo afecta a todos.

    Por eso en entornos multi-tenant se usan capas adicionales —máquinas virtuales ligeras como Firecracker o runtimes con sandbox como gVisor— o se combinan contenedores con máquinas virtuales.

    Consecuencia práctica inmediata: **no puedes correr un contenedor Windows sobre un núcleo Linux**, ni al revés.

### Qué es realmente un contenedor

No es magia ni virtualización. Es un proceso normal del sistema operativo con tres mecanismos del núcleo Linux aplicados:

| Mecanismo | Qué hace |
| --- | --- |
| **Namespaces** | El proceso ve su propio conjunto de PIDs, red, puntos de montaje, usuarios y hostname |
| **cgroups** | Limita cuánta CPU, memoria, E/S y dispositivos puede consumir |
| **Sistema de archivos en capas** | Monta una vista unificada de capas de solo lectura más una capa escribible |

Todo lo demás —Docker, containerd, Podman— es herramienta alrededor de esos tres mecanismos.

---

## 2. Historia y ecosistema

| Año | Hito |
| --- | --- |
| 1979 | `chroot` en Unix V7: primer aislamiento de sistema de archivos |
| 2000 | FreeBSD Jails |
| 2006 | cgroups en el núcleo Linux (desarrollado en Google) |
| 2008 | LXC combina namespaces y cgroups |
| **2013** | **Docker** hace todo lo anterior usable, con imágenes y un registro público |
| 2015 | Open Container Initiative: estandarización de formatos |
| 2016 | containerd y CRI-O: runtimes desacoplados de Docker |
| 2019 | Podman: contenedores sin demonio y sin root |
| 2020s | Contenedores como unidad estándar de despliegue, incluida la IA |

**La contribución real de Docker** no fue la tecnología de aislamiento, que ya existía. Fue el **formato de imagen con capas y un registro para compartirlas**. Convirtió "aislar un proceso" en "distribuir software reproducible".

### Estándares OCI

Hoy los formatos están estandarizados por la Open Container Initiative:

- **Image Spec:** cómo se estructura una imagen.
- **Runtime Spec:** cómo se ejecuta un contenedor.
- **Distribution Spec:** cómo se distribuyen las imágenes por un registro.

Esto significa que una imagen construida con Docker corre en containerd, Podman o CRI-O sin cambios. **La portabilidad es real y está estandarizada.**

---

## 3. Arquitectura de Docker

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Inter, sans-serif","darkMode":false,"background":"#f3f1ec","mainBkg":"#fbfaf7","primaryColor":"#fbfaf7","primaryTextColor":"#1c1b19","primaryBorderColor":"#b9b1a1","secondaryColor":"#ead9ba","secondaryTextColor":"#1c1b19","secondaryBorderColor":"#b9b1a1","tertiaryColor":"#c2d4cb","tertiaryTextColor":"#1c1b19","tertiaryBorderColor":"#b9b1a1","lineColor":"#8d8676","textColor":"#1c1b19","nodeTextColor":"#1c1b19","nodeBorder":"#b9b1a1","labelTextColor":"#1c1b19","titleColor":"#1c1b19","edgeLabelBackground":"#f3f1ec","clusterBkg":"#efece4","clusterBorder":"#d8d2c6","cScale0":"#e2a98c","cScaleLabel0":"#1c1b19","cScale1":"#bdb6e6","cScaleLabel1":"#1c1b19","cScale2":"#e8d9b6","cScaleLabel2":"#1c1b19","cScale3":"#b5d0c3","cScaleLabel3":"#1c1b19","cScale4":"#e6cfc0","cScaleLabel4":"#1c1b19","cScale5":"#cddcea","cScaleLabel5":"#1c1b19"}}}%%
flowchart LR
    CLI["Cliente<br/>docker CLI"] -->|API REST| D["Demonio<br/>dockerd"]
    D --> CD["containerd"]
    CD --> RC["runc"]
    RC --> C1["Contenedor"]
    D --> IMG[("Imágenes<br/>locales")]
    D --> NET["Redes"]
    D --> VOL["Volúmenes"]
    D <-->|pull / push| REG[("Registro<br/>Docker Hub · ECR · GCR")]
    classDef default fill:#fbfaf7,stroke:#b9b1a1,stroke-width:1px,color:#1c1b19;
```

| Componente | Responsabilidad |
| --- | --- |
| **Cliente** | Traduce comandos a llamadas de API |
| **Demonio (`dockerd`)** | Gestiona imágenes, redes, volúmenes y el ciclo de vida |
| **containerd** | Runtime de alto nivel; gestiona imágenes y supervisa contenedores |
| **runc** | Runtime de bajo nivel; crea el contenedor usando namespaces y cgroups |
| **Registro** | Almacena y distribuye imágenes |

!!! note "Sin demonio y sin root"
    El demonio de Docker corre como root, lo que ha sido una crítica persistente de seguridad. **Podman** ofrece una alternativa compatible en comandos, sin demonio y con soporte nativo para contenedores sin privilegios de root.

    ```bash
    alias docker=podman   # la mayoría de los comandos son idénticos
    ```

---

## 4. Imágenes y contenedores

### La relación

| Concepto | Analogía | Estado |
| --- | --- | --- |
| **Imagen** | Clase / plantilla | Inmutable, de solo lectura |
| **Contenedor** | Instancia / objeto | Efímero, con una capa escribible |

De una imagen se pueden crear cien contenedores. Cada uno añade su propia capa escribible sobre las capas compartidas de solo lectura.

### El sistema de capas

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Inter, sans-serif","darkMode":false,"background":"#f3f1ec","mainBkg":"#fbfaf7","primaryColor":"#fbfaf7","primaryTextColor":"#1c1b19","primaryBorderColor":"#b9b1a1","secondaryColor":"#ead9ba","secondaryTextColor":"#1c1b19","secondaryBorderColor":"#b9b1a1","tertiaryColor":"#c2d4cb","tertiaryTextColor":"#1c1b19","tertiaryBorderColor":"#b9b1a1","lineColor":"#8d8676","textColor":"#1c1b19","nodeTextColor":"#1c1b19","nodeBorder":"#b9b1a1","labelTextColor":"#1c1b19","titleColor":"#1c1b19","edgeLabelBackground":"#f3f1ec","clusterBkg":"#efece4","clusterBorder":"#d8d2c6","cScale0":"#e2a98c","cScaleLabel0":"#1c1b19","cScale1":"#bdb6e6","cScaleLabel1":"#1c1b19","cScale2":"#e8d9b6","cScaleLabel2":"#1c1b19","cScale3":"#b5d0c3","cScaleLabel3":"#1c1b19","cScale4":"#e6cfc0","cScaleLabel4":"#1c1b19","cScale5":"#cddcea","cScaleLabel5":"#1c1b19"}}}%%
flowchart TB
    L0["Capa base — debian:12-slim (74 MB)"]
    L1["+ dependencias del sistema (18 MB)"]
    L2["+ dependencias de Python (240 MB)"]
    L3["+ código de la aplicación (2 MB)"]
    RW["Capa escribible del contenedor (efímera)"]
    L0 --> L1 --> L2 --> L3 --> RW
    classDef default fill:#fbfaf7,stroke:#b9b1a1,stroke-width:1px,color:#1c1b19;
```

Las capas son **compartidas y cacheadas**:

- Diez imágenes basadas en la misma base comparten esa capa una sola vez en disco.
- Al reconstruir, Docker reutiliza las capas cuyo contenido no cambió.
- Al hacer `push`, solo se transmiten las capas que el registro no tiene.

**Consecuencia de diseño:** ordena el `Dockerfile` de lo que menos cambia a lo que más cambia. Si copias el código antes de instalar dependencias, cada cambio de una línea invalida la caché e instala todo de nuevo.

---

## 5. El Dockerfile a fondo

### Instrucciones

| Instrucción | Función | Crea capa |
| --- | --- | --- |
| `FROM` | Imagen base | Sí |
| `RUN` | Ejecuta un comando durante la construcción | Sí |
| `COPY` | Copia archivos del contexto a la imagen | Sí |
| `ADD` | Como `COPY`, más descarga y descompresión | Sí |
| `WORKDIR` | Directorio de trabajo | Metadato |
| `ENV` | Variable de entorno persistente | Metadato |
| `ARG` | Variable solo durante la construcción | Metadato |
| `EXPOSE` | Documenta el puerto | Metadato |
| `USER` | Usuario de ejecución | Metadato |
| `VOLUME` | Punto de montaje | Metadato |
| `HEALTHCHECK` | Comando de verificación de salud | Metadato |
| `ENTRYPOINT` | Ejecutable principal | Metadato |
| `CMD` | Argumentos por defecto | Metadato |

### `ENTRYPOINT` y `CMD`

```dockerfile
ENTRYPOINT ["python", "servidor.py"]
CMD ["--puerto", "8000"]
```

- `docker run mi-imagen` → `python servidor.py --puerto 8000`
- `docker run mi-imagen --puerto 9000` → `python servidor.py --puerto 9000`

`ENTRYPOINT` define **qué** se ejecuta; `CMD` define los argumentos **por defecto**, que el usuario puede sustituir.

!!! warning "Usa siempre la forma de lista"
    `CMD python app.py` (forma shell) lanza el proceso bajo `/bin/sh -c`, que **no propaga las señales** al proceso hijo. El contenedor ignora `SIGTERM` y el orquestador acaba matándolo con `SIGKILL` tras el periodo de gracia, cortando peticiones en curso.

    `CMD ["python", "app.py"]` (forma exec) hace del proceso el PID 1 y recibe las señales correctamente.

### Construcción multietapa

La técnica que más reduce el tamaño de imagen: construir en una etapa con todas las herramientas y copiar solo el resultado a una etapa final mínima.

```dockerfile
# syntax=docker/dockerfile:1

# ---------- Etapa de construcción ----------
FROM python:3.12-slim AS constructor

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/instalacion -r requirements.txt

# ---------- Etapa final ----------
FROM python:3.12-slim

RUN groupadd --gid 10001 app \
    && useradd --uid 10001 --gid app --no-create-home app

COPY --from=constructor /instalacion /usr/local

WORKDIR /app
COPY --chown=app:app src/ ./src/

USER app
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD python -c "import urllib.request,sys; \
      sys.exit(0 if urllib.request.urlopen('http://localhost:8000/salud').status==200 else 1)"

ENTRYPOINT ["python", "-m", "src.servidor"]
CMD ["--puerto", "8000"]
```

Los compiladores y herramientas de construcción **no llegan** a la imagen final. Reducción típica: de 1.2 GB a 180 MB.

### `.dockerignore`

```dockerignore
.git
.venv
__pycache__
*.pyc
tests/
data/
*.ckpt
.env
README.md
```

Sin esto, el contexto de construcción puede incluir gigabytes de datos y el historial completo de Git, ralentizando cada construcción y —peor— arriesgando que un secreto acabe dentro de la imagen.

### Las diez reglas de un buen Dockerfile

1. **Imagen base específica y mínima.** `python:3.12.4-slim`, nunca `latest`.
2. **Ordena de menos a más cambiante.** Dependencias antes que código.
3. **Multietapa siempre** que haya compilación.
4. **Un `RUN` para instalar y limpiar** en la misma capa; borrar en una capa posterior no reduce el tamaño.
5. **Usuario no root.** Casi ninguna aplicación necesita root.
6. **Sin secretos.** Ni en `ENV`, ni en `ARG`, ni en capas. Usa montajes de secretos en construcción.
7. **Forma exec** en `ENTRYPOINT` y `CMD`.
8. **`HEALTHCHECK`** para que el orquestador sepa cuándo está realmente listo.
9. **`.dockerignore`** completo.
10. **Escanea vulnerabilidades** antes de publicar.

```bash
docker scout cves mi-imagen:1.0
# o
trivy image mi-imagen:1.0
```

---

## 6. Comandos esenciales

```bash
# Imágenes
docker build -t mi-app:1.0 .
docker images
docker history mi-app:1.0          # ver las capas y su tamaño
docker tag mi-app:1.0 registro.ejemplo.com/mi-app:1.0
docker push registro.ejemplo.com/mi-app:1.0
docker pull nginx:1.27-alpine
docker rmi mi-app:1.0

# Contenedores
docker run -d --name api -p 8000:8000 mi-app:1.0
docker ps                          # en ejecución
docker ps -a                       # todos
docker logs -f api                 # seguir registros
docker exec -it api /bin/sh        # abrir shell dentro
docker stop api && docker rm api
docker stats                       # consumo en vivo

# Diagnóstico
docker inspect api                 # configuración completa en JSON
docker top api                     # procesos dentro del contenedor
docker diff api                    # cambios respecto a la imagen

# Limpieza
docker system df                   # cuánto espacio ocupa todo
docker system prune -a --volumes   # ¡cuidado! borra todo lo no usado
```

### Ciclo de vida

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Inter, sans-serif","darkMode":false,"background":"#f3f1ec","mainBkg":"#fbfaf7","primaryColor":"#fbfaf7","primaryTextColor":"#1c1b19","primaryBorderColor":"#b9b1a1","secondaryColor":"#ead9ba","secondaryTextColor":"#1c1b19","secondaryBorderColor":"#b9b1a1","tertiaryColor":"#c2d4cb","tertiaryTextColor":"#1c1b19","tertiaryBorderColor":"#b9b1a1","lineColor":"#8d8676","textColor":"#1c1b19","nodeTextColor":"#1c1b19","nodeBorder":"#b9b1a1","labelTextColor":"#1c1b19","titleColor":"#1c1b19","edgeLabelBackground":"#f3f1ec","clusterBkg":"#efece4","clusterBorder":"#d8d2c6","cScale0":"#e2a98c","cScaleLabel0":"#1c1b19","cScale1":"#bdb6e6","cScaleLabel1":"#1c1b19","cScale2":"#e8d9b6","cScaleLabel2":"#1c1b19","cScale3":"#b5d0c3","cScaleLabel3":"#1c1b19","cScale4":"#e6cfc0","cScaleLabel4":"#1c1b19","cScale5":"#cddcea","cScaleLabel5":"#1c1b19"}}}%%
stateDiagram-v2
    [*] --> Creado: docker create
    Creado --> Ejecutando: docker start
    [*] --> Ejecutando: docker run
    Ejecutando --> Pausado: docker pause
    Pausado --> Ejecutando: docker unpause
    Ejecutando --> Detenido: docker stop (SIGTERM)
    Ejecutando --> Detenido: docker kill (SIGKILL)
    Detenido --> Ejecutando: docker start
    Detenido --> [*]: docker rm
```

!!! tip "`docker stop` envía `SIGTERM`, espera 10 s y luego `SIGKILL`"
    Tu aplicación debería capturar `SIGTERM` y cerrar ordenadamente: dejar de aceptar peticiones nuevas, terminar las en curso, cerrar conexiones. Esto es lo que hace posible un despliegue sin cortes en Kubernetes ([módulo 09](09-kubernetes.md)).

---

## 7. Redes

| Tipo | Comportamiento | Uso |
| --- | --- | --- |
| **bridge** | Red virtual privada; por defecto | Contenedores en un mismo anfitrión |
| **host** | Comparte la pila de red del anfitrión | Máximo rendimiento, sin aislamiento |
| **none** | Sin red | Procesamiento aislado |
| **overlay** | Red entre varios anfitriones | Clústeres |
| **macvlan** | El contenedor obtiene una MAC propia en la red física | Integración con redes existentes |

### Descubrimiento por nombre

```bash
docker network create red-app

docker run -d --name basedatos --network red-app postgres:16
docker run -d --name api --network red-app mi-app:1.0
```

Dentro de `api`, el nombre `basedatos` resuelve automáticamente a la IP del otro contenedor. **No hardcodees direcciones IP**: usa nombres de servicio. Es el mismo principio que aplica Kubernetes.

### Publicación de puertos

```bash
docker run -p 8000:8000 mi-app       # accesible desde cualquier interfaz
docker run -p 127.0.0.1:8000:8000 mi-app   # solo desde el propio anfitrión
```

La segunda forma es la correcta para servicios que no deben quedar expuestos a la red.

---

## 8. Volúmenes y persistencia

**La capa escribible de un contenedor muere con él.** Todo lo que deba sobrevivir necesita un volumen.

| Tipo | Gestión | Uso |
| --- | --- | --- |
| **Volumen nombrado** | Docker | Datos de producción; portable y respaldable |
| **Montaje de enlace (*bind mount*)** | El anfitrión | Desarrollo: el código del anfitrión dentro del contenedor |
| **tmpfs** | Memoria | Datos sensibles temporales, nunca en disco |

```bash
# Volumen nombrado
docker volume create datos-pg
docker run -d -v datos-pg:/var/lib/postgresql/data postgres:16

# Bind mount para desarrollo
docker run -v "$PWD/src:/app/src:ro" mi-app:dev

# tmpfs
docker run --tmpfs /tmp:rw,size=64m mi-app
```

!!! tip "Modelos de IA y volúmenes"
    Un modelo de varios gigabytes **no debería ir dentro de la imagen**: hace la construcción lenta, el `push` pesado y el arranque de cada réplica costoso.

    Patrón habitual: la imagen contiene el código; el modelo se monta desde un volumen, se descarga en un contenedor de inicialización, o se lee de almacenamiento compartido. En Kubernetes, `initContainer` + `PersistentVolume` es la combinación estándar.

---

## 9. Docker Compose

Compose define aplicaciones de varios contenedores en un archivo declarativo.

```yaml
# compose.yaml
services:
  api:
    build:
      context: .
      target: final
    image: mi-app:dev
    ports:
      - "127.0.0.1:8000:8000"
    environment:
      DB_URL: postgresql://app:${DB_PASSWORD}@basedatos:5432/app
      MODELO_RUTA: /modelos/clasificador.onnx
    volumes:
      - ./src:/app/src:ro
      - modelos:/modelos:ro
    depends_on:
      basedatos:
        condition: service_healthy
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: "2.0"
          memory: 2G

  basedatos:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${DB_PASSWORD:?falta DB_PASSWORD}
      POSTGRES_DB: app
    volumes:
      - datos-pg:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 10

  cache:
    image: redis:7-alpine
    command: ["redis-server", "--maxmemory", "256mb", "--maxmemory-policy", "allkeys-lru"]

volumes:
  datos-pg:
  modelos:
```

```bash
docker compose up -d
docker compose logs -f api
docker compose ps
docker compose exec api /bin/sh
docker compose down            # conserva volúmenes
docker compose down -v         # borra también los volúmenes
```

!!! warning "Compose no es un orquestador de producción"
    No hace autoescalado, no reprograma contenedores si el anfitrión falla, no hace despliegues progresivos y no balancea entre nodos.

    Es excelente para **desarrollo local, entornos de prueba y despliegues de un solo servidor**. Para producción distribuida, el [módulo 09](09-kubernetes.md).

---

## 10. Contenedores e IA

### Por qué los contenedores son la unidad natural de la IA

| Problema de ML | Cómo lo resuelve el contenedor |
| --- | --- |
| Versiones de CUDA, cuDNN y del framework que deben coincidir | Se fijan dentro de la imagen |
| Reproducir un entorno de hace ocho meses | La imagen se identifica por digest inmutable |
| El científico usa conda, producción usa otra cosa | Misma imagen en ambos |
| Escalar la inferencia | Más réplicas del mismo contenedor |
| Migrar entre proveedores | La imagen corre igual en cualquiera |

### GPU en contenedores

```bash
# Requiere el toolkit de contenedores de NVIDIA en el anfitrión
docker run --gpus all nvidia/cuda:12.4.1-runtime-ubuntu22.04 nvidia-smi

# Limitar a una GPU específica
docker run --gpus '"device=0"' mi-modelo:1.0
```

El contenedor **no incluye** el driver de la GPU: el driver vive en el anfitrión y se expone al contenedor. La imagen incluye el runtime de CUDA, que debe ser compatible con la versión del driver.

### Ejemplo: servicio de inferencia

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.12-slim AS constructor
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /build
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/instalacion -r requirements.txt

FROM python:3.12-slim
RUN groupadd --gid 10001 app && useradd --uid 10001 --gid app --no-create-home app
COPY --from=constructor /instalacion /usr/local
WORKDIR /app
COPY --chown=app:app servicio/ ./servicio/

# El modelo NO va en la imagen: se monta en /modelos
ENV MODELO_RUTA=/modelos/clasificador.onnx \
    OMP_NUM_THREADS=1 \
    PYTHONUNBUFFERED=1

USER app
EXPOSE 8000
HEALTHCHECK --interval=15s --timeout=3s --start-period=30s --retries=3 \
  CMD python -c "import urllib.request,sys;\
      sys.exit(0 if urllib.request.urlopen('http://localhost:8000/listo').status==200 else 1)"
ENTRYPOINT ["uvicorn", "servicio.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```python
# servicio/main.py — lo esencial
import os, onnxruntime as ort
from fastapi import FastAPI

app = FastAPI()
sesion = None

@app.on_event("startup")
def cargar():
    global sesion
    sesion = ort.InferenceSession(os.environ["MODELO_RUTA"])   # se carga UNA vez

@app.get("/salud")       # ¿el proceso vive?
def salud():
    return {"estado": "vivo"}

@app.get("/listo")       # ¿puede atender peticiones?
def listo():
    return {"estado": "listo"} if sesion else ({"estado": "cargando"}, 503)
```

!!! tip "Salud y disponibilidad son dos cosas distintas"
    `/salud` (*liveness*) responde "el proceso no está colgado". Si falla, hay que reiniciar.

    `/listo` (*readiness*) responde "puedo atender peticiones". Si falla, hay que dejar de enviarle tráfico **sin** reiniciar.

    Confundirlas es un error clásico: un modelo que tarda 40 s en cargar, con una sonda de salud que lo comprueba desde el segundo 5, entra en un bucle infinito de reinicios.

---

## Laboratorio · Contenerizar un servicio con modelo

**Objetivo:** construir una imagen optimizada, medir el efecto de cada optimización y levantar el stack completo con Compose.

**Paso 1 — Versión ingenua.** Crea `Dockerfile.malo`:

```dockerfile
FROM python:3.12
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD python -m servicio.main
```

```bash
docker build -f Dockerfile.malo -t app:malo .
docker images app:malo
```

Anota el tamaño.

**Paso 2 — Identifica los cinco problemas.** Antes de seguir, escríbelos. (Base no específica ni mínima; `COPY . .` antes de instalar destruye la caché; sin `.dockerignore`; corre como root; forma shell en `CMD`.)

**Paso 3 — Versión optimizada.** Escribe el `Dockerfile` multietapa de la sección 10 y el `.dockerignore`. Construye y compara tamaños.

**Paso 4 — Mide la caché.** Cambia una línea del código fuente y reconstruye ambas versiones cronometrando:

```bash
time docker build -f Dockerfile.malo -t app:malo .
time docker build -t app:bueno .
```

La diferencia debería ser de un orden de magnitud.

**Paso 5 — Inspecciona las capas.**

```bash
docker history app:bueno
```

Identifica la capa más pesada. ¿Se puede reducir?

**Paso 6 — Escanea vulnerabilidades.**

```bash
docker scout cves app:bueno   # o trivy image app:bueno
```

Compara el número de CVE entre `python:3.12` y `python:3.12-slim`.

**Paso 7 — Verifica el usuario y las señales.**

```bash
docker run --rm app:bueno id         # debe mostrar uid=10001, no root
docker run -d --name t app:bueno
time docker stop t                   # debe tardar < 2 s, no 10
```

Si tarda 10 segundos, tu proceso no está capturando `SIGTERM`.

**Paso 8 — Stack completo.** Escribe el `compose.yaml`, levántalo y verifica que la API alcanza la base de datos por nombre y que la sonda de disponibilidad pasa a `listo` tras cargar el modelo.

**Entregable:** tabla comparativa (tamaño, tiempo de reconstrucción, número de CVE, usuario, tiempo de parada) entre la versión ingenua y la optimizada, más el `compose.yaml` funcionando.

---

## Conceptos clave

- **Contenedor:** proceso aislado mediante namespaces, cgroups y un sistema de archivos en capas.
- **Imagen:** plantilla inmutable de solo lectura, formada por capas.
- **Capa:** conjunto de cambios en el sistema de archivos; se comparte y se cachea entre imágenes.
- **Namespaces / cgroups:** mecanismos del núcleo que proveen aislamiento y límites de recursos.
- **OCI:** estándares de imagen, runtime y distribución que garantizan portabilidad entre herramientas.
- **Construcción multietapa:** construir con herramientas completas y copiar solo el resultado a una imagen mínima.
- **`ENTRYPOINT` / `CMD`:** qué se ejecuta frente a qué argumentos por defecto.
- **Forma exec frente a forma shell:** la primera hace del proceso el PID 1 y recibe señales correctamente.
- **Volumen:** almacenamiento gestionado que sobrevive al contenedor.
- **Bind mount:** directorio del anfitrión montado en el contenedor; para desarrollo.
- **Sonda de salud (*liveness*) / de disponibilidad (*readiness*):** ¿está vivo? frente a ¿puede atender?
- **Registro:** servicio de almacenamiento y distribución de imágenes.
- **Docker Compose:** definición declarativa de aplicaciones multi-contenedor en un solo anfitrión.

---

## Puntos clave

- Un contenedor no es una máquina virtual ligera: es un proceso con aislamiento del núcleo. El núcleo se comparte, y eso define su modelo de seguridad.
- La contribución de Docker fue el formato de imagen con capas y el registro, no la tecnología de aislamiento.
- El orden del `Dockerfile` determina la velocidad de tus construcciones. Dependencias antes que código, siempre.
- La construcción multietapa es la optimización con mayor retorno: reduce tamaño y superficie de ataque a la vez.
- Correr como root dentro del contenedor es innecesario en casi todos los casos y es el hallazgo más frecuente en auditorías.
- La forma exec en `CMD` y `ENTRYPOINT` es lo que permite un apagado ordenado y, por tanto, despliegues sin cortes.
- Los modelos grandes no van dentro de la imagen: se montan como volumen o se descargan al inicio.
- Salud y disponibilidad son sondas distintas. Confundirlas produce bucles de reinicio en modelos de carga lenta.
- La portabilidad entre proveedores es real y está estandarizada por OCI. Es la razón por la que los contenedores son la unidad natural del despliegue de IA.
- Compose es excelente para desarrollo y un solo servidor; no es un orquestador de producción.

---

## Ejercicios

1. **Diseca un contenedor.** Ejecuta un contenedor y, desde el anfitrión, encuentra su proceso con `ps`. Comprueba con `ls /proc/<pid>/ns` que tiene sus propios namespaces.

2. **Reduce una imagen.** Toma una imagen real de tu organización y aplícale multietapa, base mínima y `.dockerignore`. Documenta la reducción porcentual.

3. **Rompe la caché a propósito.** Construye una imagen, cambia solo el código y reconstruye. Después mueve el `COPY` del código antes del `pip install` y repite. Mide ambos tiempos.

4. **Audita seguridad.** Escanea tres imágenes que uses. Para las vulnerabilidades críticas, determina si provienen de la imagen base o de tus dependencias.

5. **Prueba las señales.** Escribe un servicio que capture `SIGTERM`, registre "cerrando ordenadamente" y tarde 3 s en salir. Verifica que `docker stop` lo respeta.

6. **Contenedor con GPU.** Si tienes acceso a una GPU, ejecuta `nvidia-smi` dentro de un contenedor. Comprueba qué versión de driver ve y compárala con la del anfitrión.

7. **Compose completo.** Monta un stack de cuatro servicios —API, base de datos, caché y un worker— con sondas de salud y dependencias ordenadas.

---

## Lectura adicional

- [Docker · Documentación oficial](https://docs.docker.com/) — referencia completa.
- [Dockerfile best practices](https://docs.docker.com/build/building/best-practices/) — la guía oficial de buenas prácticas.
- [Open Container Initiative](https://opencontainers.org/) — las especificaciones que garantizan la portabilidad.
- [Podman](https://podman.io/) — alternativa sin demonio y sin root.
- [Trivy](https://trivy.dev/) — escáner de vulnerabilidades de imágenes y configuraciones.
- [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/) — GPU dentro de contenedores.
- [Módulo 09 · Kubernetes](09-kubernetes.md) — orquestar estos contenedores a escala.
- [Módulo 10 · DevOps y MLOps](10-devops-mlops.md) — construir y publicar imágenes automáticamente.
