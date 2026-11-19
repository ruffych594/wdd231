// Company spotlights: 2–3 random gold or silver members from members.json
const container = document.querySelector("#spotlight-container");
const MEMBERS_URL = "data/members.json";

// Works whether membership is stored as a number (3 = gold, 2 = silver) or as text
const levelName = (level) =>
  ({ 3: "Gold", 2: "Silver", 1: "Member" }[level] || String(level));

async function getSpotlights() {
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) throw new Error("Could not load members");
    const data = await response.json();
    const members = Array.isArray(data) ? data : data.members;

    const qualified = members.filter((m) =>
      ["Gold", "Silver"].includes(levelName(m.membershipLevel))
    );

    const count = Math.random() < 0.5 ? 2 : 3;
    displaySpotlights(shuffle(qualified).slice(0, count));
  } catch (error) {
    container.textContent = "Member spotlights are unavailable right now.";
    console.error(error);
  }
}

// Fisher–Yates shuffle for a fair random pick on every page load
function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function displaySpotlights(members) {
  container.innerHTML = "";
  members.forEach((m) => {
    const level = levelName(m.membershipLevel);
    const card = document.createElement("article");
    card.className = "spotlight";
    card.innerHTML = `
      <h3>${m.name}</h3>
      <img src="images/${m.image}" alt="${m.name} logo" width="100" height="100" loading="lazy">
      <p>${m.address}</p>
      <p><a href="tel:${m.phone.replace(/\s/g, "")}">${m.phone}</a></p>
      <p><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></p>
      <span class="badge ${level.toLowerCase()}">${level} Member</span>
    `;
    container.appendChild(card);
  });
}

getSpotlights();
