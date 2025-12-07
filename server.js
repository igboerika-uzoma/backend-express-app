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


//GET lessons
app.get('/lessons', async (req, res) => {
    try {
        const lessons = await db.collection('lessons').find({}).toArray();
        console.log(`✅ Retrieved ${lessons.length} lessons`);
        res.json(lessons);
    } catch (error) {
        console.error('❌ Error fetching lessons:', error);
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
});

//POST orders
app.post('/orders', async (req, res) => {
    try {
        const order = {
            name: req.body.name,
            phone: req.body.phone,
            lessonIDs: req.body.lessonIDs,        // Array of lesson IDs
            numberOfSpaces: req.body.numberOfSpaces, // Array of quantities
            createdAt: new Date()
        };
        if (!order.name || !order.phone || !order.lessonIDs || !order.numberOfSpaces) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, phone, lessonIDs, numberOfSpaces' 
            });
        }

        const result = await db.collection('orders').insertOne(order);
        console.log('✅ Order created:', result.insertedId);
        
        res.status(201).json({ 
            message: 'Order created successfully', 
            orderId: result.insertedId,
            order: order
        });
    } catch (error) {
        console.error('❌ Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

//Put lessons
app.put('/lessons/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid lesson ID' });
        }

        // Validate that there's something to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No update data provided' });
        }

        const result = await db.collection('lessons').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        console.log(`✅ Lesson ${id} updated:`, updateData);
        
        res.json({ 
            message: 'Lesson updated successfully', 
            modifiedCount: result.modifiedCount,
            updatedFields: updateData
        });
    } catch (error) {
        console.error('❌ Error updating lesson:', error);
        res.status(500).json({ error: 'Failed to update lesson' });
    }
});


