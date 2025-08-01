
**Instalar dependencias:**
   ```bash
   npm install
   ```

 **Iniciar el servidor:**
   ```bash
   # Desarrollo (con nodemon)
   npm run dev
   
   # Producción
   npm start
   ```

## Uso

- **Sitio web:** http://localhost:3001

### POST /api/contact
Envía un formulario de contacto.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "message": "Hola, me interesa su plataforma..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "messageId": "message-id"
}
```

### GET /health
Verifica el estado del servidor y servicios.

**Response:**
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "email": "connected"
  }
}
```
