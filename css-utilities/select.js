const optionMenu = document.querySelector(".select-group"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");
const search_input = document.getElementById("search-input");


let isOptionOpen = false;

const handleToggle = () => {
    optionMenu.classList.toggle("active")
    if (optionMenu.classList.contains("active")) {
        search_input.focus();
        // document.getElementById("search-placeholder").style.display = "none";
    }

    isOptionOpen = true;
}

// which option is clicked and set the value and option class selected added
// options.forEach(option => {
//     option.addEventListener("click", () => {
//         // Remove "selected" class from all options
//         options.forEach(opt => opt.classList.remove("selected"));

//         // Add "selected" class to the clicked option
//         option.classList.add("selected");

//         // Update the dropdown value and close the dropdown
//         let selectedOption = option.querySelector(".option-text");
//         // console.log(selectedOption.attributes.value.value)
//         sBtn_text.value = selectedOption.innerText;
//         optionMenu.classList.remove("active");
//         isOptionOpen = !isOptionOpen;
//     });
// });

// which item is active to catch this variable
let active = -1;
const dropdownMenuItems = Array.from(options || []);



const handleOptionKeyDown = (e) => {
    if (isOptionOpen) {
        if (e.key == "ArrowDown") {
            if (active < dropdownMenuItems.length - 1) {
                active++
                dropdownMenuItems[active].focus();
            }
        } else if (e.key == "ArrowUp") {
            if (active > 0) {
                active--
                dropdownMenuItems[active].focus()
            }
        }
        else if (e.key == "Enter") { // Enter key
            if (active !== -1) {
                // Remove "selected" class from all options
                dropdownMenuItems.forEach(opt => opt.classList.remove("selected"));

                let selectedOption = dropdownMenuItems[active].querySelector(".option-text");
                dropdownMenuItems[active].classList.add("selected");
                sBtn_text.value = selectedOption.innerText;
                optionMenu.classList.remove("active");
                isOptionOpen = !isOptionOpen;
            }
        }
    }
}

//filter dropdown item

const handleFilter = (e) => {
    const searchText = e.target.value;
    const itemsData = Array.from(options).map(item => item.innerText);
    const filterData = itemsData.flatMap(i => {
        if (i.toLowerCase().includes(searchText.toLowerCase())) {
            return Array.from(options).filter(item =>
                item.innerText.toLowerCase().includes(i.toLowerCase())
            );
        }
        return [];
    });

    const op = document.querySelector(".options");
    op.textContent = ""; // Clear the existing content

    filterData.forEach(dataItem => {
        op.appendChild(dataItem);
    });
};

const handleClick = () => {
    console.log("click")
}

const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        optionMenu.classList.toggle("active")
        isOptionOpen = true;
    }
}

// Add a click event listener to the document to close the dropdown when clicking outside
document.addEventListener("click", (event) => {
    const isClickInside = optionMenu.contains(event.target) || selectBtn.contains(event.target);

    if (!isClickInside && isOptionOpen) {
        optionMenu.classList.remove("active");
        isOptionOpen = false;
        // document.getElementById("search-placeholder").style.display = "block";
    }
});