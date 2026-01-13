const BASE_URL = "https://v6.exchangerate-api.com/v6/dbd6e36e1f79b0a820540bda/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newoption.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = true;
    }

    select.append(newoption);
  }

  select.addEventListener("change", (e) => {
    updateflag(e.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = Number(amount.value);

  if (!amtval || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }


  const URL = `${BASE_URL}/${fromcurr.value}`;

  let response = await fetch(URL);
  let data = await response.json();

 
  let rate = data.conversion_rates[tocurr.value];

  let finalamount = amtval * rate;

  msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount.toFixed(6)} ${tocurr.value}`;
};

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
