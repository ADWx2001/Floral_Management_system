import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: true,

  },
  message: {
    type: String,
    required: true,

  }
});

const Contact = mongoose.model('contact', ContactSchema);
export default Contact;
