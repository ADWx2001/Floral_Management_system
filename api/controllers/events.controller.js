import Event from "../models/event.model.js";
import EventBooking from "../models/event.request.model.js";
import { errorHandler } from "../utils/error.js";

export const Create = async(req,res,next)=>{

    const Eventname =req.body.title;
    const descreption=req.body.description;
    const category=req.body.category;;
    const Picture=req.body.image;
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
       const newevent = new Event({
        Eventname,
        descreption,
        category,
        Picture,
        slug
       
  });
 
       try {
        
         const savedevent = await newevent.save();
         res.status(201).json(savedevent);
       
       } catch (error) {
         next(error);
        
       }
 
 }

 export const getevents = async(req,res,next)=>{
   
    Event.find().then((events)=>{
      res.json(events)
     
      }).catch((err)=>{
      console.log(err);
  })
  
}

export const Getevents= async(req,res,next)=>{
  const userId= req.params.id;
  console.log(userId);
  Event.findOne({_id:userId}).then((event)=>{

    if (event){
        res.json(event)
       
        
       
      } else {
        res.status(401);
        console.log("error")
        
      }

})

}
export const updateevent = async (req, res, next) => {

  try {
    const updateevent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Eventname:req.body.title,
          descreption:req.body.description,
      
          category:req.body.category,
       
          Picture:req.body.image,

        },
      },
      { new: true }
    );
    res.status(200).json(updateevent);
  } catch (error) {
    next(error);
  }
};


export const Delete= async(req,res,next)=>{
  let userId = req.params.id;
 
Event.findByIdAndDelete(userId)
.then (() => {
res.status (200).send({status: "event deleted"})
}).catch((err) => {
console.log(err);
res.status (500). send({status: "Error with deleting data", error: err.message});
})
}

export const getEventBySlug = async (req, res, next) => {
  const slug = req.params.slug; 
  try {
      const event = await Event.findOne({ slug }); 
      if (event) {
          res.json(event);
      } else {
          res.status(404).json({ error: "Event not found" });
      }
  } catch (error) {
      next(error);
  }
};

//Event Requests functions
export const CreateEventRequest = async (req,res,next)=>{
  if (!req.body.phone || !req.body.name || !req.body.date || !req.body.time || !req.body.venue || !req.body.guestCount || !req.body.themeColor || !req.body.budget || !req.body.description || !req.body.arrangements ) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const phone = req.body.phone;
  const name = req.body.name;
  const description = req.body.description;
  const date = req.body.date;
  const time = req.body.time;
  const venue = req.body.venue;
  const guestCount = req.body.guestCount;
  const themeColor = req.body.themeColor;
  const arrangements = req.body.arrangements;
  const budget = req.body.budget;


  const newEventRequest = new EventBooking({
    phone,name,date,time,venue,description,guestCount,themeColor,budget,arrangements
  })

  try {
    const savedRecord = await newEventRequest.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    next(error);
  }

}

export const UpdateEventRequest = async (req,res,next)=>{
    let recordId = req.params.id;
    const {phone,name,date,time,venue,description,guestCount,themeColor,budget,arrangements} = req.body;
    
    const updateRecord = {
      phone,name,date,time,venue,description,guestCount,themeColor,budget,arrangements
    }

    try {
        await EventBooking.findByIdAndUpdate(recordId, updateRecord);
        res.status(200).json(updateRecord);
    } catch (error) {
        next(error);
    }
}

export const DeleteEventRequest = async (req,res,next)=>{
  let  recordId = req.params.id;
    try {
        await EventBooking.findByIdAndDelete(recordId);
        res.status(200).json('The Record has been deleted');
      } catch (error) {
        next(error);
      }
}

export const GetAllEventRequest = async (req,res,next)=>{
  EventBooking.find().then((records)=>{
    res.json(records);
  }).catch((error)=>{
      console.log(error);
  })
}

export const GetOneEventRequest = async (req,res,next)=>{
  try {
    const recordId = req.params.id;
    const record = await EventBooking.findById(recordId);
    
    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }
    
    res.json(record);    

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}