window.onload = () =>{

  // Navbar fa fa-bar responsiveness
  document.getElementById('faFaBar').addEventListener("click", () => {
      const x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
  })

  // Assign server response to variables
  let resJson = JSON.parse(sessionStorage.getItem('successfulPayment'));
  let cardUsed = new String(resJson["data"]["master_card"]);

  // Display reponse from the server
  document.getElementById('success-message').innerHTML = resJson["message"];
  document.getElementById('success-card').innerHTML = "You've just paid using **** **** **** " + cardUsed.substring(cardUsed.length-4);
}