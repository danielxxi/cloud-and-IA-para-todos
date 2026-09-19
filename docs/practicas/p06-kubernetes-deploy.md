# P06 · Desplegar en Kubernetes con autoescalado

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulo 09</span>
<span>:material-clock-outline: 150 minutos</span>
<span>:material-tools: kind o Minikube, kubectl</span>
</div>

## Objetivo

Llevar la imagen de P05 a un clúster, con autoescalado, aislamiento de red, despliegue sin cortes y capacidad de reversión. Provocar fallos deliberadamente y diagnosticarlos.

## Desarrollo

### 1. Clúster local de tres nodos

```bash
cat > kind.yaml <<'EOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
EOF
kind create cluster --name agrovision --config kind.yaml
kind load docker-image agrovision:v6 --name agrovision
```

### 2. Namespace con cuota y límites

Crea el namespace `agrovision` con `ResourceQuota` y `LimitRange`. Justifica los valores a partir del dimensionamiento de P01.

### 3. Manifiestos

Escribe y aplica:

| Archivo | Contenido |
| --- | --- |
| `00-namespace.yaml` | Namespace, ResourceQuota, LimitRange |
| `10-config.yaml` | ConfigMap con parámetros del servicio |
| `11-secret.yaml` | Secret (documenta por qué esto no basta en producción) |
| `20-deployment.yaml` | Deployment con initContainer, tres sondas, contexto de seguridad |
| `30-service.yaml` | Service ClusterIP |
| `40-ingress.yaml` | Ingress con enrutamiento por ruta |
| `50-hpa.yaml` | HorizontalPodAutoscaler |
| `60-pdb.yaml` | PodDisruptionBudget |
| `70-netpol.yaml` | NetworkPolicy de denegación por defecto + reglas |

Requisitos obligatorios del Deployment:

- `maxUnavailable: 0` — despliegue sin cortes.
- `initContainer` que "descarga" el modelo a un volumen compartido.
- `startupProbe` con margen suficiente para la carga de 40 s.
- `runAsNonRoot`, `readOnlyRootFilesystem`, `capabilities: drop ALL`.
- `requests` y `limits` justificados con los datos medidos en P05.

### 4. Los cinco fallos

Provoca cada uno deliberadamente. Para cada uno documenta: **cómo lo provocaste, qué comando lo diagnostica y cuál es la salida reveladora.**

| Fallo | Cómo provocarlo |
| --- | --- |
| `Pending` | Pide más CPU de la que hay en el clúster |
| `ImagePullBackOff` | Referencia una etiqueta inexistente |
| `CrashLoopBackOff` | Haz que el proceso salga con error al arrancar |
| `OOMKilled` | Baja el límite de memoria a 64 Mi |
| `Running` pero `0/1 READY` | Apunta la `readinessProbe` a una ruta inexistente |

Para el último, verifica además con `kubectl get endpoints` que el Pod **salió del Service** sin reiniciarse. Esa es la diferencia entre readiness y liveness, comprobada en la práctica.

### 5. Autoescalado con métrica adecuada

Configura el HPA. Discute en tu documentación: ¿por qué la CPU es una mala métrica para este servicio? ¿Qué métrica usarías en producción y qué necesitarías para exponerla?

Genera carga y observa:

```bash
kubectl -n agrovision get hpa -w
kubectl -n agrovision get pods -w
```

Documenta el tiempo desde que sube la carga hasta que hay réplicas nuevas **listas**. Incluye la carga del modelo en ese cálculo.

### 6. Oscilación y su corrección

Configura el HPA sin ventana de estabilización y genera carga intermitente. Observa la oscilación. Después añade `stabilizationWindowSeconds: 300` para el escalado hacia abajo y repite. Compara el número de eventos de escalado.

### 7. Despliegue sin cortes y reversión

```bash
# Mientras generas carga continua en otra terminal:
kubectl -n agrovision set image deploy/inferencia api=agrovision:roto
kubectl -n agrovision rollout status deploy/inferencia
```

Verifica que **ninguna petición falló** durante el intento de despliegue con imagen rota. Después:

```bash
kubectl -n agrovision rollout undo deploy/inferencia
kubectl -n agrovision rollout history deploy/inferencia
```

### 8. Aislamiento de red

Aplica la política de denegación total. Comprueba que el servicio deja de responder. Abre únicamente lo necesario y verifica que vuelve a funcionar y que **sigue sin poder salir a internet**.

```bash
kubectl -n agrovision exec deploy/inferencia -- wget -qO- --timeout=3 https://example.com
# debe fallar
```

### 9. Mantenimiento sin cortes

```bash
kubectl drain <nodo> --ignore-daemonsets --delete-emptydir-data
```

Verifica que el `PodDisruptionBudget` impidió bajar del mínimo y que el servicio siguió respondiendo.

## Entregable

1. Todos los manifiestos.
2. **Tabla de diagnóstico** de los cinco fallos: causa, comando, salida reveladora, corrección.
3. Salida de `kubectl get events --sort-by=.lastTimestamp` durante el despliegue fallido.
4. Gráfico o tabla del autoescalado: carga, réplicas y tiempo hasta disponibilidad.
5. Comparación de eventos de escalado con y sin ventana de estabilización.
6. Evidencia de cero peticiones fallidas durante el despliegue con imagen rota.
7. Evidencia del aislamiento de red funcionando en ambos sentidos.
8. Un párrafo justificando tus `requests` y `limits` con los datos de P05.

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | `kubectl apply -f manifiestos/` en un clúster limpio deja todo funcionando |
| Justificación (30 %) | Los recursos y las sondas derivan de mediciones, no de valores copiados |
| Medición (20 %) | Los cinco fallos están documentados con salida real |
| Documentación (10 %) | Los manifiestos tienen comentarios donde la decisión no es obvia |

!!! warning "El fallo que más enseña"
    `OOMKilled`. No deja registro en la aplicación, el contenedor simplemente desaparece y reinicia. La única pista está en `kubectl describe pod`, en `Last State: Terminated, Reason: OOMKilled`.

    Si no sabes dónde mirar, puedes pasar horas buscando un error de aplicación que no existe.
