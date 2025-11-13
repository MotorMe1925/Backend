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

```bash
# Con Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community

# O iniciar manualmente
mongod --config /usr/local/etc/mongod.conf
```

## 📚 API Endpoints

### Autenticación

- **POST** `/api/auth/register` - Registrar nuevo usuario
- **POST** `/api/auth/login` - Iniciar sesión
- **GET** `/api/auth/me` - Obtener usuario actual (protegido)
- **PUT** `/api/auth/profile` - Actualizar perfil (protegido)
- **PUT** `/api/auth/password` - Cambiar contraseña (protegido)

### Vehículos

- **GET** `/api/vehicles` - Obtener todos los vehículos
- **GET** `/api/vehicles/:id` - Obtener vehículo por ID
- **GET** `/api/vehicles/my/vehicles` - Obtener mis vehículos (protegido)
- **POST** `/api/vehicles` - Crear vehículo (protegido)
- **PUT** `/api/vehicles/:id` - Actualizar vehículo (protegido)
- **DELETE** `/api/vehicles/:id` - Eliminar vehículo (protegido)

### Órdenes/Compras

- **POST** `/api/orders` - Crear nueva orden (protegido)
- **GET** `/api/orders/my` - Obtener mis órdenes (protegido)
- **GET** `/api/orders/:id` - Obtener orden por ID (protegido)
- **GET** `/api/orders` - Obtener todas las órdenes (admin)
- **PUT** `/api/orders/:id/status` - Actualizar estado (admin)

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens). Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: Bearer <tu_token>
```

## 📤 Subida de Imágenes

Al crear o actualizar vehículos, puedes subir hasta 5 imágenes:

```javascript
const formData = new FormData();
formData.append('title', 'Toyota Corolla');
formData.append('price', 25000);
formData.append('fotos', file1);
formData.append('fotos', file2);

fetch('http://localhost:5000/api/vehicles', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: formData
});
```

## 🗂️ Estructura del Proyecto

```
Backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── models/
│   │   ├── User.js              # Modelo de usuario
│   │   ├── Vehicle.js           # Modelo de vehículo
│   │   └── Order.js             # Modelo de orden
│   ├── controllers/
│   │   ├── authController.js    # Controlador de autenticación
│   │   ├── vehicleController.js # Controlador de vehículos
│   │   └── orderController.js   # Controlador de órdenes
│   ├── routes/
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
