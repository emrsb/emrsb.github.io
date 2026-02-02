//#####################################################################
// Embed your CSV data here
const csvData = `house,gender,class,name,admission no.,father's name,mobile no.,address
🟢Ganga,male,6,Name 1,1,fname 1,1234567890,address 1
🟢Ganga,male,7,Name 2,2,fname 2,1234567890,address 2
🟢Ganga,male,8,Name 3,3,fname 3,1234567890,address 3
🟢Ganga,male,9,Name 4,4,fname 4,1234567890,address 4
🟢Ganga,male,10,Name 5,5,fname 5,1234567890,address 5
🟢Ganga,male,11,Name 6,6,fname 6,1234567890,address 6
🟢Ganga,male,12,Name 7,7,fname 7,1234567890,address 7
🟢Ganga,male,6,Name 8,8,fname 8,1234567890,address 8
🟢Ganga,male,7,Name 9,9,fname 9,1234567890,address 9
🟢Ganga,male,8,Name 10,10,fname 10,1234567890,address 10
🟢Ganga,male,9,Name 11,11,fname 11,1234567890,address 11
🟢Ganga,male,10,Name 12,12,fname 12,1234567890,address 12
🔴Godavari,male,11,Name 13,13,fname 13,1234567890,address 13
🔴Godavari,male,12,Name 14,14,fname 14,1234567890,address 14
🔴Godavari,male,6,Name 15,15,fname 15,1234567890,address 15
🔴Godavari,male,7,Name 16,16,fname 16,1234567890,address 16
🔴Godavari,female,8,Name 17,17,fname 17,1234567890,address 17
🔴Godavari,female,9,Name 18,18,fname 18,1234567890,address 18
🔴Godavari,female,10,Name 19,19,fname 19,1234567890,address 19
🟡Tapi,female,11,Name 20,20,fname 20,1234567890,address 20
🟡Tapi,female,12,Name 21,21,fname 21,1234567890,address 21
🟡Tapi,female,6,Name 22,22,fname 22,1234567890,address 22
🟡Tapi,female,7,Name 23,23,fname 23,1234567890,address 23
🟡Tapi,female,8,Name 24,24,fname 24,1234567890,address 24
🟡Tapi,female,9,Name 25,25,fname 25,1234567890,address 25
🔵Brahmaputra,female,10,Name 26,26,fname 26,1234567890,address 26
🔵Brahmaputra,female,11,Name 27,27,fname 27,1234567890,address 27
🔵Brahmaputra,female,12,Name 28,28,fname 28,1234567890,address 28
🔵Brahmaputra,female,6,Name 29,29,fname 29,1234567890,address 29
🔵Brahmaputra,female,7,Name 30,30,fname 30,1234567890,address 30
🔵Brahmaputra,female,8,Name 31,31,fname 31,1234567890,address 31
🔵Brahmaputra,female,9,Name 32,32,fname 32,1234567890,address 32
🔵Brahmaputra,female,10,Name 33,33,fname 33,1234567890,address 33
`;


//#####################################################################
let allData = [];
let filteredData = [];

// Initialize on page load
window.onload = function() {
    parseCSV(csvData);
    populateFilters();
    displayCards();
};

function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    allData = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index].trim();
            });
            allData.push(obj);
        }
    }

    filteredData = [...allData];
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

function populateFilters() {
    const houses = [...new Set(allData.map(d => d.house).filter(Boolean))].sort();
    const genders = [...new Set(allData.map(d => d.gender).filter(Boolean))].sort();
    const classes = [...new Set(allData.map(d => d.class).filter(Boolean))].sort();

    populateSelect('houseFilter', houses);
    populateSelect('genderFilter', genders);
    populateSelect('classFilter', classes);

    document.getElementById('houseFilter').addEventListener('change', applyFilters);
    document.getElementById('genderFilter').addEventListener('change', applyFilters);
    document.getElementById('classFilter').addEventListener('change', applyFilters);
}

function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    const currentValue = select.value;
    
    // Keep the "All" option
    select.innerHTML = select.options[0].outerHTML;
    
    options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option;
        optElement.textContent = option;
        select.appendChild(optElement);
    });

    if (options.includes(currentValue)) {
        select.value = currentValue;
    }
}

function applyFilters() {
    const houseFilter = document.getElementById('houseFilter').value.toLowerCase();
    const genderFilter = document.getElementById('genderFilter').value.toLowerCase();
    const classFilter = document.getElementById('classFilter').value.toLowerCase();

    filteredData = allData.filter(item => {
        const matchHouse = !houseFilter || item.house?.toLowerCase() === houseFilter;
        const matchGender = !genderFilter || item.gender?.toLowerCase() === genderFilter;
        const matchClass = !classFilter || item.class?.toLowerCase() === classFilter;
        return matchHouse && matchGender && matchClass;
    });

    displayCards();
}

function clearFilters() {
    document.getElementById('houseFilter').value = '';
    document.getElementById('genderFilter').value = '';
    document.getElementById('classFilter').value = '';
    filteredData = [...allData];
    displayCards();
}

function displayCards() {
    const container = document.getElementById('cardsContainer');
    const resultsInfo = document.getElementById('resultsInfo');
    
    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <div class="no-data-icon">📭</div>
                <div class="no-data-text">No records found matching your filters</div>
            </div>
        `;
        resultsInfo.textContent = 'Showing 0 results';
        return;
    }

    resultsInfo.textContent = `Showing ${filteredData.length} of ${allData.length} results`;

    container.innerHTML = filteredData.map(item => {
        // Get all fields except the main ones we're showing in badges
        const mainFields = ['name', 'house', 'gender', 'class'];
        const otherFields = Object.keys(item).filter(key => !mainFields.includes(key));

        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-name">${item.name || 'N/A'}</div>
                    <div class="card-badges">
                        ${item.house ? `<span class="badge badge-house">${item.house}</span>` : ''}
                        ${item.gender ? `<span class="badge badge-gender">${item.gender}</span>` : ''}
                        ${item.class ? `<span class="badge badge-class">${item.class}</span>` : ''}
                    </div>
                </div>
                <div class="card-body">
                    ${otherFields.map(field => `
                        <div class="card-field">
                            <span class="field-label">${capitalizeField(field)}:</span>
                            <span class="field-value">${item[field] || 'N/A'}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function capitalizeField(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
