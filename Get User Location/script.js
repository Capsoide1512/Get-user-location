const button = document.querySelector("button");
const table = document.createElement("table");
const tableBody = document.createElement("tbody");
table.appendChild(tableBody);

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    button.innerText = "ALLOW TO FIND YOUR LOCATION";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerText = "NOT SUPPORTED";
  }
});

function onSuccess(position) {
  button.innerText = "WE ARE DETECTING YOUR LOCATION...";
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=INSERT KEY`
  )
    .then((response) => response.json())
    .then((response) => {
      const allDetails = response.results[0].components;
      const { county, postcode, country } = allDetails;
      button.innerText = "POSITION DETECTED...";
      const provinciaCell = document.getElementById("provincia");
      const capCell = document.getElementById("cap");
      const statoCell = document.getElementById("stato");

      provinciaCell.innerText = county;
      capCell.innerText = postcode;
      statoCell.innerText = country;
      button.parentNode.insertBefore(table, button.nextSibling);
    })
    .catch(() => {
      button.innerText = "ERROR";
    });
}

function onError(error) {
  if (error.code == 1) {
    button.innerText = "ERROR: YOU DIDN'T ALLOW";
  } else if (error.code == 2) {
    button.innerText = "LOCATION IS UNAVAILABLE";
  } else {
    button.innerText = "SOMETHING GONE WRONG";
  }
  button.setAttribute("disabled", "true");
}
