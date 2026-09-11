const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTSrthf9aWtrRSdZL091koN1pYHYPAEHg_wjFSkTW2C-oMxqV5P3BQcVJJDetCrXzSrCea18Mq--oQ/pub?gid=0&single=true&output=csv";

async function getResult() {
    const admissionInput = document.getElementById("admissionNo").value.trim();
    const resultDiv = document.getElementById("result");

    if (admissionInput === "") {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter Admission No.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        
        // CSV ko array me convert karna
        const rows = data.split("\n").map(row => row.split(","));
        const headers = rows[0];
        
        // AdmissionNo wala column dhoondna
        const admissionIndex = headers.indexOf("AdmissionNo");
        
        let found = false;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row[admissionIndex] === admissionInput) {
                found = true;
                let html = "<h3>Result</h3><table border='1' style='width:100%; border-collapse:collapse;'>";
                headers.forEach((h, index) => {
                    html += `<tr><td><b>${h}</b></td><td>${row[index]}</td></tr>`;
                });
                html += "</table>";
                resultDiv.innerHTML = html;
                break;
            }
        }
        
        if (!found) {
            resultDiv.innerHTML = "<p style='color:red;'>Record not found. Please check Admission No.</p>";
        }

    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Error loading data. Please try again.</p>";
        console.log(error);
    }
}
