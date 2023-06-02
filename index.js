class Item {
	constructor(title, desc, link, tag) {
		this.title = title
		this.desc = desc
		this.link = link
		this.tag = tag
	}

	matchesSearch(searchTerms) {
		const searchString = `${this.title}`
			.toLowerCase()
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")

		return searchTerms.every((term) => searchString.includes(term))
	}

	matchesTag(tag) {
		return this.tag === tag
	}

	createCard() {
		const card = document.createElement("a")
		card.href = this.link
		card.className = "card"

		const inner = document.createElement("div")

		const title = document.createElement("h3")
		title.innerHTML = this.title
		title.className = "title"
		inner.appendChild(title)

		const desc = document.createElement("p")
		desc.innerHTML = this.desc
		inner.appendChild(desc)

		card.appendChild(inner)

		return card
	}
}

class App {
	constructor() {
		this.items = []
		this.searchInput = document.getElementById("search")
		this.tagSelector = document.getElementById("tag")
		this.content = document.getElementById("content")
	}

	async init() {
		this.items = await this.fetchAll()
		this.loadAll()
		this.searchInput.addEventListener("input", () => this.loadSearch())
		this.tagSelector.addEventListener("change", () => this.loadSearch())
	}

	async fetchAll() {
		try {
			const response = await fetch("sources.json")
			const data = await response.json()
			const jsonArray = Array.isArray(data) ? data : [data]

			return jsonArray.map(
				(itemData) =>
					new Item(
						itemData.title,
						itemData.desc,
						itemData.link,
						itemData.tags
					)
			)
		} catch (error) {
			console.error("Error:", error)
			return []
		}
	}

	loadAll() {
		for (let i = 0; i < this.items.length; i++) {
			const card = this.items[i].createCard()
			this.content.appendChild(card)
		}
	}

	loadSearch() {
		const searchText = this.searchInput.value
			.toLowerCase()
			.trim()
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")
		const searchTerms = searchText.split(" ")

		while (this.content.firstChild) {
			this.content.removeChild(this.content.lastChild)
		}

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i]

			let tag = this.tagSelector.value

			if (item.matchesSearch(searchTerms)) {
				if (tag !== "all") {
					if (item.matchesTag(tag)) {
						const card = item.createCard()
						this.content.appendChild(card)
					}
				} else {
					const card = item.createCard()
					this.content.appendChild(card)
				}
			}
		}
	}
}

const app = new App()
window.onload = () => app.init()
