import mongoose, { Schema } from "mongoose";

const entrySchema = new Schema({
    content : {
        type : String,
        required : [true, "Diary Entry content is required"]
    },
    date : {
        type : Date,
        default : Date.now
    },
    mood : {
        type : String,
        enum : ["Happy", "OverJoyed", "Sad", "Depressed", "Tensed", "Relaxed", "Angry", "Neutral"],
        default : "Neutral"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"]
    }
}, {
    timestamps : true
})


export const Entry = mongoose.model("Entry", entrySchema);


