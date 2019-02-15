(function() {
	let counter = 99;
	const selectDivs = Array.from(document.getElementsByClassName("customSelect"));
	selectDivs.forEach(div => {
		div.style.zIndex = counter;
		createSelection(div);
		counter--;
	});
})();

function createSelection(selectDiv) {
	const selectEl = selectDiv.getElementsByTagName("select")[0];
	const optionEls = Array.from(selectEl.getElementsByTagName("option"));
	const optionsContainer = document.createElement("div");

	let currentValue = document.createElement("span");
	currentValue.className = "selectCurrentValue";
	currentValue.innerText = optionEls[0].innerText;
	selectDiv.appendChild(currentValue);
	optionsContainer.style.visibility = "hidden";

	Object.assign(selectEl.style, {
		position: "absolute",
		top: `${selectDiv.clientHeight}px`,
		width: `0px`,
		height: "0px",
		visibility: "hidden"
	});

	optionEls.forEach((opt, index) => {
		let div = document.createElement("div");
		div.innerText = opt.innerText;
		div.setAttribute("class", "customOption");
		div.setAttribute("value", `${opt.value}`);
		div.setAttribute("index", `${index}`);
		div.addEventListener("click", optionSelected);
		optionsContainer.appendChild(div);
	});

	selectDiv.appendChild(optionsContainer);

	selectDiv.addEventListener("click", e => {
		if (optionsContainer.style.visibility === "visible") {
			optionsContainer.style.visibility = "hidden";
		} else {
			Object.assign(optionsContainer.style, {
				position: "absolute",
				top: `${selectDiv.clientHeight}px`,
				width: `${selectDiv.clientWidth}px`,
				visibility: "visible"
			});
		}
	});

	function optionSelected(e) {
		selectDiv.getElementsByClassName("selectCurrentValue")[0].innerText = e.target.innerText;
		selectEl.selectedIndex = e.target.index;
		selectEl.value = e.target.getAttribute("value");
		selectEl.dispatchEvent(new Event("change"));
	}
}
