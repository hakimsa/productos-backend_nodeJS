const userDB={
    users:require("../models/user.json"),

    setUsers:function(data){ this.users=data}
}


const fsPromises=require("fs").fsPromises;
const path=require("path");
const bcrypt=require("bcrypt");


const handleNewUser=async(req,res)=>{

    const { user,pwd  }=req.body;
    if(!user || !pwd)return res.status(400).json({
        "message": "username and pwd required"
    });

    //check for dupilcadet username en database verifiction
    const duplicate=userDB.users.find(person=>person.username==user);
    if(duplicate)return res.sendStatus(409);//conflict
    try{
        //encryptar password
        const hasdpwd=await bcrypt.hash(pwd,10);
        //store the user 

        const newUser={ "username":user, "password":hasdpwd};
        userDB.setUsers([...userDB.users,newUser]);
        await fsPromises.writeFile(

            path.join(__dirname,"..","models","user.json"),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({
            "success":`NEW USER ${user} CREATED` 

        })

    }
        catch(err){

            res.status(500).json({"message":err.message});
        }


        }
    
module.exports={handleNewUser}