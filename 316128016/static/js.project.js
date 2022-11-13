const ActivePage=window.location.pathname;
console.log(ActivePage)
const activeNav= document.querySelectorAll('nav a').forEach(
    myLinks => {
        if (myLinks.href.includes(`${ActivePage}`)) {
            myLinks.classList.add('Active')
            
        }

   }
)
 // Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}  

var x = document.getElementById("demo");
var city1 = document.getElementById("city");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
    console.log.geolocation;
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
    
function showPosition(position) {
    var x = document.getElementById('p');
    var y = document.getElementById("BTN");
    x.innerHTML = "Latitude: " + position.coords.latitude 
    + "longtitide: " + position.coords.longitude;
}
function showPosition(position) {
    let latlon = position.coords.latitude + "," + position.coords.longitude;
  
  
}
// Step 1: Get user coordinates
function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
  
    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
  
    }
  
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error, options);
}
  
// Step 2: Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
  
    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.ca2a9a38c9b3bc8a03525550845f5e85&lat=" +
    lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            document.getElementById('city').value =city;
            console.log(city)
            return;
        }
    }
    
}

function validate_password() {
 
    var pass = document.getElementById('pass').value;
    var confirm_pass = document.getElementById('confirm_pass').value;
    if (pass != confirm_pass) {
        document.getElementById('wrong_pass_alert').style.color = 'red';
        document.getElementById('wrong_pass_alert').innerHTML
          = '☒ Use same password';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } else {
        document.getElementById('wrong_pass_alert').style.color = 'green';
        document.getElementById('wrong_pass_alert').innerHTML =
            '🗹 Password Matched';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }
}

function wrong_pass_alert() {
    if (document.getElementById('pass').value != "" &&
        document.getElementById('confirm_pass').value != "") {
        alert("Your response is submitted");
       
    } else {
        alert("Please fill all the fields");
    }
}

function validate_password2() {
 
    var pass = document.getElementById('passw').value;
    var confirm_pass = document.getElementById('confirm_passw').value;
    if (pass != confirm_pass) {
        document.getElementById('wrong_pass').style.color = 'red';
        document.getElementById('wrong_pass').innerHTML
          = '☒ Use same password';
        document.getElementById('reg').disabled = true;
        document.getElementById('reg').style.opacity = (0.4);
    } else {
        document.getElementById('wrong_pass').style.color = 'green';
        document.getElementById('wrong_pass').innerHTML =
            '🗹 Password Matched';
        document.getElementById('reg').disabled = false;
        document.getElementById('reg').style.opacity = (1);
    }
}

function wrong_pass_alert2() {
    if (document.getElementById('passw').value != "" &&
        document.getElementById('confirm_passw').value != "") {
        alert("Your response is submitted");
       
    } else {
        alert("Please fill all the fields");
    }
}
var modal = document.getElementById('update');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}  
function validate_password_length() {
 
    var password =document.getElementById('pass');
    if (password.value.length<6) {
        document.getElementById('pass_val').style.color = 'red';
        document.getElementById('pass_val').innerHTML = '☒ Password require at least 6 charecters! ';
        document.getElementById('create').disabled = true;
        document.getElementById('create').style.opacity = (0.4);
    } else {
        document.getElementById('pass_val').style.color = 'green';
        document.getElementById('pass_val').innerHTML = '🗹 Strong Password  ';
        document.getElementById('create').disabled = false;
        document.getElementById('create').style.opacity = (1);
    }
}
function validate_password_length2() {
 
    var password =document.getElementById('passw');
    if (password.value.length<6) {
        document.getElementById('wrong_len').style.color = 'red';
        document.getElementById('wrong_len').innerHTML = '☒ Password require at least 6 charecters! ';
        document.getElementById('reg').disabled = true;
        document.getElementById('reg').style.opacity = (0.4);
    } else {
        document.getElementById('wrong_len').style.color = 'green';
        document.getElementById('wrong_len').innerHTML = '🗹 Strong Password  ';
        document.getElementById('reg').disabled = false;
        document.getElementById('reg').style.opacity = (1);
    }
}


