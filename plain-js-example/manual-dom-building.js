


let paragraph = document.createElement("p");
paragraph.innerText = "some text";
paragraph.classList.add("highlighted");

document.appendChild(paragraph);

// Would produce
// <p class="highlighted">some text</p>