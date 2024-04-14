document.addEventListener('DOMContentLoaded', function () {
    console.log("Document ready!");

    const settingsWheel = document.querySelector('.settings-wheel .gear-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    function toggleDropdown() {
        dropdownMenu.classList.toggle('active');
    }

    if(settingsWheel) {
        settingsWheel.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDropdown();
        });
    } else {
        console.log("Settings wheel not found");
    }

    const toggle = document.getElementById('darkModeToggle');
    toggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked ? 'enabled' : 'disabled');
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        toggle.checked = true;
        document.body.classList.add('dark-mode');
    } else {
        toggle.checked = false;
        document.body.classList.remove('dark-mode');
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('lastPage', this.getAttribute('href'));
            showSection(this.getAttribute('href'));
        });
    });

    const lastPage = localStorage.getItem('lastPage') || '#whoami';
    showSection(lastPage);
});

function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown-menu');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
    console.log("Dropdown display style changed to:", dropdown.style.display);
}

function clearLocalStorage() {
    const currentSectionId = document.querySelector('.content[style*="display: block"]').getAttribute('id');
    
    localStorage.clear();

    document.getElementById('darkModeToggle').checked = false;
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');

    if (currentSectionId) {
        showSection('#' + currentSectionId);
    }
}

function showSection(id) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const section = document.querySelector(id);
    if (section) {
        section.style.display = 'block';
    }
}