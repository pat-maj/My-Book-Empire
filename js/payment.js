// Validate card number
const validate_card = (card) => {

    const patternCard = /^5[1-5][0-9]{14}$/;

    if(!(card.match(patternCard))) {
        document.getElementById("cardNumError").innerHTML = "Invalid card number! Remember your card must consist of 16 digits and starts with 51, 52, 53, 54 or 55!";
        return false;
    }

    return true;
}

// Validate security code
const validate_cvv = (cvv) => {

    const patternCVV = /^\d{3,4}$/;

    if(!(cvv.match(patternCVV))) {
        document.getElementById("cvvError").innerHTML = "Invalid Security Code! Remeber that CVV should consist of 3 or 4 digits! You can normally find it on the back of your card.";
        return false;
    }

    return true;
}

// Validate expiration date
const validate_year = (yearExp, monthExp) => {

    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth());
    const expDate = new Date(yearExp, monthExp); 

    if(Math.ceil(expDate.getTime() - today.getTime()) < 0){
        document.getElementById("expDateError").innerHTML = "Your card is expired! Try to use different card.";
        return false;
    }

    return true;
}

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

    // Payment button
    const paymentBtn = document.getElementById('paymentBtn');
    paymentBtn.addEventListener("click", (e) => {

        // Get payment details
        const card = document.getElementById('cardNum').value;
        const cvv = document.getElementById('cvv').value;
        const yearExp = document.getElementById('yearExp').value;
        const monthExp = document.getElementById('monthExp').value;
        let isValid = true;

        // Validate the input
        isValid = isValid && validate_card(card);
        isValid = isValid && validate_cvv(cvv);
        isValid = isValid && validate_year(yearExp, monthExp);
        
        let displayMonth = parseInt(monthExp) + 1; //When comparing dates months are from 0 to 11, however when displaying normally we need to add 1
        
        if(isValid) {

            // Server address and prepare data
            const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard"; 
            const data = {
                "master_card": parseInt(card),
                "exp_year": parseInt(yearExp),
                "exp_month": displayMonth,
                "cvv_code": cvv 
            }

            // Fetch data to the server
            fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if(response.status === 200){ // Successful
                    return response.json();
                } else if(response.status === 400) { // Failure
                    throw "Bad data was sent to the server";
                } else {
                    throw "Something went wrong";
                }
            })
            .then((resJson) => {
                sessionStorage.setItem('successfulPayment', JSON.stringify(resJson)); // Store the server response
                location.href = './success.html'; // Go to Success Page
            })
            .catch((error) => {
                alert(error); // Display error in case of failure
            })

        } else {
            
        }

        e.preventDefault(); // Prevent from refreshing
    })

}