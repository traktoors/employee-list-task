/*
    This feature makes the employee list more flexible and user-friendly.
    Instead of only searching by name, users can choose to filter by either name or job title. This is especially helpful
    if someone is looking for a role—like “programmer”—rather than a specific person.
    For example, if you need to find any programmer in the company, just switch the filter to “Title”
    and type “programmer” in the search box. The list updates automatically, making it faster and easier
    to find the right person based on what you know. It’s a simple upgrade that adds a lot of practical value.
*/

const listContainer = document.getElementById('employee-list')
let allEmployees = [];

// Get filter type
function getSelectedFilterType() {
  const selected = document.querySelector('input[name="filter-type"]:checked');
  const value = selected ? selected.value : 'name';
  return value;
}

// Listen for changes in filter type and re-render employee list
document.querySelectorAll('input[name="filter-type"]').forEach(input => {
  input.addEventListener('change', () => {
    const searchValue = document.getElementById('employee-search-field').value;
    renderEmployees(searchValue);
  });
});

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


// Render employees list by filtering
// Gets updated every time search input changes
function renderEmployees(filter = '') {
    listContainer.innerHTML = ''; // Reset list
    
    const filterType = getSelectedFilterType();
    const filtered = allEmployees.filter(e => { // first filter from search text
        const field = e[filterType]?.toLowerCase() || '';
        return field.includes(filter.toLowerCase());
    }).sort((a, b) => { // then sort by ascending alpabetical order for better user experience
        if (filterType === 'name' || filterType === 'title') {
            const fieldA = a[filterType]?.toLowerCase() || '';
            const fieldB = b[filterType]?.toLowerCase() || '';
            return fieldA.localeCompare(fieldB);
        }
        return 0; // No sorting if filterType is something else
    });


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