let items = []

window.onload = async () => {
	items = await fetchAll()

	loadAll()

	document.getElementById("search").addEventListener("input", loadSearch)
}

async function fetchAll() {
	try {
		const response = await fetch("sources.json")
		const data = await response.json()
		const jsonArray = Array.isArray(data) ? data : [data]
		return jsonArray
	} catch (error) {
		console.error("Error:", error)
		return [] // Return an empty array in case of an error
	}
}

function loadAll() {
	const content = document.getElementById("content")

	for (let i = 0; i < items.length; i++) {
		const entry = items[i]

		let card = document.createElement("a")

		card.href = entry.link
		card.className = "card"

		let inner = document.createElement("div")

		let title = document.createElement("h3")

		title.innerHTML = entry.title
		title.className = "title"

		inner.appendChild(title)

		let desc = document.createElement("p")

		desc.innerHTML = entry.desc
		desc.className = "desc"

		inner.appendChild(desc)

		card.appendChild(inner)

		content.appendChild(card)
	}
}

function loadSearch() {
	const content = document.getElementById("content")

	while (content.firstChild) {
		content.removeChild(content.lastChild)
	}

	const search = document.getElementById("search")

	// ! Search method stolen from based.cooking
	const searchText = search.value
		.toLowerCase()
		.trim()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")

	const searchTerms = searchText.split(" ")

	for (let i = 0; i < items.length; i++) {
		const entry = items[i]

		const searchString = `${entry.title}`
			.toLowerCase()
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")

		const isMatch = searchTerms.every((term) => searchString.includes(term))

		let card = document.createElement("a")

		if (isMatch) {
			card.href = entry.link
			card.className = "card"

			let inner = document.createElement("div")

			let title = document.createElement("h3")

			title.innerHTML = entry.title
			title.className = "title"

			inner.appendChild(title)

			let desc = document.createElement("p")

			desc.innerHTML = entry.desc

			inner.appendChild(desc)

			card.appendChild(inner)

			content.appendChild(card)
		}
	}
}
