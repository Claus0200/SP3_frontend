// Select the button and the list
const button = document.getElementById('addItemButton');
const list = document.getElementById('myList');

// Add an event listener to the button
button.addEventListener('click', () => {
  // Create a new list item
  const newItem = document.createElement('li');
  newItem.textContent = `Item ${list.children.length + 1}`;

  // Append the new item to the list
  list.appendChild(newItem);

  // Change the button color randomly
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  button.style.backgroundColor = `#${randomColor}`;

});
