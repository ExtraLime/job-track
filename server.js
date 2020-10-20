const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connectDB
connectDB();

// Init middleware

app.use(express.json({ extended: false }))


//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
//app.use('/api/admin', require('./routes/admin')); -to do admin route



// Serve static assets in production

if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')))
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever listening on port ${PORT}`));