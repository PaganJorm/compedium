class Item {
	constructor(title, desc, link, tag) {
		this.title = title
		this.desc = desc
		this.link = link
		this.tag = tag
		this.isLinkOnline = false
		this.checkLinkStatus()

		console.log(this.isLinkOnline);
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

	checkLinkStatus() {
		const self = this; // Store the instance reference

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					self.isLinkOnline = true; // Update the link status to true
				} else {
					self.isLinkOnline = false; // Update the link status to false
				}
				// You can perform further actions here, such as updating the UI or triggering additional logic
			}
		};
		xhr.open("GET", this.link, true);
		xhr.send();
	}
}

class App {
	constructor() {
		this.items = []
		this.searchInput = document.getElementById("search")
		this.tagSelector = document.getElementById("tag")
		this.content = document.getElementById("content")
		this.grid = document.createElement("div")

		this.grid.id = "grid"
		this.grid.className = "grid xl:grid-cols-5 gap-4 text-xl md:grid-cols-3 sm:grid-cols-2"
		this.about = document.getElementById("about")
		this.search = document.getElementById("searchBtn")
	}

	async init() {
		this.items = await this.fetchAll()
		this.loadAll()
		this.searchInput.addEventListener("input", () => this.loadSearch())
		this.tagSelector.addEventListener("change", () => this.loadSearch())
		this.about.addEventListener("click", () => this.loadAbout())
		this.search.addEventListener("click", () => this.loadSearch())
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
			this.grid.appendChild(card)
		}

		this.content.appendChild(this.grid)
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

		while (this.grid.firstChild) {
			this.grid.removeChild(this.grid.lastChild)
		}

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i]

			let tag = this.tagSelector.value

			if (item.matchesSearch(searchTerms)) {
				if (tag !== "all") {
					if (item.matchesTag(tag)) {
						const card = item.createCard()
						this.grid.appendChild(card)
					}
				} else {
					const card = item.createCard()
					this.grid.appendChild(card)
				}
			}
		}

		this.content.appendChild(this.grid)
	}

	loadAbout() {
		while (this.content.firstChild) {
			this.content.removeChild(this.content.lastChild)
		}

		let about = document.createElement("div")

		about.className = "md:mx-28 sm:mx-10 flex flex-col justify-center items-center h-full"

		about.innerHTML = `
			<h3 class="font-bold text-3xl mb-5 mt-5">Hallo there!</h3>
			<p> This is a collection of pretty illegal stuff that I use as a sort of library, I'll try
			to update it whenever I find more content, I keep backups of stuff that might go offline and I'll
			just upload the pdf myself if that happens, enjoy.</p>
		`

		this.content.appendChild(about)			
	}
}

const app = new App()
window.onload = () => app.init()
