 var cart = [];

  function toggleItem(name, price, btnId) {
    var button = document.getElementById(btnId);
    var index = cart.findIndex(item => item.name === name);

    if (index === -1) {
      cart.push({ name, price });
      button.innerText = "Remove";
      button.style.background ="red";
    } else {
      cart.splice(index, 1);
      button.innerText = "Add";
      button.style.backgroundColor= "#0077b6";
    }

    updateCart();
  }

  function updateCart() {
    var cartBody = document.getElementById("cart-body");
    var totalField = document.getElementById("total");

    cartBody.innerHTML = "";
     let total = 0;
    if (cart.length === 0) {
      cartBody.innerHTML = "<tr><td colspan='2' style='text-align:center;'>No items added</td></tr>";
      totalField.innerText = "0";
      return;
    }

    cart.forEach(item => {
      cartBody.innerHTML += `<tr><td>${item.name}</td><td>₹${item.price}</td></tr>`;
      total += item.price;
    });

    totalField.innerText = total;
  }



function sendBooking() {
  const thankYouMsg = document.getElementById("thankyou-msg");
  const bookBtn = document.querySelector(".booking-form button");

  const params = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    total: document.getElementById("total").innerText
  };

  const cartItems = document.querySelectorAll("#cart-body tr");

  // Validate input fields
  if (!params.fullName || !params.email || !params.phone) {
    alert("Please fill in all booking details.");
    return;
  }

 


  // Validate cart
  if (cartItems.length === 0 ) {
    alert("Please add at least one service before booking.");
    return;
  }

  // Disable button while sending
  bookBtn.disabled = true;
  bookBtn.innerText = "Sending...";

  

  // Build service list from cart
let servicesList = "";
  for (let i = 0; i < cartItems.length; i++) {
    const row = cartItems[i];
    const cells = row.querySelectorAll("td"); // get all cells in this row

    if (cells.length >= 2) {
      const itemName = cells[0].innerText;
      const itemPrice = cells[1].innerText;
      servicesList += itemName + " - " + itemPrice + "\n";
    }
  }


 
  params.services = servicesList;

  // Send via EmailJS
  emailjs.send("service_rfost09", "template_4c8apue", params)
    .then(() => {
      thankYouMsg.style.color = "green";
      thankYouMsg.innerText = "Booking sent successfully! We'll get back to you soon.";
      setTimeout(() => {
         thankYouMsg.innerText = ""; // clears the message
      }, 3000);

      // Clear form fields
      document.getElementById("fullName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";

      // Clear cart
      document.getElementById("cart-body").innerHTML = "<tr><td colspan='2' style='text-align:center;'>No items added</td></tr>";
      document.getElementById("total").innerText = "0";
      cart = [];

      // Reset all "Remove" buttons back to "Add"
      let service1 = document.getElementById("btn-ironing")
      let service2 = document.getElementById("btn-dry")
      let service3 = document.getElementById("btn-washing")
      let service4 = document.getElementById("btn-folding")
      let service5 = document.getElementById("btn-stain")

      service1.innerText = "Add";
      service1.style.backgroundColor= "#0077b6";

      service2.innerText = "Add";
      service2.style.backgroundColor= "#0077b6";

      service3.innerText = "Add";
      service3.style.backgroundColor= "#0077b6";

      service4.innerText = "Add";
      service4.style.backgroundColor= "#0077b6";

      service5.innerText = "Add";
      service5.style.backgroundColor= "#0077b6";

      
      
    })
    .catch(error => {
      console.error("EmailJS error:", error);
      thankYouMsg.style.color = "red";
      thankYouMsg.textContent = "Failed to send booking. Please try again later.";
      setTimeout(() => {
      thankYouMsg.innerText = ""; // clears the message
      }, 3000);
    })
    .finally(() => {
      bookBtn.disabled = false;
      bookBtn.innerText = "Book Now";
    });
}


