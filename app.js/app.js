/* ============================================================
   1. MASTER ADMIN & SECURITY KEY
   Your secret admin cipher is: LOCKIN-ROOT-99
   Press Ctrl+Shift+A or triple-click the top-left Logo to unlock.
============================================================ */
const MASTER_ADMIN_SECRET = "LOCKIN-ROOT-99";
let isAdminAuthorized = localStorage.getItem('lockin_admin_auth') === 'true';

let brandClickCount = 0;
let brandClickTimer = null;

function brandTripleClickTrigger() {
  brandClickCount++;
  clearTimeout(brandClickTimer);
  brandClickTimer = setTimeout(() => { brandClickCount = 0; }, 1000);
  if (brandClickCount >= 3) {
    brandClickCount = 0;
    openAdminAuth();
  }
}

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    openAdminAuth();
  }
});

function openAdminAuth() {
  if (isAdminAuthorized) {
    toast("Master Clearance already active.");
    revealAdminTab();
    return;
  }
  document.getElementById('adminAuthModal').style.display = 'flex';
  document.getElementById('adminSecretInput').focus();
}

function closeAdminAuth() {
  document.getElementById('adminAuthModal').style.display = 'none';
  document.getElementById('adminSecretInput').value = '';
}

function verifyAdminAccess() {
  const entered = document.getElementById('adminSecretInput').value.trim();
  if (entered === MASTER_ADMIN_SECRET) {
    isAdminAuthorized = true;
    localStorage.setItem('lockin_admin_auth', 'true');
    closeAdminAuth();
    revealAdminTab();
    toast("Master Clearance Granted. Welcome, Admin.");
  } else {
    toast("ACCESS DENIED: Invalid Root Cipher", true);
  }
}

function revealAdminTab() {
  document.getElementById('adminNavGroup').style.display = 'block';
}

/* ============================================================
   2. PROCEDURAL RUNNER ID ENGINE
============================================================ */
const PREFIXES = ["NEXUS", "BLADE", "CYBER", "GHOST", "NEO", "SYNTH", "SHINOBI", "WARLORD", "VIGIL"];
const SECTORS = ["7", "X", "9", "V", "A", "DELTA", "ZED", "ALPHA"];

function generateCryptographicUniqueId() {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const sector = SECTORS[Math.floor(Math.random() * SECTORS.length)];
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const code = 1000 + (array[0] % 9000);
  return `${prefix}-${sector}-${code}`;
}

let stagedUniqueId = "";
function generateNewIdentity() {
  stagedUniqueId = generateCryptographicUniqueId();
  document.getElementById('genUniqueId').innerText = stagedUniqueId;
}

function toggleSidebar(open) {
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (open) {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  } else {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }
}

/* ============================================================
   3. THEME PACKS (100% UNLOCKED FOR ALL USERS)
============================================================ */
const BUILTIN_THEME_PACKS = {
  blade_runner: {
    id: 'blade_runner',
    name: 'Blade Runner 2099',
    category: 'Cyberpunk',
    desc: 'Rain-slicked neon metropolis with cyan and magenta accents.',
    emotes: { complete: '⚡', avatar: '🎯', alertText: 'TASK EXECUTED!' },
    palette: {
      bg: '#05070A', surface: '#0B0F19', surface2: '#111827',
      primary: '#00F0FF', secondary: '#FF2A6D', accent: '#B92BFF', text: '#E6F1FF'
    },
    wallpaper: 'radial-gradient(circle at 80% 10%, rgba(0, 240, 255, 0.08), transparent 60%)'
  },
  superhero: {
    id: 'superhero',
    name: 'Vigilante Neon',
    category: 'Superhero',
    desc: 'Comic-book high contrast yellow & electric crimson HUD.',
    emotes: { complete: '💥', avatar: '🦸‍♂️', alertText: 'JUSTICE DELIVERED!' },
    palette: {
      bg: '#08050e', surface: '#120c1f', surface2: '#1c132f',
      primary: '#FFE600', secondary: '#FF0055', accent: '#39FF14', text: '#FFFFFF'
    },
    wallpaper: 'radial-gradient(circle at 50% 20%, rgba(255, 230, 0, 0.08), transparent 70%)'
  },
  ninja: {
    id: 'ninja',
    name: 'Shinobi Shadow',
    category: 'Ninja',
    desc: 'Obsidian blacks, blood crimson cuts, and stealth shuriken highlights.',
    emotes: { complete: '🗡️', avatar: '🥷', alertText: 'KATANA STRIKE COMPLETE!' },
    palette: {
      bg: '#050505', surface: '#0d0d0d', surface2: '#171717',
      primary: '#FF1E27', secondary: '#8A0303', accent: '#C0C0C0', text: '#F0F0F0'
    },
    wallpaper: 'linear-gradient(180deg, rgba(255, 30, 39, 0.05) 0%, transparent 100%)'
  },
  zomboid: {
    id: 'zomboid',
    name: 'Toxic Undead',
    category: 'Zomboid',
    desc: 'Apocalyptic quarantine bioluminescent acid-green & rusted amber.',
    emotes: { complete: '☣️', avatar: '🧟', alertText: 'SECTOR PURGED!' },
    palette: {
      bg: '#050804', surface: '#0b120a', surface2: '#131e11',
      primary: '#39FF14', secondary: '#FF8800', accent: '#7CFF01', text: '#E8FFE5'
    },
    wallpaper: 'radial-gradient(circle at 20% 80%, rgba(57, 255, 20, 0.07), transparent 60%)'
  },
  world_war: {
    id: 'world_war',
    name: 'Trench Warfare 1944',
    category: 'World War',
    desc: 'Military steel-grey, olive drab radar, and artillery flash amber.',
    emotes: { complete: '🎖️', avatar: '🪖', alertText: 'OBJECTIVE SECURED!' },
    palette: {
      bg: '#0A0B09', surface: '#141712', surface2: '#1F241C',
      primary: '#E5A93C', secondary: '#738C5A', accent: '#C2B280', text: '#EDEDE8'
    },
    wallpaper: 'radial-gradient(circle at 50% 50%, rgba(229, 169, 60, 0.06), transparent 70%)'
  }
};

const STORE_KEY = 'lockin_matrix_v5_freeall';
const todayStr = () => new Date().toISOString().slice(0, 10);

function seedState(userProfile = null) {
  const now = Date.now();
  const id = userProfile ? userProfile.id : generateCryptographicUniqueId();
  const name = userProfile ? userProfile.name : id;

  return {
    profile: {
      id: id, name: name, slug: id.toLowerCase(),
      birth: '2001-04-12', about: 'Active runner in the Lock In neural matrix.',
      avatar: '🎯', plan: 'vip', twoFA: false, weeklyOptIn: true // Default to VIP unlocked for free
    },
    activeThemePackId: 'blade_runner',
    unlockedThemePackIds: ['blade_runner', 'superhero', 'ninja', 'zomboid', 'world_war'], // 100% unlocked
    theme: { ...BUILTIN_THEME_PACKS.blade_runner.palette },
    savedThemes: [],
    bp: { seasonName: 'Season 1 · 2026', totalTaskPoints: 0, grantedMilestones: [], pointsToday: 0, lastActiveDate: todayStr() },
    bpConfig: [
      { lvl: 1, free: '+10 Lock In Points', vip: '+15 Lock In Points + Starter Pack' },
      { lvl: 2, free: '+10 Lock In Points', vip: '+15 Lock In Points' },
      { lvl: 3, free: '+10 Lock In Points', vip: 'Shinobi Ninja Pack' },
      { lvl: 4, free: '+10 Lock In Points', vip: '+15 Lock In Points' },
      { lvl: 5, free: 'Profile badge: Bronze', vip: 'Profile badge: VIP Bronze' },
      { lvl: 6, free: '+10 Lock In Points', vip: '+15 Lock In Points' },
      { lvl: 7, free: '+10 Lock In Points', vip: '+15 Lock In Points' },
      { lvl: 8, free: '+10 Lock In Points', vip: 'Zomboid Pack Access' },
      { lvl: 9, free: '+10 Lock In Points', vip: '+15 Lock In Points' },
      { lvl: 10, free: '3-day VIP trial', vip: 'Superhero Emote Pack' },
    ],
    lists: [
      { id: 'l1', title: 'Tactical Objectives', tasks: [
        { id: 't1', title: 'Complete project documentation', priority: 'high', due: todayStr(), status: 'pending', createdAt: now - 1000 * 60 * 60 * 5, tags: ['work'] },
        { id: 't2', title: 'Review core codebase algorithms', priority: 'medium', due: '', status: 'pending', createdAt: now - 1000 * 60 * 60 * 20, tags: ['dev'] },
        { id: 't3', title: 'Daily physical endurance sprint', priority: 'low', due: '', status: 'done', createdAt: now - 1000 * 60 * 60 * 40, completedAt: now - 1000 * 60 * 60 * 39, tags: [] },
      ]}
    ],
    templates: [
      { id: 'tpl1', name: 'Shinobi Infiltration', category: 'Ninja', price: 0, desc: 'Stealth sprint and physical discipline.', author: 'Kage', items: ['Silent kata 20m', 'Precision drill', 'Route mapping'] },
      { id: 'tpl2', name: 'Zomboid Survival 7-Day', category: 'Zomboid', price: 0, desc: 'Outbreak ration & barricade checklist.', author: 'SurvivorX', items: ['Sterilize water caches', 'Fortify doors', 'Check med inventory'] }
    ],
    ownedTemplateIds: ['tpl1', 'tpl2'],
    friends: [
      { id: 'f1', name: 'Kage', status: 'accepted' },
      { id: 'f2', name: 'Slayer99', status: 'accepted' }
    ],
    groups: [
      { id: 'g1', name: 'Shinobi Clan Alpha', listId: null, members: [
        { name: `${name} (You)`, role: 'owner' },
        { name: 'Kage', role: 'admin' }
      ]}
    ],
    conversations: [
      { id: 'c1', type: 'direct', name: 'Kage', messages: [
        { from: 'them', text: 'Telemetry linked. Ready to lock in?', time: '09:12' }
      ]}
    ],
    adminUsers: [
      { name: `${name} (You)`, plan: 'vip', risk: 2, suspended: false },
      { name: 'Kage', plan: 'vip', risk: 1, suspended: false }
    ],
    adminFlags: [],
    modQueue: [],
    lockInPoints: 0
  };
}

let state;
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    state = raw ? JSON.parse(raw) : null;
  } catch (e) { state = null; }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

function uid(p) { return p + Math.random().toString(36).slice(2, 8); }

function toast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderLeftColor = isError ? 'var(--danger)' : 'var(--primary)';
  t.classList.add('show');
  clearTimeout(toast._h);
  toast._h = setTimeout(() => t.classList.remove('show'), 2800);
}

function planLimit() { return 100; } // Unlimited for all
function activeTaskCount() { return state.lists.reduce((s, l) => s + l.tasks.filter(t => t.status !== 'done').length, 0); }
function levelFromPoints(total) { return Math.floor(total / 50) + 1; }
function pointsIntoLevel(total) { return total % 50; }
function lockInPointsFor(level) { return (level - 1) * 10; }
const MILESTONES = [10, 20, 30, 40, 50];

/* ============================================================
   4. RETRO ARCADE CELEBRATION
============================================================ */
function triggerArcadeCelebration(taskTitle) {
  const activePack = BUILTIN_THEME_PACKS[state.activeThemePackId] || BUILTIN_THEME_PACKS.blade_runner;
  const pop = document.getElementById('arcadePopup');
  const popIcon = document.getElementById('popIcon');
  const popTitle = document.getElementById('popTitle');
  const popSubtitle = document.getElementById('popSubtitle');

  popIcon.innerText = activePack.emotes.complete;
  popTitle.innerText = activePack.emotes.alertText;
  popSubtitle.innerText = `+5 XP • "${taskTitle.substring(0, 22)}" RESOLVED`;

  pop.style.borderColor = 'var(--primary)';
  popTitle.style.color = 'var(--primary)';

  pop.classList.add('pop-show');
  setTimeout(() => { pop.classList.remove('pop-show'); }, 2200);
}

function applyTheme() {
  const activePack = BUILTIN_THEME_PACKS[state.activeThemePackId];
  const t = (activePack && activePack.palette) ? activePack.palette : state.theme;
  const root = document.documentElement;

  root.style.setProperty('--bg', t.bg);
  root.style.setProperty('--surface', t.surface);
  root.style.setProperty('--surface2', t.surface2 || '#111827');
  root.style.setProperty('--primary', t.primary);
  root.style.setProperty('--secondary', t.secondary);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--text', t.text);
  
  if (activePack && activePack.wallpaper) {
    root.style.setProperty('--wallpaper-overlay', activePack.wallpaper);
  }
}

/* ============================================================
   5. NAVIGATION
============================================================ */
const titles = {
  home: ['Home // Telemetry', 'Tactical today snapshot'],
  lists: ['Task Matrices', 'Active task execution and sub-nodes'],
  battlepass: ['Battlepass // S1', 'Level up by completing verified tasks'],
  themes: ['Worlds & Themes', 'All Thematic Packs Unlocked 100% Free'],
  friends: ['Accountability Grid', 'Linked squad runners and mentors'],
  groups: ['Squad Groups', 'Shared checklists and synchronized comms'],
  chat: ['Neural Comms', 'Direct transmission and pinned task signals'],
  templates: ['Design Studio (.lockin)', 'Author & export packs freely'],
  marketplace: ['Marketplace', 'Spend Lock In Points on community themes'],
  profile: ['Agent Profile', 'Unique Net-ID and local credentials'],
  plans: ['License Status', 'Community Free Tier (All Perks Unlocked)'],
  admin: ['Master Deck // Root Access', 'Secret KPIs, moderation queue & anti-abuse engine'],
};

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const id = btn.dataset.tab;
    const panel = document.getElementById(id);
    if (panel) panel.classList.add('active');
    document.getElementById('pageTitle').textContent = titles[id][0];
    document.getElementById('pageSub').textContent = titles[id][1];
    toggleSidebar(false);
  });
});

/* ============================================================
   6. TASK COMPLETION & CHECKS
============================================================ */
function completeTask(listId, taskId, checked) {
  const list = state.lists.find(l => l.id === listId);
  const task = list.tasks.find(t => t.id === taskId);
  if (checked) {
    task.status = 'done';
    task.completedAt = Date.now();
    const ageSec = (task.completedAt - task.createdAt) / 1000;
    const suspicious = ageSec < 8 || /^(test|asdf|task1)$/i.test(task.title.trim());
    if (suspicious) {
      task.flagged = true;
      const name = state.profile.name + ' (You)';
      state.adminFlags.unshift({ user: name, reason: `Task "${task.title}" resolved ${Math.round(ageSec)}s after dispatch`, risk: 65 });
      toast('⚠ Anti-Abuse: Completed <8s. 0 pts awarded.', true);
    } else {
      const gain = 5;
      state.bp.totalTaskPoints += gain;
      state.bp.pointsToday += gain;
      const newLevel = levelFromPoints(state.bp.totalTaskPoints);
      MILESTONES.forEach(m => {
        if (newLevel >= m && !state.bp.grantedMilestones.includes(m)) {
          state.bp.grantedMilestones.push(m);
          toast(`🎉 Milestone Rank ${m} Achieved!`);
        }
      });
      triggerArcadeCelebration(task.title);
    }
  } else {
    task.status = 'pending';
    task.completedAt = null;
    task.flagged = false;
  }
  saveState();
  renderAll();
}

function equipThemePack(packId) {
  const pack = BUILTIN_THEME_PACKS[packId];
  if (!pack) return;
  state.activeThemePackId = packId;
  applyTheme();
  saveState();
  renderAll();
  toast(`Equipped World: ${pack.name}`);
}

/* ============================================================
   7. FILE EXPORT / IMPORT (.lockin standard)
============================================================ */
function exportCurrentThemeAsLockin() {
  const current = BUILTIN_THEME_PACKS[state.activeThemePackId] || BUILTIN_THEME_PACKS.blade_runner;
  const packData = {
    fileFormat: "LOCKIN_DESIGN_PACK_V1",
    themeName: current.name + " (Custom)",
    category: current.category || "Custom",
    author: state.profile.name,
    price: 0,
    palette: { ...state.theme },
    wallpaper: current.wallpaper || "",
    emotes: current.emotes
  };

  const blob = new Blob([JSON.stringify(packData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${current.name.toLowerCase().replace(/\s+/g, '_')}.lockin`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Exported .lockin Theme Pack');
}

function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.fileFormat !== "LOCKIN_DESIGN_PACK_V1" && !data.palette) {
        toast("Invalid .lockin specification file!", true);
        return;
      }
      const customId = 'custom_' + Date.now();
      BUILTIN_THEME_PACKS[customId] = {
        id: customId,
        name: data.themeName || "Imported World",
        category: data.category || "Custom",
        desc: `Custom pack authored by ${data.author || 'Runner'}`,
        emotes: data.emotes || { complete: '✨', avatar: '🎮', alertText: 'TASK DONE!' },
        palette: data.palette,
        wallpaper: data.wallpaper || ""
      };
      state.unlockedThemePackIds.push(customId);
      equipThemePack(customId);
      toast(`Loaded and equipped: ${data.themeName}`);
    } catch(err) {
      toast("Corrupt .lockin pack payload", true);
    }
  };
  reader.readAsText(file);
}

/* ============================================================
   8. RENDERING FUNCTIONS
============================================================ */
function renderHome() {
  const level = levelFromPoints(state.bp.totalTaskPoints);
  const lip = lockInPointsFor(level);
  state.lockInPoints = lip;
  const stats = [
    { label: 'Active Tasks', value: activeTaskCount() + ' / ∞', cls: 'accent' },
    { label: 'Matrix Level', value: level, cls: 'good' },
    { label: 'Daily XP', value: state.bp.pointsToday + ' / 200', cls: 'neutral' },
    { label: 'License Status', value: 'UNLOCKED', cls: 'good' },
  ];
  document.getElementById('homeStats').innerHTML = stats.map(s => `
    <div class="card stat ${s.cls}">
      <div class="value num">${s.value}</div>
      <div class="label">${s.label}</div>
    </div>
  `).join('');

  const into = pointsIntoLevel(state.bp.totalTaskPoints);
  document.getElementById('homeBpBar').innerHTML = `
    <div class="kv"><span class="k">Rank ${level} &rarr; ${level + 1}</span><span class="v num">${into}/50 XP</span></div>
    <div class="progress"><div class="fill" style="width:${(into / 50) * 100}%;"></div></div>
    <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">${50 - into} more XP to Rank ${level + 1}.</p>`;

  const dueTasks = [];
  state.lists.forEach(l => l.tasks.forEach(t => { if (t.status !== 'done') dueTasks.push({ ...t, list: l.title }); }));
  document.getElementById('homeDueToday').innerHTML = dueTasks.length ? dueTasks.slice(0, 5).map(t => `
    <div class="kv"><span class="k">${t.title} <span style="opacity:.5;">[${t.list}]</span></span><span class="pill neutral">${t.priority}</span></div>
  `).join('') : '<p style="color:var(--text-dim); font-size:12px; padding:10px 0;">All signals resolved. Locked in.</p>';

  document.getElementById('hdrLevel').textContent = level;
  document.getElementById('hdrLockIn').textContent = lip;
  document.getElementById('mobHeaderLvl').textContent = 'LVL ' + level;
}

function renderLists() {
  const c = document.getElementById('listsContainer');
  c.innerHTML = state.lists.map(list => `
    <div class="card" style="margin-bottom:14px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h3 style="margin:0;">${list.title}</h3>
        <div style="display:flex; gap:6px;">
          <button class="btn small ghost" data-addtask="${list.id}">+ Task</button>
          <button class="btn small danger" data-dellist="${list.id}">Delete</button>
        </div>
      </div>
      ${list.tasks.length ? list.tasks.map(t => `
        <div class="task-row">
          <input type="checkbox" ${t.status === 'done' ? 'checked' : ''} data-list="${list.id}" data-task="${t.id}">
          <div class="tt">
            <div class="title ${t.status === 'done' ? 'done' : ''}">${t.title}</div>
            <div class="meta"><span>${t.priority.toUpperCase()}</span>${t.due ? `<span>due ${t.due}</span>` : ''}${t.flagged ? '<span style="color:var(--danger); font-family:var(--font-pixel); font-size:7px;">[FLAGGED: 0 PTS]</span>' : ''}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn small danger" data-deltask="${list.id}\vert{}${t.id}">&times;</button>
          </div>
        </div>
      `).join('') : '<p style="color:var(--text-dim); font-size:12px;">No active signals in this matrix.</p>'}
    </div>
  `).join('');

  c.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', e => completeTask(e.target.dataset.list, e.target.dataset.task, e.target.checked));
  });
  c.querySelectorAll('[data-addtask]').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = prompt('Signal title:');
      if (!title) return;
      const list = state.lists.find(l => l.id === btn.dataset.addtask);
      list.tasks.push({ id: uid('t'), title, priority: 'medium', due: '', status: 'pending', createdAt: Date.now(), tags: [] });
      saveState(); renderAll();
    });
  });
  c.querySelectorAll('[data-dellist]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.lists = state.lists.filter(l => l.id !== btn.dataset.dellist);
      saveState(); renderAll();
    });
  });
  c.querySelectorAll('[data-deltask]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [lid, tid] = btn.dataset.deltask.split('|');
      const list = state.lists.find(l => l.id === lid);
      list.tasks = list.tasks.filter(t => t.id !== tid);
      saveState(); renderAll();
    });
  });
}

function renderBattlepass() {
  const level = levelFromPoints(state.bp.totalTaskPoints);
  const into = pointsIntoLevel(state.bp.totalTaskPoints);
  document.getElementById('bpSeasonName').textContent = state.bp.seasonName;
  document.getElementById('bpBigBar').innerHTML = `
    <div class="kv"><span class="k">Rank ${level} &rarr; ${level + 1}</span><span class="v num">${into}/50 XP</span></div>
    <div class="progress"><div class="fill" style="width:${(into / 50) * 100}%;"></div></div>`;
  document.getElementById('bpToday').textContent = `${state.bp.pointsToday} / 200`;
  document.getElementById('bpTotal').textContent = state.bp.totalTaskPoints;
  document.getElementById('bpLip').textContent = lockInPointsFor(level);

  document.getElementById('bpMilestones').innerHTML = MILESTONES.map(m => {
    const hit = state.bp.grantedMilestones.includes(m);
    return `<div class="kv"><span class="k">Rank ${m}</span><span class="pill ${hit ? 'good' : 'neutral'}">${hit ? 'CLAIMED' : 'UNLOCKED'}</span></div>`;
  }).join('');

  document.getElementById('bpPerksBody').innerHTML = state.bpConfig.map(row => `
    <tr><td class="num">${row.lvl}</td><td>${row.free}</td><td style="color:var(--secondary);">${row.vip}</td></tr>
  `).join('');
}

function renderThemes() {
  const grid = document.getElementById('designPacksGrid');
  grid.innerHTML = Object.keys(BUILTIN_THEME_PACKS).map(key => {
    const p = BUILTIN_THEME_PACKS[key];
    const isEquipped = state.activeThemePackId === key;

    return `
      <div class="design-pack-card ${isEquipped ? 'active-pack' : ''}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:var(--font-display); font-weight:800; font-size:12px; color:var(--text);">${p.name}</span>
          <span>${p.emotes.avatar}</span>
        </div>
        <div class="design-preview-strip">
          <span style="background:${p.palette.bg}"></span>
          <span style="background:${p.palette.surface}"></span>
          <span style="background:${p.palette.primary}"></span>
          <span style="background:${p.palette.secondary}"></span>
          <span style="background:${p.palette.accent}"></span>
        </div>
        <p style="font-size:10px; color:var(--text-dim); margin:2px 0;">${p.desc}</p>
        <button class="btn small ${isEquipped ? 'ghost' : 'btn-primary'}" onclick="equipThemePack('${p.id}')" style="width:100%; justify-content:center; margin-top:6px;">
          ${isEquipped ? 'EQUIPPED' : 'EQUIP WORLD (FREE)'}
        </button>
      </div>
    `;
  }).join('');

  const fields = [
    ['bg', 'Void Background'],
    ['surface', 'Panel Surface'],
    ['primary', 'Primary Neon'],
    ['secondary', 'Secondary Pink'],
    ['accent', 'Accent Highlight'],
    ['text', 'Terminal Text']
  ];
  document.getElementById('colorPickers').innerHTML = fields.map(([k, label]) => `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <label style="font-size:12px; color:var(--text-dim);">${label}</label>
      <input type="color" data-color="${k}" value="${state.theme[k] || '#00F0FF'}" style="width:50px; height:26px;">
    </div>
  `).join('');

  document.querySelectorAll('[data-color]').forEach(inp => {
    inp.addEventListener('input', e => {
      state.theme[e.target.dataset.color] = e.target.value;
      applyTheme(); saveState();
    });
  });

  const activePack = BUILTIN_THEME_PACKS[state.activeThemePackId] || BUILTIN_THEME_PACKS.blade_runner;
  document.getElementById('previewBrandText').innerText = activePack.name.toUpperCase();
  document.getElementById('previewPackDesc').innerText = activePack.desc;
  document.getElementById('previewEmote').innerText = activePack.emotes.avatar;

  document.getElementById('savedThemesList').innerHTML = state.savedThemes.length ? state.savedThemes.map((th, idx) => `
    <div class="kv"><span class="k">${th.name}</span>
      <span>
        <button class="btn small ghost" data-applysaved="${idx}">Apply</button>
        <button class="btn small danger" data-delsaved="${idx}">Del</button>
      </span>
    </div>`).join('') : '<p style="color:var(--text-dim); font-size:12px;">No custom theme profiles saved.</p>';

  document.querySelectorAll('[data-applysaved]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.theme = { ...state.savedThemes[btn.dataset.applysaved].vars };
      applyTheme(); saveState(); renderThemes();
    });
  });
  document.querySelectorAll('[data-delsaved]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.savedThemes.splice(btn.dataset.delsaved, 1);
      saveState(); renderThemes();
    });
  });
}

function renderTemplates() {
  document.getElementById('templatesGrid').innerHTML = state.templates.map(t => `
    <div class="card">
      <h3 style="margin:0;">${t.name}</h3>
      <p style="font-size:11px; color:var(--text-dim); margin:4px 0 8px 0;">${t.desc} • By <b>${t.author}</b></p>
      <div style="font-family:var(--font-display); font-weight:800; color:var(--success); margin-bottom:8px;">FREE UNLOCKED</div>
      <button class="btn small btn-primary" data-usetpl="${t.id}" style="width:100%; justify-content:center;">Deploy Blueprint</button>
    </div>`).join('');

  document.querySelectorAll('[data-usetpl]').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = state.templates.find(x => x.id === btn.dataset.usetpl);
      state.lists.push({ id: uid('l'), title: t.name, tasks: t.items.map(title => ({ id: uid('t'), title, priority: 'medium', due: '', status: 'pending', createdAt: Date.now(), tags: [] })) });
      saveState(); renderAll(); toast('Matrix deployed from template');
    });
  });
}

function publishActivePackToMarketplace() {
  const current = BUILTIN_THEME_PACKS[state.activeThemePackId] || BUILTIN_THEME_PACKS.blade_runner;
  const name = prompt("Listing Title:", current.name + " Pack");
  if (!name) return;

  state.templates.unshift({
    id: uid('tpl'), name: name, category: current.category || "Design",
    price: 0, desc: `Custom community pack.`,
    author: state.profile.name,
    items: ['Check sensors', 'Equip thematic gear', 'Engage direct sprint']
  });
  saveState(); renderAll();
  toast(`Listed "${name}" on Marketplace!`);
}

function renderMarketplace(filter = '') {
  const f = filter.toLowerCase();
  const items = state.templates.filter(t => t.name.toLowerCase().includes(f) || t.category.toLowerCase().includes(f));
  document.getElementById('marketGrid').innerHTML = items.map(t => `
    <div class="card">
      <h3 style="margin:0;">${t.name}</h3>
      <p style="font-size:11px; color:var(--text-dim); margin:4px 0 8px 0;">${t.desc}</p>
      <div style="font-family:var(--font-display); font-weight:800; color:var(--success); margin-bottom:8px;">FREE</div>
      <button class="btn small btn-primary" data-usetpl="${t.id}" style="width:100%; justify-content:center;">Deploy</button>
    </div>
  `).join('') || '<p style="color:var(--text-dim); font-size:12px;">No listings located.</p>';

  document.querySelectorAll('[data-usetpl]').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = state.templates.find(x => x.id === btn.dataset.usetpl);
      state.lists.push({ id: uid('l'), title: t.name, tasks: t.items.map(title => ({ id: uid('t'), title, priority: 'medium', due: '', status: 'pending', createdAt: Date.now(), tags: [] })) });
      saveState(); renderAll(); toast('Matrix initialized from template');
    });
  });
}

function renderFriends() {
  document.getElementById('friendsList').innerHTML = state.friends.map((f, idx) => `
    <div class="kv">
      <span class="k">${f.name}</span>
      <span>
        <span class="pill good">LINKED</span>
        <button class="btn small ghost" data-removefriend="${idx}">Unlink</button>
      </span>
    </div>`).join('') || '<p style="color:var(--text-dim); font-size:12px;">No runners linked.</p>';

  document.querySelectorAll('[data-removefriend]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.friends.splice(btn.dataset.removefriend, 1);
      saveState(); renderFriends();
    });
  });
  document.getElementById('weeklyOptIn').checked = state.profile.weeklyOptIn;
}

function renderGroups() {
  const c = document.getElementById('groupsContainer');
  c.innerHTML = state.groups.map((g, gi) => `
    <div class="card" style="margin-bottom:14px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h3 style="margin:0;">${g.name}</h3>
        <button class="btn small ghost" data-addmember="${gi}">+ Member</button>
      </div>
      <div class="table-responsive">
        <table><thead><tr><th>Runner</th><th>Clearance Role</th></tr></thead><tbody>
          ${g.members.map((m, mi) => `
            <tr>
              <td>${m.name}</td>
              <td>
                <select data-role="${gi}\vert{}${mi}" style="padding:4px; font-size:11px;">
                  ${['owner', 'admin', 'editor', 'member'].map(r => `<option value="${r}" ${m.role === r ? 'selected' : ''}>${r.toUpperCase()}</option>`).join('')}
                </select>
              </td>
            </tr>`).join('')}
        </tbody></table>
      </div>
    </div>`).join('');

  c.querySelectorAll('[data-addmember]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = prompt('New member alias:');
      if (!name) return;
      state.groups[btn.dataset.addmember].members.push({ name, role: 'member' });
      saveState(); renderGroups();
    });
  });
  c.querySelectorAll('[data-role]').forEach(sel => {
    sel.addEventListener('change', e => {
      const [gi, mi] = e.target.dataset.role.split('|');
      state.groups[gi].members[mi].role = e.target.value;
      saveState();
    });
  });
}

let activeConvId = 'c1';
function renderChatList() {
  const list = document.getElementById('chatList');
  list.innerHTML = state.conversations.map(cv => `
    <div class="chat-item ${cv.id === activeConvId ? 'active' : ''}" data-conv="${cv.id}">
      <div style="font-size:16px;">${cv.type === 'group' ? '👥' : '🤖'}</div>
      <div style="min-width:0;">
        <div style="font-weight:600; font-size:12px;">${cv.name}</div>
        <div class="pixel-label" style="color:var(--text-dim); font-size:7px;">${cv.type}</div>
      </div>
    </div>`).join('');

  list.querySelectorAll('[data-conv]').forEach(el => {
    el.addEventListener('click', () => { activeConvId = el.dataset.conv; renderChatList(); renderChatMsgs(); });
  });
}

function renderChatMsgs() {
  const conv = state.conversations.find(c => c.id === activeConvId);
  document.getElementById('chatTitle').textContent = conv ? conv.name : 'Select Comms Channel';
  document.getElementById('chatMsgs').innerHTML = conv ? conv.messages.map(m => `
    <div class="msg ${m.from === 'me' ? 'me' : 'them'} ${m.tasklink ? 'tasklink' : ''}">
      ${m.text}
      <div style="font-size:9px; opacity:0.5; margin-top:2px;">${m.time}</div>
    </div>`).join('') : '<p style="color:var(--text-dim); font-size:12px;">No active signal feed.</p>';
  const box = document.getElementById('chatMsgs');
  box.scrollTop = box.scrollHeight;
}

function renderProfile() {
  document.getElementById('pName').value = state.profile.name;
  document.getElementById('pSlug').value = state.profile.slug;
  document.getElementById('pBirth').value = state.profile.birth;
  document.getElementById('pAbout').value = state.profile.about;
  document.getElementById('pAvatar').value = state.profile.avatar;
  document.getElementById('p2fa').checked = state.profile.twoFA;
}

function renderPlans() {
  document.getElementById('plansGrid').innerHTML = `
    <div class="card">
      <h3>COMMUNITY VIP LICENSE <span class="pill good">ACTIVE</span></h3>
      <div style="font-family:var(--font-display); font-size:22px; font-weight:800; margin:8px 0; color:var(--primary);">RM 0.00</div>
      <ul style="padding-left:18px; font-size:12px; color:var(--text-dim); margin-bottom:14px;">
        <li>All 4 World Themes Unlocked (Superhero, Ninja, Zombie, WW2)</li>
        <li>Unlimited Active Tasks & Matrices</li>
        <li>Full Export of .lockin Design Files</li>
        <li>Daily XP Cap Expanded to 200 pts</li>
      </ul>
      <button class="btn btn-primary small" disabled style="width:100%; justify-content:center;">UNLOCKED FOR ALL</button>
    </div>
  `;
}

function renderAdmin() {
  const kpis = [
    { label: 'Active Runners', value: state.adminUsers.length, cls: 'accent' },
    { label: 'Abuse Flags', value: state.adminFlags.length, cls: state.adminFlags.length ? 'warn' : 'good' },
    { label: 'Blueprints Listed', value: state.templates.length, cls: 'neutral' },
    { label: 'Moderation Queue', value: state.modQueue.length, cls: 'good' },
  ];
  document.getElementById('adminKpis').innerHTML = kpis.map(s => `
    <div class="card stat ${s.cls}">
      <div class="value num">${s.value}</div>
      <div class="label">${s.label}</div>
    </div>
  `).join('');

  document.getElementById('adminUsersBody').innerHTML = state.adminUsers.map((u, idx) => `
    <tr style="${u.suspended ? 'opacity:.4;' : ''}">
      <td>${u.name}</td>
      <td><span class="pill good">${u.plan.toUpperCase()}</span></td>
      <td><span class="pill ${u.risk >= 50 ? 'warn' : 'good'}">${u.risk}</span></td>
      <td><button class="btn small ${u.suspended ? 'ghost' : 'danger'}" data-suspend="${idx}">${u.suspended ? 'Reinstate' : 'Suspend'}</button></td>
    </tr>`).join('');
  document.querySelectorAll('[data-suspend]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.adminUsers[btn.dataset.suspend].suspended = !state.adminUsers[btn.dataset.suspend].suspended;
      saveState(); renderAdmin();
    });
  });

  document.getElementById('adminFlagsBody').innerHTML = state.adminFlags.length ? state.adminFlags.map(f => `
    <tr>
      <td>${f.user}</td>
      <td style="font-size:11px;">${f.reason}</td>
      <td><span class="pill warn">${f.risk}</span></td>
    </tr>`).join('') : '<tr><td colspan="3" style="color:var(--text-dim); text-align:center; padding:12px;">No infractions recorded.</td></tr>';

  document.getElementById('adminModQueue').innerHTML = '<p style="color:var(--text-dim); font-size:12px;">Queue is clear.</p>';

  document.getElementById('adminBpConfigBody').innerHTML = state.bpConfig.map((row, idx) => `
    <tr>
      <td class="num">${row.lvl}</td>
      <td><input type="text" data-cfg="free|${idx}" value="${row.free}"></td>
      <td><input type="text" data-cfg="vip|${idx}" value="${row.vip}"></td>
    </tr>`).join('');
  document.querySelectorAll('[data-cfg]').forEach(inp => {
    inp.addEventListener('change', e => {
      const [field, idx] = e.target.dataset.cfg.split('|');
      state.bpConfig[idx][field] = e.target.value;
      saveState(); renderBattlepass();
    });
  });
}

function renderAll() {
  renderHome();
  renderLists();
  renderBattlepass();
  renderThemes();
  renderFriends();
  renderGroups();
  renderChatList();
  renderChatMsgs();
  renderTemplates();
  renderMarketplace(document.getElementById('marketSearch').value || '');
  renderProfile();
  renderPlans();
  renderAdmin();
  if (isAdminAuthorized) revealAdminTab();
}

/* ============================================================
   9. EVENT LISTENERS
============================================================ */
document.getElementById('brandLogoTrigger').addEventListener('click', brandTripleClickTrigger);
document.getElementById('unlockAdminBtn').addEventListener('click', verifyAdminAccess);
document.getElementById('cancelAdminBtn').addEventListener('click', closeAdminAuth);

document.getElementById('mobMenuBtn').addEventListener('click', () => toggleSidebar(true));
document.getElementById('sidebarOverlay').addEventListener('click', () => toggleSidebar(false));

document.getElementById('rerollIdBtn').addEventListener('click', generateNewIdentity);
document.getElementById('claimIdBtn').addEventListener('click', () => {
  const alias = document.getElementById('agentAliasInput').value.trim();
  const finalId = stagedUniqueId || generateCryptographicUniqueId();
  state = seedState({ id: finalId, name: alias || finalId });
  saveState();
  applyTheme();
  document.getElementById('authModal').style.display = 'none';
  toast(`Welcome to the matrix, ${state.profile.name}`);
  renderAll();
});

document.getElementById('unlinkBtn').addEventListener('click', () => {
  generateNewIdentity();
  document.getElementById('authModal').style.display = 'flex';
});

document.getElementById('newListBtn').addEventListener('click', () => {
  const title = prompt('Matrix Title:');
  if (!title) return;
  state.lists.push({ id: uid('l'), title, tasks: [] });
  saveState(); renderAll();
});

document.getElementById('saveThemeBtn').addEventListener('click', () => {
  const name = prompt('Theme codename:', 'World_' + (state.savedThemes.length + 1));
  if (!name) return;
  state.savedThemes.push({ name, vars: { ...state.theme } });
  saveState(); renderThemes(); toast('Palette saved');
});
document.getElementById('resetThemeBtn').addEventListener('click', () => {
  equipThemePack('blade_runner');
  toast('Restored to Blade Runner');
});

document.getElementById('importLockinBtn').addEventListener('click', () => {
  document.getElementById('lockinFileUploader').click();
});
document.getElementById('lockinFileUploader').addEventListener('change', handleFileImport);
document.getElementById('exportLockinBtn').addEventListener('click', exportCurrentThemeAsLockin);
document.getElementById('publishMarketBtn').addEventListener('click', publishActivePackToMarketplace);

document.getElementById('friendAddBtn').addEventListener('click', () => {
  const val = document.getElementById('friendAddInput').value.trim();
  if (!val) return;
  state.friends.push({ id: uid('f'), name: val, status: 'accepted' });
  document.getElementById('friendAddInput').value = '';
  saveState(); renderFriends(); toast('Peer linked');
});
document.getElementById('weeklyOptIn').addEventListener('change', e => {
  state.profile.weeklyOptIn = e.target.checked; saveState();
});

document.getElementById('newGroupBtn').addEventListener('click', () => {
  const name = prompt('Squad designation:');
  if (!name) return;
  state.groups.push({ id: uid('g'), name, listId: null, members: [{ name: state.profile.name + ' (You)', role: 'owner' }] });
  state.conversations.push({ id: uid('c'), type: 'group', name, messages: [] });
  saveState(); renderAll(); toast('Squad created');
});

document.getElementById('chatSendBtn').addEventListener('click', () => {
  const conv = state.conversations.find(c => c.id === activeConvId);
  const input = document.getElementById('chatInput');
  if (!conv || !input.value.trim()) return;
  conv.messages.push({ from: 'me', text: input.value.trim(), time: 'now' });
  input.value = ''; saveState(); renderChatMsgs();
  if (conv.type === 'direct') {
    setTimeout(() => {
      conv.messages.push({ from: 'them', text: 'Signal acknowledged. Locked in.', time: 'now' });
      saveState(); renderChatMsgs();
    }, 700);
  }
});
document.getElementById('chatPinBtn').addEventListener('click', () => {
  const conv = state.conversations.find(c => c.id === activeConvId);
  if (!conv) return;
  const allTasks = state.lists.flatMap(l => l.tasks.map(t => t.title));
  if (!allTasks.length) { toast('No tasks to pin', true); return; }
  const title = prompt('Pin which task?\n' + allTasks.join('\n'));
  if (!title || !allTasks.includes(title)) return;
  conv.messages.push({ from: 'me', text: '📌 Task: ' + title, time: 'now', tasklink: true });
  saveState(); renderChatMsgs();
});

document.getElementById('saveProfileBtn').addEventListener('click', () => {
  state.profile.name = document.getElementById('pName').value;
  state.profile.birth = document.getElementById('pBirth').value;
  state.profile.about = document.getElementById('pAbout').value;
  state.profile.avatar = document.getElementById('pAvatar').value || '🎯';
  saveState(); renderAll(); toast('Dossier updated');
});
document.getElementById('p2fa').addEventListener('change', e => {
  state.profile.twoFA = e.target.checked; saveState(); toast(e.target.checked ? '2FA Active' : '2FA Bypassed');
});
document.getElementById('exportDataBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'lockin-telemetry.json'; a.click();
  URL.revokeObjectURL(url);
});
document.getElementById('deleteAccountBtn').addEventListener('click', () => {
  if (!confirm('Purge all memory registers?')) return;
  localStorage.removeItem(STORE_KEY);
  location.reload();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Restore factory seeds?')) return;
  localStorage.removeItem(STORE_KEY);
  localStorage.removeItem('lockin_admin_auth');
  location.reload();
});

document.getElementById('marketSearch').addEventListener('input', e => renderMarketplace(e.target.value));

/* ============================================================
   10. BOOTSTRAP
============================================================ */
loadState();
if (!state || !state.profile) {
  generateNewIdentity();
  document.getElementById('authModal').style.display = 'flex';
} else {
  if (state.bp.lastActiveDate !== todayStr()) {
    state.bp.pointsToday = 0;
    state.bp.lastActiveDate = todayStr();
  }
  applyTheme();
  renderAll();
}