function createCounter(init){
    let originalNum = init;
    let count = {
        increment:() => {
            init +=1;
            return init;
        },
        decrement:() => {
            init -=1;
            return init;
        },
        reset:() => {
            init = originalNum;
            return init;
        },
    }
    return count;
}
const counter = createCounter(5);
console.log(counter.increment());
console.log(counter.reset()); // 5
console.log(counter.decrement()); // 4