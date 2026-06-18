const activities = {
  satMorning: [
    { id: 'hyde', title: 'Hyde Park croissants and dog walk', time: '9:00 – 11:00', ticketTime: '9:00', image: 'assets/hyde-park.jpg', desc: 'Ham and cheese croissants, autumn trees, and Franky having a cute little sniffari.', tags: ['dog', 'cute', 'local'] },
    { id: 'bed', title: 'Breakfast in bed', time: '9:00 – 11:00', ticketTime: '9:00', image: 'assets/breakfast-bed.jpg', desc: 'Coffee, juice, croissants, rose energy, and a slow romantic morning.', tags: ['home', 'romantic', 'slow'] },
    { id: 'dunsborough', title: 'Dunsborough overnight', time: 'Sat 9:00 – Sun 5:00', ticketTime: '9:00', image: 'assets/dunsborough.jpg', desc: 'Cute stay, coast, caves, rock formations, and a down-south sunset. Home Sunday by 5.', tags: ['overnight', 'coast', 'sunset'], blocks: ['satMain', 'sunAddon', 'sunMain'], includesSunset: true }
  ],
  satMain: [
    { id: 'friend', title: 'See Perth friend', time: '11:00 – 2:00', ticketTime: '11:00', image: 'assets/coffee-friend.jpg', desc: 'Has wiggle room for kisses, travel, gossip, and being cute.', tags: ['social', 'flexible', 'cute'] },
    { id: 'home', title: 'Home hangout, Franky park and chicken dish', time: '11:00 – 4:00', ticketTime: '11:00', image: 'assets/home-hangout.jpg', desc: 'Movie, make love, hang out, throw the ball for Franky down the park, and Mark makes some kind of chicken dish.', tags: ['home', 'dog', 'food'] },
    { id: 'perth-explore', title: 'Big Perth explore ending in sunset', time: '11:00 – 5:30', ticketTime: '11:00', image: 'assets/perth-sunset.jpg', desc: 'Kings Park, Fremantle, Cottesloe, Mark’s favourite place, and finish with the sunset. No Perth CBD in this one.', tags: ['Perth', 'beach', 'sunset'], includesSunset: true },
    { id: 'hills', title: 'Hills hike', time: '11:00 – 4:00', ticketTime: '11:00', image: 'assets/hills-hike.jpg', desc: 'Go to the hills for a peaceful hike and get back with room before sunset.', tags: ['nature', 'hike', 'peace'] },
    { id: 'dwellingup-day', title: 'Dwellingup day trip', time: '11:00 – 8:00', ticketTime: '11:00', image: 'assets/hills-hike.jpg', desc: 'Hiking, dinner at a winery or pub, and home by around 8 pm. This replaces the clear-sky Perth sunset.', tags: ['nature', 'dinner', 'replaces sunset'], replacesSunset: true },
    { id: 'dwellingup-night', title: 'Dwellingup overnight', time: 'Sat 11:00 – Sun 12:00', ticketTime: '11:00', image: 'assets/hills-hike.jpg', desc: 'Overnight in Dwellingup, play it by ear, home by midday Sunday.', tags: ['overnight', 'nature', 'flexible'], replacesSunset: true, blocks: ['sunAddon'] }
  ],
  sunAddon: [
    { id: 'curried-egg', title: 'Curried egg sandwich', time: '9:00 – 10:00', ticketTime: '9:00', image: 'assets/curried-egg.jpg', desc: 'Definitely a mini add-on. Cute, quick, and can sit before another Sunday choice.', tags: ['mini add-on', 'food'] },
    { id: 'skip-addon', title: 'Skip mini add-on', time: 'No add-on', ticketTime: '', desc: 'Keep Sunday morning open and go straight into the main plan.', tags: ['flexible'] }
  ],
  sunMain: [
    { id: 'sun-dwellingup', title: 'Dwellingup day trip', time: '9:00 – 5:00', ticketTime: '9:00', image: 'assets/hills-hike.jpg', desc: 'A full Sunday nature adventure before dinner.', tags: ['nature', 'full day'] },
    { id: 'just-be', title: 'Hang around the house and just be', time: '9:00 – 5:00', ticketTime: '9:00', image: 'assets/home-hangout.jpg', desc: 'Rest, cuddle, make food, watch something, or just be.', tags: ['home', 'warm'] },
    { id: 'freo', title: 'Fremantle: Mark’s Perth history tour', time: '4 hours', ticketTime: 'Flexible', image: 'assets/fremantle.jpg', desc: 'A personal Fremantle walk with Mark’s Perth memories and history.', tags: ['Freo', 'history'] },
    { id: 'cbd', title: 'CBD, art gallery, museum, sushi train and walk', time: '4 hours', ticketTime: 'Flexible', image: 'assets/perth-cbd.jpg', desc: 'City, culture, sushi train, and a walk around.', tags: ['city', 'culture', 'food'] },
    { id: 'river', title: 'River with Franky and warm afternoon', time: '10:00 – 5:00', ticketTime: '10:00', image: 'assets/river-walk.jpg', desc: 'River walk with Franky, then house/movie/rest energy for the afternoon.', tags: ['dog', 'river', 'movie'] },
    { id: 'beach', title: 'Beach walk then lunch', time: '10:00 – 2:00', ticketTime: '10:00', image: 'assets/beach-walk.jpg', desc: 'Fixed at 10 am because it will rain in the afternoon.', tags: ['beach', 'lunch', 'weather-aware'] }
  ],
  dinner: [
    { id: 'dumplings', title: 'Dumplings', time: '6:00 pm', ticketTime: '6:00', desc: 'Easy, tasty, casual.', tags: ['yum'] },
    { id: 'pho', title: 'Pho', time: '6:00 pm', ticketTime: '6:00', desc: 'Warm, comforting, rainy-weather friendly.', tags: ['warm'] },
    { id: 'mark-cooks', title: 'Mark cooks', time: '6:00 pm', ticketTime: '6:00', desc: 'Home, romantic, personal, cosy.', tags: ['home'] }
  ]
};

const defaults = { satMorning: null, satMain: null, sunAddon: 'skip-addon', sunMain: null, dinner: null };
let state = JSON.parse(localStorage.getItem('icm-plan') || 'null') || { ...defaults };

function byId(section, id) { return activities[section].find(a => a.id === id); }

function isBlocked(section) {
  const morning = byId('satMorning', state.satMorning);
  const main = byId('satMain', state.satMain);
  if (morning?.blocks?.includes(section)) return true;
  if (main?.blocks?.includes(section)) return true;
  return false;
}

function renderCards() {
  Object.keys(activities).forEach(section => {
    const el = document.querySelector(`[data-section="${section}"]`);
    el.innerHTML = '';
    activities[section].forEach(item => {
      const disabled = isBlocked(section) && section !== 'satMorning' && section !== 'dinner';
      const btn = document.createElement('button');
      btn.className = `option-card ${state[section] === item.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`;
      btn.type = 'button';
      btn.disabled = disabled;
      btn.innerHTML = `${item.image ? `<img src="${item.image}" alt="">` : ''}
        <div class="option-body">
          <span class="time-pill">${item.time}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <div class="tags">${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>`;
      btn.addEventListener('click', () => select(section, item.id));
      el.appendChild(btn);
    });
  });
  renderNotes();
}

function select(section, id) {
  state[section] = id;
  if (section === 'satMorning' && id === 'dunsborough') {
    state.satMain = null;
    state.sunAddon = 'skip-addon';
    state.sunMain = null;
  }
  if (section === 'satMain' && id === 'dwellingup-night') {
    state.sunAddon = 'skip-addon';
  }
  localStorage.setItem('icm-plan', JSON.stringify(state));
  render();
}

function row(item, fallbackTime) {
  if (!item) return '';
  return `<div class="ticket-row"><time>${item.ticketTime || fallbackTime || ''}</time><div><strong>${item.title}</strong><p>${item.desc}</p></div></div>`;
}

function renderTicket() {
  const sat = document.getElementById('sat-ticket');
  const sun = document.getElementById('sun-ticket');
  const warnings = document.getElementById('warnings');
  const sm = byId('satMorning', state.satMorning);
  const sa = byId('satMain', state.satMain);
  const add = byId('sunAddon', state.sunAddon);
  const su = byId('sunMain', state.sunMain);
  const dinner = byId('dinner', state.dinner);

  const warningList = [];
  if (sm?.id === 'dunsborough') warningList.push('Dunsborough overnight includes its own sunset and blocks most Sunday daytime options.');
  if (sa?.replacesSunset) warningList.push('This Saturday choice replaces the fixed clear-sky Perth sunset. Adventure sunset energy accepted.');
  if (sa?.id === 'dwellingup-night') warningList.push('Dwellingup overnight blocks Sunday morning. Sunday starts around midday.');
  warnings.innerHTML = warningList.map(w => `<div class="warning">${w}</div>`).join('');

  let satRows = '';
  satRows += sm ? row(sm) : placeholder('9:00', 'Choose Saturday morning');
  if (sm?.id !== 'dunsborough') {
    satRows += sa ? row(sa) : placeholder('11:00', 'Choose Saturday adventure');
    if (sa?.includesSunset) satRows += row({ ticketTime: '5:00', title: 'Sunset included', desc: 'The selected adventure ends with sunset.' });
    else if (sa?.replacesSunset) satRows += row({ ticketTime: '5:00', title: 'Sunset replaced', desc: 'The clear-sky Perth sunset is replaced by the adventure plan.' });
    else satRows += row({ ticketTime: '5:00', title: 'Watch the sun go down', desc: 'Fixed Saturday sunset from 5:00 pm to 5:30 pm.' });
  } else {
    satRows += row({ ticketTime: '5:00', title: 'Dunsborough sunset', desc: 'The Saturday sunset is folded into the overnight coast adventure.' });
  }
  sat.innerHTML = satRows;

  let sunRows = '';
  if (sm?.id === 'dunsborough') {
    sunRows += row({ ticketTime: 'Day', title: 'Dunsborough coast day', desc: 'Coast, caves, rock formations, and home by 5:00 pm.' });
  } else if (sa?.id === 'dwellingup-night') {
    sunRows += row({ ticketTime: '12:00', title: 'Back from Dwellingup', desc: 'Sunday starts around midday. Choose a softer afternoon main plan.' });
    sunRows += su ? row(su) : placeholder('Afternoon', 'Choose Sunday afternoon plan');
  } else {
    if (add && add.id !== 'skip-addon') sunRows += row(add);
    sunRows += su ? row(su) : placeholder(add?.id === 'curried-egg' ? '10:00' : '9:00', 'Choose Sunday main plan');
  }
  sunRows += dinner ? row(dinner) : placeholder('6:00', 'Choose Sunday dinner');
  sun.innerHTML = sunRows;
}

function placeholder(time, text) {
  return `<div class="ticket-row soft"><time>${time}</time><div><strong>${text}</strong><p>Pick one card in this section.</p></div></div>`;
}

function renderNotes() {
  document.getElementById('sat-main-note').textContent = isBlocked('satMain') ? 'Blocked because Dunsborough overnight is selected.' : 'Choose one card for the 11:00 am section.';
  if (isBlocked('sunMain')) document.getElementById('sun-main-note').textContent = 'Blocked because Dunsborough overnight is selected.';
  else if (byId('satMain', state.satMain)?.id === 'dwellingup-night') document.getElementById('sun-main-note').textContent = 'Sunday starts around midday because Dwellingup overnight was chosen.';
  else document.getElementById('sun-main-note').textContent = 'Choose one Sunday main plan. Beach walk is fixed at 10:00 am because of afternoon rain.';
}

function render() { renderCards(); renderTicket(); }

document.getElementById('resetBtn').addEventListener('click', () => {
  state = { ...defaults };
  localStorage.removeItem('icm-plan');
  render();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}
render();
