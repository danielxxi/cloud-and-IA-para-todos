# Ruta de aprendizaje

## Dependencias entre módulos

No todos los módulos requieren los anteriores. Este grafo muestra qué necesitas realmente antes de abrir cada capítulo.

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Inter, sans-serif","darkMode":false,"background":"#f3f1ec","mainBkg":"#fbfaf7","primaryColor":"#fbfaf7","primaryTextColor":"#6b3a1f","primaryBorderColor":"#b9b1a1","secondaryColor":"#ead9ba","secondaryTextColor":"#6b3a1f","secondaryBorderColor":"#b9b1a1","tertiaryColor":"#c2d4cb","tertiaryTextColor":"#6b3a1f","tertiaryBorderColor":"#b9b1a1","lineColor":"#8d8676","textColor":"#6b3a1f","nodeTextColor":"#6b3a1f","nodeBorder":"#b9b1a1","labelTextColor":"#6b3a1f","titleColor":"#6b3a1f","edgeLabelBackground":"#f3f1ec","clusterBkg":"#efece4","clusterBorder":"#d8d2c6","cScale0":"#e2a98c","cScaleLabel0":"#6b3a1f","cScale1":"#bdb6e6","cScaleLabel1":"#6b3a1f","cScale2":"#e8d9b6","cScaleLabel2":"#6b3a1f","cScale3":"#b5d0c3","cScaleLabel3":"#6b3a1f","cScale4":"#e6cfc0","cScaleLabel4":"#6b3a1f","cScale5":"#cddcea","cScaleLabel5":"#6b3a1f"}}}%%
flowchart TB
    M01["01 · Nube"] --> M02["02 · Modelos de servicio"]
    M02 --> M03["03 · TOGAF para IA"]
    M02 --> M04["04 · Seguridad y gobernanza"]
    M03 --> M04
    M04 --> M05["05 · Big Data"]
    M05 --> M06["06 · Edge e IoT"]
    M02 --> M07["07 · Git"]
    M07 --> M08["08 · Docker"]
    M08 --> M09["09 · Kubernetes"]
    M07 --> M10["10 · DevOps / MLOps"]
    M09 --> M10
    M05 --> M11["11 · Visión: fundamentos"]
    M11 --> M12["12 · Visión: aplicaciones"]
    M10 --> M12
    M07 --> M13["13 · Harness"]
    M10 --> M13
    M13 --> M14["14 · Grafos"]
    classDef default fill:#fbfaf7,stroke:#b9b1a1,stroke-width:1px,color:#6b3a1f;
```

## Rutas recortadas por perfil

=== "Arquitecto de soluciones"

    Te interesa decidir, no operar.

    `01 → 02 → 03 → 04 → 05 → 06 → 10`

    Puedes leer 08 y 09 en modo panorámico (solo las secciones de arquitectura) y saltarte los laboratorios.

=== "Ingeniero de datos / ML"

    Te interesa el flujo del dato y del modelo.

    `01 → 02 → 05 → 07 → 08 → 09 → 10 → 11 → 12`

    TOGAF (03) te servirá cuando tengas que justificar la arquitectura ante dirección; déjalo para el final.

=== "Ingeniero de plataforma / DevOps"

    Te interesa que todo corra y se pueda revertir.

    `02 → 04 → 07 → 08 → 09 → 10 → 13 → 14`

=== "Desarrollador que se mueve a IA"

    Te interesa llegar a producción con un modelo propio.

    `01 → 02 → 07 → 08 → 09 → 11 → 12 → 13`

=== "Ruta completa (diplomado)"

    Las 14 sesiones en orden, una por semana.

    `01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12 → 13 → 14`

## Progresión de las prácticas

Las prácticas están encadenadas: el artefacto de una alimenta la siguiente.

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Inter, sans-serif","darkMode":false,"background":"#f3f1ec","mainBkg":"#fbfaf7","primaryColor":"#fbfaf7","primaryTextColor":"#6b3a1f","primaryBorderColor":"#b9b1a1","secondaryColor":"#ead9ba","secondaryTextColor":"#6b3a1f","secondaryBorderColor":"#b9b1a1","tertiaryColor":"#c2d4cb","tertiaryTextColor":"#6b3a1f","tertiaryBorderColor":"#b9b1a1","lineColor":"#8d8676","textColor":"#6b3a1f","nodeTextColor":"#6b3a1f","nodeBorder":"#b9b1a1","labelTextColor":"#6b3a1f","titleColor":"#6b3a1f","edgeLabelBackground":"#f3f1ec","clusterBkg":"#efece4","clusterBorder":"#d8d2c6","cScale0":"#e2a98c","cScaleLabel0":"#6b3a1f","cScale1":"#bdb6e6","cScaleLabel1":"#6b3a1f","cScale2":"#e8d9b6","cScaleLabel2":"#6b3a1f","cScale3":"#b5d0c3","cScaleLabel3":"#6b3a1f","cScale4":"#e6cfc0","cScaleLabel4":"#6b3a1f","cScale5":"#cddcea","cScaleLabel5":"#6b3a1f"}}}%%
flowchart TB
    subgraph FILA1["Bloques I–IV · diseño y empaquetado"]
        direction LR
        P01["P01 · Costos"] --> P02["P02 · TOGAF"] --> P03["P03 · Pipeline"]
        P03 --> P04["P04 · Git flow"] --> P05["P05 · Contenerizar"]
    end
    subgraph FILA2["Bloques IV–VI · despliegue y operación"]
        direction LR
        P06["P06 · Kubernetes"] --> P07["P07 · MLOps"] --> P08["P08 · Visión"]
        P08 --> P09["P09 · Harness"] --> P10["P10 · Grafo"]
    end
    FILA1 --> FILA2
    classDef default fill:#fbfaf7,stroke:#b9b1a1,stroke-width:1px,color:#6b3a1f;
```

Si solo puedes hacer tres: **P05**, **P06** y **P07**. Son las que convierten un modelo en un servicio desplegado y gobernado.

## Carga estimada

| Bloque | Sesiones | Horas de aula | Horas de trabajo autónomo |
| --- | --- | --- | --- |
| I · Fundamentos de la nube | 2 | 6 | 4 |
| II · Arquitectura y gobierno | 2 | 6 | 6 |
| III · Datos | 2 | 6 | 6 |
| IV · Ingeniería de plataforma | 4 | 12 | 14 |
| V · IA aplicada | 2 | 6 | 8 |
| VI · Sistemas agénticos | 2 | 6 | 6 |
| **Total** | **14** | **42** | **44** |
