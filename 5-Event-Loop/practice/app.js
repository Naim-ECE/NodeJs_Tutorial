// 1

const fs = require("fs");

console.log(`1. Start of script`);

console.log(`2. Reading file synchronously`);
const datasync = fs.readFileSync("user-details.txt", "utf8");
console.log(`3. Synchronous read complete`);

console.log(`4. Reading file aynchronously`);
fs.readFile("user-details.txt", "utf8", (err, datasync) => {
  if (err) throw err;
  console.log(`5. Asynchronous read complete`);
});

console.log(`6. End of script`);

// order -> 1-2-3-4-6-5

// 2

console.log(`1. Start of script`);

Promise.resolve().then(() => console.log(`2. Microtask 1`)); // microtask isnot in event queue. It's in microtask queue which has more priority than event queue

setTimeout(() => console.log(`3. Timer 1`, 0));

fs.readFile("user-details.txt", () => console.log(`4. I/O operation`));

setImmediate(() => console.log("5. Immediate 1"));

process.on(`exit`, (code) => {
  console.log(`6. Exit event`);
});

console.log(`7. End of script`);

// !!!!!!!!!!!!!! --------- !!!!!!!!!!!!!!
// order -> 1-7-2-3-5-4-6

// running 4 or 5 based on the tasks it's runnin' on. So, the order could change. But basically let's assume reading file takes more time, therefore it will run late.
