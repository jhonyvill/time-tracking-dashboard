const period = {
  daily: "Day",
  weekly: "Week",
  monthly: "Month",
};

function removeOpacity(elements) {
  for (const element of elements) {
    element.style.opacity = "0";
    element.classList.remove("anime-top-down");
  }
}

function applyAnimation(elements) {
  setTimeout(function () {
    for (const element of elements) {
      element.classList.add("anime-top-down");
    }
  }, 100);
}

export function updateDisplay(data, frequency) {
  try {
    const dataTime = data.timeframes[frequency].current;
    const dataPrevious = data.timeframes[frequency].previous;
    const dataTitle = data.title.toLowerCase().replace(" ", "-");

    const elementTime = document.getElementById(`${dataTitle}-time`);
    const elementPrevious = document.getElementById(`${dataTitle}-previous`);

    removeOpacity([elementTime, elementPrevious]);

    elementTime.innerText =
      dataTime === 1 ? `${dataTime}hr` : `${dataTime}hrs`;
    elementPrevious.innerText =
      dataPrevious === 1
        ? `Last ${period[frequency]} - ${dataPrevious}hr`
        : `Last ${period[frequency]} - ${dataPrevious}hrs`;

    applyAnimation([elementTime, elementPrevious]);
  } catch (error) {
    console.log(`Erro ao atualizar dados: ${error.name}
  Mensagem: ${error.message}.
  Rastreamento: ${error.stack}`);
  }
}