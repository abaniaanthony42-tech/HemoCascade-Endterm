const STORAGE_KEYS = {
  users: 'hemoCascadeUsers',
  session: 'hemoCascadeSession',
  theme: 'hemoCascadeTheme',
  bookmarks: 'hemoCascadeBookmarks',
  lastSection: 'hemoCascadeLastSection',
};

const geneticCode = {
  'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
  'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
  'UAU': 'Tyr', 'UAC': 'Tyr', 'UAA': 'Stop', 'UAG': 'Stop',
  'UGU': 'Cys', 'UGC': 'Cys', 'UGA': 'Stop', 'UGG': 'Trp',
  'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
  'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
  'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
  'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
  'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met',
  'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
  'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
  'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
  'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
  'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
  'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
  'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly',
};

const stages = [
  { id: 1, title: 'DNA', subtitle: 'HBB Gene', section: 'section-4', palette: '#1D3557', detail: 'The HBB gene on chromosome 11 stores the normal beta-globin blueprint in the host genome, but malaria is not caused by a host DNA mutation.' },
  { id: 2, title: 'Transcription', subtitle: 'RNA polymerase', section: 'section-8', palette: '#2A9D8F', detail: 'RNA polymerase reads the template strand 3′→5′ and creates a complementary mRNA in the 5′→3′ direction.' },
  { id: 3, title: 'mRNA', subtitle: '5′→3′ transcript', section: 'section-8', palette: '#2A9D8F', detail: 'The transcript carries the coding message from gene to ribosome as a sequence of codons.' },
  { id: 4, title: 'Translation', subtitle: 'Ribosome', section: 'section-8', palette: '#E63946', detail: 'The ribosome decodes the codons into the amino acid chain that forms functional hemoglobin.' },
  { id: 5, title: 'Functional HbA', subtitle: 'Protein', section: 'section-5', palette: '#E63946', detail: 'The completed, correctly folded hemoglobin protein delivers oxygen and remains the host cell’s oxygen-carrying machinery.' },
  { id: 6, title: 'Parasite Invasion', subtitle: 'Entry event', section: 'section-1', palette: '#6A4C93', detail: 'The parasite invades the red blood cell and begins its life cycle within the cytoplasm.' },
  { id: 7, title: 'Cytostome', subtitle: 'Endocytosis', section: 'section-2', palette: '#6A4C93', detail: 'The parasite ingests host cytoplasm through the cytostome, delivering it to the digestive vacuole.' },
  { id: 8, title: 'Protease Cascade', subtitle: 'Digestion', section: 'section-7', palette: '#E76F51', detail: 'A series of proteases cuts hemoglobin into peptides and amino acids in the acidic digestive vacuole.' },
  { id: 9, title: 'Heme Fates', subtitle: 'Hemozoin vs ROS', section: 'section-2', palette: '#BC4749', detail: 'Most heme is detoxified into hemozoin, while the remaining fraction drives oxidative stress and hemolysis.' },
  { id: 10, title: 'Cytoplasmic Dysfunction', subtitle: 'Cell damage', section: 'section-6', palette: '#BC4749', detail: 'As the cell loses function and is destroyed, anemia and systemic illness progress.' },
  { id: 11, title: 'Malaria Disease', subtitle: 'Symptoms', section: 'section-6', palette: '#6A040F', detail: 'Fever, chills, anemia, cerebral complications, and respiratory distress reflect the invade-digest-rupture cycle.' },
];

const quizQuestions = [
  {
    question: 'What does "malaria" literally mean, and which language is it from?',
    options: ['"Bad air" – Italian', '"Red blood" – Latin', '"Fever cycle" – Greek', '"Hidden parasite" – French'],
    correct: 0,
    rationale: 'The name comes from the Italian mala aria, meaning “bad air.”',
  },
  {
    question: 'Who first identified the Plasmodium parasite in human blood, and when?',
    options: ['Ronald Ross, 1897', 'Charles Louis Alphonse Laveran, 1880', 'G. B. Grassi, 1898', 'Patrick Manson, 1877'],
    correct: 1,
    rationale: 'Charles Louis Alphonse Laveran identified the parasite in 1880.',
  },
  {
    question: 'Which compartment of the red blood cell does malaria primarily affect?',
    options: ['Nucleus', 'Mitochondria', 'Cytoplasm', 'Golgi apparatus'],
    correct: 2,
    rationale: 'Malaria affects the red blood cell cytoplasm, where hemoglobin is concentrated.',
  },
  {
    question: 'Why does P. falciparum NOT cause a classic DNA mutation in its host?',
    options: ['It only infects plants', 'Mature RBCs have no nucleus or DNA left to alter', 'The parasite repairs DNA damage', 'Hemoglobin resists all proteases'],
    correct: 1,
    rationale: 'A mature erythrocyte has already expelled its nucleus and DNA before infection begins.',
  },
  {
    question: 'Which protein does P. falciparum use as its primary food source in the RBC?',
    options: ['Collagen', 'Hemoglobin', 'Insulin', 'Actin'],
    correct: 1,
    rationale: 'Hemoglobin is the parasite’s primary nutrient source in the host cytoplasm.',
  },
  {
    question: 'What happens to most of the free heme released during digestion?',
    options: ['Excreted unchanged', 'Converted to hemozoin via HDP', 'Kills the parasite instantly', 'Reactivates HBB'],
    correct: 1,
    rationale: 'Most heme is detoxified into hemozoin, while the rest drives oxidative damage.',
  },
  {
    question: 'Which enzyme makes the first cut in hemoglobin digestion, and where?',
    options: ['Falcipain, beta-globin N-terminus', 'Plasmepsin I, alpha-globin Phe33–Leu34', 'DPAP1, heme pocket', 'Falcilysin, C-terminus'],
    correct: 1,
    rationale: 'Plasmepsin I makes the first cut at the alpha-globin hinge (Phe33–Leu34).',
  },
];

const authScreen = document.getElementById('auth-screen');
const appShell = document.getElementById('app-shell');
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const fullNameField = document.getElementById('fullNameField');
const fullNameInput = document.getElementById('fullName');
const authSubmit = document.getElementById('auth-submit');
const authMessage = document.getElementById('auth-message');
const guestLoginBtn = document.getElementById('guest-login');
const authTabs = document.querySelectorAll('.auth-tab');
const navLinks = document.querySelectorAll('.nav-link');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const paperSearch = document.getElementById('paper-search');
const themeToggle = document.getElementById('theme-toggle');
const currentSectionLabel = document.getElementById('current-section-label');
const progressFill = document.getElementById('progress-fill');
const navProgressValue = document.getElementById('nav-progress-value');
const citationBtn = document.getElementById('citation-btn');
const quizContainer = document.getElementById('quiz-container');
const dnaInput = document.getElementById('dna-input');
const templateOutput = document.getElementById('template-strand');
const mrnaOutput = document.getElementById('mrna-strand');
const codonList = document.getElementById('codon-list');
const aaSequence = document.getElementById('aa-sequence');
const speedControl = document.getElementById('speed-control');
const musicToggle = document.getElementById('music-toggle');
const musicSelect = document.getElementById('music-select');
const musicVolume = document.getElementById('music-volume');

const musicPresets = {
  ambient: { notes: [261.63, 329.63, 392.0, 349.23, 440.0, 392.0, 523.25], interval: 620, wave: 'sine' },
  neon: { notes: [293.66, 349.23, 440.0, 493.88, 587.33, 493.88, 440.0], interval: 360, wave: 'triangle' },
  calm: { notes: [196.0, 246.94, 293.66, 329.63, 293.66, 246.94, 220.0], interval: 800, wave: 'sine' },
};

const rotatingFacts = [
  'The parasite consumes host hemoglobin after invading the erythrocyte, not by changing the host genome.',
  'HBB encodes beta-globin, the protein that is functionally central to oxygen transport and parasite nutrition.',
  'Most heme released during digestion is detoxified into hemozoin, which limits free radical damage but still contributes to pathology.',
  'Rupture of infected erythrocytes drives fever and anemia, linking molecular digestion to major clinical symptoms.',
  'The central dogma explains why the disease is caused by parasite activity rather than a mutation in the host DNA.'
];

let musicAudioContext = null;
let musicGainNode = null;
let musicIntervalId = null;
let activeMusicOscillators = [];
let musicEnabled = false;
let currentMusicPreset = 'ambient';

let authMode = 'signin';
let currentStage = 0;
let cascadeTimer = null;
let quizSubmitted = false;
let profile = null;

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];
  } catch {
    return [];
  }
}

function setUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.session));
  } catch {
    return null;
  }
}

function setSession(session) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
}

function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.bookmarks)) || [];
  } catch {
    return [];
  }
}

function setBookmarks(bookmarks) {
  localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
}

function getLastSection() {
  return localStorage.getItem(STORAGE_KEYS.lastSection) || 'overview';
}

function setLastSection(section) {
  localStorage.setItem(STORAGE_KEYS.lastSection, section);
}

function readTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
}

function applyTheme(theme) {
  document.body.classList.toggle('light-mode', theme === 'light');
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function updateProfileState() {
  const savedSession = getSession();
  const activeProfile = savedSession || profile || { name: 'Guest Evaluator', score: 0, bookmarks: [], lastSection: 'overview' };
  const fullName = activeProfile.name || 'Guest Evaluator';
  const score = Number(activeProfile.score || 0);
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'GE';

  document.getElementById('sidebar-user-name').textContent = fullName;
  document.getElementById('sidebar-score').textContent = `Quiz score: ${score}/7`;
  document.getElementById('profile-name')?.remove();

  const headerName = document.getElementById('header-user-name');
  const headerScore = document.getElementById('header-score');
  const sidebarAvatar = document.getElementById('sidebar-avatar');
  const headerAvatar = document.getElementById('header-avatar');

  headerName.textContent = fullName;
  headerScore.textContent = `Quiz: ${score}/7`;
  sidebarAvatar.textContent = initials;
  headerAvatar.textContent = initials;

  if (fullName === 'Guest Evaluator') {
    document.getElementById('header-score').textContent = 'Quiz: 0/7';
  }

  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  const savedBookmarks = getBookmarks();
  bookmarkButtons.forEach((button) => {
    const bookmarkId = button.dataset.bookmark;
    const active = savedBookmarks.includes(bookmarkId);
    button.classList.toggle('active', active);
    button.textContent = active ? '★' : '☆';
  });
}

function showAuth() {
  authScreen.classList.remove('hidden');
  appShell.classList.add('hidden');
}

function showDashboard() {
  authScreen.classList.add('hidden');
  appShell.classList.remove('hidden');
}

function setAuthMode(mode) {
  authMode = mode;
  authTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.authTab === mode);
  });
  const showNameField = mode === 'signup';
  fullNameField.classList.toggle('hidden', !showNameField);
  fullNameInput.required = showNameField;
  authSubmit.textContent = showNameField ? 'Create Account' : 'Sign In';
}

function addMessage(message, type = '') {
  authMessage.textContent = message;
  authMessage.className = `auth-message${type ? ` ${type}` : ''}`;
}

function normalizeEmail(value) {
  return String(value).trim().toLowerCase();
}

function validateAuthForm() {
  const email = normalizeEmail(emailInput.value);
  const password = passwordInput.value.trim();

  if (!email || !password) {
    return 'Email and password are required.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Please enter a valid email address.';
  }

  if (authMode === 'signup') {
    const fullName = fullNameInput.value.trim();
    if (!fullName) {
      return 'Please enter your full name.';
    }
  }

  return null;
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const validationError = validateAuthForm();
  if (validationError) {
    addMessage(validationError, 'error');
    return;
  }

  const email = normalizeEmail(emailInput.value);
  const password = passwordInput.value.trim();
  const users = getUsers();

  if (authMode === 'signup') {
    const existing = users.find((user) => user.email === email);
    if (existing) {
      addMessage('An account with this email already exists. Please sign in.', 'error');
      return;
    }

    const newUser = {
      name: fullNameInput.value.trim(),
      email,
      password,
      score: 0,
      lastSection: 'overview',
      bookmarks: [],
    };

    users.push(newUser);
    setUsers(users);
    profile = { ...newUser, score: 0 };
    setSession({ ...newUser });
    addMessage('Account created successfully.', 'success');
    setTimeout(() => {
      showDashboard();
      syncProfileDisplay();
    }, 600);
    return;
  }

  const matchedUser = users.find((user) => user.email === email && user.password === password);
  if (!matchedUser) {
    addMessage('Incorrect email or password. Please try again.', 'error');
    return;
  }

  profile = { ...matchedUser };
  setSession({ ...matchedUser });
  addMessage('Welcome back.', 'success');
  setTimeout(() => {
    showDashboard();
    syncProfileDisplay();
  }, 500);
}

function handleGuestLogin() {
  const guestProfile = {
    name: 'Guest Evaluator',
    email: 'guest@eval.local',
    score: 0,
    lastSection: getLastSection(),
    bookmarks: getBookmarks(),
  };

  profile = guestProfile;
  setSession(null);
  showDashboard();
  syncProfileDisplay();
}

function syncProfileDisplay() {
  const session = getSession();
  const activeProfile = session || profile || { name: 'Guest Evaluator', score: 0 };
  const score = Number(activeProfile.score || 0);
  const name = activeProfile.name || 'Guest Evaluator';
  const updatedName = name || 'Guest Evaluator';
  const initials = updatedName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'GE';

  profile = activeProfile;
  document.getElementById('sidebar-user-name').textContent = updatedName;
  document.getElementById('header-user-name').textContent = updatedName;
  document.getElementById('sidebar-score').textContent = `Quiz score: ${score}/7`;
  document.getElementById('header-score').textContent = `Quiz: ${score}/7`;
  document.getElementById('sidebar-avatar').textContent = initials;
  document.getElementById('header-avatar').textContent = initials;

  const lastSection = activeProfile.lastSection || getLastSection();
  setLastSection(lastSection);
  activateSection(lastSection, false);
  updateProgress();
  updateBookmarkButtons();
}

function updateProgress() {
  const totalSections = 11;
  const progress = Math.min(100, (currentStage + 1) / totalSections * 100);
  progressFill.style.width = `${progress}%`;
  navProgressValue.textContent = `${Math.round(progress)}%`;
}

function markSectionActive(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === targetId);
  });

  document.querySelectorAll('.content-panel').forEach((panel) => {
    panel.classList.toggle('active-panel', panel.id === targetId);
  });

  const activeTitle = document.querySelector(`[data-section-title][id="${targetId}"]`)?.dataset.sectionTitle ||
    (targetId === 'overview' ? 'Overview' :
      targetId === 'transcribe' ? 'Bioinformatics Playground' :
      targetId === 'cascade' ? 'Central Dogma Visualizer' :
      targetId === 'quiz' ? 'Knowledge Check' : 'Overview');

  currentSectionLabel.textContent = activeTitle;
  setLastSection(targetId);
  if (profile) {
    profile.lastSection = targetId;
    if (getSession()) {
      const stored = getSession();
      stored.lastSection = targetId;
      setSession(stored);
    }
  }
}

function activateSection(targetId, save = true) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  document.querySelectorAll('.content-panel').forEach((panel) => {
    panel.classList.toggle('active-panel', panel.id === targetId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === targetId);
  });

  const title = targetElement.dataset.sectionTitle ||
    (targetId === 'overview' ? 'Overview' :
      targetId === 'transcribe' ? 'Bioinformatics Playground' :
      targetId === 'cascade' ? 'Central Dogma Visualizer' :
      targetId === 'quiz' ? 'Knowledge Check' : 'Overview');

  currentSectionLabel.textContent = title;
  if (save) {
    setLastSection(targetId);
    if (profile) {
      profile.lastSection = targetId;
      const session = getSession();
      if (session) {
        session.lastSection = targetId;
        setSession(session);
      }
    }
  }

  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    activateSection(link.dataset.target);
  });
});

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

paperSearch.addEventListener('input', () => {
  const query = paperSearch.value.trim().toLowerCase();
  const sections = document.querySelectorAll('.section-paper');
  sections.forEach((section) => {
    const text = section.textContent.toLowerCase();
    const visible = !query || text.includes(query);
    section.classList.toggle('hidden', !visible);
  });
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  applyTheme(nextTheme);
});

function initializeTheme() {
  applyTheme(readTheme());
}

function updateBookmarkButtons() {
  const savedBookmarks = getBookmarks();
  document.querySelectorAll('.bookmark-btn').forEach((button) => {
    const id = button.dataset.bookmark;
    button.classList.toggle('active', savedBookmarks.includes(id));
    button.textContent = savedBookmarks.includes(id) ? '★' : '☆';
  });
}

document.querySelectorAll('.bookmark-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.bookmark;
    const savedBookmarks = getBookmarks();
    const index = savedBookmarks.indexOf(id);
    if (index >= 0) {
      savedBookmarks.splice(index, 1);
    } else {
      savedBookmarks.push(id);
    }
    setBookmarks(savedBookmarks);
    updateBookmarkButtons();
    if (profile) {
      profile.bookmarks = savedBookmarks;
      const session = getSession();
      if (session) {
        session.bookmarks = savedBookmarks;
        setSession(session);
      }
    }
  });
});

function reverseComplement(template) {
  const complementMap = { A: 'T', T: 'A', C: 'G', G: 'C' };
  return template
    .split('')
    .reverse()
    .map((base) => complementMap[base.toUpperCase()] || base)
    .join('');
}

function formatSequence(sequence, blockSize = 3) {
  return sequence.match(new RegExp(`.{1,${blockSize}}`, 'g')).join(' ');
}

function transcribeDNA(dna) {
  const cleanup = dna.replace(/[^A-Za-z]/g, '').toUpperCase();
  const coding = cleanup;
  const template = reverseComplement(coding);
  const mrna = coding.replace(/T/g, 'U');
  const codons = [];
  for (let i = 0; i < mrna.length; i += 3) {
    const codon = mrna.slice(i, i + 3);
    if (codon.length === 3) codons.push(codon);
  }

  const aminoAcids = codons.map((codon) => geneticCode[codon] || '?');
  return { coding, template, mrna, codons, aminoAcids };
}

function renderTranscribe() {
  const dna = dnaInput.value.trim() || 'ATGGTGCACCTGACTCCTGAGGAGAAG';
  const { coding, template, mrna, codons, aminoAcids } = transcribeDNA(dna);

  templateOutput.textContent = `3'-${formatSequence(template, 3).split(' ').join(' ')}-5'`;
  mrnaOutput.textContent = `5'-${formatSequence(mrna, 3)}-3'`;
  const codonMarkup = codons
    .map((codon) => {
      const aa = geneticCode[codon] || '?';
      const classes = ['codon-chip'];
      if (codon === 'AUG') classes.push('start');
      if (['UAA', 'UAG', 'UGA'].includes(codon)) classes.push('stop');
      return `<span class="${classes.join(' ')}">${codon}<small>${aa}</small></span>`;
    })
    .join('');

  codonList.innerHTML = codonMarkup;
  aaSequence.textContent = aminoAcids.filter((aa) => aa !== 'Stop').join('-');
}

dnaInput.addEventListener('input', renderTranscribe);

function loadPreset(preset) {
  const presets = {
    normal: 'ATGGTGCACCTGACTCCTGAGGAGAAG',
    sickle: 'ATGGTGCACCTGACTCCTGTGGAGAAG',
  };
  dnaInput.value = presets[preset] || presets.normal;
  renderTranscribe();
}

document.querySelectorAll('.preset-btn').forEach((button) => {
  button.addEventListener('click', () => loadPreset(button.dataset.preset));
});

function copyToClipboard(value, label) {
  navigator.clipboard.writeText(value).then(() => {
    const previous = label.textContent;
    label.textContent = 'Copied';
    setTimeout(() => { label.textContent = previous; }, 1100);
  }).catch(() => {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
}

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.copyTarget;
    const value = document.getElementById(targetId)?.textContent || '';
    copyToClipboard(value, button);
  });
});

function renderCascadePanel(visualId, detailId) {
  const visual = document.getElementById(visualId);
  const detail = document.getElementById(detailId);
  if (!visual || !detail) return;

  visual.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'cascade-row';

  stages.forEach((stage, index) => {
    const node = document.createElement('button');
    node.className = 'stage-node';
    if (index === currentStage) node.classList.add('active');
    node.type = 'button';
    node.style.borderColor = `${stage.palette}80`;
    node.style.background = index === currentStage ? `${stage.palette}25` : 'rgba(148,163,184,0.04)';
    node.innerHTML = `<strong style="color:${stage.palette}">${stage.id}</strong><span>${stage.title}</span>`;
    node.addEventListener('click', () => {
      currentStage = index;
      updateStageDetail();
      renderCascade();
      renderSection10();
      updateProgress();
    });

    row.appendChild(node);
    if (index < stages.length - 1) {
      const connector = document.createElement('span');
      connector.className = 'cascade-connector';
      row.appendChild(connector);
    }
  });

  visual.appendChild(row);

  const stage = stages[currentStage];
  detail.innerHTML = `
    <div class="detail-header">
      <strong style="color:${stage.palette}">Stage ${stage.id}: ${stage.title}</strong>
      <span class="eyebrow">${stage.subtitle}</span>
    </div>
    <p>${stage.detail}</p>
  `;
}

function renderCascade() {
  renderCascadePanel('cascade-visual', 'cascade-detail');
}

function renderSection10() {
  renderCascadePanel('section10-visual', 'section10-detail');
}

function updateStageDetail() {
  renderCascadePanel('cascade-visual', 'cascade-detail');
  renderSection10();

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === stage.section || link.dataset.target === 'overview' && currentStage < 5);
  });

  const sectionToFocus = stage.section;
  const section = document.getElementById(sectionToFocus);
  if (section) {
    section.style.outline = `2px solid ${stage.palette}`;
    section.style.outlineOffset = '4px';
    section.style.transition = 'outline 0.2s ease';
    setTimeout(() => {
      section.style.outline = 'none';
    }, 900);
  }
}

function tickCascade() {
  if (currentStage >= stages.length - 1) {
    currentStage = stages.length - 1;
    renderCascade();
    return;
  }
  currentStage += 1;
  renderCascade();
  updateProgress();
}

function toggleCascadePlayback() {
  const playButton = document.getElementById('play-toggle');
  if (cascadeTimer) {
    clearInterval(cascadeTimer);
    cascadeTimer = null;
    playButton.textContent = 'Play';
    return;
  }

  const speed = Number(speedControl.value) || 1000;
  cascadeTimer = setInterval(() => {
    if (currentStage >= stages.length - 1) {
      clearInterval(cascadeTimer);
      cascadeTimer = null;
      playButton.textContent = 'Play';
      return;
    }
    currentStage += 1;
    renderCascade();
    updateProgress();
  }, speed);
  playButton.textContent = 'Pause';
}

function attachCascadeControls() {
  document.getElementById('play-toggle').addEventListener('click', toggleCascadePlayback);
  document.getElementById('next-step').addEventListener('click', () => {
    if (cascadeTimer) {
      clearInterval(cascadeTimer);
      cascadeTimer = null;
      document.getElementById('play-toggle').textContent = 'Play';
    }
    if (currentStage < stages.length - 1) {
      currentStage += 1;
      renderCascade();
      updateProgress();
    }
  });

  document.getElementById('prev-step').addEventListener('click', () => {
    if (cascadeTimer) {
      clearInterval(cascadeTimer);
      cascadeTimer = null;
      document.getElementById('play-toggle').textContent = 'Play';
    }
    if (currentStage > 0) {
      currentStage -= 1;
      renderCascade();
      updateProgress();
    }
  });

  speedControl.addEventListener('change', () => {
    if (cascadeTimer) {
      clearInterval(cascadeTimer);
      cascadeTimer = null;
      document.getElementById('play-toggle').textContent = 'Play';
      toggleCascadePlayback();
    }
  });
}

function renderQuiz() {
  quizContainer.innerHTML = '';
  quizSubmitted = false;

  quizQuestions.forEach((question, index) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.dataset.index = String(index);
    card.dataset.answered = 'false';

    const questionText = document.createElement('h3');
    questionText.textContent = `${index + 1}. ${question.question}`;

    const choiceGroup = document.createElement('div');
    choiceGroup.className = 'choice-grid';

    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice-btn';
      button.textContent = option;

      button.addEventListener('click', () => {
        if (quizSubmitted || card.dataset.answered === 'true') return;
        card.dataset.answered = 'true';
        card.dataset.selectedIndex = String(optionIndex);

        const isCorrect = optionIndex === question.correct;
        const choiceButtons = choiceGroup.querySelectorAll('.choice-btn');

        choiceButtons.forEach((btn, idx) => {
          btn.disabled = true;
          if (idx === question.correct) {
            btn.classList.add('correct');
          }
          if (idx === optionIndex && !isCorrect) {
            btn.classList.add('incorrect');
          }
        });

        const feedback = document.createElement('div');
        feedback.className = 'choice-feedback';
        feedback.textContent = isCorrect
          ? `Correct. ${question.rationale}`
          : `Incorrect. ${question.rationale}`;

        const existingFeedback = card.querySelector('.choice-feedback');
        if (existingFeedback) existingFeedback.remove();
        card.appendChild(feedback);
      });

      choiceGroup.appendChild(button);
    });

    card.appendChild(questionText);
    card.appendChild(choiceGroup);
    quizContainer.appendChild(card);
  });

  const summary = document.createElement('div');
  summary.className = 'quiz-summary';
  summary.innerHTML = '<strong>Final score available after submission.</strong><span>Answer the full assessment to calculate your result.</span>';
  quizContainer.appendChild(summary);

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.className = 'primary-btn';
  submitButton.textContent = 'Submit Quiz';

  submitButton.addEventListener('click', () => {
    const answeredCards = [...quizContainer.querySelectorAll('.quiz-card')].filter((card) => card.dataset.answered === 'true');
    if (answeredCards.length < quizQuestions.length) {
      const unanswered = quizQuestions.length - answeredCards.length;
      summary.innerHTML = `<strong>Complete all questions before submitting.</strong><span>${unanswered} question(s) remain unanswered.</span>`;
      return;
    }

    let totalCorrect = 0;
    quizQuestions.forEach((question, index) => {
      const card = quizContainer.querySelector(`[data-index="${index}"]`);
      const selectedIndex = Number(card.dataset.selectedIndex || -1);
      if (selectedIndex === question.correct) {
        totalCorrect += 1;
      }
    });

    const finalScore = totalCorrect;
    if (profile) profile.score = finalScore;

    const session = getSession();
    if (session) {
      session.score = finalScore;
      setSession(session);
    }

    summary.innerHTML = `<strong>Score: ${finalScore}/7</strong><span>Great work on the malaria evidence review.</span>`;
    quizSubmitted = true;
    updateProfileInfo();
    submitButton.disabled = true;
  });

  quizContainer.appendChild(submitButton);
}

function updateProfileInfo() {
  const session = getSession();
  const currentProfile = session || profile || { name: 'Guest Evaluator', score: 0 };
  const score = Number(currentProfile.score || 0);
  document.getElementById('sidebar-score').textContent = `Quiz score: ${score}/7`;
  document.getElementById('header-score').textContent = `Quiz: ${score}/7`;
}

function attachOverviewInteractions() {
  document.querySelectorAll('.interactive-card').forEach((card) => {
    const openCard = () => {
      const target = card.dataset.target;
      if (!target) return;
      activateSection(target);
      const targetSection = document.getElementById(target);
      if (targetSection) {
        targetSection.classList.remove('pulse-focus');
        void targetSection.offsetWidth;
        targetSection.classList.add('pulse-focus');
      }
    };

    card.addEventListener('click', openCard);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCard();
      }
    });
  });
}

function ensureMusicContext() {
  if (!musicAudioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    musicAudioContext = new AudioCtx();
    musicGainNode = musicAudioContext.createGain();
    musicGainNode.gain.value = Number(musicVolume.value) / 100 * 0.18;
    musicGainNode.connect(musicAudioContext.destination);
  }

  if (musicAudioContext.state === 'suspended') {
    musicAudioContext.resume();
  }

  return musicAudioContext;
}

function stopCurrentMusic() {
  if (musicIntervalId) {
    clearInterval(musicIntervalId);
    musicIntervalId = null;
  }

  activeMusicOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch (error) {
      // Ignore already stopped oscillators.
    }
  });
  activeMusicOscillators = [];
  musicEnabled = false;
  musicToggle.textContent = '♫';
  musicToggle.classList.remove('active');
  musicToggle.setAttribute('aria-pressed', 'false');
}

function triggerTone(presetKey) {
  const context = ensureMusicContext();
  if (!context || !musicGainNode) return;

  const preset = musicPresets[presetKey] || musicPresets.ambient;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const note = preset.notes[Math.floor(Math.random() * preset.notes.length)];

  oscillator.type = preset.wave || 'sine';
  oscillator.frequency.setValueAtTime(note, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(musicGainNode.gain.value * 0.9, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.6, preset.interval / 1000));

  oscillator.connect(gain);
  gain.connect(musicGainNode);
  oscillator.start(now);
  oscillator.stop(now + Math.max(0.8, preset.interval / 1000));
  activeMusicOscillators.push(oscillator);

  oscillator.onended = () => {
    activeMusicOscillators = activeMusicOscillators.filter((item) => item !== oscillator);
  };
}

function startMusic() {
  const presetKey = musicSelect.value === 'off' ? 'ambient' : musicSelect.value;
  const context = ensureMusicContext();
  if (!context || !musicGainNode) return;

  currentMusicPreset = presetKey;
  if (musicEnabled && musicIntervalId) {
    stopCurrentMusic();
  }
  musicEnabled = true;
  musicToggle.textContent = '♫';
  musicToggle.classList.add('active');
  musicToggle.setAttribute('aria-pressed', 'true');

  const preset = musicPresets[presetKey] || musicPresets.ambient;
  triggerTone(presetKey);
  musicIntervalId = setInterval(() => {
    triggerTone(presetKey);
  }, preset.interval);
}

function toggleMusic() {
  if (musicSelect.value === 'off') {
    musicSelect.value = currentMusicPreset || 'ambient';
  }

  if (musicEnabled) {
    stopCurrentMusic();
    musicSelect.value = 'off';
    return;
  }

  startMusic();
}

function handleMusicSelection() {
  if (musicSelect.value === 'off') {
    stopCurrentMusic();
    return;
  }

  if (musicEnabled) {
    startMusic();
  }
}

function startMusicAfterUserGesture() {
  if (musicSelect.value === 'off') {
    musicSelect.value = currentMusicPreset || 'ambient';
  }
  startMusic();
}

function initializeMusicControls() {
  musicToggle.addEventListener('click', toggleMusic);
  musicSelect.addEventListener('change', handleMusicSelection);
  musicVolume.addEventListener('input', () => {
    const value = Number(musicVolume.value) / 100;
    if (musicGainNode) {
      musicGainNode.gain.value = value * 0.18;
    }
  });

  musicToggle.textContent = '♫';
  musicToggle.title = 'Toggle background music';
}

function rotateFactStrip() {
  const factText = document.getElementById('rotating-fact');
  if (!factText) return;

  let currentIndex = 0;
  const cycle = () => {
    currentIndex = (currentIndex + 1) % rotatingFacts.length;
    factText.textContent = rotatingFacts[currentIndex];
    const badge = document.querySelector('.fact-badge');
    if (badge) {
      const nextNumber = String((currentIndex + 1)).padStart(2, '0');
      badge.textContent = nextNumber;
    }
  };

  setInterval(cycle, 4200);
}

function initialize() {
  initializeTheme();
  renderTranscribe();
  renderCascade();
  attachCascadeControls();
  renderQuiz();
  attachOverviewInteractions();
  initializeMusicControls();
  rotateFactStrip();
  setAuthMode('signin');

  const savedSession = getSession();
  if (savedSession) {
    profile = savedSession;
    showDashboard();
    syncProfileDisplay();
  } else {
    showAuth();
  }

  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => setAuthMode(tab.dataset.authTab));
  });

  authForm.addEventListener('submit', handleAuthSubmit);
  guestLoginBtn.addEventListener('click', () => {
    startMusicAfterUserGesture();
    handleGuestLogin();
  });

  document.querySelector('.fact-next')?.addEventListener('click', () => {
    const factText = document.getElementById('rotating-fact');
    if (!factText) return;

    const currentText = factText.textContent;
    const index = rotatingFacts.indexOf(currentText);
    const nextIndex = index >= 0 ? (index + 1) % rotatingFacts.length : 0;
    factText.textContent = rotatingFacts[nextIndex];

    const badge = document.querySelector('.fact-badge');
    if (badge) {
      badge.textContent = String((nextIndex + 1)).padStart(2, '0');
    }
  });

  const initialSection = getLastSection();
  if (initialSection && document.getElementById(initialSection)) {
    activateSection(initialSection, false);
  }

  citationBtn.addEventListener('click', () => {
    startMusicAfterUserGesture();
    const citation = 'Abania, Anthony Edsel M.; Amoy, Janzelle Rendon O.; Borja, Jermaine Bryce. SHBIO02 GBIO2 - “Gene Code of Life.” HemoCascade: Genome/Disease Dashboard.';
    const blob = new Blob([citation], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = 'hemo-cascade-citation.txt';
    anchor.click();
    URL.revokeObjectURL(href);
    window.print();
  });
}

initialize();
