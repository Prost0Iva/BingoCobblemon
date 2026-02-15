export async function loadPokemonList() {
    let response = await fetch("scripts/pokemon_list.json");
    let pokemon_list = await response.json();
    return pokemon_list;
}

export async function generateField() {
    let used_id = []; //пустой массив, в котором будут айди покемонов для карточки
    const pokemon_list = await loadPokemonList(); //объект с покемонами
    let pokemon_id_list = Object.keys(pokemon_list); //массив всех айди покемонов
    let pokemon_count = pokemon_id_list.length; //количество айди покемонов, которых ещё можно добавить на поле

    for (let i = 0; i < 25; i++) {
        let index = Math.floor(Math.random() * (pokemon_count - 1)) + 1; //рандомит индекс элемента массива айди покемонов (от 1 до последнего?)

        if (pokemon_id_list.length == 1) {
            used_id.push(0);
        } else {
            used_id.push(pokemon_id_list[index]);
            pokemon_id_list.splice(index, 1);
            pokemon_count = pokemon_id_list.length;
        }
    }

    
    return used_id;
}

export function exportField(used_id) {
    if (used_id.length == 0) {
        alert("Field is empty")
        return;
    }

    const used_id_json = JSON.stringify(used_id);
    const blob = new Blob([used_id_json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "field.json";
    a.click();

    URL.revokeObjectURL(url);
}