/* *** Nav Menu *** */
;(() => {
	const hamburgerBtn = document.querySelector('.hamburger-btn')
	const navMenu = document.querySelector('.nav-menu')
	const closeNavBtn = navMenu.querySelector('.close-nav-menu')

	hamburgerBtn.addEventListener('click', showNavMenu)
	closeNavBtn.addEventListener('click', hideNavMenu)

	function showNavMenu() {
		navMenu.classList.add('open')
		toggleScroll()
	}

	function hideNavMenu() {
		navMenu.classList.remove('open')
		fadeOutEffect()
		toggleScroll()
	}

	function fadeOutEffect() {
		document.querySelector('.fade-out-effect').classList.add('active')

		setTimeout(() => {
			document.querySelector('.fade-out-effect').classList.remove('active')
		}, 300)
	}

	// attach event handler to document
	document.addEventListener('click', e => {
		if (e.target.classList.contains('link-item')) {
			// make sure e.target.hash has a value before overriding default behavior
			if (e.target.hash !== '') {
				// anchor links default override
				e.preventDefault()
				const hash = e.target.hash
				console.log(hash)
				//deactivate existing active 'section'
				document.querySelector('.section.active').classList.add('hide')
				document.querySelector('.section.active').classList.remove('active')

				//activate new 'section'
				document.querySelector(hash).classList.add('active')
				document.querySelector(hash).classList.remove('hide')

				// deactivate existing active navigation menu 'link-item'
				navMenu
					.querySelector('.active')
					.classList.add('outer-shadow', 'hover-in-shadow')
				navMenu
					.querySelector('.active')
					.classList.remove('active', 'inner-shadow')

				// if clicked 'link-item is contained within the nav menu'
				if (navMenu.classList.contains('open')) {
					// activate new navigation menu 'link-item'
					e.target.classList.add('active', 'inner-shadow')
					e.target.classList.remove('outer-shadow', 'hover-in-shadow')

					//hide nav menu
					hideNavMenu()
				} else {
					let navItems = navMenu.querySelectorAll('.link-item')
					navItems.forEach(item => {
						if (hash === item.hash) {
							// activate new navigation menu 'link-items'
							item.classList.add('active', 'inner-shadow')
							item.classList.remove('outer-shadow', 'hover-in-shadow')
						}
					})
					fadeOutEffect()
				}
				// add hash to url
				window.location.hash = hash
			}
		}
	})
})()

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

function toggleScroll() {
	document.body.classList.toggle('scroll-stop')
}

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

/* *** Testimonial Slider *** */
;(() => {
	const sliderContainer = document.querySelector('.testim-slider-container')
	const slides = sliderContainer.querySelectorAll('.testim-item')
	const slideWidth = sliderContainer.offsetWidth
	const prevBtn = document.querySelector('.testim-slider-nav .prev')
	const nextBtn = document.querySelector('.testim-slider-nav .next')
	const activeSlide = sliderContainer.querySelector('.testim-item.active')
	let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
		activeSlide
	)

	// width of all slides
	slides.forEach(slide => {
		slide.style.width = slideWidth + 'px'
	})
	// set width of sliderContainer
	sliderContainer.style.width = slideWidth * slides.length + 'px'

	nextBtn.addEventListener('click', () => {
		if (slideIndex === slides.length - 1) {
			slideIndex = 0
		} else {
			slideIndex++
		}
		slider()
	})

	prevBtn.addEventListener('click', () => {
		if (slideIndex === 0) {
			slideIndex = slides.length - 1
		} else {
			slideIndex--
		}
		slider()
	})

	function slider() {
		// remove existing active slide
		sliderContainer
			.querySelector('.testim-item.active')
			.classList.remove('active')

		// activate new slide
		slides[slideIndex].classList.add('active')
		sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + 'px'
	}
	slider()
})()

/* *** Hide all sections except active *** */
;(() => {
	const sections = document.querySelectorAll('.section')
	sections.forEach(section => {
		if (!section.classList.contains('active')) {
			section.classList.add('hide')
		}
	})
})()

window.addEventListener('load', () => {
	document.querySelector('.preloader').classList.add('fade-out')
	setTimeout(() => {
		document.querySelector('.preloader').style.display = 'none'
	}, 600)
})
