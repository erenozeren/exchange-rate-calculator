const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rateText = document.getElementById("rate");
const swapBtn = document.getElementById("swap");

async function calculate() {
    const base = currencyOne.value;
    const target = currencyTwo.value;

    try {
        const res = await fetch(
            `https://v6.exchangerate-api.com/v6/1df646a68587b9fd36c92222/latest/${base}`
        );

        const data = await res.json();
        const rate = data.conversion_rates[target];

        rateText.innerText = `1 ${base} = ${rate} ${target}`;
        amountTwo.value = (amountOne.value * rate).toFixed(2);

    } catch (error) {
        console.error("API Hatası:", error);
    }
}

function swapCurrencies() {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
}


currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swapCurrencies);


amountOne.addEventListener("input", () => {
    amountOne.value = amountOne.value.replace(/[^0-9]/g, "");
});


amountTwo.setAttribute("readonly", true);

calculate();