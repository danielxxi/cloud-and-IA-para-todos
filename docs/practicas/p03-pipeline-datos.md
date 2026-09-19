# P03 · Pipeline de datos Lake + ETL

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulos 05–06</span>
<span>:material-clock-outline: 120 minutos</span>
<span>:material-tools: Python, DuckDB, MQTT</span>
</div>

## Objetivo

Construir la canalización de datos de AgroVisión: desde los sensores en campo hasta las zonas bronce, plata y oro, con contratos, validación y reducción de tráfico en el borde.

## Requisitos

```bash
pip install duckdb pandas pyarrow paho-mqtt
docker run -d --name mosquitto -p 1883:1883 eclipse-mosquitto:2
```

## Desarrollo

### 1. Contrato de datos

Escribe `contratos/lecturas_sensor.yaml` con el formato del módulo 05. Debe incluir esquema tipado, garantías de frescura y completitud, propietario y política de cambios.

Los campos mínimos: `sensor_id`, `parcela_id`, `humedad_suelo`, `temperatura`, `ocurrido_en` (UTC), `bateria_pct`.

### 2. Simulador de campo con degradación realista

Genera datos que **no** sean perfectos. Incluye deliberadamente:

- 3 % de mensajes duplicados (reintentos de red).
- 1.5 % de lecturas fuera de rango físico.
- 2 % de mensajes con `ocurrido_en` desfasado hasta 6 horas (el dispositivo estuvo sin conexión).
- Batería que decae y por debajo del 15 % produce lecturas erráticas.

### 3. Nodo de borde con reducción de tráfico

Implementa el nodo que:

1. Recibe por MQTT todas las lecturas.
2. Mantiene una ventana móvil por sensor.
3. Publica al backend **solo** cuando hay anomalía o cada 30 minutos un agregado.
4. Si no puede publicar, **almacena localmente y reenvía** al recuperar conexión.

**Mide y reporta la reducción de tráfico.** Debería superar el 95 %.

### 4. Zona bronce

Carga los datos crudos **sin transformar** en Parquet particionado por `fecha` y `parcela_id`.

!!! warning "Bronce es inmutable"
    Los duplicados y las lecturas inválidas **se conservan** en bronce. Bronce registra lo que ocurrió, no lo que debería haber ocurrido.

### 5. Validación y cuarentena

Separa en una tabla de cuarentena todo lo que viole el contrato, con el motivo. Reporta el desglose por motivo.

### 6. Zona plata

Limpia, deduplica y tipa. Resuelve explícitamente el problema del **tiempo de evento**: usa `ocurrido_en`, no la hora de recepción, y define una marca de agua de 48 horas para datos tardíos.

### 7. Pruebas de calidad que fallan la ejecución

Implementa al menos seis pruebas, una por cada dimensión de calidad del módulo 05. Deben lanzar excepción, no imprimir un aviso.

### 8. Zona oro

Genera las tablas de consumo:

- `oro_parcela_diario`: agregados por parcela y día.
- `oro_alertas`: eventos de anomalía con su contexto.
- `oro_features`: la tabla que alimentará el modelo de la práctica P08.

### 9. Idempotencia

Ejecuta la canalización completa dos veces sobre el mismo periodo. Verifica automáticamente que el resultado es idéntico:

```python
assert hash_tabla("oro_parcela_diario", ejecucion_1) == hash_tabla("oro_parcela_diario", ejecucion_2)
```

Si falla, corrígelo. Una canalización no idempotente no es apta para producción.

## Entregable

1. El contrato de datos en YAML.
2. El código completo de simulador, nodo de borde y canalización.
3. **Tabla de métricas:**

| Métrica | Valor |
| --- | --- |
| Lecturas generadas en campo | |
| Mensajes transmitidos al backend | |
| Reducción de tráfico | % |
| Filas en bronce | |
| Filas en cuarentena (por motivo) | |
| Tasa de deduplicación | |
| Filas en plata | |
| Tamaño JSONL vs Parquet | |
| Eventos tardíos procesados | |

4. La salida de las pruebas de calidad.
5. La verificación de idempotencia.
6. Un párrafo explicando **cómo decidiste la marca de agua de 48 horas** y qué pasa con lo que llega después.

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | La canalización corre de cero y es idempotente |
| Justificación (30 %) | Las decisiones de deduplicación y marca de agua están argumentadas |
| Medición (20 %) | Todas las métricas están reportadas con números |
| Documentación (10 %) | El contrato es comprensible para quien produce los datos |

!!! tip "El punto que más enseña"
    La distinción entre tiempo de evento y tiempo de procesamiento. Si agregas por hora de recepción, tus totales diarios estarán mal para el 2 % de mensajes tardíos — y ese 2 % será precisamente el de las parcelas con peor conectividad, que suelen ser las más remotas. El error no es aleatorio: está sesgado.
