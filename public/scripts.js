const correctElement = document.querySelector(".counter .correct");
const incorrectElement = document.querySelector(".counter .incorrect");

if (!correctElement || !incorrectElement) {
  console.error("unable to find elements");
}

function toggleAnswer(question) {
  const answer = question.querySelector(".answer") || question.querySelector("p");
  if (!answer) return;

  const showBtn = question.querySelector(".button-show");

  const isHidden = answer.classList.contains("hidden");
  if (isHidden) {
    answer.classList.remove("hidden");
    if (showBtn) showBtn.textContent = "Fela svar";
  } else {
    answer.classList.add("hidden");
    if (showBtn) showBtn.textContent = "Sýna svar";
  }
}

function questionAnswerHandler(e) {
  const button = e.target;
  const parentQuestion = button.closest(".question");
  if (!parentQuestion) return;

  const isShow = button.classList.contains("button-show");
  if (isShow) {
    toggleAnswer(parentQuestion);
    return;
  }


  const isCorrect = button.classList.contains("button-correct");
  const isIncorrect = button.classList.contains("button-incorrect");

  if (!isCorrect && !isIncorrect) return;

  if (!correctElement) throw new Error("missing correct element");
  if (!incorrectElement) throw new Error("missing incorrect element");

  // Ekki leyfa að svara sömu spurningu oftar en einu sinni
  const alreadyAnswered = parentQuestion.dataset.answered === "true";
  if (alreadyAnswered) return;

  if (isCorrect) {
    const currentCorrect = Number.parseInt(correctElement.textContent ?? "0", 10);
    correctElement.textContent = String(currentCorrect + 1);
  }

  if (isIncorrect) {
    const currentIncorrect = Number.parseInt(incorrectElement.textContent ?? "0", 10);
    incorrectElement.textContent = String(currentIncorrect + 1);
  }

  // Merkjum spurninguna sem svaraða
  parentQuestion.dataset.answered = "true";

  parentQuestion
    .querySelectorAll(".button-correct, .button-incorrect")
    .forEach((b) => (b.disabled = true));
}

// Tengt við alla takka sem eru til staðar
const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", questionAnswerHandler);
}
