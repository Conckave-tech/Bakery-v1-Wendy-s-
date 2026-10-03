let bakeryInfo = {
  name: "Wendy's Bakery",
  deliveryFee: 3,
  whatsapp: "263717306869"
};


let cakePrices = {
  "Chocolate Cake": 8,
  "Vanilla Cake": 7,
  "Birthday Cake": 10,
  "Eclairs": 5,
  "Red Velvet Cake": 12,
  "Strawberry Cake": 11
};


let selectedCake =
document.getElementById("selected-cake");

let selectedPrice =
document.getElementById("selected-price");

let quantity =
document.getElementById("quantity");

let orderList =
document.getElementById("order-list");

let grandTotal =
document.getElementById("grand-total");

let clearOrder =
document.getElementById("clear-order");

let whatsappOrder =
document.getElementById("whatsapp-order");

let customerName =
document.getElementById("customer-name");

let customerPhone =
document.getElementById("customer-phone");

let deliveryAddress =
document.getElementById("delivery-address");


let orderSubtotal = 0;

let orders = [];


/* LOAD SAVED ORDERS */

let savedOrders =
localStorage.getItem("bakeryOrders");


if (savedOrders) {

  orders =
  JSON.parse(savedOrders);

  orders.forEach(function(order) {

    orderSubtotal =
    orderSubtotal + order.total;

  });

}


/* LOAD SAVED CUSTOMER DETAILS */

let savedCustomerName =
localStorage.getItem("customerName");

let savedCustomerPhone =
localStorage.getItem("customerPhone");

let savedDeliveryAddress =
localStorage.getItem("deliveryAddress");


if (savedCustomerName) {

  customerName.value =
  savedCustomerName;

}


if (savedCustomerPhone) {

  customerPhone.value =
  savedCustomerPhone;

}


if (savedDeliveryAddress) {

  deliveryAddress.value =
  savedDeliveryAddress;

}


/* SAVE ORDERS AND CUSTOMER DETAILS */

function saveOrder() {

  localStorage.setItem(
    "bakeryOrders",
    JSON.stringify(orders)
  );

  localStorage.setItem(
    "customerName",
    customerName.value
  );

  localStorage.setItem(
    "customerPhone",
    customerPhone.value
  );

  localStorage.setItem(
    "deliveryAddress",
    deliveryAddress.value
  );

}


/* SAVE CUSTOMER DETAILS WHILE TYPING */

customerName.addEventListener(
  "input",
  saveOrder
);

customerPhone.addEventListener(
  "input",
  saveOrder
);

deliveryAddress.addEventListener(
  "input",
  saveOrder
);


/* UPDATE TOTAL */

function updateOrderTotal() {

  if (orderSubtotal === 0) {

    grandTotal.innerHTML =
    "Subtotal: $0.00" +
    "<br>Delivery: $0.00" +
    "<br>Grand Total: $0.00";

    return;
  }


  let grandTotalAmount =
  orderSubtotal +
  bakeryInfo.deliveryFee;


  grandTotal.innerHTML =
  "Subtotal: $" +
  orderSubtotal.toFixed(2) +
  "<br>Delivery: $" +
  bakeryInfo.deliveryFee.toFixed(2) +
  "<br>Grand Total: $" +
  grandTotalAmount.toFixed(2);

}


/* CREATE ORDER ITEM */

function createOrderItem(order) {

  let orderItem =
  document.createElement("div");

  orderItem.className =
  "order-item";


  let orderText =
  document.createElement("span");


  orderText.textContent =
  order.quantity +
  " × " +
  order.cakeName +
  " — $" +
  order.total.toFixed(2);


  orderItem.appendChild(orderText);


  let quantityLabel =
  document.createElement("label");

  quantityLabel.textContent =
  "Quantity:";


  orderItem.appendChild(quantityLabel);


  let itemQuantity =
  document.createElement("input");

  itemQuantity.type =
  "number";

  itemQuantity.min =
  1;

  itemQuantity.step =
  1;

  itemQuantity.value =
  order.quantity;


  orderItem.appendChild(itemQuantity);


  itemQuantity.addEventListener(
    "input",
    function() {

      if (
        itemQuantity.value === "" ||
        Number(itemQuantity.value) < 1 ||
        !Number.isInteger(
          Number(itemQuantity.value)
        )
      ) {

        return;
      }


      let newQuantity =
      Number(itemQuantity.value);


      let newTotal =
      order.price * newQuantity;


      let difference =
      newTotal - order.total;


      order.quantity =
      newQuantity;

      order.total =
      newTotal;


      orderSubtotal =
      orderSubtotal + difference;


      orderText.textContent =
      newQuantity +
      " × " +
      order.cakeName +
      " — $" +
      newTotal.toFixed(2);


      updateOrderTotal();

      saveOrder();

    }
  );


  let removeButton =
  document.createElement("button");

  removeButton.textContent =
  "Remove";


  removeButton.addEventListener(
    "click",
    function() {

      orderSubtotal =
      orderSubtotal - order.total;


      let orderIndex =
      orders.findIndex(
        function(savedOrder) {

          return savedOrder.id === order.id;

        }
      );


      if (orderIndex !== -1) {

        orders.splice(
          orderIndex,
          1
        );

      }


      orderItem.remove();


      updateOrderTotal();

      saveOrder();

    }
  );


  orderItem.appendChild(removeButton);


  orderList.appendChild(orderItem);

}


/* SELECT CAKE */

function orderCake(cakeName) {

  selectedCake.textContent =
  cakeName;


  let price =
  cakePrices[cakeName];


  if (quantity.value === "") {

    selectedPrice.textContent =
    "Total: $0.00";

    return;
  }


  let amount =
  Number(quantity.value);


  let total =
  price * amount;


  selectedPrice.textContent =
  "Total: $" +
  total.toFixed(2);

}


/* QUANTITY PREVIEW */

quantity.addEventListener(
  "input",
  function() {

    if (
      selectedCake.textContent ===
      "Nothing selected yet."
    ) {

      return;
    }


    let cakeName =
    selectedCake.textContent;


    let price =
    cakePrices[cakeName];


    if (quantity.value === "") {

      selectedPrice.textContent =
      "Total: $0.00";

      return;
    }


    let amount =
    Number(quantity.value);


    let total =
    price * amount;


    selectedPrice.textContent =
    "Total: $" +
    total.toFixed(2);

  }
);


/* ADD TO ORDER */

function addToOrder() {

  if (
    selectedCake.textContent ===
    "Nothing selected yet."
  ) {

    alert(
      "Please select a cake first."
    );

    return;
  }


  if (
    quantity.value === "" ||
    Number(quantity.value) < 1 ||
    !Number.isInteger(
      Number(quantity.value)
    )
  ) {

    alert(
      "Please enter a valid whole number quantity."
    );

    return;
  }


  let cakeName =
  selectedCake.textContent;


  let price =
  cakePrices[cakeName];


  let amount =
  Number(quantity.value);


  let total =
  price * amount;


  let order = {

    id:
    Date.now() +
    Math.random(),

    cakeName:
    cakeName,

    quantity:
    amount,

    price:
    price,

    total:
    total

  };


  orders.push(order);


  orderSubtotal =
  orderSubtotal + total;


  createOrderItem(order);


  updateOrderTotal();

  saveOrder();


  selectedCake.textContent =
  "Nothing selected yet.";


  selectedPrice.textContent =
  "Total: $0.00";


  quantity.value =
  "";


  alert(
    "Added to your order!"
  );

}


/* CLEAR ORDER */

clearOrder.addEventListener(
  "click",
  function() {

    orderSubtotal = 0;

    orders = [];


    customerName.value = "";

    customerPhone.value = "";

    deliveryAddress.value = "";


    let orderItems =
    document.querySelectorAll(
      ".order-item"
    );


    orderItems.forEach(
      function(item) {

        item.remove();

      }
    );


    localStorage.removeItem(
      "bakeryOrders"
    );

    localStorage.removeItem(
      "customerName"
    );

    localStorage.removeItem(
      "customerPhone"
    );

    localStorage.removeItem(
      "deliveryAddress"
    );


    updateOrderTotal();

  }
);


/* CUSTOMER VALIDATION */

function validateCustomerDetails() {

  if (
    customerName.value.trim() === ""
  ) {

    alert(
      "Please enter your name."
    );

    return false;

  }


  if (
    customerPhone.value.trim() === ""
  ) {

    alert(
      "Please enter your phone number."
    );

    return false;

  }


  if (
    deliveryAddress.value.trim() === ""
  ) {

    alert(
      "Please enter your delivery address."
    );

    return false;

  }


  return true;

}


/* WHATSAPP ORDER */

whatsappOrder.addEventListener(
  "click",
  function() {

    if (
      !validateCustomerDetails()
    ) {

      return;
    }


    if (orders.length === 0) {

      alert(
        "Please add something to your order first."
      );

      return;
    }


    let message =
    "Hello " +
    bakeryInfo.name +
    "!\n\n";


    message +=
    "New Order:\n";


    orders.forEach(
      function(order) {

        message +=
        order.quantity +
        " × " +
        order.cakeName +
        " — $" +
        order.total.toFixed(2) +
        "\n";

      }
    );


    let grandTotalAmount =
    orderSubtotal +
    bakeryInfo.deliveryFee;


    message +=
    "\nSubtotal: $" +
    orderSubtotal.toFixed(2);


    message +=
    "\nDelivery: $" +
    bakeryInfo.deliveryFee.toFixed(2);


    message +=
    "\nGrand Total: $" +
    grandTotalAmount.toFixed(2);


    message +=
    "\n\nCustomer: " +
    customerName.value;


    message +=
    "\nPhone: " +
    customerPhone.value;


    message +=
    "\nAddress: " +
    deliveryAddress.value;


    let whatsappURL =
    "https://wa.me/" +
    bakeryInfo.whatsapp +
    "?text=" +
    encodeURIComponent(message);


    let confirmOrder =
    confirm(
      "Open WhatsApp with your order?"
    );


    if (confirmOrder) {

      window.open(
        whatsappURL,
        "_blank"
      );

    }

  }
);


/* DISPLAY SAVED ORDERS */

orders.forEach(
  function(order) {

    createOrderItem(order);

  }
);


updateOrderTotal();