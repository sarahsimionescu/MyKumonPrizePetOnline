const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // it will trim whitespace off the end
        lowercase: true,
    },
    startdate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    math: {
        type: Boolean,
        required: true,
        default: false,
    },
    reading: {
        type: Boolean,
        required: true,
        default: false,
    },
    points: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    tokens: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    dates: {
        math:{
            type: [{ date: Date, bonus: Boolean }],
            default: [],
        },
        reading:{
            type: [{ date: Date, bonus: Boolean }],
            default: [],
        }
    },
    petname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
    },
    pettype: {
        type: String,
        enum: ['Cat','Dog'],
        required: true,
    },
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;