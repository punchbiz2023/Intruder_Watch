const controlElements = document.querySelectorAll('.b_searchbox');
const words = [
  "adventure", "brilliant", "cascade", "daring", "eloquent",
  "fabricate", "glisten", "harmony", "inspire", "jubilant",
  "keen", "luminary", "mysterious", "nostalgia", "optimize",
  "persistence", "quaint", "resilient", "serenity", "timeless",
  "unravel", "vivid", "wanderlust", "xenial", "yonder",
  "zealous", "astronaut", "breeze", "charming", "delight"
];

// Ensure there are control elements available
if (controlElements.length > 0) {
  // Loop through the words array
  for (let i = 0; i < words.length; i++) {
    setTimeout(function() {
      // Set the value of the input field to the current word
      controlElements[1].value = words[i];

      // Simulate pressing the "Enter" key after the word is set
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        code: 'Enter',
        which: 13,
        bubbles: true
      });

      // Dispatch the event on the input element to simulate pressing Enter
      controlElements[1].dispatchEvent(event);
    }, i * 5000); // Delay each action by 5 seconds, adjusted by the loop index
  }
}
