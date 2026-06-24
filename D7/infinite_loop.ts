let count = 0;

function render() {
  console.log("render", count);

  count++;

  if (count < 10) {
    render();
  }
}

render();
