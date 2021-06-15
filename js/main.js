/* *** About Section Tabs *** */
;(() => {
	const aboutSection = document.querySelector('.about-section'),
		tabsContainer = document.querySelector('.about-tabs')

	tabsContainer.addEventListener('click', e => {
		if (
			e.target.classList.contains('tab-item') &&
			!e.target.classList.contains('active')
		) {
			const target = e.target.getAttribute('data-target')

			tabsContainer
				.querySelector('.active')
				.classList.remove('outer-shadow', 'active')

			e.target.classList.add('active', 'outer-shadow')

			aboutSection
				.querySelector('.tab-content.active')
				.classList.remove('active')

			aboutSection.querySelector(target).classList.add('active')
		}
	})
})()

/* *** Portfolio Filter and  Popup *** */
;(() => {
	const filterContainer = document.querySelector('.portfolio-filter')
	const portfolioItemsContainer = document.querySelector('.portfolio-items')
	const portfolioItems = document.querySelectorAll('.portfolio-item')
	const popup = document.querySelector('.portfolio-popup')
	const prevBtn = popup.querySelector('.pp-prev')
	const nextBtn = popup.querySelector('.pp-next')
	const closeBtn = popup.querySelector('.pp-close')
	const projectDetailsContainer = popup.querySelector('.pp-details')
	const projectDetailsBtn = popup.querySelector('.pp-project-details-btn')
	let itemIndex, slideIndex, screenshots

	// filter portfolio items
	filterContainer.addEventListener('click', e => {
		if (
			e.target.classList.contains('filter-item') &&
			!e.target.classList.contains('active')
		) {
			filterContainer
				.querySelector('.active')
				.classList.remove('outer-shadow', 'active')

			e.target.classList.add('active', 'outer-shadow')
			const target = e.target.getAttribute('data-target')
			portfolioItems.forEach(item => {
				if (target === item.getAttribute('data-category') || target === 'all') {
					item.classList.remove('hide')
					item.classList.add('show')
				} else {
					item.classList.remove('show')
					item.classList.add('hide')
				}
			})
		}
	})

	portfolioItemsContainer.addEventListener('click', e => {
		if (e.target.closest('.portfolio-item-inner')) {
			const portfolioItem = e.target.closest(
				'.portfolio-item-inner'
			).parentElement
			itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
				portfolioItem
			)
			screenshots = portfolioItems[itemIndex]
				.querySelector('.portfolio-item-img img')
				.getAttribute('data-screenshots')

			screenshots = screenshots.split(',')

			if (screenshots.length === 1) {
				prevBtn.style.display = 'none'
				nextBtn.style.display = 'none'
			} else {
				prevBtn.style.display = 'block'
				nextBtn.style.display = 'block'
			}

			slideIndex = 0
			popupToggle()
			popupSlideshow()
			popupDetails()
		}
	})

	closeBtn.addEventListener('click', () => {
		popupToggle()
		if (projectDetailsContainer.classList.contains('active')) {
			popupDetailsToggle()
		}
	})

	function popupToggle() {
		popup.classList.toggle('open')
		toggleScroll()
	}
	// gets img index from buttons and shows a img from
	// screenshots array
	function popupSlideshow() {
		const imgSrc = screenshots[slideIndex]
		const popupImg = popup.querySelector('.pp-img')

		popup.querySelector('.pp-loader').classList.add('active')
		popupImg.src = imgSrc

		popupImg.onload = () => {
			popup.querySelector('.pp-loader').classList.remove('active')
		}

		popup.querySelector('.pp-counter').innerHTML =
			slideIndex + 1 + ' of ' + screenshots.length
	}

	nextBtn.addEventListener('click', () => {
		if (slideIndex === screenshots.length - 1) {
			slideIndex = 0
		} else {
			slideIndex++
		}
		popupSlideshow()
	})
	prevBtn.addEventListener('click', () => {
		if (slideIndex === 0) {
			slideIndex = screenshots.length - 1
		} else {
			slideIndex--
		}
		popupSlideshow()
	})

	function popupDetails() {
		const item = portfolioItems[itemIndex]

		// check if item details exists
		if (!item.querySelector('.portfolio-item-details')) {
			projectDetailsBtn.style.opacity = '.5'
			projectDetailsBtn.style.pointerEvents = 'none'
			return
		}

		projectDetailsBtn.style.pointerEvents = 'all'
		projectDetailsBtn.style.opacity = '1'

		const details = item.querySelector('.portfolio-item-details').innerHTML
		popup.querySelector('.pp-project-details').innerHTML = details

		const title = item.querySelector('.portfolio-item-title').innerHTML
		popup.querySelector('.pp-title h2').innerHTML = title

		const category = item.getAttribute('data-category')
		popup.querySelector('.pp-project-category').innerHTML = category
			.split('-')
			.join(' ')
	}

	// button toggle project details
	projectDetailsBtn.addEventListener('click', () => {
		popupDetailsToggle()
	})

	function popupDetailsToggle() {
		if (projectDetailsContainer.classList.contains('active')) {
			projectDetailsBtn
				.querySelector('i')
				.classList.replace('fa-minus', 'fa-plus')
			projectDetailsContainer.classList.remove('active')
			projectDetailsContainer.style.maxHeight = 0
		} else {
			projectDetailsBtn
				.querySelector('i')
				.classList.replace('fa-plus', 'fa-minus')
			projectDetailsContainer.classList.add('active')
			projectDetailsContainer.style.maxHeight =
				projectDetailsContainer.scrollHeight + 'px'
			popup.scrollTo(0, projectDetailsContainer.offsetTop)
		}
	}
})()
