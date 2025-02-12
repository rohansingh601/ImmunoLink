// Menu functionality
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const logoText = document.querySelector('.logo-text');

// Define observer options
const options = {
    root: null,
    threshold: 0.5,
};

// Callback function for Intersection Observer
const observerCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'hero') {
                hamMenu.classList.add('light');
                hamMenu.classList.remove('dark');
                logoText.classList.add('light');
                logoText.classList.remove('dark');
            } else if (entry.target.id === 'content') {
                hamMenu.classList.add('dark');
                hamMenu.classList.remove('light');
                logoText.classList.add('dark');
                logoText.classList.remove('light');
            } else if (entry.target.id == 'about') {
                hamMenu.classList.add('light');
                hamMenu.classList.remove('dark');
                logoText.classList.add('light');
                logoText.classList.remove('dark');
            } else if (entry.target.id == 'services') {
                hamMenu.classList.add('dark');
                hamMenu.classList.remove('light');
                logoText.classList.add('dark');
                logoText.classList.remove('light');
            }
        }
    });
};

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// Smooth scroll for section navigation (optional)
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu navigation
document.querySelectorAll('.menu-list a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const page = this.getAttribute('href');
        window.location.href = page;
    });
});

// Predefined options from original code
const predefinedOptions = [
    "Your Profile",
    "Journal",
    "Book a Consultation",
    "Chat with AI",
    "Community Support",
    "About",
    "Services",
    "Symptoms"
];

function showSuggestions(value) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = "";

    if (value) {
        const filteredOptions = predefinedOptions.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );

        filteredOptions.forEach(option => {
            const listItem = document.createElement("li");
            listItem.textContent = option;
            listItem.onclick = () => {
                document.getElementById("name").value = option;
                suggestionsList.innerHTML = "";
            };
            suggestionsList.appendChild(listItem);
        });
    }
}

// Updated condition data with new autoimmune conditions
const conditionData = {
    'rheumatoid-arthritis': {
        symptoms: [
            'Joint pain/aching',
            'Joint swelling/warmth/redness',
            'Morning stiffness',
            'Bumps over small joints',
            'Fatigue',
            'High temperature',
            'Loss of appetite',
            'Weight loss',
            'Dry eyes',
            'Itching eyes',
            'Numbness/tingling in extremities',
            'Chest pain',
            'Sleep difficulties'
        ],
        triggers: {
            environmental: [
                'Pollution',
                'UV radiation',
                'Toxins',
                'Heavy metals'
            ],
            dietary: [
                'Gluten',
                'Dairy',
                'Processed foods',
                'Sugar',
                'Alcohol',
                'Nightshade vegetables',
                'Refined oils'
            ],
            physical: [
                'Physical stress',
                'Infections',
                'Hormonal changes',
                'Medication side-effects'
            ],
            emotional: [
                'Stress',
                'Work pressure',
                'Relationship issues',
                'Financial stress',
                'Burnout'
            ],
            lifestyle: [
                'Poor sleep',
                'Physical inactivity',
                'Overtraining',
                'Poor work-life balance'
            ]
        }
    },
    'psoriasis': {
        symptoms: [
            'Red patches with silvery scales',
            'Dry/cracked/bleeding skin',
            'Thick/ridged/pitted nails',
            'Pus-filled skin bumps',
            'Scalp dandruff',
            'Poor sleep quality',
            'Joint pain',
            'Joint stiffness',
            'Neck/back pain',
            'Dry eyes',
            'Eye inflammation',
            'Fatigue'
        ],
        triggers: {
            environmental: [
                'UV radiation',
                'Climate changes',
                'Skin injury',
                'Infections'
            ],
            dietary: [
                'Alcohol',
                'Processed foods',
                'Inflammatory foods',
                'Gluten',
                'Dairy'
            ],
            physical: [
                'Skin trauma',
                'Infections',
                'Hormonal changes',
                'Medications'
            ],
            emotional: [
                'Stress',
                'Anxiety',
                'Depression',
                'Emotional trauma'
            ],
            lifestyle: [
                'Poor sleep',
                'Lack of exercise',
                'Smoking',
                'Obesity'
            ]
        }
    },
    'ibd': {
        symptoms: [
            'Abdominal pain',
            'Diarrhea',
            'Bloody diarrhea',
            'Urgent bowel movements',
            'Rectal bleeding',
            'Nausea/vomiting',
            'Weight loss',
            'Fatigue',
            'Fever',
            'Anemia',
            'Anxiety',
            'Depression',
            'Dry eyes',
            'Eye inflammation',
            'Joint pain'
        ],
        triggers: {
            environmental: [
                'Food contamination',
                'Infections',
                'Medications'
            ],
            dietary: [
                'Dairy',
                'Gluten',
                'Spicy foods',
                'High-fiber foods',
                'Alcohol',
                'Caffeine'
            ],
            physical: [
                'Infections',
                'Hormonal changes',
                'Medication side-effects',
                'Physical stress'
            ],
            emotional: [
                'Stress',
                'Anxiety',
                'Depression',
                'Emotional trauma'
            ],
            lifestyle: [
                'Poor sleep',
                'Irregular eating',
                'Smoking',
                'Lack of exercise'
            ]
        }
    }
};

// DOM Elements for tracker
const conditionSelect = document.getElementById('condition-select');
const trackingSection = document.getElementById('tracking-section');
const symptomsContainer = document.getElementById('symptoms');
const triggersContainer = document.getElementById('triggers');
const saveButton = document.getElementById('save-entry');
const viewHistoryButton = document.getElementById('view-history');
const historyOverlay = document.getElementById('history-overlay');
const closeHistoryButton = document.getElementById('close-history');
const historyEntries = document.getElementById('history-entries');

// Event Listeners for tracker
conditionSelect.addEventListener('change', handleConditionSelect);
saveButton.addEventListener('click', saveEntry);
viewHistoryButton.addEventListener('click', showHistory);
closeHistoryButton.addEventListener('click', () => historyOverlay.classList.add('hidden'));

function handleConditionSelect() {
    const condition = conditionSelect.value;
    if (!condition) {
        trackingSection.classList.add('hidden');
        return;
    }

    const { symptoms, triggers } = conditionData[condition];
    
    // Create checkboxes for symptoms
    symptomsContainer.innerHTML = symptoms.map(symptom => `
        <label>
            <input type="checkbox" name="symptom" value="${symptom}">
            ${symptom}
        </label>
    `).join('');

    // Create checkboxes for triggers, organized by category
    triggersContainer.innerHTML = Object.entries(triggers).map(([category, categoryTriggers]) => `
        <div class="trigger-category">
            <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            ${categoryTriggers.map(trigger => `
                <label>
                    <input type="checkbox" name="trigger" value="${trigger}">
                    ${trigger}
                </label>
            `).join('')}
        </div>
    `).join('');

    // Show and animate the tracking section
    trackingSection.classList.remove('hidden');
    setTimeout(() => trackingSection.classList.add('visible'), 50);
}

function saveEntry() {
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked'))
        .map(checkbox => checkbox.value);
    
    const selectedTriggers = Array.from(document.querySelectorAll('input[name="trigger"]:checked'))
        .map(checkbox => checkbox.value);

    if (selectedSymptoms.length === 0 && selectedTriggers.length === 0) {
        alert('Please select at least one symptom or trigger.');
        return;
    }

    const entry = {
        date: new Date().toLocaleString(),
        condition: conditionSelect.value,
        symptoms: selectedSymptoms,
        triggers: selectedTriggers
    };

    // Get existing entries or initialize empty array
    const entries = JSON.parse(localStorage.getItem('healthEntries') || '[]');
    entries.unshift(entry); // Add new entry to the beginning
    localStorage.setItem('healthEntries', JSON.stringify(entries));

    // Reset form
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    alert('Entry saved successfully!');
}

function showHistory() {
    const entries = JSON.parse(localStorage.getItem('healthEntries') || '[]');
    
    historyEntries.innerHTML = entries.length ? entries.map(entry => `
        <div class="history-entry">
            <strong>Date:</strong> ${entry.date}<br>
            <strong>Condition:</strong> ${entry.condition}<br>
            <strong>Symptoms:</strong> ${entry.symptoms.join(', ') || 'None'}<br>
            <strong>Triggers:</strong> ${entry.triggers.join(', ') || 'None'}
        </div>
    `).join('') : '<p>No entries found.</p>';

    historyOverlay.classList.remove('hidden');
}

// Create Intersection Observer
const observer = new IntersectionObserver(observerCallback, options);

// Observe sections if they exist
const sections = ['hero', 'content', 'about', 'services'];
sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
        observer.observe(section);
    }
});