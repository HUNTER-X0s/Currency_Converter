const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currcode in countryList){
    // console.log(currcode,countryList[currcode]);
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name === "from" && currcode === "USD"){
        newoption.selected="selected";
    }else if(select.name === "to" && currcode === "INR"){
        newoption.selected="selected";
    }
    select.append(newoption);
}

select.addEventListener("change",(e)=>{
    updateflag(e.target);
});
}

const updateExchangeRate = async() => {
     let amount = document.querySelector(".amount input"); 
    let amtval = Number(amount.value);
    // console.log(amtval);
    if(amtval === "" || amtval < 1) {
        amtval = 1;
        // amount.value = "1";
    }

    // console.log(fromcurr.value,tocurr.value);
    const URL =`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[tocurr.value.toLowerCase()];

    let finalamount = amtval * rate;

    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount.toFixed(6)} ${tocurr.value}`;
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};


btn.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", ()=> {
    updateExchangeRate();
});


