export let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || {"isDarkMode" : false};
export let lightDarkMode = document.querySelector(".light-dark-mode span");

export function checkDarkMode() {
    if(isDarkMode.isDarkMode) {
        document.body.classList.add("dark-mode");
        lightDarkMode.innerHTML = `<span><ion-icon name="sunny-outline"></ion-icon>&nbsp;Light mode</span>`;
    } else {
        document.body.classList.remove("dark-mode");
        lightDarkMode.innerHTML = `<span><ion-icon name="moon-outline"></ion-icon>&nbsp;Dark mode</span>`;
    }
}