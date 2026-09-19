# P01 · Comparar modelos de servicio y costos

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulos 01–02</span>
<span>:material-clock-outline: 90 minutos</span>
<span>:material-tools: Navegador y hoja de cálculo</span>
</div>

## Objetivo

Decidir, con números y no con intuición, sobre qué modelo de servicio se construye la plataforma de AgroVisión.

## Contexto

Recuerda las restricciones del caso: estacionalidad 4/8 meses, presupuesto de 2 500 USD/mes en temporada alta, datos sensibles por socio, alerta en menos de 30 minutos.

## Desarrollo

### 1. Dimensiona la carga

Completa la estimación:

| Concepto | Temporada alta | Temporada baja |
| --- | --- | --- |
| Imágenes procesadas/día | 18 000 | 1 200 |
| Tamaño medio por imagen | 2.4 MB | 2.4 MB |
| Almacenamiento acumulado/mes | | |
| Inferencias/segundo en pico | | |
| Usuarios concurrentes | 40 | 6 |

### 2. Diseña las cuatro variantes

Para cada modelo, especifica los componentes concretos:

=== "IaaS"

    | Componente | Especificación | Costo/mes alta | Costo/mes baja |
    | --- | --- | --- | --- |
    | Máquinas virtuales | | | |
    | Almacenamiento de objetos | | | |
    | Base de datos en VM | | | |
    | Balanceador | | | |
    | Transferencia de salida | | | |

=== "PaaS"

    | Componente | Especificación | Costo/mes alta | Costo/mes baja |
    | --- | --- | --- | --- |
    | Plataforma de aplicación | | | |
    | Base de datos gestionada | | | |
    | Almacenamiento de objetos | | | |
    | Cola gestionada | | | |

=== "FaaS"

    | Componente | Invocaciones/mes | GB-segundo | Costo/mes alta | Costo/mes baja |
    | --- | --- | --- | --- | --- |
    | Función de ingesta | | | | |
    | Función de inferencia | | | | |
    | Almacenamiento | | | | |

=== "CaaS"

    | Componente | Especificación | Costo/mes alta | Costo/mes baja |
    | --- | --- | --- | --- |
    | Clúster gestionado (cuota fija) | | | |
    | Nodos de cómputo | | | |
    | Nodo con GPU | | | |
    | Almacenamiento y red | | | |

### 3. Usa las calculadoras reales

No inventes precios. Usa las calculadoras oficiales de al menos dos proveedores y anota las URL de las configuraciones que generes.

Para cada uno, calcula además las tres modalidades de compra: bajo demanda, compromiso de 1 año y capacidad interrumpible.

### 4. Calcula el costo anual ponderado

$$
C_{\text{anual}} = 4 \times C_{\text{alta}} + 8 \times C_{\text{baja}}
$$

### 5. Evalúa las restricciones no económicas

| Restricción | IaaS | PaaS | FaaS | CaaS |
| --- | --- | --- | --- | --- |
| Alerta en < 30 min | | | | |
| Datos sensibles por socio aislados | | | | |
| Equipo de 2 personas sin experiencia en infraestructura | | | | |
| Portabilidad a otro proveedor | | | | |
| Escala a casi cero en temporada baja | | | | |

### 6. Analiza el arranque en frío

Para la variante FaaS, investiga y documenta: ¿cuánto tardaría en cargar un modelo de visión de 180 MB en una función? ¿Cumple el requisito de 30 minutos? ¿Y si el requisito fuera de 5 segundos?

## Entregable

1. **Hoja de cálculo** con las cuatro variantes desglosadas y el costo anual ponderado.
2. **Tabla de restricciones no económicas** completada con justificación de una línea por celda.
3. **Recomendación de una página** que incluya obligatoriamente:
   - El modelo recomendado y por qué.
   - El modelo descartado más caro de descartar, y qué se pierde.
   - Bajo qué condición futura cambiarías de recomendación.
4. **Gráfico** del costo total en función del volumen, con los puntos de cruce marcados.

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | Los precios provienen de calculadoras reales con configuración documentada |
| Justificación (30 %) | La recomendación deriva de las restricciones, no de una preferencia |
| Medición (20 %) | Hay números en todas las celdas y los puntos de cruce están calculados |
| Documentación (10 %) | Otra persona puede reproducir el análisis sin preguntarte nada |

!!! warning "Error frecuente"
    Olvidar la transferencia de salida y el almacenamiento acumulado. En un caso con imágenes, ambos suelen superar al costo de cómputo a partir del sexto mes. Si tu tabla no los incluye, el análisis está incompleto.
