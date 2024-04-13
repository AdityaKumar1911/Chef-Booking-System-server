const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const Chef = require('./models/chef');
const Cdata = require('./models/chefSchema');
const Userdata = require('./models/userData');
const sendEmail = require('./models/mail');
const Booking = require('./models/chefbook');

mongoose.connect('mongodb+srv://dituraj2017:dituraj2017@cluster0.wacxrym.mongodb.net/?retryWrites=true&w=majority&appName=Chef-Booking-System', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/chefs', async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (err) {
    console.error('Error fetching chefs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/chefs', async (req, res) => {
  try {
    const newChef = new Chef(req.body);
    const savedChef = await newChef.save();
    res.status(201).json({ status: true, chef: savedChef });
  } catch (err) {
    console.error('Error saving chef:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

app.get('/chefdata', async (req, res) => {
  try {
    const chef = await Cdata.find();
    res.status(200).json(chef);
  } catch (err) {
    console.error('Error fetching chef data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/chefdata', async (req, res) => {
  try {
    const newCdata = new Cdata(req.body);
    const savedCdata = await newCdata.save();
    res.status(201).json({ status: true, chefdata: savedCdata });
  } catch (err) {
    console.error('Error saving chef data:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

app.get('/userdata', async (req, res) => {
  try {
    const user = await Userdata.find();
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/userdata', async (req, res) => {
  try {
    const newUserdata = new Userdata(req.body);
    const savedUserdata = await newUserdata.save();
    res.status(201).json({ status: true, Userdata: savedUserdata });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

// mail apis

app.post('/sendEmail', async (req, res) => {
  try {
    const newUserdata = new Userdata(req.body);
    const savedUserdata = await newUserdata.save();
    const { name, email, phonenumber, serviceDay, serviceStartTime, serviceEndTime } = req.body;
    sendEmail(name, email, phonenumber, serviceDay, serviceStartTime, serviceEndTime);
    res.status(201).json({ status: true, Userdata: savedUserdata, message: 'Email sent and user data saved successfully.' });
  } catch (err) {
    console.error('Error saving user data or sending email:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

// chef booking\

app.post('/bookchef', async (req, res) => {
  try {
    const { name, email, phonenumber, serviceDay, serviceStartTime, serviceEndTime, chefId } = req.body;

    // Create a new booking
    const newBooking = new Booking({
      name,
      email,
      phonenumber,
      serviceDay,
      serviceStartTime,
      serviceEndTime,
      chefId
    });

    // Save the booking
    const savedBooking = await newBooking.save();
    console.log(`book ==> ${savedBooking}`);
    // Update the booked chef's isAvailable field to false
    await Cdata.findByIdAndUpdate(chefId, { isAvailable: false });

    res.status(200).json({ status: true, message: 'Chef booked successfully', booking: savedBooking });
  } catch (err) {
    console.error('Error booking chef:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

//chech chef avilable

app.get('/chefavailability/:chefId', async (req, res) => {
  try {
    const { chefId } = req.params;
    const chef = await Cdata.findById(chefId, 'name isAvailable');
    if (!chef) {
      return res.status(404).json({ status: false, message: 'Chef not found' });
    }
    res.status(200).json({ status: true, chef });
  } catch (err) {
    console.error('Error fetching chef availability:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
