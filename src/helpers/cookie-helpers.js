
const findCookie = (cookieName) => {
	const cookieArray = document?.cookie?.split(";").map( c => c.trim() )

	const cookie = cookieArray?.find( cookie => {
		let regex = new RegExp(cookieName, 'g');
		return cookie.match(regex)
	})

	const cookieValue = cookie?.split('=')[1]
	return cookieValue
} 

const setCookie = (name, value) => {
	let today = new Date()
	let monthsFromToday = 11
	let expireDate = new Date( today.setMonth( today.getMonth() + monthsFromToday ));
	document.cookie = `${name}=${value};expires=${expireDate.toUTCString()};SameSite=Lax;path=/`
}



export const readColorThemeCookie = () => {
	if (typeof window === "undefined") { /* we're on the server */ return null }
	return findCookie('color-theme')
}

export const setColorThemeCookie = (value) => {
	if (typeof window === "undefined") { /* we're on the server */ return null }
	setCookie('color-theme', value)
}
