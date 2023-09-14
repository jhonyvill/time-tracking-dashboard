import { getData } from "./fetch-data.js";
import { updateDisplay } from "./update-display.js";

export function initGlobalPeriodicity() {

  async function handleGlobalPeriodicityUpdate(frequency) {
    const json = await getData();
    for (const data of json) {
      updateDisplay(data, frequency);
    }
  }

  const menuItems = document.querySelectorAll("[data-menu-option]");
  menuItems.forEach((item) =>
    item.addEventListener("click", () => {
      handleGlobalPeriodicityUpdate(item.dataset.menuOption);
    })
  );

  document.addEventListener("DOMContentLoaded", () =>
    handleGlobalPeriodicityUpdate("daily")
  );
}
