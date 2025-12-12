/*
Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

Return the kth positive integer that is missing from this array.

Example 1:

Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
*/

function findKthPositive(arr,k){
    let count = 0;

    let max = arr[0];
    for (let i = 0; i <arr.length; i++) {
        if(arr[i]>max){
            max = arr[i]
        }
    }

    let nums = []
    for (let i = 0; i < max + k ; i++) { // عملت max + K علشان لو الرقم المفقود كان بعد اخر رقم في ال arr
        nums[i] = i+1;
    }

    let exist = false;
    for (let i = 0; i < nums.length; i++) {
        let exist = arr.includes(nums[i]);

        if (!exist) {
            count++;
        }
        if(count == k){
            return nums[i]
        }
    }
}

// let arr = [1,2,3,4];
// console.log(findKthPositive(arr , 2));
