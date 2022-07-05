const get_orders="http://localhost:8080/api/order/getorders";
const post_order="http://localhost:8080/api/order/postorder";
const get_order="http://localhost:8080/api/order/getorderdetail";

//post
function send(){
  const form = document.getElementById("form1");
  if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
      // Create payload as new FormData object:
      const payload = new FormData(form);
      console.log(payload);
      const data = {};
      payload.forEach((value, key) => (data[key] = value));
      // Post the payload using Fetch:
      console.log(data);
      fetch('http://localhost:8080/api/order/postorder', {
      method: 'POST',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      // body: data,
      body: JSON.stringify(data),
      referrerPolicy: 'no-referrer',
      mode: 'cors'
      }).then(res => console.log(res));
      //.then(data => console.log(data))
  });}
  else{
    console.log("error");
  }
}
//https://github.com/mdeveloper20/javascript-employee-project/blob/master/controller.js
const api_getOrders = () => {
  return fetch(get_orders);
}

const api_getOrder = (id) => {
  return fetch(get_order);
}

const api_postOrder = (jsonData) => {
  const headers = new Headers();

  return fetch(post_order, {
      headers,
      method: 'POST',
      body: JSON.stringify(jsonData)
  });
}

window.onload = () => {
  const table = document.querySelector('#ordersTable').getElementsByTagName('tbody')[0];
  const searchButton = document.querySelector('#searchButton');
  const searchQuery = document.querySelector('#searchQuery');
  const addForm = document.querySelector('#addForm');
  //const spinner = document.querySelector('#spinner');
  //const newItemId = document.querySelector('#newItemId');


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

  }

  const loadAll = () => {
      api_getOrders().then(res => res.json()).then(jsonData => {
          jsonData.data.forEach(order => {
              addNewRow(order.id, order.name, order.email, order.order_product, order.order_price)

          });


      })
  }
}


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

function submitBTN(){
	var post_url="http://localhost:8080/api/order/postorder";
	console.log("before 1st function");
	var cal_list=cal();
	var data={"order_price":cal_list[0],"order_list":cal_list[1]};
	postapi(post_url,data);
}
/**
 * 
 * @param {*} url 
 * @param {*} data 
 
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