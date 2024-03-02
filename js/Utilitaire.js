// Description: Contient des fonctions utilitaires pour le projet.

/**
 * Permet de créer un élément HTML avec un texte, type, un parent, une classe ou un id donné.
 * 
 * @param {string} type type de l'élément à créer
 * @param {HTMLElement} parent élément parent de l'élément à créer
 * @param {string} text texte à ajouter à l'élément
 * @param {string} className nom de la classe à ajouter à l'élément
 * @param {string} id identifiant de l'élément
 * @returns element 
 */
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
