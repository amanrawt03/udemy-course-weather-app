let mesg1 = document.getElementById("mesg-1");
let mesg2 = document.getElementById("mesg-2");

function handleOnSearch(e) {
  e.preventDefault();
  const input = document.getElementById("location").value;
  mesg1.textContent = "loading...";
  mesg2.textContent = " ";
  if (input) {
    fetch(`/weather?address=${input}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          mesg1.textContent = data.error;
        } else {
          mesg1.textContent = data.address; 
          mesg2.textContent = data.forecast;
        }
      })
      .catch((e) => console.log(e));
  } else {
    mesg1.textContent = "You must provide an address!!"
  }
}
