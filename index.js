const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middelware 
app.use(cors());
app.use(express.json());

// Database username and password setup  
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j502d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run()
{
    try {

        await client.connect();
        // console.log('connection to database')
        const database = client.db("tourofbd"); //Database Name
        const servicesCollection = database.collection('packages'); //service database ar collection name 
        const userCollection = database.collection('users');
        //GET API
        app.get('/packages', async (req, res) =>
        {
            const cursor = servicesCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages);
        });
        app.get('/users', async (req, res) =>
        {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        // // Add New Packages 
        app.post('/packages', async (req, res) =>
        {
            const package = req.body;
            console.log('hit the button ', package)
            // tourofbd name akta database create kore data pathi dibe 
            const result = await servicesCollection.insertOne(package);
            console.log('result');
            res.json('result')
        });

        // // Post API  User add
        app.post('/users', async (req, res) =>
        {
            const user = req.body;
            console.log('hit the button ', user)

            // user name akta database create kore data pathi dibe 
            const result = await userCollection.insertOne(user);
            console.log('result');
            res.json('result')
        });

        // //Delete API
        // app.delete('/packages/:id', async (req, res) =>
        // {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await servicesCollection.deleteOne(query);
        //     res.json(result);
        // })
    }
    finally {
        //await client.close();
    }
}
run().catch(console.dir);
// '/' = root a pathanor jonno 
app.get('/', (req, res) =>
{
    res.send('Runing Assingment server');

});
app.listen(port, () =>
{
    console.log('This tourofbd server is runnig');
})
