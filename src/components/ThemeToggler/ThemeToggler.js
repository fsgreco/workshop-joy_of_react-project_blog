'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import styles from '../Header/Header.module.css';
import VisuallyHidden from '@/components/VisuallyHidden';
import { setColorThemeCookie, readColorThemeCookie } from '@/helpers/cookie-helpers';
import { LIGHT_COLORS, DARK_COLORS } from "@/constants"


const changeThemeOnDOM = (nextTheme) => {
	// Update the DOM to present the new colors
	const root = document.documentElement;
	const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;
	root.setAttribute('data-color-theme', nextTheme);
	// Swap out the actual colors on the <html> tag.
	Object.entries(colors).forEach(([key, value]) => {
		root.style.setProperty(key, value);
	});
}

const getUserThemePreference = () => {
	const preferredColorScheme = window?.matchMedia('(prefers-color-scheme: dark)');
	const userWantsDark = preferredColorScheme?.matches
	return userWantsDark ? 'dark' : 'light'
}


function ThemeToggler({theme: initialTheme}) {

	const [ theme, setTheme ] = React.useState(initialTheme)

	React.useEffect(() => { // useEffect does not run on the server, so there always will be a window object here
		let colorThemeCookie = readColorThemeCookie()
		// if there is no cookie we create it:
		if (!colorThemeCookie) {
			const rootDataColorTheme = document.documentElement.dataset.colorTheme
			const userPreference = getUserThemePreference()

			if (userPreference === 'dark') {
				setTheme('dark')
				setColorThemeCookie('dark')
				changeThemeOnDOM('dark')
			} else {
				setColorThemeCookie(rootDataColorTheme)
			}
		}

	}, [])

	const handleClick = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		setColorThemeCookie(newTheme)
		changeThemeOnDOM(newTheme)
	}

  return (
		<button onClick={handleClick} className={styles.action}>
			{ theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
			<VisuallyHidden>
				Toggle dark / light mode
			</VisuallyHidden>
		</button>
	)
}

export default ThemeToggler;
