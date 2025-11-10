# Pipeline Diagram - Versión Embebida

> **⚠️ Importante**: El diagrama interactivo a continuación requiere JavaScript habilitado. 
> Si no ves el diagrama, [abre index.html directamente](./index.html).

---

<div align="center">
  <h2>🎯 Diagrama Interactivo de GitHub Actions</h2>
  <p><em>Pasa el mouse sobre los repositorios azules para ver el flujo completo</em></p>
</div>

<details open>
<summary>📊 Ver Diagrama Interactivo</summary>

<div style="background: #05060a; padding: 20px; border-radius: 8px; margin: 20px 0;">

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #05060a;
      color: #e5e5e5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro", sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .diagram {
      display: flex;
      gap: 80px;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      padding: 40px;
    }
    .column {
      border: 2px solid #1e2735;
      border-radius: 18px;
      padding: 16px 18px;
      min-width: 260px;
      position: relative;
    }
    .column-title {
      font-size: 14px;
      color: #7dd3fc;
      margin-bottom: 10px;
    }
    .node {
      border-radius: 14px;
      padding: 8px 10px;
      margin: 8px 0;
      border: 1px solid #44566b;
      font-size: 12px;
      background: rgba(10, 14, 20, 0.96);
      box-shadow: 0 0 0 1px rgba(148, 163, 253, 0.02);
      position: relative;
      transition: all 0.18s ease;
      cursor: default;
      white-space: nowrap;
    }
    .node small {
      display: block;
      opacity: 0.7;
      font-size: 10px;
    }
    .node.repo {
      cursor: pointer;
      border-color: #38bdf8;
    }
    .node.orq {
      border-color: #22c55e88;
    }
    .node.act {
      border-color: #a855f755;
    }
    .node.active {
      border-color: #38bdf8;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.55);
      background: radial-gradient(circle at top, rgba(56, 189, 248, 0.12), #020817);
      color: #e5e5e5;
    }
    svg {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: visible;
    }
    .arrow {
      stroke: #4b5563;
      stroke-width: 1.5;
      marker-end: url(#arrowHead);
      transition: all 0.18s ease;
      opacity: 0.55;
    }
    .arrow.active {
      stroke: #38bdf8;
      stroke-width: 2.4;
      opacity: 1;
      filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.9));
    }
    .arrow-active {
      marker-end: url(#arrowHeadActive);
    }
    .layer-label {
      position: absolute;
      top: -10px;
      left: 18px;
      font-size: 11px;
      color: #9ca3af;
      background: #05060a;
      padding: 0 6px;
    }
  </style>
</head>
<body>
  <!-- El HTML completo del diagrama iría aquí -->
  <!-- Por limitaciones de GitHub Markdown, esto debe abrirse como HTML -->
</body>
</html>
```

</div>

**🔗 [Click aquí para abrir el diagrama interactivo completo](./index.html)**

</details>

---

## 📋 Resumen de Componentes

| Capa | Componente | Descripción | Tipo |
|------|-----------|-------------|------|
| 1 | `activador-python-estandar.yml` | Workflow disparador Python | 🔵 Repo |
| 1 | `activador-nodejs-estandar.yml` | Workflow disparador Node.js | 🔵 Repo |
| 2 | `orquestador-python-estandar.yml` | Orquestador Python | 🟢 Orchestrator |
| 2 | `orquestador-nodejs-estandar.yml` | Orquestador Node.js | 🟢 Orchestrator |
| 3 | `image-build/python` | Build imagen Python | 🟣 Action |
| 3 | `image-build/nodejs` | Build imagen Node.js | 🟣 Action |
| 3 | `quality/sonarqube` | Análisis de calidad | 🟣 Action |
| 3 | `security/detect-secrets` | Detección de secretos | 🟣 Action |
| 3 | `security/sast` | Análisis estático | 🟣 Action |
| 3 | `security/dependency-scan` | Scan de dependencias | 🟣 Action |
| 3 | `security/container-scan` | Scan de contenedores | 🟣 Action |
| 3 | `security/iac-scan` | Scan de IaC | 🟣 Action |

## 🎮 Funcionalidades Interactivas

- ✨ **Hover Effects**: Las flechas se iluminan al pasar el mouse
- 🎯 **Path Highlighting**: Todo el flujo se resalta visualmente
- 📐 **Dynamic Arrows**: Las conexiones se ajustan automáticamente
- 🎨 **Color Coding**: Colores distintos por tipo de componente

## 💡 Alternativas de Visualización

Si el diagrama no se muestra correctamente en tu visualizador Markdown:

1. **Opción 1**: Abre `index.html` directamente en tu navegador
2. **Opción 2**: Usa GitHub Pages para hostear el diagrama
3. **Opción 3**: Convierte el diagrama a imagen estática (PNG/SVG)

---

<div align="center">
  <sub>Creado con HTML5 + CSS3 + JavaScript Vanilla</sub>
</div>
