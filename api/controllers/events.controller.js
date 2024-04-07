import Event from "../models/event.model.js";
import { errorHandler } from "../utils/error.js";







export const Create = async(req,res,next)=>{
   
    const Eventname =req.body.title;
    const descreption=req.body.description;
    const category=req.body.category;;
    const Picture=req.body.image;
       const newevent = new Event({
        Eventname,
        descreption,
        category,
        Picture,
       
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

//finished