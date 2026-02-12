import {generateField, loadPokemonList} from './generate.js';

const cell_buttons = document.querySelectorAll('.cell_button');
const cell_images = document.querySelectorAll('.cell_img');
const pokemon_images = document.querySelectorAll('.pokemon_img');
const generate_button = document.getElementById('generate_button');

console.log(cell_buttons);
console.log(cell_images);
console.log(pokemon_images);
console.log(generate_button);

cell_buttons.forEach((button, index) => {
  button.addEventListener('click', function() {
    const img = cell_images[index];
    if (img.src.includes('assets/cell.png')) {
      img.src = 'assets/cell_completed.png';
    } else {
      img.src = 'assets/cell.png';
    }
  });
});

generate_button.addEventListener('click', async function() {
  const pokemon_list = await loadPokemonList();
  const field = await generateField();

  console.log(field);

  let i = 0;
  for(let img of pokemon_images) {
    img.src = pokemon_list[field[i]].src;
    i++;
  }
})