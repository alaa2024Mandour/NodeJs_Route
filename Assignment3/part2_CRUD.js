let path = require("node:path")
let {writeFileSync,readFileSync} = require("node:fs")
let http = require("node:http");
const { json } = require("node:stream/consumers");

let port = 3000;
let filePath = path.resolve("./users.json")
//# CRUD #
const server = http.createServer((req,res)=>{
    let{method,url}=req;
    let usersInfo = readFileSync(filePath,{encoding:"utf-8"});
    let users = JSON.parse(usersInfo); // to convert users info from json to array of objects
    // console.log(users);
    
    //Read
    if(method=="GET" && url=="/"){
        res.writeHead(200,{"content-type":"application/json"});
        res.write(JSON.stringify({Message:"Done",users}));
        return res.end()
    }
    else if(method=="GET" &&  url.startsWith("/user/")){
        const Id = url.split("/")[2];
        let userExist = users.find((user)=>{return user.Id == Id});
        if(userExist){
            res.writeHead(200,{"content-type":"application/json"});
            res.write(JSON.stringify({Message:"Done",userExist}));
            return res.end()
        }
        res.writeHead(404,{"content-type":"application/json"});
        res.write(JSON.stringify({Message:"User Not Exist"}));
        return res.end()
    }
    //Create 
    else if(method=="POST"&& url=="/user"){
        let data = "";
        req.on("data",(chunck)=>{
            data+=chunck
        })
        req.on("end",()=>{
        const {name,email,password,age}=JSON.parse(data); //{} to convert user data from json to object to add this data to my list users
        let userExist = users.find((user)=>{
        return user.email == email
        });
        if(userExist){
            res.writeHead(400,{"content-type":"application/json"});
            res.write(JSON.stringify({Message:"User Already Exist",users}))
            return res.end()
        }
        let lastId = users[users.length-1].Id;
        let newId = lastId+1  //auto generate IDs
        users.push({Id:newId,name,email,password,age});
        writeFileSync(filePath,JSON.stringify(users))
        res.writeHead(200,{"content-type":"application/json"});
        res.write(JSON.stringify({Message:"User Added Successfully",users}))
        return res.end()
        })
    }
    //Update
    else if(method=="PATCH"&&  url.startsWith("/user/")){
        const Id = url.split("/")[2];
        let data = "";
        req.on("data",(chunck)=>{
            data+=chunck
        })
        req.on("end",()=>{
        const {name,email,password,age}=JSON.parse(data); //{} to convert user data from json to object to add this data to my list users
        let userExist = users.find((user)=>{
        if(user.Id == Id){
            user.name=name;
            user.password=password;
            user.age=age;
            return user;
        }
        });
        if(!userExist){
            res.writeHead(404,{"content-type":"application/json"});
            res.write(JSON.stringify({Message:"User Not Exist ❌",users}))
            return res.end()
        }
        writeFileSync(filePath,JSON.stringify(users))
        res.writeHead(200,{"content-type":"application/json"});
        res.write(JSON.stringify({Message:"User Updated Successfully ✔",userExist}))
        return res.end()
        })
    }
    //Delete
    else if(method=="DELETE"&&  url.startsWith("/user/")){
        const Id = url.split("/")[2];
        let userIndex;
        // let data = "";
        req.on("data",(chunck)=>{
            userIndex= users.findIndex((user)=>{
            return user.Id == Id;
        })
        })
        req.on("end",()=>{
        //const {email}=JSON.parse(data); //{} to convert user data from json to object to add this data to my list users
        
        if(userIndex == -1){
            res.writeHead(404,{"content-type":"application/json"});
            res.write(JSON.stringify({Message:"User Not Exist ❌",users}));
            return res.end();
        }
        users.splice(userIndex,1);
        writeFileSync(filePath,JSON.stringify(users));
        res.writeHead(200,{"content-type":"application/json"});
        res.write(JSON.stringify({Message:"User Deleted Successfully ✔",users}))
        return res.end()
        })
    }else{
        res.writeHead(404,{"content-type":"application/json"});
        res.write(JSON.stringify({Message:"Oops .404. Route Not Found "}))
        return res.end()
    }
    
});

server.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
});