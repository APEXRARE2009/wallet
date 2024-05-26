let inputName = document.querySelector(".input-name");
let inputPrice = document.querySelector(".input-price");
let select = document.querySelector(".content__block-purchase-choice-list-item-select");
let btn = document.querySelector(".content__block-purchase-choice-btn");
let error = document.querySelector(".content__block-purchase-choice-error");
let blockList = document.querySelector(".content__block-purchase-list");
let legendsPrize = document.querySelector(".content__block-chart-list-legends-item-price-number");
let allPriceTxt = document.querySelector(".content__block-chart-list-inTotal-before");

let fastFoodPrice = document.querySelector("#fastfood");
let sportPrice = document.querySelector("#sport");
let drinksPrice = document.querySelector("#drinks");
let gamePrice = document.querySelector("#game");

let blockCheckDevice = document.querySelector(".checking-device");
let blockCheckDeviceContent = document.querySelector(".checking-device-content");
let blockCheckDeviceBtn = document.querySelector(".checking-device-content-btn");
let blockCheckDeviceTxt = document.querySelector(".checking-device-content-txt");

let agentInfo = navigator.userAgent;

if (agentInfo.includes("Android")) {
    blockCheckDevice.style.display = "flex";
} else if (agentInfo.includes("iPhone")) {
    blockCheckDevice.style.display = "flex"
}

blockCheckDeviceBtn.addEventListener("click", () => {
    setTimeout(() => {
        blockCheckDevice.style.display = "none";
    }, 2300);
    setTimeout(() => {
        blockCheckDevice.classList.add("checking-device-close")
    }, 1200);
    setTimeout(() => {
        blockCheckDeviceContent.classList.add("checking-device-content-close")
    }, 400);
    blockCheckDeviceBtn.classList.add("checking-device-content-btn-close")
    blockCheckDeviceTxt.classList.add("checking-device-content-txt-close")
})

btn.addEventListener("click", () => addProduct())

function addProduct() { // функция при нажатии на кнопку
	checkInputValue()
}

function getAllPrice() { // итоговая цена
	let items = Array.from(document.querySelectorAll(".content__block-purchase-list-item-block"));
	let priceAllItems = 0;
	items.map((item) => {
		let itemPrice = +item.children[2].children[0].innerText;
		priceAllItems += itemPrice;
		console.log("item ", itemPrice);
	})
	allPriceTxt.innerHTML = `<span>Всего:</span> ${priceAllItems}`;
	console.log("allPrice ", priceAllItems);
	console.log("length ", items.length);
}

getAllPrice()

function getPriceEachLegend() { // цена каждогой легенды
	let items = Array.from(document.querySelectorAll(".content__block-purchase-list-item-block"));
	let fastFoodPriceValue = 0;
	let sportPriceValue = 0;
	let drinksPriceValue = 0;
	let gamePriceValue = 0;
	fastFoodPrice.textContent = fastFoodPriceValue;
	sportPrice.textContent = sportPriceValue;
	drinksPrice.textContent = drinksPriceValue;
	gamePrice.textContent = gamePriceValue;
	items.map((item) => {
		let itemPrice = +item.children[2].children[0].innerText;
		if (item.id == "fastfood") {
			fastFoodPriceValue += itemPrice;
			fastFoodPrice.textContent = fastFoodPriceValue;
		} else if (item.id == "sport") {
			sportPriceValue += itemPrice;
			sportPrice.textContent = sportPriceValue;
		} else if (item.id == "drinks") {
			drinksPriceValue += itemPrice;
			drinksPrice.textContent = drinksPriceValue;
		} else if (item.id == "game") {
			gamePriceValue += itemPrice;
			gamePrice.textContent = gamePriceValue;
		}
	})
}

blockList.addEventListener("click", (event) => { // удаление item
	let itemTarget = event.target;
	if (itemTarget.classList.contains("content__block-purchase-list-item-block")) {
		itemTarget.remove();
		getAllPrice();
		getPriceEachLegend();
		curcle();
	}
})

function getAllValues() { // получить все введенные данные
	inputNameValue = inputName.value;
	inputPriceValue = inputPrice.value;
	selectValue = select.value;
	selectValueReplace = selectValue.replace(/\s/g, '');
}

function checkInputValue() { // проверить на правильность введенные данные
	if (inputName.value == "" || inputName.value == " ") {
		error.innerHTML = "Некорректный ввод<span>!</span>";
		error.classList.add("content__block-purchase-choice-error-true");
	} else if (inputPrice.value == "" || (inputPrice.value.substring(0, 2) === "00" && inputPrice.value.length >= 2)) {
		error.innerHTML = "Некорректный ввод<span>!</span>";
		error.classList.add("content__block-purchase-choice-error-true");
	} else if (select.value == "choose") {
		error.innerHTML = "Выберите категорию<span>!</span>";
		error.classList.add("content__block-purchase-choice-error-true");
	}
	 else {
		error.classList.remove("content__block-purchase-choice-error-true");
		getAllValues();
		addItem();
		getAllPrice();
		getPriceEachLegend();
		curcle();
		autoResetInputValue();
	}
}

function addItem() { // добавление item
	let item = document.createElement("div");
	item.classList.add("content__block-purchase-list-item-block");
	item.id = selectValueReplace;
	let itemName = document.createElement("div");
	itemName.classList.add("content__block-purchase-list-item");
	itemName.textContent = inputNameValue;
	item.append(itemName);
	let itemCategory = document.createElement("div");
	itemCategory.classList.add("content__block-purchase-list-item");
	itemCategory.id = selectValueReplace;
	itemCategory.textContent = select.value;
	item.append(itemCategory);
	let itemBlock = document.createElement("div");
	itemBlock.classList.add("content__block-purchase-list-item");
	item.append(itemBlock);
	let itemBlockPrice = document.createElement("div");
	itemBlockPrice.classList.add("content__block-purchase-list-item-price");
	itemBlockPrice.textContent = inputPriceValue;
	itemBlock.append(itemBlockPrice);
	let itemBlockSign = document.createElement("div");
	itemBlockSign.classList.add("content__block-purchase-list-item-sign");
	itemBlockSign.textContent = "₽";
	itemBlock.append(itemBlockSign);
	blockList.append(item);
	setTimeout(() => {
		item.classList.add("content__block-purchase-list-item-block-add");
	}, 0);
	setTimeout(() => {
		itemName.classList.add("font-size-1vw");
	}, 100);
	setTimeout(() => {
		itemCategory.classList.add("font-size-1vw");
	}, 400);
	setTimeout(() => {
		itemBlock.classList.add("font-size-1vw");
	}, 600);
}

function autoResetInputValue() { // очистить input
	inputName.value = "";
	inputPrice.value = "";
	select.value = "choose";
}

function curcle() { // диаграмма
	let curcleItem = Array.from(document.querySelectorAll(".unit"));
	let radiusCurcle = document.querySelector(".unit").getAttribute("r");
	let length = 2 * 3.14 * radiusCurcle;
	console.log(length);
	let items = Array.from(document.querySelectorAll(".content__block-purchase-list-item-block"));
	let fastFoodPriceValue = 0;
	let sportPriceValue = 0;
	let drinksPriceValue = 0;
	let gamePriceValue = 0;
	items.map((item) => {
		let itemPrice = +item.children[2].children[0].innerText;
		if (item.id == "fastfood") {
			fastFoodPriceValue += itemPrice;
		} else if (item.id == "sport") {
			sportPriceValue += itemPrice;
		} else if (item.id == "drinks") {
			drinksPriceValue += itemPrice;
		} else if (item.id == "game") {
			gamePriceValue += itemPrice;
		}
	})
	let priceAllItems = 0;
	items.map((item) => {
		let itemPrice = +item.children[2].children[0].innerText;
		priceAllItems += itemPrice;
	})
	let fastFoodDifference = (fastFoodPriceValue / priceAllItems) * 100;
	let sportDifference = (sportPriceValue / priceAllItems) * 100;
	let drinksDifference = (drinksPriceValue / priceAllItems) * 100;
	let gameDifference = (gamePriceValue / priceAllItems) * 100;
	if (fastFoodPriceValue == 0) {
		fastFoodDifference = 0
	} if (sportPriceValue == 0) {
		sportDifference = 0;
	} if (drinksPriceValue == 0) {
		drinksDifference = 0;
	} if (gamePriceValue == 0) {
		gameDifference = 0;
	}
	curcleItem[0].style.strokeDasharray = `${fastFoodDifference} 100`;
	curcleItem[0].style.strokeDashoffset = 0;
	curcleItem[1].style.strokeDasharray = `${sportDifference} 100`;
	curcleItem[1].style.strokeDashoffset = -fastFoodDifference;
	curcleItem[2].style.strokeDasharray = `${drinksDifference} 100`;
	curcleItem[2].style.strokeDashoffset = -(fastFoodDifference + sportDifference);
	curcleItem[3].style.strokeDasharray = `${gameDifference} 100`;
	curcleItem[3].style.strokeDashoffset = -(fastFoodDifference + sportDifference + drinksDifference);
}