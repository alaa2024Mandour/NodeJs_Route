const { log } = require("node:console")
const path = require("node:path")

const fs = require("node:fs")

const EventEmitter = require("node:events")
const event = new EventEmitter()
//1. Write a function that logs the current file path and directory. 
function get_current_file_dir_path(){
    console.log({File : __filename})
    console.log({Dir : __dirname})
}
get_current_file_dir_path()

//2. Write a function that takes a file path and returns its file name. 
function get_file_name(filePath){
    return path.basename(filePath)
}
console.log(get_file_name("/user/model/index.js"));

// 3. Write a function that builds a path from an object
function get_file_path_from_object(obj){
    return path.format(obj)
}
console.log(get_file_path_from_object( { dir: "folder", name: "app", ext: ".js"}));


//4. Write a function that returns the file extension from a given file path. 
function get_file_ext(filePath){
    return path.extname(filePath)
}
console.log(get_file_ext("/docs/readme.md"));


//5. Write a function that parses a given path and returns its name and ext.
function get_file_details(filePath){
    let fileD = path.parse(filePath);
    return {Name : fileD.name , Ext :fileD.ext}
}

console.log(get_file_details("/home/app/main.js"));


//6. Write a function that checks whether a given path is absolute. 
function isAbs(filePath){
    return path.isAbsolute(filePath)
}

console.log(isAbs("./user/user1")); //false
console.log(isAbs("/user/user1")); //true

//7. Write a function that joins multiple segments 
function join_segments(...segments){ //rest operator to collect multi args
    return path.join(...segments) //spread operator to spread args
}
console.log(join_segments("src","components", "App.js"));


//8. Write a function that resolves a relative path to an absolute one.
function get_absolute_path(endPoint){
    return path.resolve(endPoint);
}
console.log(get_absolute_path("./index.js"));

//9. Write a function that joins two paths.
function join_2paths(path1,path2){ //rest operator to collect multi args
    return path.join(path1,path2) //spread operator to spread args
}
console.log(join_2paths(" /folder1","folder2/file.txt"));

//10. Write a function that deletes a file asynchronously
function deleteFile(f_path){
    let filePath = path.resolve(f_path); //to get the absolute path

    let fileName = path.basename(f_path);
    fs.rm(filePath,{recursive:true},(err)=>{
        if(err){
            console.log("Error >> no such file or directory");
            
        }else{
            console.log(` The ${fileName} is deleted.`);
        }
    })
}
deleteFile("./data.txt");

//11. Write a function that creates a folder synchronously
function create_folder(folderName){
    try{
        fs.mkdirSync(folderName,{recursive:true});
        return "Success";
    }
    catch(err){
        return err;
    }
}

console.log(create_folder("users/images"));


//12. Create an event emitter that listens for a "start" event and logs a welcome message.
event.on("start",()=>{
    console.log("Welcome event triggered!");
})
event.emit("start");

//13. Emit a custom "login" event with a username parameter.
event.once("login",(user_name)=>{
    console.log(`User logged in: ${user_name}`);
})
event.emit("login","Ahmed");

//14. Read a file synchronously and log its contents.
function read_file(f_path){
    let filePath = path.resolve(f_path,); 
    return fs.readFileSync(filePath,{encoding:"utf-8"});
}

console.log(read_file("./info.txt"));

//15. Write asynchronously to a file.
function write_to_file(f_path,data){
    let filePath = path.resolve(f_path); 
    return fs.writeFile(filePath,`\n${data} `,{flag:"a"},(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("data added successfully");
            
        }
    });
}

write_to_file("./async.txt","Async save")

//16. Check if a directory exists.
function dir_is_exists(f_path){
    let filePath = path.resolve(f_path); 
    return fs.existsSync(f_path)
}

console.log(dir_is_exists("./async.txt"));

//17. Write a function that returns the OS platform and CPU architecture. 
/*  👉 عملت سيرش عنها👈*/
const os = require('node:os');
function pc_details(){
    return {Platform: os.platform() , Arch: os.arch() };
}
console.log(pc_details());


