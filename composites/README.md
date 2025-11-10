# Diagrama Interactivo de GitHub Actions

Este diagrama muestra el flujo de trabajo de las GitHub Actions para los pipelines estándar.

## 🎯 Cómo Usar

1. **Hover sobre los repositorios**: Pasa el mouse sobre `activador-python` o `activador-node` para ver el flujo completo iluminado
2. **Visualización del flujo**: Las flechas y nodos conectados se resaltan en azul brillante

## 📊 Visualización Interactiva

> **Nota**: Para ver el diagrama interactivo, abre el archivo `index.html` en tu navegador.

[👉 Abrir Diagrama Interactivo](./index.html)

## 📸 Vista Previa

![Pipeline Diagram Preview](./diagram-preview.png)

## 🔧 Componentes del Diagrama

### Capa 1: Repositorios / Workflows Disparadores
- `activador-python-estandar.yml` (Repo A)
- `activador-nodejs-estandar.yml` (Repo B)

### Capa 2: Orquestadores
- `orquestador-python-estandar.yml`
- `orquestador-nodejs-estandar.yml`

### Capa 3: Composite Actions Reutilizables
- **Image Build**: `image-build-python.sh`, `image-build-nodejs.sh`
- **Quality**: `sonarqube`
- **Security**: 
  - `detect-secrets`
  - `sast`
  - `dependency-scan`
  - `container-scan`
  - `iac-scan`

## 🚀 Características

- ✨ Flechas dinámicas que se ajustan automáticamente
- 🎨 Efectos de hover interactivos
- 📱 Diseño responsive
- 🎯 Visualización clara de dependencias

---

**Tecnología**: HTML + CSS + JavaScript (Vanilla)
