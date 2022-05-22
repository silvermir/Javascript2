// Create Dino Constructor
function Creature(species, weight, height, diet, where, when, fact, name) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.name = name;
}


// Create Dino Objects
let dinos = [];

function createDino() {
    return fetch("dino.json")
        .then(function(response) {
            return response.json();
        })
        .then(function({ Dinos }) {
            Dinos.map(function(dinosaurs) {
                let dino = new Creature(...Object.values(dinosaurs));
                dinos.push(dino)
            })
        })
};

createDino();

// Create Human Object

let human = [];
console.log(human)

function createHuman(formHumanData) {
    formHumanData.map(function(humanData) {
        let creatureHuman = new Creature(...Object.values(humanData));
        human.push(creatureHuman)
    })
};

// Use IIFE to get human data from form
document.getElementById("btn").addEventListener("click", function() {
    (function formHumanData() {
        let humanData = [{
            species: "Human",
            weight: document.querySelector("#weight").value,
            height: document.querySelector("#feet").value * 12 || document.querySelector("#inches").value,
            diet: document.querySelector("#diet").value,
            where: "",
            when: "",
            fact: "",
            name: document.querySelector("#name").value
        }];
        createHuman(humanData);
    })();
});


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic