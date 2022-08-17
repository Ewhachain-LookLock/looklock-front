const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type:String, required:true},
    img: {
        data:Buffer, 
        contentType: String}
},
{
    timestamps: true,
    collection:'images'
}, );

imageSchema.statics.findAll = function() {
    try {
        const results = this.find({}); 
        console.log(results);
        return results;
    } catch(err) {
        throw err;
    }
};

imageSchema.statics.create = function(payload) {
    try {
        const image = new this(payload);
        return image.save();
    } catch (err) {
        console.log(err.message);
        return err;
    }
};

module.exports = mongoose.model('image', imageSchema);