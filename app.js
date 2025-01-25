const BASE_URL = "https://api.currencyapi.com/v3/latest";
const API_KEY = "cur_live_K7PS5r7Kp5K81iEaCDIbNogkyAzjTIzjVEiun9yg";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg =document.querySelector(".msg");
window.addEventListener("load",()=>
{
  updateExchangeRate();
})

for (let select of dropdowns) {
    for (let currCode in allCountry) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async ()=>
    {
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
    
        if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = "1";
        }
    
        const URL = `${BASE_URL}?apikey=${API_KEY}`;
    
        try {
            let response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
    
            let data = await response.json();
    
            // Extract rates for both currencies
            const fromRate = data.data[fromCurr.value]?.value;
            const toRate = data.data[toCurr.value]?.value;
    
            if (!fromRate || !toRate) {
                throw new Error(`Exchange rate not available for selected currencies.`);
            }
    
            // Calculate the conversion rate
             const rate = toRate / fromRate;
    
            // Calculate the converted amount
            const finalAmount = amtVal * rate; // this is the final amount 
            msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
            // console.log(`Converted Amount: ${convertedAmount}`);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
    

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = allCountry[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
