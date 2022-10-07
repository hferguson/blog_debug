const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

// forgot this and this cause request to not be readable
app.use(bodyParser.json());
app.use(cors());

// in-memory storagefor posts
const posts = {};

app.get('/posts', (req, res) =>{
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    // This will eventually be set by service db
    const id = randomBytes(4).toString('hex');
    console.log(req.body);
    const {title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: "PostCreated",
        data:  {
            id, title
        }
    }).catch((err) => {
        console.log(err.message);
        console.log("Exception caught");
    });
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log("Listening on port 4000");
});