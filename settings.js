document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const avatarInput = document.getElementById('avatar');
    const saveButton = document.querySelector('button[type="submit"]');
    const modal = document.getElementById('successModal');
    const modalCloseButton = document.getElementById('modalCloseButton');
    const logoutButton = document.getElementById('logoutButton');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogoutButton = document.getElementById('confirmLogoutButton');
    const cancelLogoutButton = document.getElementById('cancelLogoutButton');
    const avatarDisplay = document.getElementById('avatarDisplay');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const welcomeUsername = document.getElementById('welcomeUsername');

    const defaultUsername = 'username';
    const defaultAvatar = '/assets/Profile_Default.png'; // Ensure this path is correct

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
                avatarDisplay.src = defaultAvatar; // Fallback to default avatar
            };
        }
    }

    // Load saved username and avatar from localStorage
    updateProfile();

    // Save settings
    saveButton.addEventListener('click', function (event) {
        event.preventDefault();

        const newUsername = usernameInput.value.trim();
        localStorage.setItem('username', newUsername);

        if (avatarInput.files && avatarInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const avatarDataUrl = e.target.result;
                localStorage.setItem('avatar', avatarDataUrl);
                localStorage.setItem('profileUpdated', Date.now()); // Trigger the storage event
                updateProfile();
            };
            reader.readAsDataURL(avatarInput.files[0]);
        } else {
            localStorage.setItem('profileUpdated', Date.now()); // Trigger the storage event
            updateProfile();
        }

        // Show the success modal
        modal.classList.add('show');
    });

    // Close the modal
    modalCloseButton.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    // Log Out Button and Modal Logic
    logoutButton.addEventListener('click', function () {
        logoutModal.classList.add('show'); // Show the logout confirmation modal
    });

    confirmLogoutButton.addEventListener('click', function () {
        localStorage.clear(); // Clear all localStorage data
        window.location.href = './login.html'; // Adjust path as needed
    });

    cancelLogoutButton.addEventListener('click', function () {
        logoutModal.classList.remove('show'); // Close the logout modal
    });
});