"use strict";

// async & await
// promise를 깔끔하게 사용할 수 있는 방법
async function fetchUser() {
  return "sujin";
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return "apple";
}

async function getBanana() {
  await delay(1000);
  return "banana";
}

/*
function pickFruits() {
  return getApple().then((apple) => {
    return getBanana().then((banana) => `${apple} + ${banana}`);
  });
}
*/

async function pickFruits() {
  // 병렬적으로 처리?? => promise에서 제공하는 api 사용한다.
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}
pickFruits().then(console.log);

// promise api
function pickAllFruits() {
  // promise 배열을 넘기면 모든 promise들이 병렬적으로 모두 받을 때까지 모아주는 역할
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);
