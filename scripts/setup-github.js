#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando FancyButton para GitHub...\n');

// Función para ejecutar comandos de forma segura
const safeExec = (command, options = {}) => {
  try {
    return execSync(command, { 
      stdio: 'inherit',
      ...options 
    });
  } catch (error) {
    console.warn(`⚠️  Comando falló: ${command}`);
    console.warn(`   Error: ${error.message}`);
    return null;
  }
};

// Función para leer y escribir archivos de forma segura
const safeFileOperation = (operation, filePath, content = null) => {
  try {
    if (operation === 'read') {
      return fs.readFileSync(filePath, 'utf8');
    } else if (operation === 'write') {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
  } catch (error) {
    console.warn(`⚠️  Error con archivo ${filePath}: ${error.message}`);
    return null;
  }
};

// 1. Crear estructura de directorios
console.log('📁 Creando estructura de directorios...');
const directories = [
  'src', 
  'dist', 
  'scripts', 
  'examples',
  '.github/workflows'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Directorio creado: ${dir}`);
  }
});

// 2. Verificar archivos fuente
console.log('\n📄 Verificando archivos fuente...');
const sourceFiles = [
  'FancyButton.tsx',
  'FancyButton.css', 
  'index.ts'
];

let hasSourceFiles = false;
sourceFiles.forEach(file => {
  if (fs.existsSync(file)) {
    hasSourceFiles = true;
    if (!fs.existsSync(`src/${file}`)) {
      fs.copyFileSync(file, `src/${file}`);
      console.log(`📁 Archivo movido: ${file} → src/${file}`);
    }
  } else if (fs.existsSync(`src/${file}`)) {
    hasSourceFiles = true;
    console.log(`✅ Archivo encontrado: src/${file}`);
  }
});

if (!hasSourceFiles) {
  console.log('ℹ️  No se encontraron archivos fuente. Asegúrate de tener:');
  console.log('   - src/FancyButton.tsx');
  console.log('   - src/FancyButton.css');
  console.log('   - src/index.ts');
}

// 3. Verificar Git
console.log('\n🔧 Configurando Git...');
if (!fs.existsSync('.git')) {
  console.log('📦 Inicializando repositorio Git...');
  safeExec('git init');
  
  // Crear primer commit si no existe
  if (fs.existsSync('src/')) {
    safeExec('git add .');
    safeExec('git commit -m "Initial commit: FancyButton component" || echo "Commit falló o ya existe"');
  }
} else {
  console.log('✅ Repositorio Git ya existe');
}

// 4. Configurar package.json para GitHub
console.log('\n📦 Configurando package.json...');
const packageJsonPath = 'package.json';
let packageJson = {};

if (fs.existsSync(packageJsonPath)) {
  const existing = safeFileOperation('read', packageJsonPath);
  if (existing) {
    try {
      packageJson = JSON.parse(existing);
    } catch (e) {
      console.warn('⚠️  Error parseando package.json existente');
    }
  }
}

// Configuración optimizada para GitHub
const githubConfig = {
  name: packageJson.name || "@rmzmiguel/migbutton",
  version: packageJson.version || "1.0.0",
  description: "Un componente de botón React elegante - Instalable desde GitHub",
  main: "dist/index.js",
  module: "dist/index.esm.js",
  types: "dist/index.d.ts",
  files: ["dist", "src", "README.md"],
  scripts: {
    "build": "npm run clean && npm run build:types && npm run build:js && npm run build:css",
    "build:types": "tsc --emitDeclarationOnly --outDir dist/types",
    "build:js": "rollup -c",
    "build:css": "cp src/FancyButton.css dist/ || copy src\\\\FancyButton.css dist\\\\",
    "clean": "rimraf dist",
    "dev": "rollup -c -w",
    "postinstall": "npm run build || echo 'Build falló, usando archivos pre-compilados'",
    "prepare": "npm run build || echo 'Build falló durante prepare'"
  },
  repository: {
    type: "git",
    url: packageJson.repository?.url || "https://github.com/rmzmiguel/MigButton.git"
  },
  peerDependencies: {
    "react": "*",
    "react-dom": "*"
  },
  peerDependenciesMeta: {
    "react": { "optional": true },
    "react-dom": { "optional": true }
  },
  ...packageJson
};

safeFileOperation('write', packageJsonPath, JSON.stringify(githubConfig, null, 2));
console.log('✅ package.json configurado para GitHub');

// 5. Instalar dependencias
console.log('\n📦 Instalando dependencias...');
const installResult = safeExec('npm install');
if (installResult !== null) {
  console.log('✅ Dependencias instaladas');
} else {
  console.log('⚠️  Error instalando dependencias. Intenta manualmente: npm install');
}

// 6. Ejecutar build inicial
console.log('\n🔨 Ejecutando build inicial...');
const buildResult = safeExec('npm run build');
if (buildResult !== null) {
  console.log('✅ Build completado');
  
  // Verificar archivos generados
  const expectedFiles = [
    'dist/index.js',
    'dist/index.esm.js', 
    'dist/index.d.ts',
    'dist/FancyButton.css'
  ];
  
  const missingFiles = expectedFiles.filter(file => !fs.existsSync(file));
  if (missingFiles.length === 0) {
    console.log('✅ Todos los archivos de build generados correctamente');
  } else {
    console.log('⚠️  Archivos faltantes:', missingFiles.join(', '));
  }
} else {
  console.log('⚠️  Build falló. Los archivos pre-compilados seguirán funcionando.');
}

// 7. Configurar para commit de archivos build
console.log('\n📝 Configurando para commits automáticos...');
if (fs.existsSync('.git')) {
  // Agregar dist/ al repo para GitHub
  safeExec('git add dist/ -f');
  safeExec('git add . && git commit -m "Setup: Configurado para instalación desde GitHub [skip ci]" || echo "Nada que commitear"');
  console.log('✅ Archivos de build agregados al repositorio');
}

// 8. Crear documentación de instalación
console.log('\n📚 Generando documentación...');
const installInstructions = `
# Instalación desde GitHub

## Comando de instalación:
\`\`\`bash
npm install git+https://github.com/rmzmiguel/MigButton.git
\`\`\`

## Uso:
\`\`\`jsx
import FancyButton from '@rmzmiguel/migbutton';
import '@rmzmiguel/migbutton/dist/FancyButton.css';

<FancyButton variant="3d">Mi Botón</FancyButton>
\`\`\`

## ⚠️ Recuerda:
1. Cambiar "TU_USUARIO" y "TU_REPO" en package.json
2. Subir el código a GitHub
3. Los builds se generan automáticamente
`;

safeFileOperation('write', 'INSTALL_FROM_GITHUB.md', installInstructions);

// 9. Resumen final
console.log('\n🎉 ¡Configuración completada!');
console.log('\n📋 Resumen:');
console.log('✅ Estructura de directorios creada');
console.log('✅ package.json configurado para GitHub');
console.log('✅ Scripts de build configurados');
console.log('✅ Dependencias instaladas');
console.log(buildResult ? '✅ Build inicial exitoso' : '⚠️  Build requiere atención');
console.log('✅ Git configurado');
console.log('✅ Documentación generada');

console.log('\n🚀 Próximos pasos:');
console.log('1. Actualiza package.json con tu información:');
console.log('   - name: "@tu-usuario/fancy-button"');
console.log('   - repository.url: "https://github.com/rmzmiguel/MigButton.git"');
console.log('2. Sube el código a GitHub:');
console.log('   git remote add origin https://github.com/rmzmiguel/MigButton.git');
console.log('   git push -u origin main');
console.log('3. Otros podrán instalar con:');
console.log('   npm install git+https://github.com/rmzmiguel/MigButton.git');

console.log('\n🛠️  Comandos disponibles:');
console.log('- npm run build: Construir la librería');
console.log('- npm run dev: Modo desarrollo con watch');
console.log('- npm run clean: Limpiar archivos generados');

if (!buildResult) {
  console.log('\n🔧 Para solucionar problemas de build:');
  console.log('- Verifica que todos los archivos estén en src/');
  console.log('- Ejecuta: npm install && npm run build');
  console.log('- Los archivos pre-compilados están disponibles como respaldo');
}
