const path=require("path");

module.exports={
    entry:{
       index:'./src/index.js', 
       courses:'./src/index.js', 
    },
    output: {
        filename: '[name].bundle.js',
    }
}