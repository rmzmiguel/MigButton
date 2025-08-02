# FancyButton - Instalación desde GitHub

Un componente de botón React elegante y personalizable, instalable directamente desde GitHub. Compatible con **cualquier versión de React** y tanto **TypeScript** como **JavaScript**.

## 🚀 Instalación desde GitHub

### Opción 1: Instalación directa desde GitHub
```bash
npm install git+https://github.com/tuusuario/fancy-button.git
```

### Opción 2: Desde GitHub Packages (requiere configuración)
```bash
# Crear .npmrc en tu proyecto
echo "@tuusuario:registry=https://npm.pkg.github.com" >> .npmrc

# Instalar
npm install @tuusuario/fancy-button
```

### Opción 3: Instalación desde rama específica
```bash
npm install git+https://github.com/tuusuario/fancy-button.git#main
```

### Opción 4: Instalación desde tag/release
```bash
npm install git+https://github.com/tuusuario/fancy-button.git#v1.0.0
```

## ✅ Compatibilidad Total

- ✅ **React 16.8+, 17.x, 18.x** - Compatible con todas las versiones
- ✅ **TypeScript y JavaScript** - Funciona en ambos sin configuración
- ✅ **Next.js, Vite, Create React App** - Compatible con todos los bundlers
- ✅ **Node.js 14+** - Sin restricciones estrictas de versión

## 💻 Uso

### JavaScript (sin TypeScript)
```jsx
import React from 'react';
import FancyButton from '@tuusuario/fancy-button';
import '@tuusuario/fancy-button/dist/FancyButton.css';

function App() {
  return (
    <div>
      <FancyButton variant="3d" size="large">
        Mi Botón Increíble
      </FancyButton>
      
      <FancyButton 
        variant="outline" 
        backgroundColor="#e74c3c"
        onClick={() => alert('¡Funciona!')}
      >
        Botón Rojo
      </FancyButton>
    </div>
  );
}

export default App;
```

### TypeScript (con tipos automáticos)
```tsx
import React from 'react';
import FancyButton, { FancyButtonProps, Variant } from '@tuusuario/fancy-button';
import '@tuusuario/fancy-button/dist/FancyButton.css';

function App() {
  const handleClick = () => {
    console.log('¡Botón clickeado!');
  };

  const buttonProps: FancyButtonProps = {
    variant: "flat" as Variant,
    size: "medium",
    hoverColor: "#3498db"
  };

  return (
    <div>
      <FancyButton {...buttonProps} onClick={handleClick}>
        Botón con Props
      </FancyButton>
      
      <FancyButton 
        variant="classic" 
        appearance="classic"
        fullWidth
      >
        Botón Ancho Completo
      </FancyButton>
    </div>
  );
}

export default App;
```

## 🎨 Todas las Props Disponibles

```jsx
<FancyButton
  // Contenido
  children="Mi Botón"
  
  // Estilos
  variant="3d"           // '3d' | 'flat' | 'outline' | 'text'
  appearance="classic"   // '3d' | 'classic'
  size="medium"          // 'small' | 'medium' | 'large'
  
  // Colores personalizados
  backgroundColor="#3498db"
  color="#ffffff"
  borderColor="#2980b9"
  hoverColor="#2980b9"
  
  // Iconos
  startIcon={<HomeIcon />}
  endIcon={<ArrowIcon />}
  iconOnly={false}
  
  // Comportamiento
  disabled={false}
  ripple={true}
  onClick={handleClick}
  
  // Layout
  fullWidth={false}
  maxWidth="300px"
  
  // Props adicionales de HTML
  className="mi-clase-custom"
  style={{ margin: '10px' }}
  id="mi-boton"
  data-testid="fancy-button"
/>
```

## 🛠️ Ejemplos Prácticos

### Con React Router
```jsx
import { Link } from 'react-router-dom';

<FancyButton 
  as={Link} 
  to="/dashboard"
  variant="outline"
>
  Ir al Dashboard
</FancyButton>
```

### Con Formularios
```jsx
<form onSubmit={handleSubmit}>
  <FancyButton 
    type="submit" 
    variant="3d" 
    fullWidth
    disabled={isLoading}
  >
    {isLoading ? 'Enviando...' : 'Enviar'}
  </FancyButton>
</form>
```

### Con Estados Dinámicos
```jsx
const [isActive, setIsActive] = useState(false);

<FancyButton
  variant={isActive ? "flat" : "outline"}
  backgroundColor={isActive ? "#27ae60" : "transparent"}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? 'Activado' : 'Desactivado'}
</FancyButton>
```

## 🔧 Configuración de Proyecto

### Para proyectos JavaScript
No se requiere configuración adicional. Solo instala e importa.

### Para proyectos TypeScript
Los tipos se incluyen automáticamente. Si hay problemas:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### Para Next.js
```js
// next.config.js
module.exports = {
  transpilePackages: ['@tuusuario/fancy-button']
};
```

## 🐛 Solución de Problemas

### Error: "Module not found"
```bash
# Reinstalar desde GitHub
npm uninstall @tuusuario/fancy-button
npm install git+https://github.com/tuusuario/fancy-button.git --save
```

### Error: "Build failed"
```bash
# El paquete incluye archivos pre-compilados como respaldo
# Si el build automático falla, aún funcionará
```

### Error de tipos en TypeScript
```bash
# Generar tipos manualmente
npm run build --prefix node_modules/@tuusuario/fancy-button
```

### CSS no se aplica
```jsx
// Asegúrate de importar el CSS
import '@tuusuario/fancy-button/dist/FancyButton.css';

// O cópialo a tu proyecto
// cp node_modules/@tuusuario/fancy-button/dist/FancyButton.css src/
```

## 🔄 Actualizaciones

Para actualizar a la última versión:

```bash
npm update @tuusuario/fancy-button
```

O reinstalar:
```bash
npm uninstall @tuusuario/fancy-button
npm install git+https://github.com/tuusuario/fancy-button.git
```

## 📋 Comparación de Métodos de Instalación

| Método | Pros | Contras |
|--------|------|---------|
| Git directo | Simple, siempre actualizado | Requiere git |
| GitHub Packages | Versionado, caché npm | Requiere configuración |
| Rama específica | Control de versión | Manual |
| Tag/Release | Estable, reproducible | Puede estar desactualizado |

## 🚀 Desarrollo Local

Si quieres contribuir o modificar:

```bash
# Clonar
git clone https://github.com/tuusuario/fancy-button.git
cd fancy-button

# Instalar
npm install

# Desarrollar
npm run dev

# Build
npm run build

# Probar en tu proyecto
npm link
cd ../tu-proyecto
npm link @tuusuario/fancy-button
```

## 📄 Licencia

MIT - Úsalo libremente en proyectos personales y comerciales.

---

**⭐ Si te resulta útil, dale una estrella al repo!**

**🐛 ¿Encontraste un bug?** [Crea un issue](https://github.com/tuusuario/fancy-button/issues)

**💡 ¿Tienes una idea?** [Inicia una discusión](https://github.com/tuusuario/fancy-button/discussions)
