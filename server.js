const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const submission = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    // Save to file
    const filePath = path.join(__dirname, 'contact_submissions.json');
    let submissions = [];
    if (fs.existsSync(filePath)) {
        submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    submissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    console.log('Contact form submission saved:', submission);
    res.json({ success: true, message: 'Thank you for your inquiry! We will get back to you soon.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
