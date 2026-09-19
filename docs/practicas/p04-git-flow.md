# P04 · Flujo Git colaborativo completo

<div class="modulo-meta" markdown>
<span>:material-book-open-variant: Módulo 07</span>
<span>:material-clock-outline: 90 minutos</span>
<span>:material-tools: Git, plataforma de alojamiento, DVC</span>
</div>

## Objetivo

Convertir el código de las prácticas anteriores en un repositorio con historial legible, protección de ramas, versionado de datos y un flujo de colaboración que resista errores.

## Desarrollo

### 1. Estructura del repositorio

```text
agrovision/
├── AGENTS.md                 # se usará en P09
├── ARCHITECTURE.md
├── README.md
├── .gitignore
├── .pre-commit-config.yaml
├── docs/
│   ├── decisiones/           # ADR de P02
│   └── progreso.md
├── contratos/
├── src/
│   ├── borde/
│   ├── pipeline/
│   └── servicio/
├── tests/
└── datos/
    └── .gitignore            # los datos NO van en Git
```

### 2. Configuración que evita desastres

```bash
git config --local user.name "..."
git config --local user.email "..."
git config --local pull.rebase true
git config --local rerere.enabled true
git config --local commit.gpgsign true
```

Documenta en el README por qué cada una.

### 3. Protección de la rama principal

En la plataforma, configura y **captura la pantalla** de:

- [ ] Pull request obligatorio.
- [ ] Al menos una aprobación.
- [ ] CI en verde obligatoria.
- [ ] Rama actualizada antes de fusionar.
- [ ] Commits firmados.
- [ ] Push forzado prohibido.

### 4. Escaneo de secretos

```bash
pip install pre-commit detect-secrets
detect-secrets scan > .secrets.baseline
pre-commit install
```

Intenta hacer commit de un archivo con una credencial falsa. **Verifica que el gancho lo bloquea.** Documenta el mensaje de error.

### 5. Versionado de datos con DVC

```bash
dvc init
dvc remote add -d almacen s3://mi-bucket/agrovision   # o local para el laboratorio
dvc add datos/lecturas_historicas.parquet
git add datos/lecturas_historicas.parquet.dvc datos/.gitignore
git commit -m "chore(datos): versionar histórico de lecturas v1"
dvc push
```

Verifica que desde un clon limpio puedes recuperar los datos con `dvc pull`.

### 6. Simula la colaboración de tres personas

Trabajando en tres ramas simultáneas:

| Rama | Cambio | Debe generar |
| --- | --- | --- |
| `feat/umbral-humedad` | Cambiar el umbral de alerta | Conflicto con la siguiente |
| `feat/umbral-por-cultivo` | Umbral diferenciado por tipo de cultivo | Conflicto con la anterior |
| `fix/tiempo-evento` | Corregir el uso de tiempo de evento | Sin conflicto |

Resuelve el conflicto de forma que **la solución final sea mejor que cualquiera de las dos versiones**, no simplemente elegir una.

### 7. Commits atómicos con `add -p`

Haz un cambio que mezcle tres cosas lógicamente distintas en el mismo archivo. Sepáralo en tres commits usando `git add -p`. Muestra el `git log --oneline` resultante.

### 8. El rescate

```bash
git log --oneline          # anota el hash actual
git reset --hard HEAD~4    # "pierde" cuatro commits
git reflog                 # encuéntralos
git reset --hard <hash>    # recupéralos
```

Documenta los comandos exactos y explica **por qué funciona `reflog`** en términos del modelo de datos de Git.

### 9. Merge contra rebase

Crea la misma situación dos veces y resuélvela con merge en un caso y con rebase en el otro. Muestra ambos `git log --graph` y explica en tres líneas por qué cambió el hash en el rebase.

### 10. Pull request completo

Abre un pull request real que incluya:

- Descripción que explica el **porqué**, no el qué.
- Referencia al ADR correspondiente.
- Evidencia de verificación (salida de pruebas).
- Al menos una ronda de comentarios y su resolución.

## Entregable

1. URL del repositorio con el historial completo.
2. Capturas de la configuración de protección de rama.
3. El mensaje de bloqueo del escáner de secretos.
4. Salida de `git log --oneline --graph --all` mostrando las tres ramas y el conflicto resuelto.
5. Salida de `git reflog` del rescate.
6. Los dos grafos comparando merge y rebase, con la explicación.
7. Enlace al pull request con sus comentarios.
8. Verificación de que `git clone` + `dvc pull` reconstruye el proyecto completo en una máquina limpia.

## Criterios de evaluación

| Criterio | Qué se espera |
| --- | --- |
| Reproducible (40 %) | Un clon limpio + `dvc pull` + `./init.sh` deja el proyecto funcionando |
| Justificación (30 %) | Los mensajes de commit explican el porqué; el conflicto se resolvió mejorando |
| Medición (20 %) | Las evidencias son salidas reales de comandos, no descripciones |
| Documentación (10 %) | El README permite a alguien nuevo empezar sin preguntar |

!!! warning "El error más común en esta práctica"
    Resolver el conflicto eligiendo una de las dos versiones con `--ours` o `--theirs`. En este caso concreto, la solución correcta es el umbral por cultivo **incorporando** el valor ajustado de la otra rama. Un conflicto bien resuelto produce algo que ninguna de las dos ramas tenía.
