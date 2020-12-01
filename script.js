const inputElement = document.getElementById("input");
const ulElement = document.getElementById("list");
const lengthFilterButton = document.getElementById("lengthFilter");
const substringFilterButton = document.getElementById("substringFilter");
const registerSensitiveElement = document.getElementById("registerSensitive");
const errorlengthFilter = document.getElementById("errorlengthFilter");

const isDigit = function (str) {
  str = str.trim();
  return /^-{0,1}\d+$/.test(str);
};

function upgradeView(array) {
  ulElement.innerHTML = "";
  for (let index = 0; index < array.length; index++) {
    const item = array[index];

    const liElement = document.createElement("li");
    liElement.className = "list-group";
    liElement.innerText = item;
    ulElement.append(liElement);
  }
}

let proxyUrl = "https://cors-anywhere.herokuapp.com/",
  targetUrl = "https://www.mrsoft.by/data.json";
fetch(proxyUrl + targetUrl)
  .then((response) => response.json())
  .then((data) => {
    let List = data;
    upgradeView(List.data);

    lengthFilterButton.addEventListener("click", () => {
      numberInputElementLength = Number(inputElement.value);
      if (isDigit(inputElement.value)) {
        data = List.data.filter(
          (item) => item.length > numberInputElementLength
        );
        upgradeView(data);
      } else {
        errorlengthFilter.className = "errorlengthFilter";
      }
    });

    substringFilterButton.addEventListener("click", function () {
      data = List.data.filter((item) => {
        if (registerSensitiveElement.checked) {
          return item.includes(inputElement.value.trim());
        } else {
          return item.toLowerCase().includes(inputElement.value.toLowerCase().trim());
        }
      });
      upgradeView(data);
    });
  })
  .catch((e) => {
    console.log(e);
    return e;
  });
