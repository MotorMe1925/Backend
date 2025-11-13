const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const uri = process.env.MONGODB_URI;

console.log('🔍 Probando conexión a MongoDB...\n');
console.log('📝 URI (oculta la contraseña):');
console.log(uri.replace(/:([^@]+)@/, ':***@'));
console.log('\n⏳ Intentando conectar...\n');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ ¡CONEXIÓN EXITOSA A MONGODB ATLAS!');
    console.log(`📊 Host: ${mongoose.connection.host}`);
    console.log(`📦 Base de datos: ${mongoose.connection.name}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ ERROR DE CONEXIÓN:');
    console.error(`\n${error.message}\n`);
    
    // Análisis del error
    if (error.message.includes('IP')) {
      console.log('💡 CAUSA PROBABLE: Tu IP no está en la lista blanca de Atlas');
      console.log(`   Tu IP actual: 179.1.204.101`);
      console.log('   Solución: Ve a Atlas → Network Access → Add IP Address');
    } else if (error.message.includes('authentication failed')) {
      console.log('💡 CAUSA PROBABLE: Usuario o contraseña incorrectos');
      console.log('   Solución: Ve a Atlas → Database Access → Verifica usuario/contraseña');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 CAUSA PROBABLE: Cluster/host incorrecto en la URI');
      console.log('   Solución: Ve a Atlas → Connect → Copia la URI correcta');
    }
    
    process.exit(1);
  });
