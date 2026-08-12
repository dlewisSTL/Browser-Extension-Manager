/* =========================
   DOM References
========================= */

const body = document.body;
const themeButton = document.querySelector(".settings-light-dark");
const extensionsContainer = document.querySelector(".extensions-container");
const filterButtons = document.querySelectorAll(".filter-container button");
const modalOverlay = document.querySelector(".modal-overlay");
const modalMessage = document.querySelector(".modal-message");
const cancelButton = document.querySelector(".cancel-button");
const confirmRemoveButton = document.querySelector(".confirm-remove-button");
const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast-message");
const undoButton = document.querySelector(".undo-button");

/* =========================
   Application State
========================= */

let extensions = [];
let currentFilter = localStorage.getItem("filter") || "all";
let lastFocusedElement = null;
let extensionToRemove = null;
let removedExtension = null;
let removedExtensionIndex = null;
let undoTimeout = null;

/* =========================
   Theme
========================= */

const savedTheme = localStorage.getItem("theme") || "light";

setTheme(savedTheme);

themeButton.addEventListener("click", () => {

    const isDark = body.classList.contains("dark-mode");

    setTheme(isDark ? "light" : "dark");

});

function setTheme(theme) {

    if (theme === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    localStorage.setItem("theme", theme);
}

/* =========================
   Extension Data
========================= */

async function loadExtensions() {

    try {

        const savedExtensions = localStorage.getItem("extensions");

        if (savedExtensions) {

            extensions = JSON.parse(savedExtensions);

        } else {

            const response = await fetch("scripts/data.json");

            if (!response.ok) {
                throw new Error("Failed to load extensions");
            }

            extensions = await response.json();

        }

        renderExtensions();

    } catch(error) {

        console.error(error);

    }

}

function saveExtensions() {

    localStorage.setItem(
        "extensions",
        JSON.stringify(extensions)
    );

}

loadExtensions();

/* =========================
   Extension Filtering
========================= */

function saveFilter() {

    localStorage.setItem(
        "filter",
        currentFilter
    );

}

function getFilteredExtensions() {

    if (currentFilter === "active") {
        return extensions.filter(extension => extension.isActive);
    }

    if (currentFilter === "inactive") {
        return extensions.filter(extension => !extension.isActive);
    }

    return extensions;

}

function restoreFilterButton() {

    filterButtons.forEach(button => {

        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");

    });


    const activeButton = document.querySelector(
        `.${currentFilter}-button`
    );


    if (activeButton) {

        activeButton.classList.add("active");
        activeButton.setAttribute("aria-pressed", "true");

    }

}

/* =========================
   Rendering Extensions
========================= */

function renderExtensions() {

    extensionsContainer.innerHTML = "";

    const filteredExtensions = getFilteredExtensions();
    
    if (filteredExtensions.length === 0) {

        extensionsContainer.innerHTML = `
            <div class="empty-state">
                <h2>No Extensions Found</h2>
                <p>
                    There are currently no extensions in this category.
                </p>
            </div>
        `;

        return;
    }
    
    filteredExtensions.forEach(extension => {

        const card = createExtensionCard(extension);

        extensionsContainer.appendChild(card);

        setupToggle(card, extension);

        setupRemoveButton(card, extension);

    });

}

function createExtensionCard(extension) {

    const card = document.createElement("div");

    card.classList.add("extension-card");
    
    card.dataset.active = extension.isActive;

    card.innerHTML = `
            <div class="extension-info">

                <div class="extension-icon">
                    <img src="${extension.logo}" alt="${extension.name} logo">
                </div>

                <div class="extension-details">
                    <h2 class="extension-name">
                        ${extension.name}
                    </h2>

                    <p class="extension-description">
                        ${extension.description}
                    </p>
                </div>

            </div>

            <div class="extension-actions">

                <button class="remove-button" type="button">
                    Remove
                </button>

                <div class="toggle">

                    <label class="compact-toggle">

                        <input 
                        type="checkbox"
                        aria-label="Enable ${extension.name}"
                        ${extension.isActive ? "checked" : ""}
                        >

                        <span class="toggle-slider"></span>

                    </label>

                </div>

            </div>
        `;

    return card;

}

/* =========================
   Toggle Extensions
========================= */

function setupToggle(card, extension) {

    const toggle = card.querySelector(".compact-toggle input");

    toggle.addEventListener("change", () => {

        extension.isActive = toggle.checked;
        
        card.dataset.active = extension.isActive;

        saveExtensions();


        if (
            currentFilter === "active" && 
            !extension.isActive
        ) {

            animateExit(card, () => {
                renderExtensions();
            });

            return;

        }


        if (
            currentFilter === "inactive" && 
            extension.isActive
        ) {

            animateExit(card, () => {
                renderExtensions();
            });

            return;

        }

        renderExtensions();

    });

}

/* =========================
   Remove Extension
========================= */

function setupRemoveButton(card, extension) {

    const removeButton = card.querySelector(".remove-button");

    removeButton.addEventListener("click", () => {

        openModal(extension);

    });

}

/* =========================
   Animations
========================= */

function animateExit(card, callback) {

    if (!card) {
        callback();
        return;
    }
    
    setTimeout(() => {

        card.classList.add("removing");

    }, 150);


    setTimeout(() => {

        callback();

    }, 400);

}

/* =========================
   Modal
========================= */

function openModal(extension) {
    
    if (modalOverlay.classList.contains("show")) {
        return;
    }
    
    lastFocusedElement = document.activeElement;
    
    body.classList.add("modal-open");

    extensionToRemove = extension;
    
    modalMessage.textContent = 
        `Are you sure you want to remove the ${extension.name} extension?`;

    modalOverlay.classList.add("show");
    
    modalOverlay.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        confirmRemoveButton.focus();
    });

}

function closeModal() {
    
    body.classList.remove("modal-open");
    
    modalOverlay.setAttribute("aria-hidden", "true");

    modalOverlay.classList.remove("show");
    
    lastFocusedElement?.focus();

}

/* =========================
   Toast / Undo
========================= */
    
function showUndoToast(extension) {
    
    clearTimeout(undoTimeout);

    removedExtension = extension;

    toastMessage.textContent = `${extension.name} removed`;

    toast.classList.add("show");

    undoTimeout = setTimeout(() => {

        removedExtension = null;

        toast.classList.remove("show");

    }, 5000);

}
    
undoButton.addEventListener("click", () => {

    if (!removedExtension) {
        return;
    }

    clearTimeout(undoTimeout);

    extensions.splice(
        removedExtensionIndex,
        0,
        removedExtension
    );

    saveExtensions();

    renderExtensions();

    removedExtension = null;
    removedExtensionIndex = null;

    toast.classList.remove("show");

});

cancelButton.addEventListener("click", () => {

    closeModal();

});
    
confirmRemoveButton.addEventListener("click", () => {
    
    if (!extensionToRemove) {
        return;
    }

    const card = [...document.querySelectorAll(".extension-card")]
        .find(item => {
            return item.querySelector(".extension-name").textContent === extensionToRemove.name;
        });

    animateExit(card, () => {

    closeModal();

    const index = extensions.findIndex(item => {
        return item.name === extensionToRemove.name;
    });
    
    removedExtension = extensionToRemove;
    removedExtensionIndex = index;
    
    extensions.splice(index, 1);

    saveExtensions();

    renderExtensions();
    
    showUndoToast(extensionToRemove);
    
    extensionToRemove = null;

    });

});

/* =========================
   Filter Events
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        if (button.classList.contains("all-button")) {
            currentFilter = "all";
            
        } else if (button.classList.contains("active-button")) {
            currentFilter = "active";
            
        } else if (button.classList.contains("inactive-button")) {
            currentFilter = "inactive";
        
        }
        
        saveFilter();

        renderExtensions();

    });
    
});

restoreFilterButton();
    
/* =========================
   Keyboard Events
========================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        modalOverlay.classList.contains("show")
    ) {

        closeModal();

    }

});
