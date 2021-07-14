import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    students: String,
    thumbnail: String,
})

export default mongoose.model('courses', courseSchema);
