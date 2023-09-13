import getData from "./fetch.js";
import closeModals from "./modal.js";

const period = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
}

function removeOpacity(elements){
  for(const element of elements) {
    element.style.opacity = "0";
    element.classList.remove("anime-top-down");
  }
}

function applyAnimation(elements){
  setTimeout(function () {
    for(const element of elements) {
      element.classList.add("anime-top-down");
    }
  }, 100);
}

function updateDisplay(data, frequency) {
  try {
    const dataTime = data.timeframes[frequency].current;
    const dataPrevious = data.timeframes[frequency].previous;
    const dataTitle = data.title.toLowerCase().replace(" ", "-");

    const elementTime = document.getElementById(`${dataTitle}-time`);
    const elementPrevious = document.getElementById(`${dataTitle}-previous`);

    removeOpacity([elementTime, elementPrevious]);

    elementTime.innerText = dataTime === 1 ? `${dataTime}hr` : `${dataTime}hrs`;
    elementPrevious.innerText =
      dataPrevious === 1
        ? `Last ${period[frequency]} - ${dataPrevious}hr`
        : `Last ${period[frequency]} - ${dataPrevious}hrs`;

    applyAnimation([elementTime, elementPrevious])
  } catch (error) {
    console.log(`Erro ao atualizar dados: ${error.name}
    Mensagem: ${error.message}.
    Rastreamento: ${error.stack}`);
  }
}

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
