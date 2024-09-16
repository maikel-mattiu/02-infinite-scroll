// HTML Elements
const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

// Global variables
let ready = false
let imagesLoaded = 0
let totalImages = 0

//Set attributes helper function
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

// Create link elements for each images
function displayPhotos(photosArray) {
	// Reset images loaded
	imagesLoaded = 0
	//Set totalImages to equal the length of photosArray
	totalImages = photosArray.length
	console.log("totalImages =", totalImages)
	//Create an <a> to link to unsplash
	photosArray.forEach((photo) => {
		const item = document.createElement("a")
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank"
		})
		// Create <img> for photo
		const img = document.createElement("img")
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		})
		//Check if image has finished loading
		img.addEventListener("load", () => {
			imagesLoaded++
			if (imagesLoaded === totalImages) {
				ready = true
				console.log("ready =", ready)
				loader.hidden = true
			}
		})
		// Put <img> inside <a>, then put both inside imageContainer element
		item.appendChild(img)
		imageContainer.appendChild(item)
	})
}

// Unsplash API
const count = 30
const apiKey = "HgZrVZ3I_P66xSiugMXnZ_YDmIk0MNHM_66hWZU59i4"
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiURL)
		const photosArray = await response.json()
		displayPhotos(photosArray)
	} catch (error) {
		// console.log(error)
	}
}

// Check if user has scrolled near the page bottom; load more photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false
		getPhotos()
	}
})

// On load
getPhotos()
