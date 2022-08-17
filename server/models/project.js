const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectImg: {
        data:Buffer,
        contentType:String
    },
    title: {type: String, required:true},
    information: {type:String, required:true}, 
    rewards: [{type: Map, of:Number}],
    startDate: {type: Date, default : null},
    phase1period: {type:Number, required:true},
    phase2periods: [{type: Map, of : Number}]  
},
{
    timestamps: true,
    collection:'projects' 
});

projectSchema.statics.findAll = function() {
    try {
        const results = this.find({});
        console.log(results);
        return results;
    }catch(err) {
        throw err;
    }
};

projectSchema.statics.findByTitle = function(title) {
    try {
        const result = this.find({title: title});
        console.log(result);
        return result;
    } catch(err) {
        throw err;
    }
};

projectSchema.statics.create = function(payload) {
    try {
        const project = new this(payload);
        return project.save();
    } catch (err) {
        return err;
    }
};
module.exports =  mongoose.model('Project', projectSchema);