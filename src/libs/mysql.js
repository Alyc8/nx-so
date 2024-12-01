// Importa el cliente mysql2
import mysql from 'mysql2/promise';

// Crea la conexión con la base de datos usando la cadena de conexión
const conn = mysql.createPool({
  host: 'junction.proxy.rlwy.net',        // Host proporcionado por Railway
  user: 'root',                           // Usuario proporcionado
  password: 'JfJAFOsDJEvOCcgmnQAmOMwdRocIIHJo', // Contraseña proporcionada
  database: 'railway',                    // Nombre de la base de datos
  port: 56230,                            // Puerto proporcionado

});

export { conn };