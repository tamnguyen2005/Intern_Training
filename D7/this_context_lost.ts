const user = {
  name: "Tam",
  greet() {
    console.log("Hello", this.name);
  },
};

const greetFn = user.greet.bind(user);
greetFn();

