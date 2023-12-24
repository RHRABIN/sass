const selected_item_parent = document.querySelector(".selected-item");
const selected_items = document.querySelectorAll(".item");

const handleSelect = (clickValue) => {
    const options = document.querySelectorAll(".option");
    const items = document.querySelectorAll(".item");

    const selectedIds = Array.from(items).map(i => i.id.toLocaleLowerCase());

    //check is exist or not
    const isExist = selectedIds.find(i => i == clickValue.toLocaleLowerCase());

    if (isExist == undefined) {
        Array.from(options).forEach(i => {
            if (i.innerText == clickValue) {
                i.classList.add("selected")
            }
        });

        const newDiv = document.createElement("div");
        newDiv.id = clickValue;
        newDiv.className = "item";
        newDiv.innerHTML = `
    ${clickValue}
    <button onclick="removeSelectedItem(event, ${clickValue})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="currentColor"></path>
        </svg>
    </button>
`;
        selected_item_parent.insertBefore(newDiv, selected_item_parent.querySelector('.search-input'));

    } else {
        //  remove the selected class
        Array.from(options).forEach(i => {
            if (i.innerText == clickValue) {
                i.classList.remove("selected")
            }
        });

        //remove from selected list
        filterData = Array.from(items).filter(i => i.id !== clickValue);
        selected_item_parent.textContent = "";
        Array.from(filterData).forEach(i => selected_item_parent.insertBefore(i, selected_item_parent.querySelector('.search-input')))
    }
    document.getElementById("search-placeholder").style.display = "none";

}

const handleFocus = (clickValue, e) => {
    if (e.key === "Enter") {
        e.stopPropagation()
        handleSelect(clickValue)
    }
}

const removeSelectedItem = (event, value) => {
    event.stopPropagation();
    const selectedItems = document.querySelectorAll(".item");

    const restData = Array.from(selectedItems).filter(i => i.id.toLocaleLowerCase() !== value.id.toLocaleLowerCase());
    const searchInput = selected_item_parent.querySelector('.search-input');

    // Remove existing elements before the search input
    while (selected_item_parent.firstChild !== searchInput) {
        selected_item_parent.removeChild(selected_item_parent.firstChild);
    }

    //  remove the selected class
    const options = document.querySelectorAll(".option");
    Array.from(options).forEach(i => {
        if (i.innerText == value.id) {
            i.classList.remove("selected")
        }
    });

    // Insert the filtered elements before the search input
    restData.map(el => selected_item_parent.insertBefore(el, searchInput));

    //  set the search... text div
    if (selectedItems.length <= 1 && !document.getElementById("search-placeholder")) {
        const newDiv = document.createElement("div");
        newDiv.id = "search-placeholder";
        newDiv.innerHTML = `Search...`;
        selected_item_parent.insertBefore(newDiv, selected_item_parent.querySelector('.search-input'));
    }
}