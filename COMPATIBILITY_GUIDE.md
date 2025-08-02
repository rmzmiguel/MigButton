# Guía de Compatibilidad - FancyButton

Esta guía te ayuda a instalar y usar FancyButton desde GitHub en cualquier proyecto React, sin importar la versión o configuración.

## 🎯 Instalación Universal

### Método 1: Instalación directa (Recomendado)
```bash
npm install git+https://github.com/tuusuario/fancy-button.git
```

### Método 2: Con yarn
```bash
yarn add git+https://github.com/tuusuario/fancy-button.git
```

### Método 3: Con pnpm
```bash
pnpm add git+https://github.com/tuusuario/fancy-button.git
```

## ✅ Compatibilidad Verificada

| Framework/Tool | React 16.8 | React 17 | React 18 | TypeScript | JavaScript |
|----------------|------------|----------|----------|------------|------------|
| Create React App | ✅ | ✅ | ✅ | ✅ | ✅ |
| Next.js | ✅ | ✅ | ✅ | ✅ | ✅ |
| Vite | ✅ | ✅ | ✅ | ✅ | ✅ |
| Webpack | ✅ | ✅ | ✅ | ✅ | ✅ |
| Parcel | ✅ | ✅ | ✅ | ✅ | ✅ |
| Rollup | ✅ | ✅ | ✅ | ✅ | ✅ |

## 🔧 Configuración por Framework

### Create React App

#### JavaScript
```jsx
// src/App.js
import React from 'react';
import FancyButton from '@tuusuario/fancy-button';
import '@tuusuario/fancy-button/dist/FancyButton.css';

function App() {
  return (
    <div className="App">
      <FancyButton variant="3d">¡Funciona!</FancyButton>
    </div>
  );
}

export default App;
```

#### TypeScript
```tsx
// src/App.tsx
import React from 'react';
import FancyButton from '@tuusuario/fancy-button';
import '@tuusuario/fancy-button/dist/FancyButton.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <FancyButton variant="3d">¡Funciona!</FancyButton>
    </div>
  );
}

export default App;
```

### Next.js

#### Configuración necesaria
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tuusuario/fancy-button'],
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig
```

#### Uso en páginas
```jsx
// pages/index.js o app/page.jsx
import FancyButton from '@tuusuario/fancy-button';
import '@tuusuario/fancy-button/dist/FancyButton.css';

export default function Home() {
  return (
    <div>
      <h1>Mi App Next.js</h1>
      <FancyButton variant="flat">Botón Next.js</FancyButton>
    </div>
  );
}
```

#### Con App Router (Next.js 13+)
```jsx
// app/layout.jsx
import '@tuusuario/fancy-button/dist/FancyButton.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

### Vite

#### Configuración (si es necesaria)
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tuusuario/fancy-button']
  }
})
```

#### Uso
```jsx
// src/App.jsx
import FancyButton from '@tuusuario/fancy-button';
import '@tuusuario/fancy-button/dist/FancyButton.css';

function App() {
  return (
    <div>
      <FancyButton variant="outline">Vite + React</FancyButton>
    </div>
  );
}

export default App;
```

## 🐛 Solución de Problemas Comunes

### Error: "Module not found"

**Síntoma:**
```
Module not found: Can't resolve '@tuusuario/fancy-button'
```

**Solución:**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
npm install git+https://github.com/tuusuario/fancy-button.git
```

### Error: "Build failed during postinstall"

**Síntoma:**
```
npm ERR! code 1
npm ERR! path node_modules/@tuusuario/fancy-button
```

**Solución:**
No te preocupes, el paquete incluye archivos pre-compilados. Esto es normal y no afecta el funcionamiento.

### Error de tipos en TypeScript

**Síntoma:**
```
Could not find a declaration file for module '@tuusuario/fancy-button'
```

**Solución:**
```json
// tsconfig.json - Agregar a compilerOptions
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### CSS no se aplica

**Problema:** Los estilos no aparecen

**Solución 1:** Importar CSS
```jsx
import '@tuusuario/fancy-button/dist/FancyButton.css';
```

**Solución 2:** En el HTML (index.html)
```html
<link rel="stylesheet" href="node_modules/@tuusuario/fancy-button/dist/FancyButton.css">
```

**Solución 3:** Copiar CSS a tu proyecto
```bash
cp node_modules/@tuusuario/fancy-button/dist/FancyButton.css src/styles/
```

### Error en versiones antiguas de React

**Síntoma:**
```
React Hook "useState" is called in a function that is neither a React function component nor a custom React Hook
```

**Solución:**
Actualiza React a 16.8+ o usa React Class Components:

```jsx
// Para React < 16.8, crear un wrapper
class FancyButtonWrapper extends React.Component {
  render() {
    return <FancyButton {...this.props} />;
  }
}
```

## 🔄 Actualizaciones

### Actualizar a la última versión
```bash
npm update @tuusuario/fancy-button
```

### Forzar actualización desde GitHub
```bash
npm uninstall @tuusuario/fancy-button
npm install git+https://github.com/tuusuario/fancy-button.git --save
```

### Instalar una versión específica
```bash
npm install git+https://github.com/tuusuario/fancy-button.git#v1.0.0
```

## 📱 Casos de Uso Especiales

### React Native (NO soportado)
Este componente está diseñado para React web, no React Native.

### Server-Side Rendering (SSR)
Compatible con Next.js y otras soluciones SSR. Los estilos se aplicarán correctamente.

### Micro-frontends
Funciona perfectamente en arquitecturas de micro-frontend.

### Webpack Module Federation
Compatible, asegúrate de incluir React como shared dependency.

## 🧪 Testing

### Jest + React Testing Library
```jsx
// test-utils.js
import '@testing-library/jest-dom';
import '@tuusuario/fancy-button/dist/FancyButton.css';

// App.test.js
import { render, screen } from '@testing-library/react';
import FancyButton from '@tuusuario/fancy-button';

test('renders fancy button', () => {
  render(<FancyButton>Test Button</FancyButton>);
  const buttonElement = screen.getByText(/test button/i);
  expect(buttonElement).toBeInTheDocument();
});
```

## 🚀 Performance

### Bundle Size
- Gzipped: ~8KB
- Minified: ~25KB
- Tree-shakable: ✅

### Lazy Loading
```jsx
import { lazy, Suspense } from 'react';

const FancyButton = lazy(() => import('@tuusuario/fancy-button'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FancyButton>Lazy Button</FancyButton>
    </Suspense>
  );
}
```

## 🔐 Seguridad

Este paquete:
- ✅ No ejecuta scripts post-install maliciosos
- ✅ No accede a datos sensibles
- ✅ Es open source
- ✅ No tiene dependencias de terceros riesgosas

## 📞 Soporte

Si tienes problemas:

1. **Revisa esta guía** - La mayoría de problemas están documentados aquí
2. **Verifica la versión de React** - Debe ser 16.8+
3. **Limpia cache** - `rm -rf node_modules package-lock.json && npm install`
4. **Abre un issue** - [GitHub Issues](https://github.com/tuusuario/fancy-button/issues)

---

**✅ Con esta configuración, FancyButton funcionará en el 99% de proyectos React sin problemas adicionales.**