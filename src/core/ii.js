// const fetch = require("node-fetch");
// console.log("I am a " + job);
// var job = "Web Devloper";
// console.log("I am a " + job);
// "use strict"
// function whoami() {
//     console.log("I am a " + job);
//     job = "Full stack Web Devloper";
//     console.log("I am a " + job)
// }
// var a ="hello guys";
// function one(){
//     var b = "i am ";
//     second();
//     function second(){
//         var c ="Tarun Sinha";
//         console.log(a+b+c);
//         three()
//     }
// }
// function three(){
//     var d =" cse";
//     console.log(a+b+c+d)
// }
// // one();
// function sum(a,b){
//     var add = a+b;
//     console.log(add)
// }
// sum(9,8)
// // whoami()

// const t = {
//     name:'Tarun',
//     sum:function(a,b){
//         var add = a+b;
//         console.log(a+b);
//         console.log(this.name)
//         console.log(this.sum(9,8))
//         console.log(this)
//     }
// }
// t.sum(4,5)

// const t = {
//     name:'TARUN',
//     surname:'SINHA',
//     sum: function(){
//         console.log(this.name);
//         console.log(this)
//         console.log(this.surname);
//         function child(){
//             var name = "Sinha"
//             console.log("here it is the child "+name)
//             console.log("here it is the child "+this.name)
//             console.log(this)
//         }
//         child();
//     }
// }

// t.sum()

// console.log(typeof ({}))

// const funA = (str1,funto) =>{
//     console.log(`I am you ${str1}....you remember`);
//     funto();
// }


// const funB = () =>{
//     console.log("WE STUDIED IN THE SAME SCHOOL")
// }

// funA('Tarun',funB)
// const a = 10;
//     function f() {
//         // a = 9
//         console.log(a)
//     }
//     f();
// const b = {
//         prop1: 10,
//         prop2: 9
//     }
     
    // It is allowed
//     b.prop1 = 3
//  console.log(b)
    // It is not allowed
    // b = {
    //     b: 10,
    //     prop2: 9
    // }
    // console.log(a);
    // let a = 10;
    // let a = 10
    // if (true) {
    //   let a=9
    //   console.log(a) // It prints 9
    // }
    // console.log(a)
    // let a = 10
 
    // // It is not allowed
    // let a = 10
 
    // // It is allowed
    // // a = 10

    // let a = 10;
    // function f() {
    //     if (true) {
    //         let b = 9
    //         console.log(b);
    //     }
    //     console.log(b);
    // }
    // f()
 
    // // It prints 10
    // console.log(a)
    // let a = 10;
    // function f() {
    //     let b = 9
    //     console.log(b);
    //     console.log(a);
    // }
    // f();
// function sum(...vals){
//     console.log(vals)
// }
// sum(1,4,5,6,2,5,6,23,56)

// function name(a,b,...c)
// {
//     console.log(`${a}${b}`)
//     console.log(c)
// }
// name('sdgg','dffsv','efsf','sdsddv','tbhyhjy','ytrhotykht','svfdvbfgb')
// const fun2 = () => {
//     setTimeout(() => {
//         console.log("Fun2 is going on")

//         })
// }
// const fun1 = () =>{
//     console.log("Fun1 is started")
//     fun2()
//     console.log("fun1 has ended")
// }
// fun1()

//call back hell
// const getRollNo = () => {
//     setTimeout(()=>{
//         console.log("Here it starts")
//         let roll_numbers = [1,4,5,9,5,3];
//         console.log(roll_numbers);
//         setTimeout(()=>{
//             const bio_data = {
//                 name:'Tarun',
//                 age:21,
//             }
//             console.log(bio_data);
//             setTimeout(()=>{
//                 bio_data.gender = 'Male'
//                 console.log(bio_data)
//             },2000)
//         },2000,roll_numbers[2])
//     },2000)
// }
// getRollNo()


// const pobj1 = new Promise((resolve,reject)=>{
//     var rollno  = [1,2,3,4,5]
//     if(rollno){
//         resolve(rollno)
//     }
//     if(rollno === undefined){
//         reject("Error")
//     }
// })

// const getBiodata = (indexdata) =>{
//     return new Promise((resolve,reject)=>{
//         setTimeout((indexdata)=>{
//             let bio_data = {
//                 name:'Tarun',
//                 rank:'LT.'
//             }
//             resolve(`I am ${bio_data.rank}  ${bio_data.name} ${indexdata}`)
//         },2000,indexdata)
//     })
// } 

// pobj1.then(
//     result => {
//         console.log("results",result)

//     return getBiodata(result[2])
//     }).then(res => {
//     console.log('res',res)
// }).catch(err => {
//     console.log("err",err)
// })



// async function getData(){
//     const promise_no1 = await pobj1
//     console.log(promise_no1)
//     const promise_no2 = await getBiodata(promise_no1[1])
//     return promise_no2
// }
//means this function will return the promise
// const gd = getData().then((mydata) => {
//     console.log(mydata)
// })
// console.log(gd)
// setTimeout(()=>{
//     console.log("---",gd)
// },3000)
// console.log(gd)

// const a = fetch('https://api.covid19api.com/summary').then((mydata) =>{
//     console.log("my data",mydata)
// }
// ).then((yourdata)=>{
//     console.log("Your data",yourdata)
// }
// ).catch((error) =>{
//     console.log("error",error)
// }
// )