# cloud-and-IA-para-todos

Repositorio de aprendizaje de arquitectura en Nube e Inteligencia Artificial.

Curso completo y material docente sobre **infraestructura moderna para Inteligencia Artificial**: desde los fundamentos de la nube hasta la ingeniería de sistemas agénticos.

El sitio se publica con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) y está pensado para impartirse en **14 sesiones de 3 horas**.

📖 **Sitio publicado:** <https://danielxxi.github.io/cloud-and-IA-para-todos/>

## Contenido

| Bloque | Módulos |
| --- | --- |
| I · Fundamentos de la nube | 01 Fundamentos · 02 Modelos de servicio |
| II · Arquitectura y gobierno | 03 TOGAF para IA · 04 Arquitecturas, seguridad y gobernanza |
| III · Datos | 05 Big Data · 06 Edge, Fog e IoT |
| IV · Ingeniería de plataforma | 07 Git · 08 Docker · 09 Kubernetes · 10 DevOps/GitOps/MLOps/AIOps |
| V · IA aplicada | 11 Visión por computadora (fundamentos) · 12 Visión (aplicaciones) |
| VI · Sistemas agénticos | 13 Ingeniería de Harness · 14 Ingeniería de Grafos |

Además incluye **10 prácticas guiadas**, glosario, rúbricas de evaluación y plantillas listas para copiar.

## Ejecutar en local

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Abre <http://127.0.0.1:8000>.

## Publicar en GitHub Pages

El workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) construye y publica el sitio en cada push a `main`.

Antes del primer despliegue:

1. En **Settings → Pages**, selecciona *Source: GitHub Actions*.
2. El sitio quedará disponible en <https://danielxxi.github.io/cloud-and-IA-para-todos/>.

## Estructura

```text
docs/
├── index.md              # portada
├── como-usar.md          # cómo estudiar / cómo impartir
├── guia-docente.md       # plan de sesión, tiempos, dinámicas
├── ruta.md               # dependencias entre módulos
├── modulos/              # 14 módulos teóricos
├── practicas/            # 10 laboratorios guiados
└── recursos/             # glosario, evaluación, plantillas, bibliografía
```

## Cómo se organizó el temario

El material parte de un temario original de 12 sesiones. Para esta versión:

- Se **fusionó** la sesión de "Contenerización" con las de Docker y Kubernetes, que la duplicaban.
- Se **eliminó** el subtema "Contenedores y Kubernetes" de la sesión de arquitecturas, redundante con el Bloque IV.
- Se **unificó** el material de Git en un único módulo de fundamentos, ampliado y profundizado.
- Se **añadieron** cuatro ejes nuevos: TOGAF para IA, fundamentos de Git ampliados, ingeniería de grafos e ingeniería de harness.
- Se **reordenó** todo en seis bloques con dependencias explícitas (ver [ruta de aprendizaje](docs/ruta.md)).

## Licencia

Material docente bajo [CC BY-NC-SA 4.0](LICENSE). El código de ejemplo se distribuye bajo licencia MIT.
