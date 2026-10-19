/**
 * Hudební Festival Aurora 2026 - Globální aplikační skript
 * Zajišťuje navigaci, odpočet, správu oblíbených v localStorage a pomocné funkce.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  updateFavoritesCounter();
  initCountdown();
});

// Zvýraznění aktivní stránky v navigaci
function initNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav.main-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Správa oblíbených položek (localStorage)
const STORAGE_KEY = 'aurora_festival_favorites';

function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Chyba čtení localStorage:", e);
    return [];
  }
}

function toggleFavorite(eventId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(eventId);
  let isAdded = false;

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(eventId);
    isAdded = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Chyba zápisu localStorage:", e);
  }

  updateFavoritesCounter();
  window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: { favorites, eventId, isAdded } }));
  return isAdded;
}

function isFavorite(eventId) {
  return getFavorites().includes(eventId);
}

function updateFavoritesCounter() {
  const count = getFavorites().length;
  const badges = document.querySelectorAll('.favorites-count-badge');
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-block' : 'none';
  });
}

// Detekce kolizí v seznamu vybraných událostí
function detectScheduleConflicts(eventList) {
  const conflicts = [];
  const sorted = [...eventList].sort((a, b) => {
    const timeA = new Date(`${a.day}T${a.startTime}`).getTime();
    const timeB = new Date(`${b.day}T${b.startTime}`).getTime();
    return timeA - timeB;
  });

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const current = sorted[i];
      const next = sorted[j];

      if (current.day !== next.day) continue;

      const currentStart = new Date(`${current.day}T${current.startTime}`).getTime();
      const currentEnd = currentStart + (current.durationMin * 60 * 1000);
      const nextStart = new Date(`${next.day}T${next.startTime}`).getTime();
      const nextEnd = nextStart + (next.durationMin * 60 * 1000);

      // Překryv: max(startA, startB) < min(endA, endB)
      const overlapStart = Math.max(currentStart, nextStart);
      const overlapEnd = Math.min(currentEnd, nextEnd);

      if (overlapStart < overlapEnd) {
        conflicts.push({
          eventA: current,
          eventB: next,
          overlapMin: Math.round((overlapEnd - overlapStart) / 60000)
        });
      }
    }
  }

  return conflicts;
}

// Odpočet do zahájení festivalu (20. 8. 2026 10:00)
function initCountdown() {
  const countdownEl = document.getElementById('festival-countdown');
  if (!countdownEl) return;

  const targetDate = new Date('2026-08-20T10:00:00+02:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.textContent = 'Festival právě probíhá!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdownEl.textContent = `${days} dní, ${hours} h, ${mins} min do zahájení`;
  }

  updateTimer();
  setInterval(updateTimer, 60000);
}
