# Evaluación y rúbricas

## Distribución

| Componente | Peso | Cantidad |
| --- | --- | --- |
| Cuestionarios de cierre | 20 % | 14 (uno por módulo) |
| Laboratorios entregados | 40 % | 10 prácticas |
| Proyecto integrador | 30 % | 1 |
| Participación y auditorías cruzadas | 10 % | Continuo |

---

## Rúbrica de laboratorios

La misma para las diez prácticas.

| Criterio | Peso | Insuficiente (0–5) | Aceptable (6–7) | Bueno (8–9) | Excelente (10) |
| --- | --- | --- | --- | --- | --- |
| **Funciona y es reproducible** | 40 % | No se ejecuta o requiere pasos no documentados | Se ejecuta con ajustes menores | Se ejecuta desde cero siguiendo el README | Se ejecuta en otra máquina sin intervención; es idempotente |
| **Decisiones justificadas** | 30 % | Recetas copiadas sin explicación | Algunas decisiones explicadas | Casi todas justificadas con criterio | Cada decisión deriva de un requisito y se documenta qué se descartó |
| **Medición y evidencia** | 20 % | Afirmaciones sin datos | Algunas métricas | Métricas antes y después | Métricas completas, con la sorpresa o el resultado inesperado analizado |
| **Documentación** | 10 % | Ausente o incomprensible | Cubre lo básico | Otra persona puede seguirla | Otra persona puede continuar el trabajo sin preguntar nada |

!!! warning "El criterio que más calificaciones baja"
    **Medición y evidencia.** La diferencia entre "la imagen quedó más pequeña" y "de 1.24 GB a 187 MB, 85 % menos, con el tiempo de reconstrucción bajando de 94 s a 7 s" es la diferencia entre un 5 y un 10.

    Mide antes. Mide después. Reporta ambos. Analiza lo que te sorprendió.

### Bonificación

Hasta +1 punto sobre la calificación final del laboratorio por:

- Identificar y documentar un error del propio enunciado de la práctica.
- Un análisis de "qué habría pasado si" con datos reales.
- Una decisión de **no** usar una tecnología, bien argumentada.

---

## Cuestionarios de cierre

Cinco preguntas al final de cada sesión, diez minutos. No son de memoria: son de aplicación.

**Formato por módulo:**

| Pregunta | Tipo |
| --- | --- |
| 1 | Definición con tus palabras de un concepto clave |
| 2 | Elección entre dos opciones con justificación |
| 3 | Cálculo o estimación numérica |
| 4 | Diagnóstico de un caso que falla |
| 5 | Identificación de un límite o riesgo de lo visto |

!!! example "Ejemplo · Módulo 09"
    1. Explica en dos líneas qué significa que Kubernetes sea declarativo.
    2. Un servicio de inferencia con GPU y CPU al 20 %: ¿escalarías por CPU? Justifica.
    3. Un modelo tarda 70 s en cargar. ¿Qué `failureThreshold` pondrías en la `startupProbe` con `periodSeconds: 5`?
    4. Un Pod está `Running` pero `0/1 READY`. ¿Qué comando ejecutas primero y qué buscas?
    5. Menciona un caso concreto en el que Kubernetes sería la decisión equivocada.

---

## Proyecto integrador

Un sistema completo que atraviese los seis bloques. Puede ser AgroVisión llevado al final o un caso propio de tu organización.

### Entregables

| Entregable | Bloque | Peso |
| --- | --- | --- |
| Documento de arquitectura con fases A–D y análisis de brechas | II | 15 % |
| Canalización de datos con contratos y pruebas de calidad | III | 15 % |
| Repositorio con historial limpio, protección y datos versionados | IV | 10 % |
| Servicio contenerizado y desplegado con autoescalado | IV | 20 % |
| Pipeline de CI/CD con puertas de calidad | IV | 15 % |
| Modelo evaluado por segmento, calibrado, con model card | V | 15 % |
| Harness o grafo documentado y funcionando | VI | 10 % |

### Criterios transversales

Además de la rúbrica de laboratorios, el proyecto se evalúa por:

**Coherencia.** Las decisiones de un bloque deben ser consistentes con las de otro. Si en la fase D descartaste la nube pública por residencia de datos, tu despliegue no puede estar en una región extranjera.

**Trazabilidad.** Desde un modelo en producción debes poder llegar a su commit, sus datos y sus métricas. Se comprobará en la defensa.

**Honestidad.** Un proyecto que documenta lo que no funcionó, lo que se descartó y lo que quedó pendiente vale más que uno que presenta un éxito sin fisuras. Los proyectos reales tienen fisuras.

### Defensa

Veinte minutos: diez de presentación y diez de preguntas. Las preguntas se centran en:

1. ¿Por qué descartaste la alternativa X?
2. ¿Qué pasa si falla el componente Y?
3. Muéstrame cómo llegas del modelo en producción a los datos con que se entrenó.
4. ¿Cuánto cuesta operar esto al mes?
5. ¿Qué harías distinto si empezaras de nuevo?

---

## Auditorías cruzadas

Cada equipo revisa el trabajo de otro equipo en tres momentos del curso. La calificación de esta componente evalúa **la calidad de la revisión**, no la del trabajo revisado.

Una buena auditoría:

- Cita evidencia específica, no impresiones generales.
- Identifica lo que **no está verificado**, no solo lo que está mal.
- Propone una alternativa concreta cuando señala un problema.
- Distingue entre "esto está mal" y "esto yo lo habría hecho distinto".

!!! tip "Por qué existe esta componente"
    Revisar el trabajo ajeno enseña más que hacer el propio, y es la habilidad central del [módulo 13](../modulos/13-harness-engineering.md): tu ancho de banda de revisión es el techo de todo el sistema.

---

## Política de reintentos

Cualquier laboratorio puede reentregarse una vez, hasta una semana después de recibir la retroalimentación. La calificación máxima de una reentrega es 9.

El objetivo del curso es que el sistema funcione, no clasificar a los estudiantes.

## Política sobre uso de IA

**Se permite y se espera** el uso de asistentes de IA en todas las prácticas. Es coherente con el contenido del curso.

Dos condiciones:

1. **Debes poder explicar todo lo que entregas.** En la defensa se pregunta por decisiones concretas. "El asistente lo generó así" no es una respuesta.
2. **Documenta dónde lo usaste y para qué.** No por control, sino porque en la práctica P09 vas a medir exactamente eso, y tener el registro es parte del ejercicio.

!!! danger "Lo que no se permite"
    Entregar un resultado que no has verificado. Es precisamente el fallo que el módulo 13 llama **deuda de verificación**, y en este curso se penaliza igual que en producción: cuando se descubre, cuesta más que haberlo hecho bien.
