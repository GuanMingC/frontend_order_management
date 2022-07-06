const get_orders = "http://10.3.187.94:7001/Order_Management-0.0.1-SNAPSHOT/api/order/getorders";
const post_order = "http://10.3.187.94:7001/Order_Management-0.0.1-SNAPSHOT/api/order/postorder";
const get_order = "http://10.3.187.94:7001/Order_Management-0.0.1-SNAPSHOT/api/order/getorderdetail";
var counter=0;

//https://github.com/mdeveloper20/javascript-employee-project/blob/master/controller.js
const api_getOrders = () => {
  return fetch(get_orders);
};
/**
const api_getOrder = (id) => {
  return fetch(get_order + "/" + id);
};
*/
const api_getOrder = (name) => {
  const table = document
    .querySelector("#ordersTable")
    .getElementsByTagName("tbody")[0];
  return fetch(get_orders)
    .then((order) => order.json())
    .then((order1) =>
      order1.forEach((order11) => {
        console.log(order11.order_id);
        console.log(name);
        console.log(order11.name);
        if (order11.name == name) {
          console.log(name);
          addNewRow(
            order11.order_id,
            order11.name,
            order11.email,
            order11.order_product,
            order11.order_price
          );
        } else {
          console.log("null");
        }
      })
    );
};

const api_postOrder = (jsonData) => {
  const headers = new Headers();

  return fetch(post_order, {
    headers,
    method: "POST",
    body: JSON.stringify(jsonData),
  });
};

//add new row
const addNewRow = (c1, c2, c3, c4, c5) => {
  const table = document
    .querySelector("#ordersTable")
    .getElementsByTagName("tbody")[0];
  const row = table.insertRow();
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.innerHTML = c1;
  cell2.innerHTML = c2;
  cell3.innerHTML = c3;
  cell4.innerHTML = c4;
  cell5.innerHTML = c5;
};

//load table
const loadAll = () => {
  api_getOrders()
    .then((res) => res.json())
    .then((jsonData) => {
      console.log(jsonData);
      jsonData.forEach((order) => {
        addNewRow(
          order.order_id,
          order.name,
          order.email,
          order.order_product,
          order.order_price
        );
      });
    });
};

//post
function send() {
  const form = document.getElementById("form1");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Create payload as new FormData object:
      const payload = new FormData(form);
      console.log(payload);
      const data = {};
      //in construction

      // arr_product=[];
      // arr_price=[];
      // var count_product=0;
      // var count_price=0;
      // for(let i=0;i<=counter;i++){
      //   if (payload.key!=("order_product"+count_product) || payload.key!=("order_price"+count_price)){
      //     data[payload.key] = payload.value;
      //   }
      //   else if (payload.key==("order_pice"+count_price)){
      //     arr_product.push(payload.value);
      //     count_product+=1;
      //   }
      //   else{
      //     arr_price.push(payload.value);
      //     count_price+=1;
      //   }
      // }
      // data["order_list"]=arr_product;
      // data["order_price"]=arr_price;
      
      //end of construction
      payload.forEach((value, key) => (data[key] = value));
      // Post the payload using Fetch:
      console.log(data);
      fetch(post_order, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        // body: data,
        body: JSON.stringify(data),
        referrerPolicy: "no-referrer",
        mode: "cors",
      }).then((res) => console.log(res));
      //.then(data => console.log(data))
    });
  } else {
    console.log("error");
  }
}

function sortASC(){
  //loadAll()
}

function sortDSC(){

}

//onclick, display table
function populate() {
  //window.onload = () => {
  const table = document
    .querySelector("#ordersTable")
    .getElementsByTagName("tbody")[0];
  //const searchButton = document.querySelector('#searchButton');
  //const searchQuery = document.querySelector('#searchQuery');
  //const addForm = document.querySelector('#addForm');
  //const spinner = document.querySelector('#spinner');
  //const newItemId = document.querySelector('#newItemId');
  /**
   
  const addNewRow = (c1, c2, c3, c4, c5) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = c1;
    cell2.innerHTML = c2;
    cell3.innerHTML = c3;
    cell4.innerHTML = c4;
    cell5.innerHTML = c5;
  };

  const loadAll = () => {
    api_getOrders()
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        jsonData.forEach((order) => {
          addNewRow(
            order.order_id,
            order.name,
            order.email,
            order.order_product,
            order.order_price
          );
        });
      });
  };
  */
  loadAll(table);
  //}
}
//search by index
function search() {
  const table = document
    .querySelector("#ordersTable")
    .getElementsByTagName("tbody")[0];
  const searchButton = document.querySelector("#searchButton");
  const searchQuery = document.querySelector("#searchQuery");
  const addForm = document.querySelector("#addForm");
  table.innerHTML = "";
  if (searchQuery.value) {
    api_getOrder(searchQuery.value);
    /**
      .then((res) => console.log(res.json()))
      .then((json) => {
        addNewRow(
          json.order_id,
          json.name,
          json.email,
          json.order_product,
          json.order_price
        );
      });
      */
  } else {
    loadAll(table);
  }
}

function add_more_fields(){
  counter+=1
  html='<div>\
  <label for="order_product" class="form-label">Product name</label>\
  <input\
    type="text"\
    class="form-control"\
    id="order_product'+counter+'"\
    name="order_product'+counter+'"\
    required\
  />\
</div>\
<div>\
  <label for="order_price" class="form-label">Product price</label>\
  <input\
    type="number"\
    class="form-control"\
    id="order_price'+counter+'"\
    name="order_price'+counter+'"\
    required\
    min="0"\
    value="0"\
    step="any"\
  />\
  </div>'
  var form = document.getElementById('rep');
  form.innerHTML+=html;
}

//###################################################################################################
//test
function sub() {
  fetch("http://localhost:8080/api/order/getorders", {
    method: "GET", // The method
    mode: "no-cors", // It can be no-cors, cors, same-origin
    credentials: "same-origin", // It can be include, same-origin, omit
    headers: {
      "Content-Type": "application/json", // Your headers
    },
  }).then((data) => console.log(data));
  alert("Demo only. No form was posted.");
}
//test
async function funcName() {
  var uel = "http://localhost:8080/api/order/getorders";
  const response = await fetch(uel);
  var data = await response.json();
}

async function getapi() {
  var url = "http://localhost:8080/api/order/getorders";
  // Storing response
  const response = await fetch(url, {
    method: "GET", // The method
    //mode: 'no-cors',
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
}

function submitBTN() {
  var post_url = "http://localhost:8080/api/order/postorder";
  console.log("before 1st function");
  var cal_list = cal();
  var data = { order_price: cal_list[0], order_list: cal_list[1] };
  postapi(post_url, data);
}
/**
 * 
 * 
 *
 
async function postapi(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
	  mode: 'cors', // no-cors, *cors, same-origin
	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: 'same-origin', // include, *same-origin, omit
	  headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  redirect: 'follow', // manual, *follow, error
	  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	  body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}*/
