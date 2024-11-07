const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing and comparison

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'signup' // Replace with your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Signup Endpoint
app.post('/signup', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    db.query("INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)", 
        [firstname, lastname, email, hashedPassword], 
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error occurred during signup." });
            }
            console.log("Signup is successful");
            return res.status(201).json({ message: "Signup successful!" });
        }
    );
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log("Received email:", email);
  console.log("Received password:", password);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Error occurred during login." });
      }

      if (results.length === 0) {
          console.log("No user found with this email.");
          return res.status(401).json({ message: "Invalid email or password." });
      }

      const user = results[0];
      console.log("User found:", user);

      // Compare the provided password with the stored hashed password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
          console.log("Login successful");
          return res.status(200).json({ message: "Login successful!", user: { firstname: user.firstname, email: user.email } });
      } else {
          console.log("Password mismatch");
          return res.status(401).json({ message: "Invalid email or password." });
      }
  });
});
// Root Endpoint
app.get('/', (req, res) => {
    return res.json("from backend");
});

// Start the server
app.listen(8081, () => {
    console.log('Server is running on port 8081...');
});