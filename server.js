const express = require('express');
const cors  = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
require ('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri)

let db;

async function connectDB() {
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas');
        
        db = client.db('AfterSchool'); // Yo
        // // Test the connection
        const collections = await db.listCollections().toArray();
        console.log('📚 Available collections:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Exit if cannot connect
    }
}

connectDB();


app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/test-db', async (req, res) => {
    try {
        const lessonsCount = await db.collection('lessons').countDocuments();
        const ordersCount = await db.collection('orders').countDocuments();
        
        res.json({
            message: 'Database connected!',
            collections: {
                lessons: lessonsCount,
                orders: ordersCount
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

