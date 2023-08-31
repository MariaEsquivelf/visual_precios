const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];
const products = [
  { id: 1, name: "Mezcla original 200g", price: 500 },
  { id: 2, name: "Mezcla original 500g", price: 900 },
  { id: 3, name: "Mezcla especial 200g", price: 700 },
  { id: 4, name: "Mezcla especial 500g", price: 1200 },
];

function add() {
  const productId = parseInt(priceElement.value);
  const product = products.find((item) => item.id == productId);
  const number = parseInt(numberElement.value);
  let purchase = {
    product: product,
    number: parseInt(number),
  };
  const newPurchase = purchases.findIndex(
    (item) => item.product.id === purchase.product.id
  );
  
  if (purchases.length < 1 || newPurchase === -1) {
    purchases.push(purchase);
  } else {
    purchases[newPurchase].number += purchase.number;
  }
  
  window.alert(`${display()}\nSubtotal: ${subtotal()} Yenes`);
  priceElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases
    .map((purchase) => {
      return `${purchase.product.name} ${purchase.product.price} Yenes por ${purchase.number} productos`;
    })  
    .join("\n");
}

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.product.price * purchase.number;
  }, 0);
}

function calcEnvioFromPurchase(sum) {
  let envio = 0;

  if (sum < 2000) {
    envio = 500;
  } else if (sum >= 2000 && sum < 3000) {
    envio = 250;
  } else if (sum >= 3000) {
    envio = 0;
  }

  return envio;
}


function calc() {
  const sum = subtotal();
  const envio = calcEnvioFromPurchase(sum);
  window.alert(
    `El subtotal es ${sum} Yenes, los gastos de envío son ${envio} Yenes. Total: ${
      sum + envio
    } Yenes.`
  );
  purchases = [];
  priceElement.value = "";
  numberElement.value = "";
}
