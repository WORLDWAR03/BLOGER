const mongoose=require('mongoose')

const blogSchema = mongoose.Schema({
    heading:{
        type:String,
        required:true,
        default:"no heading"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"users"

    }

    ,
    category:{
        type:String,
        required:true,
        default:"no category"
    },
    createdAt:{
        type:Date,
        default: new Date(),
        required: true

    },
    discription:{
        type:String,
        required:true,
        
    },


    content:{
        type:String,
        required:true,
    },

    images:[]

})

const blogs =mongoose.model("blogs",blogSchema)
module.exports=blogs