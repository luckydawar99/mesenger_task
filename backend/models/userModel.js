import mongoose from "mongoose";

// Define the schema for User
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher', 'Institute'], // Make sure enum values are capitalized correctly
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"], // Correctly define the enum values
        required: true
    }
}, { timestamps: true });

// Create and export the User model
export const User = mongoose.model("User", userSchema);


// import mongoose from "mongoose";

// // Define the schema for User
// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum:('Student', 'Teacher', 'Institute'),
//         required:true
//     },
//     profilePhoto: {
//         type: String,
//         default: ""
//     },
//     gender: {
//         type: String,
//         enum: ["male", "female"], // Correctly define the enum values
//         required: true
//     }
// }, { timestamps: true });

// // Create and export the User model
// export const User = mongoose.model("User", userSchema);
