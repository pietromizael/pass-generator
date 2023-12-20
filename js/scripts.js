// Seleção de Elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-options"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordbutton = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbols = () => {
  const symbols = "{}[].,-)(*&#@!%$=+|)=_";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbols
) => {
  let password = "";

  const passwordLenght = lengthInput.value;

  const generators = [];

  if(lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase)
  }
  if(numbersInput.checked) {
    generators.push(getNumber)
  }
  if(symbolsInput.checked) {
    generators.push(getSymbols)
  }

  console.log(generators.length)

  if (generators.lenght === 0) {
    return;
  }

  for (i = 0; i < passwordLenght; i += generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }
  password = password.slice(0, passwordLenght);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
  copyPasswordbutton.innerText = "Copiar"
};

// Eventos
generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbols
  );
});

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordbutton.addEventListener("click", (e) => {
    e.preventDefault()

    const passwordValue = generatedPasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(passwordValue).then(() => {
        copyPasswordbutton.innerText = "Senha copiada!"
    })

})
