const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

// handle upload images
const { upload } = require("./uploadImages");



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SmartBusinessLicensing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define MongoDB schema
const formSchema = new mongoose.Schema({
  personalInformation: {
    name: String,
    phone: String,
    position: String,
    tradeLicence: String,
    companyName: String,
    companyNumber: String
  },
  activityData: {
    activityName: String,
    totalArea: String,
    workerType: String
  },
  geographicLocation: {
    region: String,
    amanah: String,
    municipality: String,
    neighborhood: String,
    street: String,
    plotNumber: String,
    landPieceNumber: String
  },
  storeData: {
    hasBrand: String,
    storeName: String,
    storeNumber: String,
    numberOfFloors: String,
    numberOfCameras: String,
    hasElevator: String,
    hasSafetyPermit: String,
    applicantType: String,
    contractType: String,
    panelType: String,
    panelArea: String
  },
  attachments: {
    leaseContract: String,
    storeFacade: String,
    otherAttachments: [String]
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  idNumber: String,
  phoneNumber: String,
  email: String,
  password: String
});

const Form = mongoose.model('Form', formSchema);
const User = mongoose.model('User', userSchema);

// Validation function
function validateForm(req, res, next) {
  // Add your validation logic here
  const errors = {};
  // For example, you can use a library like 'express-validator' for form validation
  // If there are errors, send error status
  if (Object.keys(errors).length > 0) {
    res.status(400).send(errors);
  } else {
    next(); // If no errors, proceed to next middleware
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'LandingPage.html'));
});


app.get('/create-account', (req, res) => { // Corrected route definition
  res.sendFile(path.join(__dirname, 'frontend', 'createAccount.html')); // Corrected file name
});

app.post('/create-account', validateForm, async (req, res) => {
  try {
    const { idNumber } = req.body;
    const trimmedIdNumber = idNumber.trim(); // Trimming whitespace

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ idNumber: trimmedIdNumber });
    if (existingUser) {
      res.json({ message: 'المستخدم مسجل مسبقا' });
      return;
    }

    const user = new User(req.body);
    await user.save();
    // Redirect to the landing page
    res.set('Content-Type', 'text/html'); // Set the MIME type explicitly
    res.sendFile(path.join(__dirname, 'frontend', 'LandingPage.html'));
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/submit-form', upload.fields([{ name: 'leaseContract', maxCount: 1 }, { name: 'storeFacade', maxCount: 1 }, { name: 'otherAttachments' }]),
  async (req, res) => {
    try {
      const formData = req.body;

      const leaseContract = req.files.leaseContract[0].filename;
      const storeFacade = req.files.storeFacade[0].filename;

      // Check if otherAttachments is present and not empty
      let otherAttachments = req.files.otherAttachments?.map(image => image.filename) || [];

      const newForm = new Form(formData);
      newForm.attachments = {
        leaseContract: leaseContract,
        storeFacade: storeFacade,
        otherAttachments: otherAttachments
      };

      await newForm.save();
      // Redirect the user to Application.html with step=6 query parameter
      res.redirect('/LandingPage.html');

    } catch (err) {
      console.error(' Error submitting form', err);
      res.status(500).json({ message: 'Error submitting form' });
    }
  });


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.post('/login', async (req, res) => {
  try {
    const { idNumber, password } = req.body;
    const trimmedIdNumber = idNumber.trim(); // Trimming whitespace
    console.log(`Attempting to find user with ID Number: ${trimmedIdNumber}`); // Logging for debugging
    const user = await User.findOne({ idNumber: trimmedIdNumber });

    if (!user) {
      res.json({ message: 'المستخدم غير مسجل' });
      return;
    }

    // Check if the provided password matches the user's password
    if (user.password === password) {
      // Authentication successful
      res.sendFile(path.join(__dirname, 'frontend', 'LandingPage.html'));
    } else {
      // Authentication failed
      res.send('كلمة المرور خطأ ');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
