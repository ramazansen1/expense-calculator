const spendInput = document.querySelector("#spend");
const priceInput = document.querySelector("#price");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");

// kullanıcın girdiği ismi tarayıcı deposunda saklama
nameInput.addEventListener("change", (e) => {
  // console.dir(e);
  // console.log(e.target.value);
  localStorage.setItem("name", e.target.value);
});

// kullanıcın girdiği ismi tarayıcı deposunda çekme
// ya veriyi alıcaz bir veri gelecek yada veri yoksa boş bir string döndür.
const username = localStorage.getItem("name") || "";
nameInput.value = username;
// console.dir(nameInput);

// olay izleyicisi
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

// total state
let total = 0;

function addPrice(price) {
  total += Number(price);
  totalInfo.innerText = total;
}

// create expense

function addExpense(e) {
  // eğer form elemanı içindeki bir butona tıklandığında
  // sayfa yenileme engelleme.
  e.preventDefault();

  // priceInput.value === "" => !priceInput > ! bir durumun tersini almaya yarar
  // check forms
  if (!priceInput.value || !spendInput.value) {
    alert("Fill out the forms");
    // stop the function
    return;
  }

  //   console.log(typeof spendInput);
  // check product name => Is the data entered a number?
  if (spendInput.value == Number(spendInput.value)) {
    alert("You cannot enter numbers in the product section.");
    return;
  }

  // create div
  const expenseDiv = document.createElement("div");

  // add class
  expenseDiv.classList.add("expense");

  // console.dir(statusCheck);
  // if statufCheck === true
  if (statusCheck.checked) {
    expenseDiv.classList.add("payed");
  }

  // add html & write value
  expenseDiv.innerHTML = `
        <h2>${spendInput.value}</h2> 
        <h2 id="price-value">${priceInput.value}</h2>
        <div class="buttons">
            <img id="payment" src="images/payment.png" alt="">
            <img id="remove" src="images/remove.png" alt="">
        </div>
  `;

  // add to list (send to html)
  list.appendChild(expenseDiv);

  // update total
  addPrice(priceInput.value);

  // clean the form
  spendInput.value = "";
  priceInput.value = "";
}

// listeye tıklanma olayını yönetme
function handleClick(e) {
  // tıknalınan elemanı alma
  const element = e.target;
  // console.log(element);
  if (element.id === "remove") {
    // element.parentElement > üst kapsayıcıya gitme => div.buttons
    // element.parentElement.parentElement > gidilen üst kapsayıcının bir üst kapcayıcısına gitme => div.expense
    // tıklanılan sil butonunun kapsayıcını alma
    const wrapperELement = element.parentElement.parentElement;
    // console.log(wrapperELement);

    // silinen elemanın fiyatını alma
    const deletedPrice = wrapperELement.querySelector("#price-value").innerText;
    // console.log(Number(deletedPrice.innerText));

    // silinenin fiyatını toplamdan çıkarma
    addPrice(-Number(deletedPrice));

    // expense divine class ekleme
    wrapperELement.classList.add("fall");
    wrapperELement.addEventListener("transitionend", () => {
      // kapsayıcıyı htmlden kaldırma
      wrapperELement.remove();
    });
  } else if (element.id === "payment") {
    const wrapperELement = element.parentElement.parentElement;
    // expense divine class ekleme
    wrapperELement.classList.toggle("payed");
  } else {
    return;
  }
}

// filtreleme işlemi
function handleFilter(e) {
  // seçilen option değerleri event olarak gelecek
  // console.log(e.target.value);
  // console.log(list.childNotes);
  //childNotes => kapsayıcı içindeki elemanları verir

  //liste içerisinde ki her bir elemanı dizi olarak items a aktardık
  const items = list.childNodes;

  // items içiresindeki tüm harcamaları forEach ile dönme
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "payed": // case payed olduğunda
        // contains() => bir dizinin bir classListin bir elemanı içerip içermediğini kontrol etmemizi sağlar.
        // classında payed olanlar varsa göster, yoksa gösterme
        if (item.classList.contains("payed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-payed": // case not-payed olduğunda
        // classında payed olmayanları yani not-payed göster, payed olanları gösterme
        if (!item.classList.contains("payed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
}

// Local Storage > eklenen veri sekme kapatılsa dahil kaybolmaz. yalnızca biz silince gider.
// setItem(key, value) > veri ekleme
localStorage.setItem("deneme", "deneme verisi");

// getItem(key) > veri çekme
const localVeri = localStorage.getItem("deneme");

// localden veri silme
// .removeItem()
localStorage.removeItem("deneme");

// Session Storage > veriler sekme kapatılınca silinir.
// kullanımı localStorage ile olur.
