const Booking = require('../models/booking');
const Hall = require('../models/hall');

exports.book_hall = async (req, res) => {
    // Extracting hallId, userId, startDate, and endDate from request body
    const hallId = req.body.hallId;
    const userId = req.body.userId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    try {
        // Finding the hall by its id
        const hall = await Hall.findById(hallId);
        // Checking if the hall is not found
        if (!hall) {
            return res.json({ error: 'Hall not found' });
        }else{
            // Checking if the hall is available
        if (!hall.isAvailable) {
            return res.json({ error: 'Hall is not available on the selected dates' });
        }else{
            // Creating a new booking object
        const booking = new Booking({
            hall: hallId,
            user: userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            cost:req.body.cost,
            status:"pending",
            additionalOptions:req.body.additionalOptions,
            eventName:req.body.eventName,
            hallName:req.body.hallName,
            hallImage:req.body.hallImage,
            userName:req.body.userName
        });
        // Saving the booking object
        await booking.save();
        // jsoning a response if booking is successful
        res.json({ message: 'Hall booked successfully' });
        }
        }
        
        
    } catch(error) {
        // jsoning error response if an error occurs while saving the booking
        res.json({error:error.message});
        }
        }
//ADMIN APPROVE BOOKING 


exports.approve_booking = async (req, res) => {
    const bookingId = req.query.id;
    try {
        // Finding the booking by its id and updating its approved status
        const booking = await Booking.findByIdAndUpdate(bookingId, { status:"approved" }, { new: true });
        if (!booking) {
            return res.json({ message: 'Booking not found' });
        }else{
            res.json({ message: 'Booking approved successfully' });
        }
        
    } catch (err) {
        res.json(err);
    }
}
//DECLINE BOOKING
exports.decline_booking = async (req, res) => {
    const bookingId = req.query.id;
    try {
        // Finding the booking by its id and updating its approved status
        const booking = await Booking.findByIdAndDelete(bookingId)
        if (!booking) {
            return res.json({ message: 'Booking not found' });
        }else{
            res.json({ message: 'Booking approved successfully' });
        }
        
    } catch (err) {
        res.json(err);
    }
}
//fetch upcomming events
exports.upcoming_events = async (req, res) => {
    try {
        // Finding all bookings with a startDate greater than or equal to today's date
        const upcomingBookings = await Booking.find({ startDate: { $gte: new Date() },status:"approved"});
        res.json({upcomingBookings});
    } catch (err) {
        res.json({err:err.message});
    }
}
//Fetch past events
exports.past_events = async (req, res) => {
    try {
        // Finding all bookings with a startDate less than today's date
        const pastBookings = await Booking.find({ startDate: { $lt: new Date() },status:"approved" });
        res.json({pastBookings});
    } catch (err) {
        res.json({err:err.message});
    }
}
//FETCH UNAPPROVED

exports.unapproved_bookings = async (req, res) => {
    try {
        // Finding all bookings with approved status false
        const unapprovedBookings = await Booking.find({ status:"pending"});
        res.json({unapprovedBookings});
    } catch (err) {
        res.json({err:err.message});
    }
}