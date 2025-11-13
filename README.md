<<<<<<< HEAD
# MotorMe Backend API

Backend de MotorMe - Plataforma de compra/venta de vehículos

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar servidor de desarrollo
npm run dev

# O iniciar servidor de producción
npm start
```

## 📋 Requisitos

- Node.js 14+
- MongoDB instalado localmente o cuenta en MongoDB Atlas
- npm o yarn

## ⚙️ Configuración

Edita el archivo `.env` con tu configuración:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/motorme
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Instalación de MongoDB (macOS)

# MotorMe Backend API

Backend de MotorMe - Plataforma de compra/venta de vehículos

## � Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar servidor de desarrollo
npm run dev

# O iniciar servidor de producción
npm start
```

## 📋 Requisitos

- Node.js 14+
- MongoDB instalado localmente o cuenta en MongoDB Atlas
- npm o yarn

## ⚙️ Configuración

Edita el archivo `.env` con tu configuración:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/motorme
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Instalación de MongoDB (macOS)
│   │   ├── auth.js              # Rutas de autenticación
│   │   ├── vehicles.js          # Rutas de vehículos
│   │   └── orders.js            # Rutas de órdenes
│   └── middlewares/
│       ├── auth.js              # Middleware de autenticación
│       └── upload.js            # Middleware de subida de archivos
├── uploads/                     # Carpeta de imágenes subidas
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables
├── .gitignore
├── package.json
├── server.js                    # Punto de entrada
└── README.md
```

## 🧪 Pruebas con Thunder Client / Postman

### 1. Registrar Usuario

```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "phone": "3001234567"
}
```

### 2. Iniciar Sesión

```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
    "email": "juan@example.com",
    "password": "123456"
}
```

### 3. Crear Vehículo

```json
POST http://localhost:5000/api/vehicles
Authorization: Bearer <tu_token>
Content-Type: application/json

{
    "title": "Toyota Corolla 2020",
    "price": 25000000,
    "tipo": "Carro",
    "modelo": "Corolla",
    "anio": 2020,
    "kilometraje": 50000,
    "transmision": "Automatica",
    "combustible": "Gasolina",
    "descripcion": "Vehículo en excelente estado"
}
```

## 🔧 Scripts Disponibles

```bash
npm start       # Iniciar servidor
npm run dev     # Iniciar con nodemon (auto-reload)
```

## 🤝 Integración con Frontend

Actualiza tus funciones del frontend para usar la API:

```javascript
// Ejemplo: Login
async function login(email, password) {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        localStorage.setItem('mm_token', data.token);
        localStorage.setItem('mm_user', JSON.stringify(data.user));
    }
    
    return data;
}
```

## 📝 Notas

- Las imágenes se guardan en la carpeta `uploads/`
- Los tokens JWT expiran en 7 días por defecto
- El IVA se calcula como 19% del subtotal
- Los vehículos tienen estados: disponible, vendido, pausado

## 🐛 Troubleshooting

**MongoDB no conecta:**
```bash
# Verificar si MongoDB está corriendo
brew services list
# Si no está activo, iniciarlo
brew services start mongodb-community
```

**Puerto 5000 ocupado:**
Cambia el puerto en `.env`:
```env
PORT=8000
```

**Error de permisos en uploads:**
```bash
chmod 755 uploads
```
=======
# MotorMe 🚗

Plataforma web completa para la compra y venta de vehículos (carros, motos, camionetas y vans).

## 📋 Características

- **Frontend**: Interfaz moderna y responsiva con catálogo de vehículos, filtros avanzados, sistema de reservas y carrusel de anuncios destacados
- **Backend**: API REST con Node.js + Express + MongoDB
- **Autenticación**: Sistema de registro/login con JWT
- **Gestión de vehículos**: CRUD completo con carga de imágenes
- **Sistema de reservas**: Los usuarios pueden reservar vehículos y gestionar sus reservas

## 🚀 Tecnologías

### Frontend
- HTML5, CSS3, JavaScript vanilla
- Diseño responsivo
- LocalStorage (próximamente integrado 100% con API)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Multer para carga de archivos
- CORS configurado

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB Atlas (o MongoDB local)
- Git

### Backend

1. **Navega a la carpeta Backend**
   ```bash
   cd Backend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   - Copia el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edita `.env` con tus credenciales:
     ```env
     PORT=5001
     NODE_ENV=development
     
     # MongoDB Atlas (recomendado)
     # ⚠️ IMPORTANTE: Si tu contraseña tiene caracteres especiales, codifícalos:
     #    * => %2A, @ => %40, # => %23, etc.
     MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@HOST/motorme?retryWrites=true&w=majority&appName=MotorMe
     
     JWT_SECRET=tu_clave_secreta_super_segura_aqui
     JWT_EXPIRE=7d
     
     # URL del frontend para CORS
     FRONTEND_URL=http://127.0.0.1:5500
     ```

4. **Inicia el servidor**
   ```bash
   node server.js
   ```
   o con nodemon (desarrollo):
   ```bash
   npm run dev
   ```

   Deberías ver:
   ```
   🚀 Servidor corriendo en puerto 5001
   📍 Entorno: development
   ✅ MongoDB conectado: ...
   ```

### Frontend

1. **Abre el frontend con Live Server**
   - En VS Code, instala la extensión "Live Server"
   - Haz clic derecho en `Frontend/index.html` → "Open with Live Server"
   - Se abrirá en `http://127.0.0.1:5500`

2. **O sirve los archivos estáticos**
   ```bash
   cd Frontend
   python3 -m http.server 5500
   ```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener perfil (requiere token)

### Vehículos
- `GET /api/vehicles` - Listar vehículos disponibles
- `GET /api/vehicles/:id` - Obtener un vehículo por ID
- `POST /api/vehicles` - Crear anuncio de vehículo (requiere autenticación)
- `PUT /api/vehicles/:id` - Actualizar vehículo (requiere autenticación)
- `DELETE /api/vehicles/:id` - Eliminar vehículo (requiere autenticación)

### Reservas (Órdenes)
- `POST /api/orders` - Crear una reserva (requiere autenticación)
- `GET /api/orders/my` - Ver mis reservas (requiere autenticación)
- `GET /api/orders/:id` - Ver detalle de una reserva (requiere autenticación)

## 🔒 Seguridad

- **NO subas el archivo `.env`** al repositorio
- Las credenciales de MongoDB Atlas deben mantenerse privadas
- JWT_SECRET debe ser una cadena segura y aleatoria
- En producción, configura Network Access en MongoDB Atlas para restringir IPs

## 🛠️ Desarrollo

### Estructura del proyecto
```
.
├── Backend/
│   ├── src/
│   │   ├── config/       # Configuración (DB)
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── middlewares/  # Auth, upload, etc.
│   │   ├── models/       # Modelos de Mongoose
│   │   └── routes/       # Rutas de la API
│   ├── uploads/          # Archivos subidos
│   ├── .env.example      # Plantilla de variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js         # Punto de entrada
└── Frontend/
    ├── index.html        # Página principal
    ├── catalogo.html     # Catálogo de vehículos
    ├── login.html        # Login/registro
    ├── ventas.html       # Publicar anuncio
    ├── contactenos.html  # Contacto
    ├── mis-reservas.html # Reservas del usuario
    ├── script.js         # Lógica principal
    └── Img/              # Imágenes estáticas
```

### Scripts disponibles (Backend)
```bash
npm start       # Inicia el servidor
npm run dev     # Modo desarrollo con nodemon
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Próximas mejoras

- [ ] Integración completa frontend-backend (en progreso)
- [ ] Panel de administración
- [ ] Sistema de mensajería entre usuarios
- [ ] Integración con pasarelas de pago
- [ ] Filtros avanzados y búsqueda por ubicación
- [ ] Notificaciones en tiempo real

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

---

Desarrollado con ❤️ para MotorMe
>>>>>>> bd1b679 (✅ BACKUP: Código limpio y funcional - Frontend con MongoDB, responsive, botones estilizados correctamente)
