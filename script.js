let results = [];

function loadCSV(filename, callback) {
  fetch(filename)
    .then(res => res.text())
    .then(data => {
      results = [];
      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        let record = {};
        headers.forEach((h, idx) => {
          record[h.trim()] = row[idx]?.trim();
        });
        results.push(record);
      }
      callback();
    })
    .catch(error => {
      console.error('Error loading CSV:', error);
    });
}

function searchResult() {
  const adm = document.getElementById('roll').value.trim();  // Updated to match HTML id
  const cls = document.getElementById('classSelect').value;  // Corrected to match HTML id

  if (!cls) {
    alert('Please select a class!');
    return;
  }

  if (!adm) {
    alert('Please enter a register number!');
    return;
  }

  loadCSV(cls, () => {
    const student = results.find(r => r['ADMISSION NO:'] === adm);
    const output = document.getElementById('result');
    if (student) {
      let html = `<h3>Result for ${student.NAME}</h3><table>`;
      for (let key in student) {
        if (key !== 'NAME' && key !== 'ADMISSION NO:') {
          html += `<tr><td>${key}</td><td>${student[key]}</td></tr>`;
        }
      }
      html += '</table>';
      output.innerHTML = html;
    } else {
      output.innerHTML = `<p class="not-found">Student not found</p>`;
    }
  });
}
