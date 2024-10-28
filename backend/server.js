const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8085;

app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.use(cors({
//     origin: 'http://localhost:5173', // Frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));


// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taxidb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to upload driver profile image
app.post('/uploadProfileImage', upload.single('profileImage'), (req, res) => {
    const { driverId } = req.body; // Get driverId from the form
    const profileImage = req.file.filename; // Get the uploaded filename

    // Save the filename in the database
    db.query('UPDATE drivers SET profileImage = ? WHERE id = ?', [profileImage, driverId], (err, result) => {
        if (err) {
            console.error('Error updating the profile image in the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Profile image uploaded successfully', profileImage });
    });
});


// Route to get drivers based on location, including Blob image
app.get('/drivers', (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.status(400).json({ error: 'Location parameter is required' });
    }

    // Fetch drivers including image as Blob
    db.query('SELECT id, driverName, driverAvailability, driverPhone, vehicleColor, vehicleLicencePlate, driverLocation, image FROM drivers WHERE driverLocation = ?', [location], (err, results) => {
        if (err) {
            console.error('Error fetching drivers from the database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // Convert Blob image to Base64
        const driversWithImage = results.map(driver => ({
            ...driver,
            profileImage: driver.image ? `data:image/jpeg;base64,${driver.image.toString('base64')}` : null
        }));

        res.json(driversWithImage);
    });
});

// // Route to get drivers based on location
// app.get('/drivers', (req, res) => {
//     const location = req.query.location;
//     if (!location) {
//         return res.status(400).json({ error: 'Location parameter is required' });
//     }

//     // Update to the correct column name
//     db.query('SELECT * FROM drivers WHERE driverLocation = ?', [location], (err, results) => {
//         if (err) {
//             console.error('Error fetching drivers from the database:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.json(results);
//     });
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
