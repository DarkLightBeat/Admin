document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = link.getAttribute('href');
            navigateTo(targetPage);
        });
    });

    function navigateTo(targetPage) {
        window.location.href = targetPage;
    }

    // Function to update the profile
    function updateProfile() {
        const avatarDisplay = document.getElementById('avatarDisplay');
        const usernameDisplay = document.getElementById('usernameDisplay');
        const welcomeUsername = document.getElementById('welcomeUsername');
        const defaultUsername = 'username';
        const defaultAvatar = 'assets/Profile_Default.png';

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

    // Listen for changes to localStorage
    window.addEventListener('storage', function (event) {
        if (event.key === 'profileUpdated') {
            updateProfile(); // Update the profile when changes are detected
        }
    });

    // Initialize Yearly Progress Chart as a Pie Chart
    const ctx1 = document.getElementById('yearlyProgressChart').getContext('2d');
    new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Completed', 'In Progress', 'Pending'],
            datasets: [{
                data: [60, 30, 10],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    const avatarDisplay = document.getElementById('avatarDisplay');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const welcomeUsername = document.getElementById('welcomeUsername');
    const defaultUsername = 'username';
    const defaultAvatar = 'assets/Profile_Default.png';

    // Load saved username and avatar from localStorage
    updateProfile();

    // Listen for changes to localStorage
    window.addEventListener('storage', function (event) {
        if (event.key === 'profileUpdated') {
            updateProfile(); // Update the profile when changes are detected
        }
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabContentId = tab.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = content.id === tabContentId ? 'block' : 'none';
            });
        });
    });
});

// Initialize Application Trends Chart
var ctx2 = document.getElementById('applicationTrendsChart').getContext('2d');
var applicationTrendsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Application Trends',
            data: [12, 19, 3, 5, 2, 3, 7, 8, 10, 15, 20, 25],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize Resource Allocation Chart
var ctx3 = document.getElementById('resourceAllocationChart').getContext('2d');
var resourceAllocationChart = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['Resource 1', 'Resource 2', 'Resource 3', 'Resource 4'],
        datasets: [{
            label: 'Resource Allocation',
            data: [10, 20, 30, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

// Initialize Demographics Chart
var ctx4 = document.getElementById('demographicsChart').getContext('2d');
var demographicsChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['Male', 'Female'],
        datasets: [{
            label: 'Demographics',
            data: [50, 50], // Example data, adjust as needed
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)', // Blue for Male
                'rgba(255, 99, 132, 0.2)'  // Pink for Female
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)', // Blue for Male
                'rgba(255, 99, 132, 1)'  // Pink for Female
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

// Initialize Active Applications Chart
var ctx5 = document.getElementById('activeApplicationsChart').getContext('2d');
var activeApplicationsChart = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Active Applications',
            data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Update charts and values based on user input
document.getElementById('verifiedUsersInput').addEventListener('input', function () {
    document.getElementById('verifiedUsersDisplay').textContent = this.value.toLocaleString();
});

document.getElementById('pendingApplicationsInput').addEventListener('input', function () {
    document.getElementById('pendingApplicationsDisplay').textContent = this.value.toLocaleString();
});

document.getElementById('maleApplicantsInput').addEventListener('input', updateDemographicsChart);
document.getElementById('femaleApplicantsInput').addEventListener('input', updateDemographicsChart);

function updateDemographicsChart() {
    var maleApplicants = parseInt(document.getElementById('maleApplicantsInput').value) || 0;
    var femaleApplicants = parseInt(document.getElementById('femaleApplicantsInput').value) || 0;
    demographicsChart.data.datasets[0].data = [maleApplicants, femaleApplicants];
    demographicsChart.update();
}

// Modal functionality
const modals = document.querySelectorAll('.modal');
const changeDataButtons = document.querySelectorAll('.change-data-btn');
const closeButtons = document.querySelectorAll('.close-btn');
const okButtons = document.querySelectorAll('.modal-ok-btn');
const cancelButtons = document.querySelectorAll('.modal-cancel-btn');

changeDataButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetModal = document.getElementById(this.getAttribute('data-target'));
        targetModal.style.display = 'block';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
    });
});

cancelButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
    });
});

okButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetModal = this.getAttribute('data-target');
        const modal = document.getElementById(targetModal);
        const inputs = modal.querySelectorAll('input');
        inputs.forEach(input => {
            const displayId = input.id.replace('Input', 'Display');
            const display = document.getElementById(displayId);
            if (display) {
                display.textContent = input.value.toLocaleString();
            }
            if (targetModal === 'yearlyProgressModal') {
                const data = Array.from(modal.querySelectorAll('input')).map(input => parseInt(input.value) || 0);
                yearlyProgressChart.data.datasets[0].data = data;
                yearlyProgressChart.update();
            } else if (targetModal === 'applicationTrendsModal') {
                const data = Array.from(modal.querySelectorAll('input')).map(input => parseInt(input.value) || 0);
                applicationTrendsChart.data.datasets[0].data = data;
                applicationTrendsChart.update();
            } else if (targetModal === 'resourceAllocationModal') {
                const data = Array.from(modal.querySelectorAll('input')).map(input => parseInt(input.value) || 0);
                resourceAllocationChart.data.datasets[0].data = data;
                resourceAllocationChart.update();
            } else if (targetModal === 'activeApplicationsModal') {
                const data = Array.from(modal.querySelectorAll('input')).map(input => parseInt(input.value) || 0);
                activeApplicationsChart.data.datasets[0].data = data;
                activeApplicationsChart.update();
            }
        });
        modal.style.display = 'none';
    });
});

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

window.addEventListener('storage', function (event) {
    if (event.key === 'profileUpdated') {
        updateProfile(); // Update the profile when changes are detected
    }
});

const socket = new WebSocket('https://darklightbeat.github.io/Admin/index.html');

socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        document.getElementById(data.targetId).textContent = data.newValue;
    }
};

function updateData(url, targetId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById(targetId).textContent = data.value;
        });
}