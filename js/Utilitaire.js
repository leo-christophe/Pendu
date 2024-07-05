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
export function createElement(type, parent, text="", className="", id="", style="") {
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
    if (style){
        element.style = style;
    }
    parent.appendChild(element);
    return element;
}

/**
 *  Permet d'ajouter un cookie
 *  @param {*} name 
 *  @param {*} value 
 *  @param {*} days 
 */
export function addCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/** cookieExists
 *  Permet de savoir si un cookie existe grace à son nom
 *  @param {*} name 
 *  @returns 
 */
export function cookieExists(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='));
}
