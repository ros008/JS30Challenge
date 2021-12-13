"use strict";

console.log(1);
setTimeout(() => {
  console.log(4);
}, 1000);
console.log(2);
console.log(3);

function printImmediatley(print) {
  print();
}
printImmediatley(() => console.log("hello"));

function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "sujin" && password === "kim") ||
        (id === "hey" && password === "ho")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "sujin") {
        onSuccess({ name: "sujin", role: "admin" });
      } else {
        onError(new Error("not access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter you password");

userStorage.loginUser(id, password, (user) => {
  userStorage.getRoles(
    user,
    (userWidthRole) => {
      alert(
        `Hello ${userWidthRole.name}, you have a ${userWidthRole.role} role`
      );
    },
    (error) => {
      console.log(error);
    }
  );
});
