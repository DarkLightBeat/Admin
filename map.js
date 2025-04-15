document.addEventListener('DOMContentLoaded', function () {
    // Access token for Mapbox (You should use your own token)
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your actual token

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [121.07, 14.55], // Center on Quezon, Philippines
        zoom: 10
    });

    // Adding markers or data layers based on selected filters
    function updateMap(year, dataType) {
        if (map.getLayer('data-layer')) {
            map.removeLayer('data-layer');
        }
        if (map.getSource('data-source')) {
            map.removeSource('data-source');
        }

        map.addSource('data-source', {
            type: 'geojson',
            data: `data/${year}_${dataType}.geojson`
        });
        map.addLayer({
            id: 'data-layer',
            type: 'fill',
            source: 'data-source',
            paint: {
                'fill-color': '#888',
                'fill-opacity': 0.5
            }
        });
    }

    document.getElementById('year').addEventListener('change', function (e) {
        updateMap(e.target.value, document.getElementById('data-type').value);
    });
    document.getElementById('data-type').addEventListener('change', function (e) {
        updateMap(document.getElementById('year').value, e.target.value);
    });

    updateMap('2025', 'population-density');

    // Function to update the profile
    function updateProfile() {
        const avatarDisplay = document.getElementById('avatarDisplay');
        const usernameDisplay = document.getElementById('usernameDisplay');
        const welcomeUsername = document.getElementById('welcomeUsername');
        const defaultUsername = 'username';
        const defaultAvatar = './assets/Profile_Default.png'; // Ensure this path is correct

        const savedUsername = localStorage.getItem('username') || defaultUsername;
        const savedAvatar = localStorage.getItem('avatar') || defaultAvatar;

        console.log('Updating profile...');
        console.log('Saved Username:', savedUsername);
        console.log('Saved Avatar:', savedAvatar);

        if (usernameDisplay) {
            usernameDisplay.textContent = savedUsername;
        } else {
            console.error('usernameDisplay element not found.');
        }

        if (welcomeUsername) {
            welcomeUsername.textContent = `Welcome, ${savedUsername}`;
        } else {
            console.error('welcomeUsername element not found.');
        }

        if (avatarDisplay) {
            avatarDisplay.src = savedAvatar;
            avatarDisplay.onerror = () => {
                avatarDisplay.src = defaultAvatar; // Fallback to default avatar
            };
        } else {
            console.error('avatarDisplay element not found.');
        }
    }

    // Observe for profile elements
    function observeProfileElements() {
        const observer = new MutationObserver(() => {
            const avatarDisplay = document.getElementById('avatarDisplay');
            const usernameDisplay = document.getElementById('usernameDisplay');
            const welcomeUsername = document.getElementById('welcomeUsername');

            if (avatarDisplay && usernameDisplay) {
                console.log('Profile elements detected. Updating profile...');
                updateProfile();
                observer.disconnect(); // Stop observing once the elements are found
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Load saved username and avatar from localStorage
    observeProfileElements();

    // Listen for changes to localStorage (cross-tab support)
    window.addEventListener('storage', function (event) {
        if (event.key === 'profileUpdated') {
            console.log('Profile updated event detected.');
            updateProfile();
        }
    });

    // Fallback for same-tab updates
    let lastProfileUpdate = localStorage.getItem('profileUpdated');
    setInterval(() => {
        const currentProfileUpdate = localStorage.getItem('profileUpdated');
        if (currentProfileUpdate !== lastProfileUpdate) {
            console.log('Detected profile update via fallback.');
            lastProfileUpdate = currentProfileUpdate;
            updateProfile();
        }
    }, 1000);

    // Profile form handling (if present)
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const newUsername = document.getElementById('usernameInput').value.trim();
            const newAvatar = document.getElementById('avatarInput').value.trim();

            if (newUsername && newAvatar) {
                localStorage.setItem('username', newUsername);
                localStorage.setItem('avatar', newAvatar);
                localStorage.setItem('profileUpdated', Date.now());

                // Explicitly call updateProfile to reflect changes immediately
                updateProfile();

                alert('Profile updated successfully!');
            } else {
                alert('Please enter both a username and an avatar URL.');
            }
        });
    }
});
