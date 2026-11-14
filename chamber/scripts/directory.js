// Directory page: load members from JSON and let the user switch views
const membersUrl = 'data/members.json';
const membersContainer = document.querySelector('#members');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

const membershipLevels = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
};

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Could not load members:', error);
        membersContainer.innerHTML = '<p class="error">Sorry, the member directory could not be loaded. Please try again later.</p>';
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        const levelName = membershipLevels[member.membershipLevel] || 'Member';

        const logo = document.createElement('img');
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.width = 300;
        logo.height = 200;
        logo.loading = 'lazy';

        const name = document.createElement('h2');
        name.textContent = member.name;

        const level = document.createElement('p');
        level.classList.add('level', `level-${levelName.toLowerCase()}`);
        level.textContent = levelName;

        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = member.description;

        const address = document.createElement('p');
        address.classList.add('address');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.classList.add('phone');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${member.phone.replace(/\s/g, '')}`;
        phoneLink.textContent = member.phone;
        phone.appendChild(phoneLink);

        const website = document.createElement('p');
        website.classList.add('website');
        const websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener';
        websiteLink.textContent = member.website.replace('https://www.', '');
        websiteLink.setAttribute('aria-label', `Visit the ${member.name} website`);
        website.appendChild(websiteLink);

        card.append(logo, name, level, description, address, phone, website);
        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const isGrid = view === 'grid';
    membersContainer.classList.toggle('grid', isGrid);
    membersContainer.classList.toggle('list', !isGrid);
    gridButton.classList.toggle('selected', isGrid);
    listButton.classList.toggle('selected', !isGrid);
    gridButton.setAttribute('aria-pressed', isGrid);
    listButton.setAttribute('aria-pressed', !isGrid);
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMembers();
