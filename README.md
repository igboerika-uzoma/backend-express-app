# AfterSchool Classes - Backend API

## Deployed URLs

- **Live API**: 
- **GitHub Repository**: https://github.com/yourusername/backend-express-app

## API Endpoints

### GET /lessons
Returns all available lessons
```
GET https://backend-express-app-yw9p.onrender.com/lessons
```

### POST /orders
Creates a new order
```
POST https://backend-express-app-yw9p.onrender.com/orders
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
PUT https://backend-express-app-yw9p.onrender.com/lessons/693458f8d0e66229c7bc2b8e
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