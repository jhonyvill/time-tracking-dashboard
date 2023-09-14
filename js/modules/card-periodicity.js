import { getData } from "./fetch-data.js";
import { closeModals } from "./modal.js";
import { updateDisplay } from "./update-display.js";

export function initCardPeriodicity() {
  async function handleCardPeriodicityUpdate(card, frequency) {
    const json = await getData();
    const data = json.find(
      (item) => item.title.toLowerCase().replace(" ", "-") === card
    );
    closeModals();
    updateDisplay(data, frequency);
  }

  const modalOptions = document.querySelectorAll("[data-modal-option]");
  modalOptions.forEach((item) =>
    item.addEventListener("click", async (event) => {
      event.preventDefault();
      const card = item.parentNode.dataset.modal;
      const frequency = item.dataset.modalOption;
      await handleCardPeriodicityUpdate(card, frequency);
    })
  );
}
