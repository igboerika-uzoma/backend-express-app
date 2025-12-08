# After School Classes - Backend API

## Deployed URLs

- **Live API**: https://after-school-api.onrender.com
- **GitHub Repository**: https://github.com/yourusername/backend-express-app

## API Endpoints

### GET /lessons
Returns all available lessons
```
GET https://after-school-api.onrender.com/lessons
```

### POST /orders
Creates a new order
```
POST https://after-school-api.onrender.com/orders
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "07700900123",
  "lessonIDs": ["..."],
  "numberOfSpaces": [1, 2]
}
```

### PUT /lessons/:id
Updates a lesson's attributes
```
PUT https://after-school-api.onrender.com/lessons/674a1b2c3d4e5f6g
Content-Type: application/json

{
  "space": 3
}
```

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Deployed on Render.com

## Local Development
```bash
npm install
node server.js
```