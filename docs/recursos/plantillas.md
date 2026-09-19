# Plantillas

Archivos listos para copiar. Todos están comentados en los puntos donde la decisión no es obvia.

---

## ADR · Registro de decisión de arquitectura

```markdown
# ADR-NNN · Título en imperativo

- **Estado:** Propuesto | Aceptado | Rechazado | Reemplazado por ADR-XXX
- **Fecha:** AAAA-MM-DD
- **Fase ADM:** A | B | C | D
- **Decisores:**

## Contexto
Qué situación obliga a decidir. Incluye los requisitos no funcionales relevantes,
con números.

## Opciones consideradas
1. Opción A
2. Opción B
3. Opción C

## Decisión
La opción elegida, en una frase.

## Justificación
Por qué esta y no las otras. Cita mediciones si existen.

## Consecuencias
- **Positivas:**
- **Negativas:**
- **Mitigaciones:**

## Revisión
Qué condición futura obligaría a reconsiderar esta decisión.
```

---

## Contrato de datos

```yaml
contrato: nombre_del_dataset
version: 2
propietario: equipo-responsable
descripcion: >
  Qué representa este conjunto y para qué existe.

esquema:
  identificador:
    tipo: string
    obligatorio: true
    unico: true
  monto:
    tipo: decimal(12,2)
    obligatorio: true
    min: 0
  categoria:
    tipo: string
    obligatorio: true
    valores: [A, B, C]
  ocurrido_en:
    tipo: timestamp
    obligatorio: true
    zona: UTC
    nota: tiempo de EVENTO, no de procesamiento
  cliente_id:
    tipo: string
    obligatorio: true
    clasificacion: personal

garantias:
  frescura_maxima: 15m
  completitud_minima: 0.999
  duplicados_maximos: 0.0001
  marca_de_agua: 48h

retencion:
  periodo: 7 anios
  base_legal: obligacion fiscal

politica_cambios:
  compatibles: aviso con 2 semanas
  incompatibles: nueva version, convivencia 90 dias

contacto: equipo-responsable@ejemplo.com
```

---

## Dockerfile de producción

```dockerfile
# syntax=docker/dockerfile:1

# ---------- Construcción ----------
FROM python:3.12.4-slim AS constructor

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/instalacion -r requirements.txt

# ---------- Final ----------
FROM python:3.12.4-slim

RUN groupadd --gid 10001 app \
    && useradd --uid 10001 --gid app --no-create-home app

COPY --from=constructor /instalacion /usr/local

WORKDIR /app
COPY --chown=app:app src/ ./src/

# El modelo NO va en la imagen: se monta como volumen
ENV MODELO_RUTA=/modelos/modelo.onnx \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

USER app
EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=3s --start-period=45s --retries=3 \
  CMD python -c "import urllib.request,sys;\
      sys.exit(0 if urllib.request.urlopen('http://localhost:8000/listo').status==200 else 1)"

# Forma exec: el proceso es PID 1 y recibe SIGTERM
ENTRYPOINT ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```dockerignore
.git
.venv
__pycache__
*.pyc
tests/
datos/
modelos/
*.ckpt
*.onnx
.env
*.md
```

---

## Manifiesto de Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: servicio
  labels: {app: servicio}
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate: {maxSurge: 1, maxUnavailable: 0}   # despliegue sin cortes
  selector:
    matchLabels: {app: servicio}
  template:
    metadata:
      labels: {app: servicio}
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        fsGroup: 10001
      initContainers:
        - name: descargar-modelo
          image: registro/utilidades:1.0
          command: ["sh", "-c", "descargar --destino /modelos"]
          volumeMounts: [{name: modelos, mountPath: /modelos}]
      containers:
        - name: api
          image: registro/servicio:SHA_DEL_COMMIT     # nunca :latest
          ports: [{containerPort: 8000, name: http}]
          envFrom:
            - configMapRef: {name: config-servicio}
          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef: {name: credenciales, key: password}
          resources:
            requests: {cpu: "500m", memory: "1Gi"}     # derivado de medición
            limits:   {cpu: "2",    memory: "3Gi"}
          startupProbe:                                # margen para cargar el modelo
            httpGet: {path: /listo, port: http}
            periodSeconds: 5
            failureThreshold: 30
          livenessProbe:
            httpGet: {path: /salud, port: http}
            periodSeconds: 15
          readinessProbe:
            httpGet: {path: /listo, port: http}
            periodSeconds: 5
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities: {drop: ["ALL"]}
          volumeMounts:
            - {name: modelos, mountPath: /modelos, readOnly: true}
            - {name: temporal, mountPath: /tmp}
      volumes:
        - {name: modelos, emptyDir: {sizeLimit: 8Gi}}
        - {name: temporal, emptyDir: {}}
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata: {name: servicio}
spec:
  minAvailable: 2
  selector:
    matchLabels: {app: servicio}
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata: {name: denegar-todo}
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
```

---

## AGENTS.md

```markdown
# AGENTS.md

## Qué es este proyecto
(Tres líneas: qué hace, con qué tecnologías, dónde se despliega)

## Antes de empezar cualquier sesión
1. `pwd` — solo puedes editar dentro de este directorio.
2. Lee `docs/progreso.md` y `git log --oneline -20`.
3. Ejecuta `./init.sh` y verifica que el servicio arranca.
4. Ejecuta `make test` — si algo falla, arréglalo ANTES de añadir nada.
5. Lee `feature_list.json` y elige UNA funcionalidad no completada.

## Comandos
- Entorno: `./init.sh`
- Pruebas: `make test`
- Linter y tipos: `make lint`
- Servidor local: `make dev` → http://localhost:8000

## Reglas no negociables
- NO edites `feature_list.json` salvo para cambiar `passes` de false a true.
- NO elimines ni debilites pruebas para hacerlas pasar.
- NO hagas commit con pruebas en rojo.
- NO instales dependencias sin registrar un ADR en `docs/decisiones/`.
- NO toques `infra/produccion/` — requiere aprobación humana.

## Dónde buscar
- Arquitectura y capas: `ARCHITECTURE.md`
- Por qué algo es como es: `docs/decisiones/`
- Qué falta: `feature_list.json`
- Qué pasó antes: `docs/progreso.md`

## Al terminar la sesión
1. Actualiza `docs/progreso.md`.
2. Commit con mensaje descriptivo (convención en `docs/decisiones/ADR-002.md`).
3. Deja el repositorio en estado desplegable.
```

---

## feature_list.json

```json
{
  "project": "nombre-del-proyecto",
  "features": [
    {
      "id": "area-001",
      "category": "functional",
      "description": "Descripción verificable de extremo a extremo",
      "steps": [
        "Paso observable 1",
        "Paso observable 2",
        "Verificación concreta con criterio objetivo"
      ],
      "passes": false
    }
  ]
}
```

!!! warning "Reglas del archivo"
    Los agentes solo pueden cambiar `passes` de `false` a `true`, y únicamente tras verificación de extremo a extremo. Nunca editar descripciones ni eliminar entradas.

---

## docs/progreso.md

```markdown
# Progreso

## Última sesión — AAAA-MM-DD
**Trabajé en:** (id de la funcionalidad)
**Estado:** COMPLETADO | EN PROGRESO | BLOQUEADO
**Commit:** (hash)

## Estado del proyecto
- N de M funcionalidades pasando
- (Estado del entorno y de la suite de pruebas)

## Bloqueos conocidos
- (Qué está bloqueado y qué decisión humana se necesita)

## Siguiente recomendado
(Qué funcionalidad y por qué)

## Trampas encontradas
- (Cosas que costaron tiempo y que la próxima sesión debería saber)
```

---

## graph.md

```markdown
# Grafo: nombre del proceso

## Evaluación previa (se necesitan al menos 3 de 5)
| Criterio | ¿Cumple? | Justificación |
| --- | --- | --- |
| Unidades independientes | | |
| Ramificaciones o retrocesos | | |
| Estado intermedio vale guardarse | | |
| Resultado aceptable inequívocamente | | |
| Beneficio > costo de coordinación | | |

## Estado compartido
| Campo | Tipo | Lo escribe | Fusión en paralelo |
| --- | --- | --- | --- |

## Nodos
| Nombre | Tipo | Responsabilidad única | Lee | Escribe | ¿Contexto nuevo? |
| --- | --- | --- | --- | --- | --- |

## Enrutamiento
| Desde | Condición | Hacia | ¿Retroceso? |
| --- | --- | --- | --- |

## Puntos de control
- Persistencia: (dónde y cada cuánto)
- Pausa humana antes de: (qué nodos)

## Anclas
| Nodo | Métrica que produce | Ancla al mundo real |
| --- | --- | --- |

## Aristas que eran implícitas
(La parte más valiosa: qué decisión estaba escondida y ahora está escrita)
```

---

## init.sh

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "==> Verificando dependencias"
for cmd in python3 docker; do
  command -v "$cmd" >/dev/null || { echo "ERROR: falta $cmd"; exit 1; }
done

echo "==> Entorno virtual"
[[ -d .venv ]] || python3 -m venv .venv
source .venv/bin/activate
pip install -q -r requirements-dev.txt

echo "==> Servicios de apoyo"
docker compose up -d --wait

echo "==> Prueba de humo"
make test-smoke

echo ""
echo "==> Entorno listo."
echo "    Servidor:  make dev   → http://localhost:8000"
echo "    Pruebas:   make test"
```

---

## Model card

```markdown
# Model card · nombre-del-modelo v1.2.0

## Uso previsto
(Para qué se diseñó, en qué contexto y con qué población)

## Usos fuera de alcance
(Explícitamente: para qué NO debe usarse)

## Datos de entrenamiento
- Fuente y periodo:
- Tamaño y distribución de clases:
- Método de etiquetado:
- Sesgos conocidos:
- Base legal del tratamiento:

## Métricas
### Global
| Métrica | Valor | Intervalo de confianza |
| --- | --- | --- |

### Por segmento
| Segmento | n | Precisión | Exhaustividad | F1 |
| --- | --- | --- | --- | --- |

## Calibración
- Error de calibración esperado:
- Método aplicado:

## Umbral de operación
- Valor: 
- Criterio: (costo de FP y FN que lo justifican)
- Zona de abstención: 

## Limitaciones conocidas
(Cuándo se sabe que el modelo rinde peor)

## Monitoreo
- Métricas vigiladas:
- Umbral de deriva que dispara revisión:
- Responsable:

## Reversión
- Procedimiento y tiempo estimado:

## Linaje
- Commit:
- Datos (hash o versión):
- Fecha de entrenamiento:
```
