"use strict";

// state -> pending fulfilled rejected
// producer vs consumer

// producer
const promise = new Promise((resolve, reject) => {
  console.log("doing something...");
  setTimeout(() => {
    resolve("sujin");
    // reject(new Error("no network"));
  }, 2000);
});
// 새로운 promise가 만들어지는 순간 executer가 바로 실행된다.

// consumer then, catch, finally
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("finally"));

// promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
      // then은  값을 전달해도 되고 promise를 전달해도 된다.
    });
  })
  .then((num) => console.log(num));

const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject("chicken"), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 알`), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 후라이`), 1000);
  });

// getHen().then((hen) => console.log(hen));
getHen()
  .then((hen) => getEgg(hen))
  .catch((error) => {
    console.log(error);
    return "error chicken";
  })
  .then((egg) => cook(egg))
  .then((meal) => console.log(meal))
  .catch(console.log);
