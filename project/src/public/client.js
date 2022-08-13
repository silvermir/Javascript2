let store = {
    clickedRover: "",
    roverData: "",
    roverPhotos: "",
    user: { name: "Martian" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async(root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod, user, roverData, clickedRover, roverPhotos } = state
    if (clickedRover == "") {
        return `
        <header>
        ${Buttons(rovers)}
        ${ButtonApod(apod)}
        ${Greeting(user.name)}
        <div class="blink">PLEASE CHOOSE A ROVER OR THE APOD</div>
        </header>`

    } else if (clickedRover == "APOD") {
        return `
        <header>
        ${Buttons(rovers)}
        ${ButtonApod(apod)}
        </header>
            <main>
                <section>
                    <p>
                        One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                        the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                        This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                        applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                        explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                        but generally help with discoverability of relevant imagery.
                    </p>
                    ${ImageOfTheDay(apod)}
                    </section>
            </main>
            <footer><a href="https://api.nasa.gov/">Nasa API</a></footer>`
    } else {
        return `
        <header>
        ${Buttons(rovers)}
        ${ButtonApod(apod)}
        </header>
            <main>
            <div class="info">Rover Info:</div>
            <div class="manifest">${roverManifest(roverData, clickedRover)}</div>
            <br><div class="info">latest Photos:</div>
            <div class="gallery">${roverPictures(roverPhotos, clickedRover)}</div>
            </main>
            <footer><a href="https://api.nasa.gov/">Nasa API</a></footer>`
    }
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <div class="welcome"><h1>Welcome, ${name}!</h1></div>
        `
    }
}

// create Buttons for each rover
const Buttons = (rovers) => {
        return rovers
            .map((rover) => {
                return `<button class="btn" onclick="selectedRover('${rover}')">${rover}</button>`
            }).join("")
    }
    // Create Button for APOD

const ButtonApod = (apod) => {
    return `<button class="btn" onclick="selectedRover('APOD')">APOD</button>
    `
}

// set the selected rover
const selectedRover = (selectedRover) => {
    updateStore(store, { clickedRover: selectedRover });
    getRoverManifest(selectedRover)
    getRoverPhotos(selectedRover)
    console.log(selectedRover)


}

// add rover manifests
const roverManifest = (manifest, clickedRover) => {
    if (!manifest) {
        getRoverManifest(clickedRover)
    }
    let roverData = manifest && manifest.data.photo_manifest
    return `<div class="manifest">
    <p>Name: ${roverData.name}</p>
    <p>Launch Date: ${roverData.launch_date}</p>
    <p>Landing Date: ${roverData.landing_date}</p>
    ${statusColor(manifest)}
    </div>`
}

const statusColor = (manifest) => {
    let data = manifest && manifest.data.photo_manifest
    if (data.status == "active") {
        return `<div class="statusActive">Status: ${data.status}</div>`
    } else {
        return `<div class="statusComplete">Status: ${data.status}</div>`
    }

}

//add rover Photos
const roverPictures = (roverPhotos, clickedRover) => {
        if (!roverPhotos) {
            getRoverPhotos(clickedRover)
        }
        let data = roverPhotos.photos.latest_photos
        return data.map(rover => {
            return `
                <div class="content"><img src="${rover.img_src}"/><div>Date: ${rover.earth_date}</div></div>
                `
        }).join("")
    }
    //<p>Date: ${rover.earth_date}</p>
    //<div class="date"> Date: ${rover.earth_date}</div>
    // Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod && apod.image.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.image.url}">here</a></p>
            <p>${apod.image.title}</p>
            <p>${apod.image.explanation}</p>
        `)
    } else {
        return (`
            <img class="apodImg" src="${apod && apod.image.url}" />
            <p>${apod && apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = async(state) => {
    await fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}

//API call rover manifest

const getRoverManifest = async(rover) => {
    await fetch(`http://localhost:3000/roverData/${rover}`)
        .then(res => res.json())
        .then(roverData => updateStore(store, { roverData }))
}

//API Call rover Photos

const getRoverPhotos = async(rover) => {
    await fetch(`http://localhost:3000/roverPhotos/${rover}`)
        .then(res => res.json())
        .then(roverPhotos => updateStore(store, { roverPhotos }))
}