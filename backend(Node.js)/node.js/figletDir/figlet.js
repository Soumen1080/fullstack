import figlet from "figlet";

async function doStuff() {
  const text = await figlet.text("hello world");
  console.log(text);
}

doStuff();