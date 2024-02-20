const mongoose= require('mongoose')
const NotesSchema = new Schema({
    title:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true,

    },
    tag:{
        type:String,
        require: true,
        defalut:'general'
    }
})

module.exports= mongoose.model('notes',NotesSchema);