# Pipeline Diagram - Vista Interactiva

## Diagrama de Flujo de GitHub Actions

<div align="center">

[[Pipeline Diagram](./diagram-preview.png)](./index.html)
*Click en la imagen para ver el diagrama interactivo*

---

## 📖 Instrucciones de Uso

1. **Hover sobre repositorios**: Pasa el mouse sobre los nodos azules (`activador-python` o `activador-node`)
2. **Observa el flujo**: Las flechas y nodos conectados se iluminan automáticamente
3. **Identifica dependencias**: Visualiza fácilmente qué actions se ejecutan para cada repositorio

## 🏗️ Estructura del Pipeline

```
Capa 1 (Repos)          Capa 2 (Orquestadores)        Capa 3 (Actions)
──────────────          ──────────────────────        ────────────────
                                                      
activador-python  ────▶  orq-python-estandar  ────▶  image-build-python
     (Repo A)                                    └──▶  sonar
                                                 └──▶  detect-secrets
                                                 └──▶  sast
                                                 └──▶  dependency-scan
                                                 └──▶  container-scan
                                                 └──▶  iac-scan

activador-node    ────▶  orq-nodejs-estandar  ────▶  image-build-nodejs
     (Repo B)                                    └──▶  sonar
                                                 └──▶  detect-secrets
                                                 └──▶  sast
                                                 └──▶  dependency-scan
                                                 └──▶  container-scan
                                                 └──▶  iac-scan
```

## 🎨 Características

- **Interactivo**: Efectos hover en tiempo real
- **Dinámico**: Las flechas se calculan automáticamente
- **Visual**: Código de colores por tipo de componente
  - 🔵 Azul: Repositorios disparadores
  - 🟢 Verde: Orquestadores
  - 🟣 Púrpura: Composite Actions

## 🛠️ Tecnología

- HTML5 + CSS3
- JavaScript Vanilla (sin dependencias)
- SVG dinámico para las conexiones
