document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tableBody = document.getElementById('table-body');
    const searchBar = document.getElementById('search-bar');
    const filterBtn = document.querySelector('.filter-btn');
    const filterOptions = document.getElementById('filter-options');
    const filterProgram = document.getElementById('filter-program');
    const filterDate = document.getElementById('filter-date');
    const applyFilterBtn = document.getElementById('apply-filter-btn');

    // Data for each tab
    const data = {
        pending: [
        ],
        'in-review': [
        ],
        approved: [
        ],
        rejected: [
        ]
    };

    let currentTab = 'pending'; // Track the currently active tab

    // Function to render table rows
    const renderTable = (tab, filters = {}) => {
        tableBody.innerHTML = ''; // Clear existing rows
        const filteredData = data[tab].filter(row => {
            const matchesProgram = filters.program ? row.program === filters.program : true;
            const matchesDate = filters.date ? row.date === filters.date : true;
            return matchesProgram && matchesDate;
        });

        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.program}</td>
                <td>${row.date}</td>
            `;
            tableBody.appendChild(tr);
        });
    };

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to the clicked tab
            tab.classList.add('active');

            // Render the table for the selected tab
            currentTab = tab.dataset.tab;
            renderTable(currentTab);
        });
    });

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase(); // Get the search term in lowercase
        const filteredData = data[currentTab].filter(row =>
            row.name.toLowerCase().includes(searchTerm) // Check if the name includes the search term
        );

        // Render the filtered data
        tableBody.innerHTML = '';
        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.program}</td>
                <td>${row.date}</td>
            `;
            tableBody.appendChild(tr);
        });
    });

    // Toggle filter options visibility
    filterBtn.addEventListener('click', () => {
        filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Apply filters
    applyFilterBtn.addEventListener('click', () => {
        const filters = {
            program: filterProgram.value,
            date: filterDate.value
        };
        renderTable(currentTab, filters);
        filterOptions.style.display = 'none'; // Hide filter options after applying
    });

    // Show the "Pending" tab by default
    renderTable('pending');

    const profileModal = document.getElementById('profile-modal');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const profileForm = document.getElementById('profile-form');

    // Open modal and populate form with applicant details
    document.getElementById('table-body').addEventListener('click', (e) => {
        if (e.target.tagName === 'TD' && e.target.cellIndex === 1) { // Check if the clicked cell is in the "Name" column
            const row = e.target.parentElement;
            const applicant = {
                id: row.cells[0].textContent,
                name: row.cells[1].textContent,
                program: row.cells[2].textContent,
                date: row.cells[3].textContent,
            };

            // Populate the form with applicant details
            const [lastName, firstName, middleName] = applicant.name.split(' ');
            document.getElementById('last-name').value = lastName || '';
            document.getElementById('first-name').value = firstName || '';
            document.getElementById('middle-name').value = middleName || '';
            document.getElementById('sex').value = 'Male'; // Default value
            document.getElementById('birthday').value = '2000-01-01'; // Default value
            document.getElementById('email').value = 'example@example.com'; // Default value

            profileModal.style.display = 'block'; // Show the modal
        }
    });

    // Close the modal
    cancelBtn.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    // Save changes
    saveBtn.addEventListener('click', () => {
        const updatedDetails = {
            lastName: profileForm['last-name'].value,
            firstName: profileForm['first-name'].value,
            middleName: profileForm['middle-name'].value,
            sex: profileForm['sex'].value,
            birthday: profileForm['birthday'].value,
            email: profileForm['email'].value,
        };

        console.log('Updated Details:', updatedDetails); // Log the updated details (replace with actual save logic)

        profileModal.style.display = 'none'; // Close the modal
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // Set the profile picture to Profile_Default.png for all files
    const avatarDisplay = document.getElementById('avatarDisplay');
    const defaultUsername = 'username';
    const defaultAvatar = 'assets/Profile_Default.png'; // Ensure this path is correct
    const savedUsername = localStorage.getItem('username') || defaultUsername;
    const savedAvatar = localStorage.getItem('avatar') || defaultAvatar;
    usernameDisplay.textContent = savedUsername;
    welcomeUsername.textContent = savedUsername;
    avatarDisplay.src = savedAvatar;
    avatarDisplay.onerror = () => {
        avatarDisplay.src = defaultAvatar; // Fallback to default avatar
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const avatarDisplay = document.getElementById('avatarDisplay');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const welcomeUsername = document.getElementById('welcomeUsername');
    const defaultUsername = 'username';
    const defaultAvatar = '/assets/Profile_Default.png';

    // Function to update the profile
    function updateProfile() {
        const savedUsername = localStorage.getItem('username') || defaultUsername;
        const savedAvatar = localStorage.getItem('avatar') || defaultAvatar;

        if (usernameDisplay) {
            usernameDisplay.textContent = savedUsername;
        }
        if (welcomeUsername) {
            welcomeUsername.textContent = savedUsername;
        }
        if (avatarDisplay) {
            avatarDisplay.src = savedAvatar;
            avatarDisplay.onerror = () => {
                avatarDisplay.src = defaultAvatar;
            };
        }
    }

    // Load saved username and avatar from localStorage
    updateProfile();
});
