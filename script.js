const API_URL = "https://script.google.com/macros/s/AKfycbyQfUqkMr8u-TeGyJ6axZHVm-em1SL9OAcz8zecdfi8_2B9a9ZP_SrtkcXOzXCI20PZZA/exec";

function searchStudent() {
  const admissionNo = document.getElementById("admissionNo").value.trim();
  const resultDiv = document.getElementById("result");

  if(admissionNo === ""){
    alert("Pehle Admission No likho");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  fetch(API_URL + "?admissionNo=" + admissionNo)
  .then(response => response.json())
  .then(data => {
    if(data.status === "found"){
      resultDiv.innerHTML = `
        <h2>Result Card</h2>
        <p><b>Name:</b> ${data.Name}</p>
        <p><b>Father Name:</b> ${data.FatherName}</p>
        <p><b>Group:</b> ${data.Group}</p>
        <p><b>Math:</b> ${data.Math} | <b>Physics:</b> ${data.Physics} | <b>Chemistry:</b> ${data.Chemistry}</p>
        <p><b>Computer:</b> ${data.Computer} | <b>English:</b> ${data.English} | <b>Urdu:</b> ${data.Urdu}</p>
        <p><b>Islamiyat:</b> ${data.Islamiat} | <b>Pak Studies:</b> ${data.PakStudies}</p>
        <hr>
        <h3><b>Total:</b> ${data.Total} | <b>Grade:</b> ${data.Grade} | <b>Status:</b> ${data.Status}</h3>
      `;
    } 
    else if(data.status === "notfound"){
      resultDiv.innerHTML = "<h3 style='color:red'>Admission No nahi mila</h3>";
    }
    else{
      resultDiv.innerHTML = "<h3 style='color:red'>Error: " + data.message + "</h3>";
    }
  })
  .catch(error => {
    resultDiv.innerHTML = "<h3 style='color:red'>API connect nahi ho rahi</h3>";
    console.error(error);
  });
}
