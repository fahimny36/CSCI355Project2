const uname = document.getElementById("name");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const date = document.getElementById("date");
const days = document.getElementById("days");
// const submit = document.getElementById("submit");
var form = document.querySelector(".form");

form.addEventListener("submit", submission);
// function to submit the form
function submission(e) {
  if (
    // if all authentication in form is correct
    FN(uname) === true &&
    EM(email) === true &&
    phonenumber(tel) === true &&
    cDate(date) === true &&
    nDays(days) === true
  ) {
    e.preventDefault();

    const formData = new FormData(form);// form data will store in fromData
    const data = Object.fromEntries(formData); 
    fetch("http://localhost:3001/booking", {//fetch the end point of our api
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",//data will be in json
      },
      body: JSON.stringify(data),//data is convert in jsom
    }).then(function (response) {//this is promise that receive form backend
      if (response.status == 201) { //if the booking is success full then repsonse will be 201
        alert("Form successfuly completed");
        window.location.replace("http://localhost:3001/index.html");//after the successfull submition then redirect to index.html page

        return response.json(); //return the resposne in json type
      } else{
        alert("Some thing went wrong");
      }

      return Promise.reject(response);// if the response is not success then the promise will be reject
    });
  } else {
    e.preventDefault();
    alert("Form Incomplete");
  }
}

// firstName authenctication
function FN(firstName) {
  const letters = /^[A-Za-z '-]+$/; // regex pattern
  if (
    firstName.value.match(letters) &&//name should be in alphabat and dash not numeric and less then 30 character
    firstName.value.length > 0 &&
    firstName.value.length < 30
  ) {
    return true;
  } else {
    alert(
      "Name must not be empty and only contain letters, apostrophes and underscores"
    );
    firstName.focus();
    return false;
  }
}

// number of days authentication
function nDays(days) {
  const numbers = /^[0-9]+$/; // the number should be only in numeric
  if (days.value.match(numbers)) {
    if(days.value==0)
    {
      alert("Days should not be 0")
    }
    else if(days.value>100)
    {
      alert("Days should be less then 100")
    }
    else{
      return true;

    }
  } else {
    alert("Days should be numeric");
    days.focus();

    return false;
  }
}

// email authentication
function EM(email) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //this regex is for email and validate the formate of email

  if (email.value.match(validRegex)) {
    return true;
  } else {
    alert("Invalid email address!");
    email.focus();
    return false;
  }
}

// phone number authentication
function phonenumber(pnumber) {
  const num=pnumber.value ///the value of phon-number
 

  if (num.charAt(0)=="+" && num.length==12) { //first chracter of phone number should be start with + and length should be 12
    return true;
  } else {
    alert("Please enter valid number");
    return false;
  }
}

// date authentication
function cDate(date) {
 let y = new Date().getFullYear();
 let m = new Date().getMonth();
 let d = new Date().getDate();
 let newdate = date.value.split("-").join(",");
 let y1 = newdate.substring(0, 4);
 let  m1 = newdate.substring(5, 7);
 let d1 = newdate.substring(8, 10);
  if (y1 < y) {
    alert("Date should not in past ");
    return false;
  }
  if (y1 == y && m1 < m) {
    alert("Date of should not in past ");
    return false;
  }
  if (d1 < d) {
    alert("Date should not in past ");
    return false;
  } else {
    return true;
  }
}

