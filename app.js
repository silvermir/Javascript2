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
                dinos.push(dino);
            })
        })
}

createDino();

// Create Human Object

let human = [];

function createHuman(formHumanData) {
    formHumanData.map(function(humanData) {
        let creatureHuman = new Creature(...Object.values(humanData));
        human.push(creatureHuman);
    })
}

// Use IIFE to get human data from form
document.getElementById("btn").addEventListener("click", function() {
    (function formHumanData() {
        let humanData = [{
            species: "Human",
            weight: parseFloat(document.getElementById('weight').value),
            height: parseFloat(document.querySelector("#feet").value) * 12 || parseFloat(document.querySelector("#inches").value),
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
    if (this.height > human[0].height) {
        return `${this.species} is ${this.height - human[0].height} inches taller than ${human[0].name}`
    } else if (this.height < human[0].height) {
        return `${this.species} is ${human[0].height - this.height} inches smaller than ${human[0].name}`
    } else {
        return `${human[0].name} and ${this.species} are the same size`
    }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Creature.prototype.compareWeight = function(human) {
    if (this.weight > human[0].weight) {
        return `${this.species} weighs ${this.weight - human[0].weight} lbs more than ${human[0].name}`
    } else if (this.weight < human[0].weight) {
        return `${this.species} weighs ${human[0].weight - this.weight} lbs less than ${human[0].name}`
    } else {
        return `${human[0].name} and ${this.species} weigh the same`
    }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Creature.prototype.compareDiet = function(human) {
    if (human[0].diet === this.diet) {
        return `${human[0].name} and ${this.species} has the same diet`
    } else if (this.diet === "Herbavor") {
        return `${this.species} was a ${this.diet}`
    } else if (this.diet === "Omnivor") {
        return `${this.species} was a ${this.diet}`
    } else {
        return `${this.species} was a ${this.diet}`
    }
};

//Create 6 random facts
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
};

// Generate Tiles for each Dino in Array
function createTile() {
    dinos.forEach(function(dino) {
        let creatureTile = document.createElement("div");
        creatureTile.classList.add("grid-item");
        if (dino.species === "Human") {
            creatureTile.innerHTML = `
            <h3>${dino.name}</h3>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species} image"/>
            `
        } else if (dino.species === "Pigeon") {
            creatureTile.innerHTML = `
            <h2>${dino.species}</h2>
            <p>${dino.fact}</p>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species} image"/>
            `
        } else {
            creatureTile.innerHTML = `
            <h2>${dino.species}</h2>
            <p>${dino.randomFacts()}</p>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species} image"/>
            `
        }
        document.getElementById("grid").appendChild(creatureTile);
    })
}

// Add tiles to DOM
// Remove form from screen
// On button click, prepare and display infographic

document.getElementById("dino-compare").addEventListener("submit", function(e) {
    e.preventDefault();
    dinos.splice(4, 0, human[0]);
    createTile();
    document.getElementById("dino-compare").remove();
});