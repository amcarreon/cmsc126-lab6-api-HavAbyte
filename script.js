const container = document.body;
const qtyPokemon = 151; //GEN 1 POKEMONS


async function searchPokemon() {
    const input = document.getElementById("searchInput").value.toLowerCase();

    if(!input){
        alert("Enter a valid Gen 1 Pokemon name");
        return;
    }

    try {
        const source = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!source.ok) {
            throw new Error("Not found");
        }

        const pokemon = await source.json();

        showCard(pokemon);
    }

    catch (error) {
        alert("Pokemon not found.");
    }

}

document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        searchPokemon();
    }
});