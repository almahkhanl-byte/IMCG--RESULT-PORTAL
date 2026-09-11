const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTSrthf9aWtrRSdZL091koN1pYHYPAEHg_wjFSkTW2C-oMxqV5P3BQcVJJDetCrXzSrCea18Mq--oQ/pub?gid=0&single=true&output=csv";
let studentsData = {};

async function loadData() {
    const resultBox = document.getElementById("resultBox");
    resultBox.innerHTML = `<p class="loading">Data load ho raha hai... thora wait karein</p>`;

    try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;
        const cols = json.table.cols;

        rows.forEach(row => {
            const student = {};
            cols.forEach((col, i) => {
                student[col.label] = row.c[i]? row.c[i].v : "";
            });
            if (
