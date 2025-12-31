const {readFileSync,writeFileSync} = require("node:fs");
const {resolve} = require("node:path");
const express = require("express");

const app = express();
let port = 3000;
app.use(express.json());
const fileData = JSON.parse(readFileSync(resolve("./users.json"),{encoding:"utf-8"}));

let lastID = fileData[fileData.length-1].Id;
let newId = lastID + 1;
//1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)
app.post("/users",(req,res,next)=>{
    let {Id,name,email,password,age} = req.body;
    if(!name || !age || !password || !email){
        return res.status(400).json({Message:"Email, Name, Passowrd and Age are required "});
    }
    const userExist = fileData.find((user)=>{
        return email == user.email
    })
    if(userExist){
        return res.status(400).json({Message:"Email already exist"});
    }
    Id = newId;
    fileData.push({Id,name,email,password,age})
    writeFileSync(resolve("./users.json"),JSON.stringify(fileData))
    return res.status(201).json({Message:"User added successfully"});
})

//2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the params.
app.patch("/users/:Id",(req,res,next)=>{
    const {Id}=req.params
    const {name,email,password,age} = req.body;
    const userExist = fileData.find((user)=>{
        return Id == user.Id
    })
    if(!userExist){
        return res.status(400).json({Message:"UserId Not exist"});
    }
    

    if (email){
    const emailExist = fileData.find((user)=>{return user.email==email})
    if(emailExist){
        return res.status(400).json({Message:"Email Already exist"});
    }
    userExist.email = email;
}
    if (name){userExist.name = name}
    if (age){userExist.age = age}
    if (password){userExist.password = password}
    writeFileSync(resolve("./users.json"),JSON.stringify(fileData))
    return res.status(201).json({Message:"User Updated successfully"});
})


//3. Create an API that deletes a User by ID. The user id should be retrieved from either the request body or optional params.
app.delete("/users{/:Id}",(req,res,next)=>{
    
    try{
        let Id = req.params.Id || req.body.Id;
        let userExist = fileData.find((user)=>{
        return user.Id == Id 
    })

    if(userExist){
        const users = fileData.filter((user)=>{
            return user.Id != Id
        });
        
        writeFileSync(resolve("./users.json"),JSON.stringify(users));
        return res.status(200).json({Message:"User deleted successfully",users});
    }
    return res.status(404).json({Message:"UserId Not exist"});
    }catch(erorr){
        return res.status(400).json({Message:"UserId is required to delete the user you want .."});  
    };
    
})


//4. Create an API that gets a user by their name. The name will be provided as a query parameter.
app.get("/users/getByName",(req,res,next)=>{
    let {name}=req.query

    let users = fileData.filter((user)=>{
        return user.name === name
    });

    if(users.length == 0){
        return res.status(404).json({Message:"User Not Found"});
    }
    return res.status(200).json({Message:"Done",users});
});


//5. Create an API that gets all users from the JSON file.
app.get("/users",(req,res,next)=>{
    res.json(fileData);
});

//6. Create an API that filters users by minimum age.
app.get("/users/filter",(req,res,next)=>{
    minAge = req.query.age
    let minUsers = fileData.filter((user)=>{
        return user.age >= minAge
    });
    if(minUsers.length==0){
        res.status(404).json({Message:`Not Found Users With Minimun Age ${minAge}`});
    }
    res.status(200).json({Message:`Users With Minimun Age ${minAge}`,minUsers});
});


//7. Create an API that gets User by ID.
app.get("/users/:Id",(req,res,next)=>{
    let Id = req.params.Id
    let userExist = fileData.find((user)=>{
        return user.Id == Id 
    })
    if(!userExist){
        return res.status(404).json({Message:"User Not Found"});
    }
    return res.status(200).json({Message:"Done",userExist});
});


app.use("{/*demo}",(req,res,next)=>{
    res.status(404).json({message:"404 Oops ... Page Not Fount .."}) 
})

app.listen(port,()=>{
    console.log("server is running now ...");
})