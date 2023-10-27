window.onload = () => {

  // Navbar fa fa-bar responsiveness
  document.getElementById('faFaBar').addEventListener("click", () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  })
  
  // Allow pay buttons to go to payment page
  const buttons = document.getElementsByClassName('pay-btn');
  for(let i=0; i < buttons.length; i++){
    buttons[i].addEventListener('click', ()=> {
    location.href = './pay.html';
    })
  }
}