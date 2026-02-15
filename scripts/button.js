import {generateField, loadPokemonList, exportField} from './func.js';

const cell_buttons = document.querySelectorAll('.cell_button');
const cell_images = document.querySelectorAll('.cell_img');
const pokemon_images = document.querySelectorAll('.pokemon_img');
const generate_button = document.getElementById('generate_button');
const export_button = document.getElementById('export_button');

let now_field = [];

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

  now_field = field;

  let i = 0;
  for(let img of pokemon_images) {
    img.src = pokemon_list[field[i]].src;
    i++;
  }
})

export_button.addEventListener('click', function() {
  exportField(now_field)
})

import_button.addEventListener('change', async (e) => {
  const pokemon_list = await loadPokemonList();
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  const json = JSON.parse(text);

  try {
  let i = 0;
    for(let img of pokemon_images) {
      img.src = pokemon_list[json[i]].src;
      i++;
    }
  }
  catch (err) {
    alert("The file is invalid or empty\n" + err);
  }

});