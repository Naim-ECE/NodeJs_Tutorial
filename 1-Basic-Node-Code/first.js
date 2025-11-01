console.log(`NodeJs started`);

const fs = require("fs");

fs.writeFile("output.txt", "Writing something in here", (err) => {
  if (err) {
    console.log(`Error occured`);
  } else {
    console.log(`File successfully written`);
  }
});

// repl -> type 'node' and the console window like browser will open up
// node 'file name' will execute js file
