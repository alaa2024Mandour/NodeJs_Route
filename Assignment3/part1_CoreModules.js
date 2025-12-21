/* #### Part1: Core Modules #### */
const { log } = require("node:console")
let fs = require("node:fs")
let path= require("node:path")
/*
1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
• Input Example: "./big.txt"
• Output Example: log each chunk
*/
let filePath = path.resolve("./big.txt")

function readFile(filePath){
    let readFileStream = fs.createReadStream(filePath,{encoding:"utf-8"})
    readFileStream.on("data",(chunck)=>{
        console.log(chunck);
    })
}

readFile(filePath);


/*
2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
• Input Example: "./source.txt", "./dest.txt"
• Output Example: File copied using streams
*/

let sourcePath = path.resolve("./source.txt")
let desPath = path.resolve("./des.txt")

function write(source,des){
    let readFileStream = fs.createReadStream(source,{encoding:"utf-8",highWaterMark:100})
    let writeFileStream = fs.createWriteStream(des,{flags:"a"})
    readFileStream.on("data",(chunck)=>{
        writeFileStream.write("\n------chunck------\n"+chunck)
    })
}

write(sourcePath,desPath);





/*
3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
• Input Example: "./data.txt", "./data.txt.gz"
*/
let {createGzip} = require("node:zlib");


dataFile = path.resolve("./data.txt")

function compressDataFile(file){
    let readFileStream = fs.createReadStream(file,{encoding:"utf-8",highWaterMark:100})
    let writeFileStream = fs.createWriteStream((file+".zip"),{flags:"a"})
    let gzip = createGzip();
    readFileStream.pipe(gzip).pipe(writeFileStream)
}

compressDataFile(dataFile)

/*   👉👉 CRUD operations باقي الاساله الخاصه بال 
 في الملف اللي اسمه  part1_CRUD.js 👈👈
 */