//1. Convert the string "123" to a number and add 7.
function convert_str_to_num (str) {
    let num = Number(str);
    return num+7;
}
console.log(convert_str_to_num("123"));

//2. Check if the given variable is falsy and return "Invalid" if it is.
function isFalsy(value){
    if(!value){
        console.log("Invalid");
    }
    else{
        console.log("valid");
    }
}
isFalsy(0) 


//3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
function getOdd_numbers(start,end){
    for (let i = start; i <= end; i++) {
        if(i%2==0){
            continue;
        }
        console.log(i);
    }
}
getOdd_numbers(1,10)


//4. Create an array of numbers and return only the even numbers using filter method. 
function getArrEven_numbers(arr){
    let evenNumbers=arr.filter((ele)=>{
        return ele%2==0;
    });
    console.log(evenNumbers);
}

let arr = [1,2,3,4,5,6,7,8,9,10]
getArrEven_numbers(arr);


//5. Use the spread operator to merge two arrays, then return the merged array. 
function mergeArr(arr1,arr2){
    let composedArray = [...arr1,...arr2]
    console.log(composedArray);
}
let arr1 = [1,2,3]
let arr2 = [4,5,6]
mergeArr(arr1,arr2)

//6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday).
function day(dayOrder){
    switch (dayOrder) {
        case 1:
            console.log("Sunday");
            break;
        case 2:
            console.log("Monday");
            break;
        case 3:
            console.log("Tusday");
            break;
        case 4:
            console.log("Wednsday");
            break;
        case 5:
            console.log("Thursday");
            break;
        case 6:
            console.log("Friday");
            break;
        case 7:
            console.log("Saturday");
            break;
        default:
            console.log("Invalid Day");
            break;
    }
}
day(5);

//7. Create an array of strings and return their lengths using map method 
function strLength(strArr) {
    let lengthArr = strArr.map((ele)=>{
        return ele.length;
    });
    console.log(lengthArr);
}
let str_arr = ["a","ab","abc"]
strLength(str_arr)


//8. Write a function that checks if a number is divisible by 3 and 5.
function divisible_by_3_5 (num){
    if(num%3==0 && num%5==0){
        console.log("Divisible by both");
    }
    else if (num%3==0){
        console.log("Divisible by 3");
    }
    else if (num%5==0){
        console.log("Divisible by 5");
    }
    else{
        console.log("Invalid Number ...");
    }
}
divisible_by_3_5(15);


//9. Write a function using arrow syntax to return the square of a number
let getSquare = (num) => {
    return num*num
}
console.log(getSquare(5));

// 10.Write a function that destructures an object to extract values and returns a formatted string.
//لسه ماخدناهوش بس عملت سيرش عنه و اللي فهمته🙄👆 
//https://www.w3schools.com/js/js_destructuring.asp

function destruct(personObject){
    let {name,age} = personObject; //conver the object properties to variabels to make access easy
    console.log(name + " is " + age + " years old "); 
}
let user = {
    name:"alaa",
    age:24,
}
destruct(user)

//11.Write a function that accepts multiple parameters (two or more) and returns their sum.
//ما خدنهاش برضو و عملت سيرش عليها للامانه 👆🙄 Rest Parameter
//https://www.w3schools.com/js/js_function_parameters.asp

function sum(...numbers){ 
    let sum = 0;
    for(let num of numbers){
        sum += num;
    }
    return sum;
}
console.log(sum(1,2,3,4,5,6));


//12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message.
///ما خدنهاش برضو و عملت سيرش عليها للامانه 👆🙄 
function after3Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Success");
    }, 3000);
  });
}
after3Seconds()


//13. Write a function to find the largest number in an array.
function largestNumber(arr){
    let largest = arr[0];
    for (let i = 0; i < arr.length; i++) {
        let currentNum = arr[i];
        if(currentNum > largest){
            largest = currentNum
        }
    }
    return largest;
}

let numbers =[1, 3, 7, 2, 4]
console.log( largestNumber(numbers));


//14. Write a function that takes an object and returns an array containing only its keys.
function objectKeys(obj){
    let arr = [];
    for(let key in obj){
        arr.push(key)
    }
    return arr;
}
let person = {
    name : "alaa",
    age:24,
}
console.log(objectKeys(person));

//15. Write a function that splits a string into an array of words based on spaces.

// function splitsWords(sentence){ //❌❌ 
//     let words = [];
//     for(let i in sentence){
//         if(i == " "){
//             let word = sentence.splice(1,i);
//             words.push(word);
//         }
//     }
//     return words;
// }

function splitsWords(sentence){
    return sentence.split(" "); //عملت عنها سيرش 
} 
let s = "The quick brown fox";
console.log(splitsWords(s));

