const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name : {
        type: String,
        require: [true, "Please a name"],
    }, 
    email : {
        type: String,
        require: [true, "Please a email"],
    }, 
    phone : {
        type: String,
        require: [true, "Please a phone"],
    }, 
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema)