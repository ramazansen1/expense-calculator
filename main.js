const spendInput = document.querySelector("#spend");
const priceInput = document.querySelector("#price");
const formBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");

// olay izleyicisi
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);

// total state
let total = 0;

function addPrice(price) {
  total += Number(price);
  totalInfo.innerText = total;
}

// harcama oluşturma

function addExpense(e) {
  // eğer form elemanı içindeki bir butona tıklandığında
  // sayfa yenileme engelleme.
  e.preventDefault();

  // priceInput.value === "" => !priceInput
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

  // add html & write value
  expenseDiv.innerHTML = `
        <h2>${spendInput.value}</h2> 
        <h2>${priceInput.value}</h2>
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
  const element = e.target;

  if (element.id === "remove") {
    alert("Deletion has been initiated.");
  }
}
