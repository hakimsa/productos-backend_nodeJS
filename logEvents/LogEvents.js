const {format}=require("date-fns");
const fs =require ("fs");
const fsPromises=require("fs").promises;
const path=require("path");
let formatDate=format(new Date(),"yyyyMMdd\tHH:mm:ss");
let formatDateLog=format(new Date(),"yyyyMMdd");

const logEvents=async(message)=>{
const dateTime=formatDate;
const logItem= dateTime+"\t"+message+"\n";

console.log(logItem);
try{

    if(!fs.existsSync(path.join(__dirname,"..","logs"))){
        await fsPromises.mkdir(path.join(__dirname,"..","logs"))
    }

     await fsPromises.appendFile(path.join(__dirname,"..","logs",formatDateLog+"_Acces_Error.log"),logItem);

}catch(err){
 console.log(err);

}

}

module.exports=logEvents;