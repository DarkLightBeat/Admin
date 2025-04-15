document.addEventListener('DOMContentLoaded', function () {
    const avatarDisplay = document.getElementById('avatarDisplay');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const welcomeUsername = document.getElementById('welcomeUsername');
    const defaultUsername = 'username';
    const defaultAvatar = './assets/Profile_Default.png'; // Ensure this path is correct

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

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.faq-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

