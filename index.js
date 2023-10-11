searchInput = document.getElementById("nombre-pokemon")
searchButton = document.getElementById("button-pokemon")

const pokemon = []
const listPokemon = document.querySelector("#listaPokemon")
const botonesPokemon = document.querySelectorAll(".btn-header")

let url = "https://pokeapi.co/api/v2/pokemon/"
for(let i =1; i<=150;i++){
    fetch(url + i) // con fetc concatena y crea una nueva url 151 veces 
    .then(reponse => reponse.json())
    .then(data => mostrarPokemon(data))
    
}

function mostrarPokemon(poke) {
  let tipos = poke.types.map((type) =>
    `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  tipos = tipos.join("");
  let pokeID = poke.id.toString();
  if (pokeID.length === 1) {
    pokeID = "00" + pokeID;
  } else if (pokeID.length === 2) {
    pokeID = "0" + pokeID;
  }
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = ` <p class="pokemon-id-back">#${pokeID}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeID}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
    </div>`;
  listPokemon.appendChild(div);

  let isClicked = false;

  div.addEventListener("click", function () {
    if (!isClicked) {
      div.innerHTML = `<p class="pokemon-id-back">#${pokeID}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.back_shiny}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeID}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height + "M"}</p>
            <p class="stat">${poke.weight + "KG"}</p>
        </div>
    </div>`;
      isClicked = true;
    } else {
      // Restaurar tarjeta a su estado original
      div.innerHTML = ` <p class="pokemon-id-back">#${pokeID}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeID}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
    </div>`;
      isClicked = false;
    }
  });
}

// Aqui le estamos agregando a cada boton que esta en el header un event listener 
botonesPokemon.forEach(boton => boton.addEventListener("click", (event)=>{
    const botonID = event.currentTarget.id;
    listPokemon.innerHTML=""
    for(let i =1; i<=150;i++){
        fetch(url + i) // con fetc concatena y crea una nueva url 151 veces 
        .then(reponse => reponse.json())
        .then(data => {
            if(botonID==="ver-todos"){
                mostrarPokemon(data);
            }
            const tipos = data.types.map(type => type.type.name);
            if(tipos.some(tipo => tipo.includes(botonID))){
                mostrarPokemon(data);}
            // Aqui buscamos en cada tipo que si hay uno igual al botonID

            
        })
    }
})
    ) 


/* const botonID = event.currentTarget.id: Dentro del manejador de eventos de clic, se obtiene el ID del botón en el que se hizo clic utilizando event.currentTarget.id. Esto significa que event es el objeto de evento que se pasa automáticamente al manejador de eventos de clic cuando ocurre un clic en un botón, y currentTarget se refiere al elemento en el que se hizo clic, que es el botón en este caso. El .id luego recupera el atributo "id" del botón, que generalmente se utiliza para identificar de manera única cada botón.*/
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase(); // Obtén el valor del input y conviértelo a minúsculas

  listPokemon.innerHTML = "";

  for (let i = 1; i <= 150; i++) {
      fetch(url + i)
          .then(response => response.json())
          .then(data => {
              const pokemonName = data.name.toLowerCase(); 
              if (pokemonName.includes(searchTerm)) {
                  mostrarPokemon(data);
              }
          });
  }
});


