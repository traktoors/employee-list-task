const listContainer = document.getElementById('employee-list')
let allEmployees = [];

// Just a list tile with text on the left and text on the right, great for showing employee info
function createListTileElement(prefixText='', suffixText='', className=''){
    const listTile = document.createElement('div');
    listTile.className = className;

    const prefixTextEl = document.createElement('p');
    prefixTextEl.textContent = prefixText;
    const suffixTextEl = document.createElement('span');
    suffixTextEl.textContent = suffixText;

    listTile.appendChild(prefixTextEl);
    listTile.appendChild(suffixTextEl);

    return listTile;
}

// Fetch employees from json
async function loadEmployees() {
    try {
        const response = await fetch('employees.json');
        allEmployees = await response.json();
        renderEmployees('');
    } catch (error) {
        listContainer.innerHTML = '<p>Error loading employee data.</p>';
        console.error(error);
    }
}


// Render employees on screen with search text as filter
function renderEmployees(filter = '') {
    listContainer.innerHTML = '';
    const filtered = allEmployees.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
        listContainer.innerHTML = '<p>No employees found.</p>';
        return;
    }

    filtered.forEach(emp => { // employee
        const item = document.createElement('div');
        item.className = 'employee-item';

        // summary section
        const summary = createListTileElement(emp.name, emp.title, 'list-tile-emp-summary list-tile')

        // Details section
        const details = document.createElement('div')
        details.className = 'employee-item-details';
        details.appendChild(createListTileElement('Email:', emp.email, 'list-tile-emp-description list-tile'));
        details.appendChild(createListTileElement('Start Date:', emp.startDate, 'list-tile-emp-description list-tile'));
        
        // Assemble and append to DOM
        item.appendChild(summary);
        item.appendChild(details);

        // Toggle details visibility on item click
        summary.addEventListener('click', () => {
            details.classList.toggle('show');
            summary.classList.toggle('list-tile-active');
        });

        listContainer.appendChild(item);
    });
}

// Listen for search input
document.getElementById('employee-search-field').addEventListener('input', e => {
    renderEmployees(e.target.value);
});

// Initial load
loadEmployees();