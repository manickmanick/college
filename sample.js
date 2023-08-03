function sample() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("manick");
    }, 5000);
  });
}

async function second() {
  const data = await sample();
  console.log(data);
}

second();
