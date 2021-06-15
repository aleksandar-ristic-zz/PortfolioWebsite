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
	alternateStyles.forEach(style => {
		if (color === style.getAttribute('title')) {
			style.removeAttribute('disabled')
		} else {
			style.setAttribute('disabled', 'true')
		}
	})
}

//* mode light and dark
const dayNight = document.querySelector('.day-night')

dayNight.addEventListener('click', () => {
	dayNight.querySelector('i').classList.toggle('fa-sun')
	dayNight.querySelector('i').classList.toggle('fa-moon')
	document.body.classList.toggle('dark')
})

window.addEventListener('load', () => {
	if (document.body.classList.contains('dark')) {
		dayNight.querySelector('i').classList.replace('fa-moon', 'fa-sun')
	} else {
		dayNight.querySelector('i').classList.replace('fa-sun', 'fa-moon')
	}
})
