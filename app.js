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
Creature.prototype.compareHeight = function(human) {
    if (human[0].height > this.height) {
        return `${human[0].name} is ${human[0].height - this.height}taller than ${this.species}`
    } else if (human[0].height < this.height) {
        return `${this.species} is ${this.height - human[0].height}taller than ${human[0].name}`
    } else {
        return `${human[0].name} and ${this.species} are the same size`
    }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Creature.prototype.compareWeight = function(human) {
    if (human[0].weight > this.weight) {
        return `${human[0].name} weighs ${human[0].weight - this.weight}more than ${this.species}`
    } else if (human[0].weight < this.weight) {
        return `${this.species} weighs ${this.weight - human[0].weight}less than ${human[0].name}`
    } else {
        return `${human[0].name} and ${this.species} weigh the same`
    }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Creature.prototype.compareDiet = function(human) {
    if (human[0].diet === this.diet) {
        return `${human[0].name} and ${this.species} has the same diet`
    } else if (this.diet === "Herbavor") {
        return `${this.species} was a${this.diet}`
    } else if (this.diet === "Omnivor") {
        return `${this.species} was a${this.diet}`
    } else {
        return `${this.species} was a${this.diet}`
    }
}

//Create random facts
Creature.prototype.randomFacts = function() {
    let factsArray = [
        this.compareHeight(human),
        this.compareWeight(human),
        this.compareDiet(human),
        this.when,
        this.where,
        this.fact
    ]
    return factsArray[Math.floor(Math.random() * factsArray.length)];
}

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic