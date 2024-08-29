const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

const coursesFilePath = path.join(__dirname, 'courses.json');
const resourcesFilePath = path.join(__dirname, 'resources.json');
const newsletterFilePath = path.join(__dirname, 'newsletter.json');

app.get('/api/courses', (req, res) => {
    fs.readFile(coursesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading courses file:', err);
            return res.status(500).json({ error: 'Error reading courses data' });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/songs/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    fs.readFile(resourcesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading resources file:', err);
            return res.status(500).json({ error: 'Error reading resources data' });
        }
        const resources = JSON.parse(data);
        const courseResources = resources.filter(resource => resource.courseId === courseId);
        res.json(courseResources);
    });
});

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    fs.readFile(newsletterFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading newsletter file:', err);
            return res.status(500).json({ error: 'Error reading newsletter data' });
        }

        const newsletter = JSON.parse(data);
        const isAlreadySubscribed = newsletter.some(subscriber => subscriber.email === email);

        if (isAlreadySubscribed) {
            return res.status(400).json({ error: 'This email is already subscribed' });
        }

        newsletter.push({ email });

        fs.writeFile(newsletterFilePath, JSON.stringify(newsletter, null, 2), (err) => {
            if (err) {
                console.error('Error writing newsletter file:', err);
                return res.status(500).json({ error: 'Error subscribing to newsletter' });
            }

            res.json({ message: 'Subscribed successfully!' });
        });
    });
});

app.post('/api/resources', (req, res) => {
    const newResource = req.body;

    if (!newResource.title || !newResource.url || !newResource.courseId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    fs.readFile(resourcesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading resources file:', err);
            return res.status(500).json({ error: 'Error reading resources data' });
        }

        const resources = JSON.parse(data);
        newResource.resourceId = resources.length + 1;
        resources.push(newResource);

        fs.writeFile(resourcesFilePath, JSON.stringify(resources, null, 2), (err) => {
            if (err) {
                console.error('Error writing resources file:', err);
                return res.status(500).json({ error: 'Error saving resource' });
            }

            res.json(newResource);
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
