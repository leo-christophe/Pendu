// Utilitaire.js
export function createElement(type, parent, text="", className="", id="") {
    const element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    if (id) {
        element.id = id;
    }
    if (className) {
        element.classList.add(className);
    }
    parent.appendChild(element);
    return element;
}
