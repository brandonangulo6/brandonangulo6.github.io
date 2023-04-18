function toggleTheme() {
    let bod = document.querySelector("body");
    bod.classList.toggle("dark-mode");
}

document.getElementById("toggleButton").onclick = toggleTheme;