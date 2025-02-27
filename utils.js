// Utility Functions

/**
 * Generates a random number within a specified range.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random number between min and max.
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Converts a percentage value to pixels based on the container's dimensions.
 * @param {string} percent - The percentage value as a string (e.g., "50%").
 * @param {HTMLElement} container - The container element to calculate against.
 * @param {string} axis - The axis ("x" for width, "y" for height).
 * @returns {number} The pixel value corresponding to the percentage.
 */
function percentToPixels(percent, container, axis = "x") {
    const dimension = axis === "x" ? container.offsetWidth : container.offsetHeight;
    return (parseFloat(percent) / 100) * dimension;
}

/**
 * Checks if two rectangular elements are colliding.
 * @param {HTMLElement} elem1 - The first element.
 * @param {HTMLElement} elem2 - The second element.
 * @returns {boolean} True if the elements are colliding, false otherwise.
 */
function checkCollision(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

/**
 * Formats a number with commas for better readability.
 * @param {number} num - The number to format.
 * @returns {string} The formatted number as a string.
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Debounces a function to limit its execution rate.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Saves a key-value pair to localStorage.
 * @param {string} key - The key to store the value under.
 * @param {*} value - The value to store (will be JSON-stringified).
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from localStorage by key.
 * @param {string} key - The key to retrieve the value for.
 * @returns {*} The parsed value, or null if not found.
 */
function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export {
    getRandomNumber,
    percentToPixels,
    checkCollision,
    formatNumber,
    debounce,
    saveToLocalStorage,
    getFromLocalStorage,
};