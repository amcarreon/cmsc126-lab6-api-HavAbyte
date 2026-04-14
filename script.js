const container = document.getElementById("pokemonGrid");
const template = document.getElementById("pokemonCardTemplate");

function clearCont() {
    container.innerHTML = "";
}

async function getPokemon(pokemon) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Not found");
    return res.json();
}

async function searchPokemon() {
    const input = document.getElementById("searchInput").value.toLowerCase();

    if(!input){
        alert("Enter a valid Gen 1 Pokemon name");
        return;
    }

    try {
        const source = await getPokemon(input);
       
        clearCont();
        makeCard(pokemon);
        displayCard(pokemon);

        const pokemon = await source.json();
    }
    
    catch (error) {
        alert("Pokemon not found.");
    }

}

document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchPokemon();
    }
});