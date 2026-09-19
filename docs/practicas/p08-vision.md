# P08 · Clasificador de visión con transfer learning

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulos 11–12</span>
<span>:material-clock-outline: 180 minutos</span>
<span>:material-tools: PyTorch, ONNX, Grad-CAM</span>
</div>

## Objetivo

Entrenar el modelo de detección de plagas de AgroVisión evitando los errores que invalidan resultados, y evaluarlo como se evalúa un sistema que va a producción.

## Datos

Usa un conjunto público de enfermedades de plantas o uno propio. Requisito indispensable: **debe existir una variable de agrupación** (parcela, lote, sesión de captura, planta) que correlacione imágenes.

## Desarrollo

### 1. Línea base sin entrenamiento

Antes de tocar nada, mide dos referencias:

| Referencia | Cómo |
| --- | --- |
| Clase mayoritaria | Predecir siempre la clase más frecuente |
| CLIP sin entrenamiento | Clasificar con descripciones en lenguaje natural |

Anota ambas. Todo lo que hagas después se compara contra ellas.

### 2. División por grupo

```python
from sklearn.model_selection import GroupShuffleSplit
# ...
assert not (set(grupos[idx_train]) & set(grupos[idx_test])), "Fuga de datos"
assert not (set(grupos[idx_val])   & set(grupos[idx_test])), "Fuga de datos"
```

**Experimento obligatorio.** Entrena dos veces: con división aleatoria y con división por grupo. Reporta ambas exactitudes. La diferencia es la magnitud de la fuga, y suele ser sorprendente.

### 3. Aumento con criterio de dominio

Para cada transformación, decide y **justifica**:

| Transformación | ¿Aplicar? | Justificación de dominio |
| --- | --- | --- |
| Volteo horizontal | | |
| Volteo vertical | | |
| Rotación libre | | |
| Cambios de tono y saturación | | |
| Cambios de brillo | | |
| Recorte aleatorio | | |
| Ruido gaussiano | | |

!!! warning "La trampa de esta práctica"
    En detección de enfermedades de plantas, el **color es la señal**. Un `ColorJitter` agresivo enseña al modelo a ignorar precisamente lo que debe mirar. Si aplicas cambios de tono, justifícalo muy bien o mide el impacto.

### 4. Entrenamiento en dos fases

Implementa la secuencia correcta: congelar → entrenar cabeza → descongelar últimas capas con tasa mucho menor.

Compara contra descongelar todo desde el inicio. Reporta ambas curvas de validación.

### 5. Evaluación honesta

| Segmento | n | Precisión | Exhaustividad | F1 | AUC-PR |
| --- | --- | --- | --- | --- | --- |
| Global | | | | | |
| Por clase (una fila cada una) | | | | | |
| Por condición de luz | | | | | |
| Por parcela o lote | | | | | |

Marca cualquier segmento que esté más de 8 puntos por debajo del global.

### 6. Calibración

Genera el diagrama de fiabilidad. Si el modelo está sobreconfiado —lo estará—, aplica *temperature scaling* sobre validación y regenera.

Reporta el error de calibración esperado antes y después.

### 7. Umbral por costo

Construye la matriz de costo del caso AgroVisión:

| | Predicho sano | Predicho con plaga |
| --- | --- | --- |
| **Realmente sano** | 0 | Costo de una visita innecesaria del técnico |
| **Realmente con plaga** | Costo de pérdida de cosecha por detección tardía | 0 |

Calcula el umbral que minimiza el costo esperado. Compáralo con el que maximiza F1. **Casi nunca coinciden.**

### 8. Abstención

Implementa la zona de abstención con dos umbrales. Mide:

- Porcentaje de casos que escala a humano.
- Precisión y exhaustividad en los casos que sí decide.
- Costo esperado total frente a decidir siempre.

### 9. Interpretabilidad

Genera Grad-CAM para:

- Cinco aciertos de alta confianza.
- Los cinco errores de mayor confianza.
- Cinco casos de la zona de abstención.

Responde por escrito: **¿el modelo mira la lesión, o está mirando el fondo, la sombra o una marca de la cámara?**

### 10. Robustez

Evalúa con las imágenes de prueba degradadas:

| Degradación | Exactitud | Caída |
| --- | --- | --- |
| Original | | — |
| Ruido gaussiano σ=10 | | |
| Desenfoque leve | | |
| Brillo −30 % | | |
| Brillo +30 % | | |
| JPEG calidad 40 | | |

Una caída brusca ante una degradación leve indica dependencia de artefactos.

### 11. Optimización para el borde

| Versión | Tamaño | Latencia p50 | Latencia p99 | F1 |
| --- | --- | --- | --- | --- |
| PyTorch FP32 | | | | |
| ONNX FP32 | | | | |
| ONNX INT8 | | | | |

Evalúa si el modelo cuantizado cabe en el presupuesto de cómputo de un nodo de borde.

### 12. Viabilidad económica

Con el volumen de P01, calcula réplicas, costo mensual y costo por mil inferencias. Compáralo con el valor de negocio por mil inferencias. ¿Es viable?

## Entregable

1. Comparación de división aleatoria contra división por grupo.
2. Tabla de aumento con justificación de dominio.
3. Tabla de evaluación por segmento completa.
4. Diagramas de fiabilidad antes y después de calibrar.
5. Cálculo del umbral por costo, con la matriz.
6. Métricas con y sin abstención.
7. Los quince mapas de Grad-CAM, comentados.
8. Tabla de robustez.
9. Tabla de optimización.
10. **Model card completa** con el formato del módulo 12.

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | Semillas fijadas; el entrenamiento se reproduce |
| Justificación (30 %) | El aumento y el umbral están justificados por el dominio y el costo |
| Medición (20 %) | Evaluación por segmento, calibración y robustez reportadas |
| Documentación (10 %) | La model card incluye usos fuera de alcance y limitaciones reales |

!!! danger "Si tu modelo no supera a CLIP sin entrenamiento"
    Detente y averigua por qué. Puede ser que el problema sea más fácil de lo que pensabas —en cuyo caso no necesitas entrenar— o que algo esté mal en tu pipeline de datos.

    En ambos casos, es información valiosa que llega antes de gastar en etiquetado.
