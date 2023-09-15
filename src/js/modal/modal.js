const cardButtons = document.querySelectorAll("[data-card-btn]");

function closeAriasExpanded() {
  for (const button of cardButtons) {
    button.setAttribute("aria-expanded", "false");
  }
}

export function closeModals() {
  const modals = document.querySelectorAll('[id$="-modal"]');
  for (let modal of modals) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
  closeAriasExpanded();
}

export function initModal(){
  function handleToggleModal() {
    const modalElement = document.getElementById(this.dataset.cardBtn);
    const actualDisplay = modalElement.style.display;
  
    actualDisplay === "none"
      ? ((modalElement.style.display = "block"),
        this.setAttribute("aria-expanded", "true"),
        modalElement.setAttribute("aria-hidden", "false"))
      : closeModals();
  }
  
  cardButtons.forEach((button) => {
    button.addEventListener("click", handleToggleModal);
  });
  
  const modalsMenu = document.querySelectorAll('[data-card="menu"]');
  modalsMenu.forEach((modal) => {
    modal.addEventListener("mouseleave", closeModals);
  });
}