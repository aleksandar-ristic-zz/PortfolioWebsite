// toggle style switcher
const styleSwitcherToggler = document.querySelector('.style-toggler')
styleSwitcherToggler.addEventListener('click', () => {
	document.querySelector('.style-switcher').classList.toggle('open')
})

// hide style switcher on scroll
window.addEventListener('scroll', () => {
	if (document.querySelector('.style-switcher').classList.contains('open')) {
		document.querySelector('.style-switcher').classList.remove('open')
	}
})

const alternateStyles = document.querySelectorAll('.alternate-style')

//* theme colors
function setActiveStyle(color) {
	localStorage.setItem('skin-color', color)
	changeColor()
}

// get color from local storage, checks if exists
function changeColor() {
	const color = localStorage.getItem('skin-color')

	alternateStyles.forEach(style => {
		if (color === style.getAttribute('title')) {
			style.removeAttribute('disabled')
		} else {
			style.setAttribute('disabled', 'true')
		}
	})
}

if (localStorage.getItem('skin-color') !== null) {
	changeColor()
}

//* mode light and dark
const dayNight = document.querySelector('.day-night')

dayNight.addEventListener('click', () => {
	document.body.classList.toggle('dark')
	updateIcon()
})

function themeMode() {
	if (localStorage.getItem('mode') !== null) {
		if (localStorage.getItem('mode') === 'light') {
			document.body.classList.remove('dark')
		} else {
			document.body.classList.add('dark')
		}
	}
	updateIcon()
}

function updateIcon() {
	if (document.body.classList.contains('dark')) {
		localStorage.setItem('mode', 'dark')
		dayNight.querySelector('i').classList.replace('fa-moon', 'fa-sun')
	} else {
		localStorage.setItem('mode', 'light')
		dayNight.querySelector('i').classList.replace('fa-sun', 'fa-moon')
	}
}

themeMode()
