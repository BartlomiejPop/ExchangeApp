const currencyOne = document.querySelector("#currency-one");
const amountOne = document.querySelector(".amount-one");
const currencyTwo = document.querySelector("#currency-two");
const amountTwo = document.querySelector(".amount-two");
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rate-info");
const amountOneUp = document.querySelector(".amount-one-up");
const amountTwoUp = document.querySelector(".amount-two-up");
const amountOneDown = document.querySelector(".amount-one-down");
const amountTwoDown = document.querySelector(".amount-two-down");
const spinIcon = document.querySelector(".fa-retweet");

const calculate = () => {
	fetch(
		`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`
	)
		.then((res) => res.json())
		.then((data) => {
			const currency1 = currencyOne.value;
			const currency2 = currencyTwo.value;

			const rate = data.rates[currency2];
			rateInfo.textContent = `1${currency1}=${rate.toFixed(4)} ${currency2}`;

			amountTwo.value = (amountOne.value * rate).toFixed(2);
			rateInfo.style.visibility = "visible";
		});
};

const swapSites = () => {
	const previousCurrencyOne = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = previousCurrencyOne;
	calculate();
	spinIcon.classList.add("spin");
	setTimeout(() => {
		spinIcon.classList.remove("spin");
	}, "400");
};

const incrementAmountOne = () => {
	parseInt(amountOne.value);
	amountOne.value++;
	calculate();
};

const decrementAmountOne = () => {
	parseInt(amountOne.value);
	amountOne.value--;
	calculate();
};

calculate();

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swapSites);
amountOneUp.addEventListener("click", incrementAmountOne);
amountOneDown.addEventListener("click", decrementAmountOne);
