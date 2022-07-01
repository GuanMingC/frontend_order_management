
function cal() {
	var a = document.getElementById("p1qop").value;
	var b = document.getElementById("p2qop").value;
	var c = document.getElementById("p3qop").value;
  var order_list = {};
  var product_list = {};
  product_list["Hp Laptop"] = 1999;
  product_list["Mac"] = 2500;
  product_list["Dell Laptop"] = 1500;
  if (a > 0) {
    order_list["Hp Laptop"] = a;
  }
  if (b > 0) {
    order_list["Mac"] = b;
  }
  if (c > 0) {
    order_list["Dell Laptop"] = c;
  }
  var total =
    a * product_list["Hp Laptop"] +
    b * product_list["Mac"] +
    c * product_list["Dell Laptop"];
  document.getElementById("display").innerHTML = "Total price: " + total;
  console.log(total);
  return [total, order_list];
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

const form = document.getElementById("form1");
//form.addEventListener("submit", sub);

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
  }