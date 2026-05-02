// Navigation scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage ||
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(13,31,45,0.97)';
        navLinks.style.padding = '1rem 2rem 2rem';
        navLinks.style.gap = '1.2rem';
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card, .team-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Range input live value display
const rangeInput = document.querySelector('input[type="range"]');
if (rangeInput) {
    const display = document.getElementById('level-value');
    rangeInput.addEventListener('input', () => {
        const labels = ['Débutant', 'Initié', 'Intermédiaire', 'Avancé', 'Expert'];
        if (display) display.textContent = labels[rangeInput.value - 1] || rangeInput.value;
    });
}

// Form validation feedback
const form = document.querySelector('.contact-form form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        btn.textContent = '✓ Message envoyé !';
        btn.style.background = '#2E8B8B';
        setTimeout(() => {
            btn.textContent = 'Envoyer ma demande';
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// Initialize nationality full collection
document.addEventListener('DOMContentLoaded', () => {
    const listPays = [
        "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée équatoriale", "Guinée-Bissau", "Guyana", "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal", "Qatar", "République centrafricaine", "République démocratique du Congo", "République dominicaine", "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Kitts-et-Nevis", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Sainte-Lucie", "Salvador", "Samoa", "São Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", "Tadjikistan", "Tanzanie", "Tchad", "Tchéquie", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Viêt Nam", "Yémen", "Zambie", "Zimbabwe"
    ];

    const select = document.getElementById('nationalite');
    if (select) {
        listPays.forEach(pays => {
            const option = document.createElement('option');
            option.value = pays.toLowerCase();
            option.textContent = pays;
            select.appendChild(option);
        });
        const autreOption = document.createElement('option');
        autreOption.value = 'other';
        autreOption.textContent = 'Autre';
        select.appendChild(autreOption);

        const errorMsg = document.getElementById('nationalite-error');
        const autreGroup = document.getElementById('autre-nationalite-group');

        function validateSelect() {
            if (select.value === '') {
                errorMsg.style.display = 'block';
                select.style.borderColor = '#e74c3c';
            } else {
                errorMsg.style.display = 'none';
                select.style.borderColor = '';
            }
        }

        select.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                autreGroup.style.display = 'block';
            } else {
                autreGroup.style.display = 'none';
            }
            validateSelect();
        });

        select.addEventListener('blur', validateSelect);

        const form = select.closest('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                if (select.value === '') {
                    e.preventDefault();
                    validateSelect();
                }
            });
        }
    }
});

// Dynamic validation logic for contact form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.setAttribute('novalidate', 'true');

        const nationaliteSelect = document.getElementById('nationalite');
        const autreInput = document.getElementById('autre-nationalite');

        if (nationaliteSelect && autreInput) {
            nationaliteSelect.addEventListener('change', (e) => {
                if (e.target.value === 'other') {
                    autreInput.setAttribute('required', 'true');
                } else {
                    autreInput.removeAttribute('required');
                }
            });
        }

        form.addEventListener('submit', (e) => {
            let isValid = true;
            const requiredElements = form.querySelectorAll('[required]');

            requiredElements.forEach(el => {
                // Skips hidden elements unless they are the checkbox
                if (el.offsetParent === null && el.type !== 'checkbox') return;

                let isElValid = true;
                if (el.type === 'checkbox') {
                    isElValid = el.checked;
                } else {
                    isElValid = el.value.trim() !== '';
                }

                let errorMsg = el.parentNode.querySelector('.auto-error');

                if (!isElValid) {
                    isValid = false;

                    // Match theme (red border, no bg)
                    if (el.type !== 'checkbox') {
                        el.style.borderColor = '#ff6b6b';
                    }

                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'auto-error';
                        errorMsg.style.color = '#ff6b6b';
                        errorMsg.style.fontSize = '0.9rem';

                        if (el.type === 'checkbox') {
                            errorMsg.style.display = 'inline';
                            errorMsg.style.marginLeft = '8px';
                        } else {
                            errorMsg.style.marginTop = '8px';
                        }

                        // Custom messages based on ID
                        if (el.id === 'nom' || el.id === 'prenom') {
                            errorMsg.textContent = `Veuillez saisir votre ${el.id}.`;
                        } else if (el.id === 'email') {
                            errorMsg.textContent = 'Adresse e-mail invalide.';
                        } else if (el.id === 'tel') {
                            errorMsg.textContent = 'Ce champ est requis.';
                        } else if (el.id === 'dob') {
                            errorMsg.textContent = 'Veuillez saisir votre date de naissance.';
                        } else if (el.id === 'nationalite') {
                            errorMsg.textContent = 'Veuillez sélectionner votre pays.';
                        } else {
                            errorMsg.textContent = 'Ce champ est requis.';
                        }

                        el.parentNode.appendChild(errorMsg);
                    }
                } else {
                    if (el.type !== 'checkbox') {
                        el.style.borderColor = '';
                    }
                    if (errorMsg) errorMsg.remove();
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        form.addEventListener('input', (e) => {
            const el = e.target;
            if (el.hasAttribute('required')) {
                if (el.type !== 'checkbox') {
                    el.style.borderColor = '';
                }
                const errorMsg = el.parentNode.querySelector('.auto-error');
                if (errorMsg) errorMsg.remove();
            }
        });
    }
});
