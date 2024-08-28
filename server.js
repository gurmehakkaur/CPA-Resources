const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;



app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/courses', (req, res) => {
    const courses = JSON.parse(fs.readFileSync('courses.json'));
    res.json(courses);
});

app.get('/api/songs/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const resources = JSON.parse(fs.readFileSync('resources.json'));
    const courseResources = resources.filter(resource => resource.courseId === courseId);
    res.json(courseResources);
});

app.use(express.json());

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    fs.readFile('newsletter.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'An error occurred while subscribing.' });
        }

        const newsletter = JSON.parse(data);
        const isAlreadySubscribed = newsletter.some(subscriber => subscriber.email === email);

        if (isAlreadySubscribed) {
            return res.status(400).json({ error: 'This email is already subscribed' });
        }

        newsletter.push({ email });

        fs.writeFile('newsletter.json', JSON.stringify(newsletter, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'An error occurred while subscribing.' });
            }

            res.json({ message: 'Subscribed successfully!' });
        });
    });
});
app.post('/api/resources', (req, res) => {
    const newResource = req.body;

    if (!newResource.title || !newResource.url || !newResource.imageUrl || !newResource.courseId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    fs.readFile('resources.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'An error occurred while reading resources.' });
        }

        const resources = JSON.parse(data);
        newResource.ResourceId = resources.length + 1; 
        resources.push(newResource);

        fs.writeFile('resources.json', JSON.stringify(resources, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'An error occurred while saving the resource.' });
            }

            res.json(newResource);
        });
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

