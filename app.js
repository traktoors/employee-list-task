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
        const expandingList = document.createElement('div');
        expandingList.className = 'exp-list';

        // Expanding list header contains employee name and title
        // By clicking header, details section toggles visibility
        const listHeader = createListTileElement(emp.name, emp.title, 'exp-list-header list-tile')

        // Details section, contains every other data about employee
        const details = document.createElement('div')
        details.className = 'exp-list-details';
        details.appendChild(createListTileElement('Email:', emp.email, 'exp-list-tile list-tile'));
        details.appendChild(createListTileElement('Start Date:', emp.startDate, 'exp-list-tile list-tile'));

        // Toggle details visibility on item click
        listHeader.addEventListener('click', () => {
            details.classList.toggle('show');
            listHeader.classList.toggle('list-tile-active');
        });

        // Assemble and append to DOM
        expandingList.appendChild(listHeader);
        expandingList.appendChild(details);
        listContainer.appendChild(expandingList);
    });
}

// Listen for search input
document.getElementById('employee-search-field').addEventListener('input', e => {
    renderEmployees(e.target.value);
});

// Initial load
loadEmployees();