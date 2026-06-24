const buttons: (() => void)[] = [];

for (var i = 0; i < 5; i++) {
  buttons.push(function () {
    console.log("Button index:", i);
  });
}
console.log(i);
buttons[0]();
buttons[1]();
buttons[2]();
