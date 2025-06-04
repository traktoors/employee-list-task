/*
    This feature makes the employee list more flexible and user-friendly.
    Instead of only searching by name, users can choose to filter by either name or job title. This is especially helpful
    if someone is looking for a role—like “programmer”—rather than a specific person.
    For example, if you need to find any programmer in the company, just switch the filter to “Title”
    and type “programmer” in the search box. The list updates automatically, making it faster and easier
    to find the right person based on what you know. It’s a simple upgrade that adds a lot of practical value.
*/

function getSelectedFilterType() {
  const selected = document.querySelector('input[name="filter-type"]:checked');
  return selected ? selected.value : 'name';
}

// Listen for changes in filter type and re-render employee list
document.querySelectorAll('input[name="filter-type"]').forEach(input => {
  input.addEventListener('change', () => {
    const searchValue = document.getElementById('employee-search-field').value;
    renderEmployees(searchValue);
  });
});