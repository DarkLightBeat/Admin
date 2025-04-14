document.addEventListener('DOMContentLoaded', function () {
    updateProfile(); // Ensure the profile is updated when the page loads

    // Listen for changes to localStorage
    window.addEventListener('storage', function (event) {
        if (event.key === 'profileUpdated') {
            updateProfile(); // Update the profile when changes are detected
        }
    });

    const questionsContainer = document.getElementById('questions-container');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const form = document.getElementById('google-like-form');
    const programSelect = document.getElementById('program-select');
    const requirementsContainer = document.getElementById('requirements-container');
    const submitButton = document.getElementById('submit-form-btn');

    let questionCount = 0;

    // Add a new question
    addQuestionBtn.addEventListener('click', function () {
        questionCount++;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('form-group');
        questionDiv.innerHTML = `
            <label for="question-${questionCount}">Question ${questionCount}</label>
            <input type="text" id="question-${questionCount}" placeholder="Enter your question">
            <select id="question-type-${questionCount}">
                <option value="text">Short Answer</option>
                <option value="textarea">Paragraph</option>
                <option value="multiple-choice">Multiple Choice</option>
            </select>
            <div id="options-container-${questionCount}" class="options-container"></div>
            <button type="button" class="add-option-btn" data-question="${questionCount}">Add Option</button>
        `;
        questionsContainer.appendChild(questionDiv);

        // Add event listener for adding options
        questionDiv.querySelector('.add-option-btn').addEventListener('click', function () {
            const questionId = this.getAttribute('data-question');
            const optionsContainer = document.getElementById(`options-container-${questionId}`);
            const optionInput = document.createElement('input');
            optionInput.type = 'text';
            optionInput.placeholder = 'Enter option';
            optionsContainer.appendChild(optionInput);
        });
    });

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData.entries()));
        alert('Form submitted successfully!');
    });

    const programRequirements = {
        slp: {
            eligibility: [
                "Must be a Filipino citizen from poor, marginalized, vulnerable and/or disadvantaged households, identified by the National Household Targeting System for Poverty Reduction (NHTS-PR), prioritizing 4Ps participants.",
                "MD Track participants must be at least sixteen (16) years old to participate with legal consent from parents or guardians, while EF track participants must be at least eighteen (18) years old upon employment.",
                "Each household can enroll a maximum of two (2) members pursuing two different tracks."
            ],
            documents: [
                "Attendance in SLP orientation sessions",
                "SLPA Membership for MD participants",
                "Certificate of Eligibility from DSWD Regional Program Coordinator",
                "SLPA Constitution and By-laws (for MD applicants)",
                "Signed Modality Application Forms for the desired livelihood track"
            ]
        },
        lingap: {
            eligibility: [
                "Filipino citizen classified as low-income and working in the informal economy by the DSWD Listahan.",
                "Currently a patient of or visiting one of the partnered hospitals.",
                "People who are judged to be in dire straits by social workers.",
                "Workers in the government, whether permanent or temporary staff.",
                "Those who stand to gain from soldiers’ and policemen’s deaths and injuries on the job."
            ],
            documents: [
                "Patient’s official identification (Government-issued ID)",
                "Representative’s government-issued photo identification and a written authorization signed by the patient (if applicable).",
                "Prescriptions for the last three (3) months for all medications, duly signed by the attending physician.",
                "Documentation of financial hardship, such as Barangay Certificate of Indigency or Certification from the medical social service of a certain hospital."
            ]
        },
        medical: {
            eligibility: [
                "Facing cancer or any other prolonged health condition.",
                "Mental health conditions like bipolar disorder, major depressive disorder, or schizophrenia.",
                "Persons with disabilities (PWD) encountering challenges in accessing fundamental services.",
                "Those affected by natural calamities such as floods, earthquakes, typhoons, and landslides."
            ],
            documents: [
                "Original Medical Abstract/Medical Certificate",
                "Photocopy of Prescription (same date as check-up, not fully served)",
                "Photocopy of Laboratory Request (latest)",
                "1 valid ID (2 photocopies, back-to-back)",
                "Original authorization letter + ID photocopy",
                "Original Final Bill (if discharged) / Progress Bill (if still in)",
                "Original Certificate of Outstanding Balance",
                "Original Promissory Note",
                "Original Social Case Study – MSWD/CSWD (if applicable)"
            ]
        }
    };

    programSelect.addEventListener('change', function () {
        const selectedProgram = programSelect.value;
        requirementsContainer.innerHTML = ''; // Clear previous requirements

        if (selectedProgram && programRequirements[selectedProgram]) {
            const { eligibility, documents } = programRequirements[selectedProgram];

            const eligibilityList = document.createElement('ul');
            eligibilityList.innerHTML = `<h3>Eligibility Requirements:</h3>`;
            eligibility.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                eligibilityList.appendChild(li);
            });

            const documentsList = document.createElement('ul');
            documentsList.innerHTML = `<h3>Documentary Requirements:</h3>`;
            documents.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                documentsList.appendChild(li);
            });

            requirementsContainer.appendChild(eligibilityList);
            requirementsContainer.appendChild(documentsList);

            submitButton.disabled = false; // Enable the submit button
        } else {
            submitButton.disabled = true; // Disable the submit button if no program is selected
        }
    });

    // Function to update the profile
    function updateProfile() {
        const avatarDisplay = document.getElementById('avatarDisplay');
        const usernameDisplay = document.getElementById('usernameDisplay');
        const welcomeUsername = document.getElementById('welcomeUsername');
        const defaultUsername = 'username';
        const defaultAvatar = '../assets/Profile_Default.png';

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