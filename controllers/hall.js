const Hall = require('../models/hall');
// creating a new hall
exports.create_new_hall = async (req, res) => {
    console.log(req.body)
    // Extracting hall details from request body
    const name = req.body.name;
    const capacity = req.body.capacity;
    const price = req.body.price;
    const description = req.body.description;
    const availability = req.body.availability;
    const images = req.body.images;
    const amenities =req.body.amenities
    try {
        // Creating a new hall object
        const hall = new Hall({
            name: name,
            capacity: capacity,
            price: price,
            description: description,
            //availability: availability,
            images: images,
            amenities
        });
        // Saving the hall object
        await hall.save();
        // jsoning a response if hall is created successfully
        res.json({ message: 'Hall created successfully' });
    } catch (err) {
        // jsoning error response if an error occurs while saving the hall
        res.status(500).json({error:err.message});
    }
}

//UPDATE HALL

exports.update_hall = async (req, res) => {
    const hallId = req.query.id;
    const update = req.body;

    try {
        // Finding the hall by its id and updating its details
        const hall = await Hall.findByIdAndUpdate(hallId, update, { new: true });
        console.log(hall)
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }
        res.json({ message: 'Hall updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE HALL
exports.delete_hall = async (req, res) => {
    const hallId = req.body.id;

    try {
        // Finding the hall by its id and deleting it
        const hall = await Hall.findByIdAndDelete(hallId);
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }else{
            console.log("deleted")
            res.json({ message: 'Hall deleted successfully' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//FETCH WALLS
exports.fetch_halls =async(req,res)=>{
    try {
        let halls = await Hall.find({isAvailable:true})
        res.json({halls})
    } catch (error) {
        res.json({error:error.message})
    }
}
//FETCH ONE HALL
exports.fetch_hall=async(req,res)=>{
    try {
        let hall = await Hall.findById(req.query.id)
        if(hall){
            res.json({hall})
        }else{
            res.json({message:"not found"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}