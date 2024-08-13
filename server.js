const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/subscribe', (req, res) => {
    const { name, contact, email, plan } = req.body;
    const subscriptionData = { name, contact, email, plan, date: new Date() };

    fs.appendFile('subscriptions.json', JSON.stringify(subscriptionData) + '\n', (err) => {
        if (err) {
            console.error('Error saving subscription:', err);
            res.status(500).send({ error: 'Failed to save subscription' });
        } else {
            res.send({ success: true });
        }
    });
});

app.get('/subscriptions', (req, res) => {
    fs.readFile('subscriptions.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading subscriptions:', err);
            res.status(500).send({ error: 'Failed to read subscriptions' });
        } else {
            const subscriptions = data.trim().split('\n').map(JSON.parse);
            res.send(subscriptions);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
