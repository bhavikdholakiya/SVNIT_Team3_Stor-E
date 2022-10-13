const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: String,
        default: '',
        maxLength: [500, 'review max length is 100 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type:Number
    }
},{timestamps:true})
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: [2500, 'You can only add dicription upto 500 characters.']
    },
    imageUrl:{
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    ratingNumber: {
        type: Number,
        default:0
    },
    reviewNumber: {
        type: Number,
        default: 0,
    },
    comments: [commentSchema],
});
module.exports = mongoose.model('product', productSchema);