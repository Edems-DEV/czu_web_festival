/**
 * Hudební Festival Aurora 2026 - Logika programu
 * Zajišťuje dynamické načítání 60 událostí, vícekriteriální filtr, vyhledávání,
 * přepínání zobrazení "Můj program" a okamžitou detekci kolizí.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getFestivalData();
  if (!data) {
    console.error("Festivalová data nejsou k dispozici.");
    return;
  }

  initSchedule(data);
});

function initSchedule(data) {
  const { events, performers, venues } = data;

  // Mapy pro rychlé vyhledávání
  const performerMap = new Map(performers.map(p => [p.id, p]));
  const venueMap = new Map(venues.map(v => [v.id, v]));

  // DOM prvky
  const container = document.getElementById('schedule-list');
  const searchInput = document.getElementById('schedule-search');
  const dayFilters = document.querySelectorAll('.day-filter-chip');
  const venueFilters = document.querySelectorAll('.venue-filter-chip');
  const typeFilters = document.querySelectorAll('.type-filter-chip');
  const viewToggleBtn = document.getElementById('toggle-my-schedule');
  const conflictAlertBox = document.getElementById('conflict-alert-box');
  const activeCountEl = document.getElementById('filtered-count');

  // Stav filtru
  const state = {
    selectedDay: 'all',
    selectedVenue: 'all',
    selectedType: 'all',
    searchQuery: '',
    onlyFavorites: false
  };

  // Zkontrolovat URL parametry (např. ?view=my-schedule nebo ?day=2026-08-20)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'my-schedule') {
    state.onlyFavorites = true;
    if (viewToggleBtn) {
      viewToggleBtn.classList.add('active');
      viewToggleBtn.textContent = 'Zobrazit celý program';
    }
  }

  // Event listenery pro dny
  dayFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      dayFilters.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      state.selectedDay = chip.dataset.day;
      render();
    });
  });

  // Event listenery pro scény
  venueFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      venueFilters.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      state.selectedVenue = chip.dataset.venue;
      render();
    });
  });

  // Event listenery pro typy akcí
  typeFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      typeFilters.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      state.selectedType = chip.dataset.type;
      render();
    });
  });

  // Vyhledávání
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      render();
    });
  }

  // Přepínač "Můj program"
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
      state.onlyFavorites = !state.onlyFavorites;
      if (state.onlyFavorites) {
        viewToggleBtn.classList.add('active');
        viewToggleBtn.setAttribute('aria-pressed', 'true');
        viewToggleBtn.textContent = 'Zobrazit celý program';
      } else {
        viewToggleBtn.classList.remove('active');
        viewToggleBtn.setAttribute('aria-pressed', 'false');
        viewToggleBtn.textContent = '★ Zobrazit pouze můj program';
      }
      render();
    });
  }

  // Naslouchat na změnu oblíbených
  window.addEventListener('favoritesUpdated', () => {
    render();
  });

  // Hlavní vykreslovací funkce
  function render() {
    const favorites = getFavorites();

    // Filtrování
    const filtered = events.filter(item => {
      const perf = performerMap.get(item.performerId);
      const venue = venueMap.get(item.venueId);

      // Filtr den
      if (state.selectedDay !== 'all' && item.day !== state.selectedDay) return false;

      // Filtr scéna
      if (state.selectedVenue !== 'all' && item.venueId !== state.selectedVenue) return false;

      // Filtr typ
      if (state.selectedType !== 'all' && item.type !== state.selectedType) return false;

      // Filtr pouze oblíbené
      if (state.onlyFavorites && !favorites.includes(item.id)) return false;

      // Fulltext vyhledávání
      if (state.searchQuery) {
        const titleMatch = item.title.toLowerCase().includes(state.searchQuery);
        const perfMatch = perf && (perf.name.toLowerCase().includes(state.searchQuery) || perf.genre.toLowerCase().includes(state.searchQuery));
        const venueMatch = venue && venue.name.toLowerCase().includes(state.searchQuery);
        if (!titleMatch && !perfMatch && !venueMatch) return false;
      }

      return true;
    });

    // Řazení podle času
    filtered.sort((a, b) => {
      const timeA = new Date(`${a.day}T${a.startTime}`).getTime();
      const timeB = new Date(`${b.day}T${b.startTime}`).getTime();
      return timeA - timeB;
    });

    // Kontrola kolizí v oblíbených položkách
    const userFavoritesEvents = events.filter(e => favorites.includes(e.id));
    const conflicts = detectScheduleConflicts(userFavoritesEvents);
    const conflictingEventIds = new Set();
    conflicts.forEach(c => {
      conflictingEventIds.add(c.eventA.id);
      conflictingEventIds.add(c.eventB.id);
    });

    if (conflictAlertBox) {
      if (conflicts.length > 0 && (state.onlyFavorites || userFavoritesEvents.length > 0)) {
        conflictAlertBox.style.display = 'block';
        conflictAlertBox.innerHTML = `
          <strong>⚠️ Upozornění na časový konflikt v Mém programu (${conflicts.length}):</strong><br>
          ${conflicts.map(c => `
            • <em>${c.eventA.title}</em> (${c.eventA.startTime}) a <em>${c.eventB.title}</em> (${c.eventB.startTime}) na scénách 
            ${venueMap.get(c.eventA.venueId)?.name} / ${venueMap.get(c.eventB.venueId)?.name} se překrývají o ${c.overlapMin} minut.
          `).join('<br>')}
        `;
      } else {
        conflictAlertBox.style.display = 'none';
      }
    }

    if (activeCountEl) {
      activeCountEl.textContent = `${filtered.length} z 60 akcí`;
    }

    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div id="empty-schedule-state" class="empty-state">
          <span class="empty-icon" aria-hidden="true">🔍</span>
          <h3>Žádná vystoupení neodpovídají zadanému filtru</h3>
          <p>Zkuste upravit vyhledávací dotaz nebo vybrat jiný den či scénu.</p>
          <button id="btn-reset-filters" class="btn btn-secondary" style="min-height: 44px; padding: 0.6rem 1.25rem;">
            Resetovat všechny filtry
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.selectedDay = 'all';
          state.selectedVenue = 'all';
          state.selectedType = 'all';
          state.searchQuery = '';
          if (searchInput) searchInput.value = '';
          dayFilters.forEach(c => {
            const isAll = c.dataset.day === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-pressed', isAll ? 'true' : 'false');
          });
          venueFilters.forEach(c => {
            const isAll = c.dataset.venue === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-pressed', isAll ? 'true' : 'false');
          });
          typeFilters.forEach(c => {
            const isAll = c.dataset.type === 'all';
            c.classList.toggle('active', isAll);
            c.setAttribute('aria-pressed', isAll ? 'true' : 'false');
          });
          render();
        });
      }
      return;
    }

    // Seskupení podle dnů pro přehlednost
    const daysMap = {
      '2026-08-20': 'Čtvrtek 20. 8. 2026',
      '2026-08-21': 'Pátek 21. 8. 2026',
      '2026-08-22': 'Sobota 22. 8. 2026'
    };

    let html = '';
    let currentDayGroup = '';

    // Zachování sémantické hierarchie nadpisů i při vyfiltrovaném jednom dni
    if (state.selectedDay !== 'all') {
      html += `<h3 style="margin: 1.5rem 0 1rem; color: var(--accent-cyan); font-size: 1.4rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">${daysMap[state.selectedDay] || state.selectedDay}</h3>`;
    }

    filtered.forEach(item => {
      const perf = performerMap.get(item.performerId) || { name: 'Neznámý interpret', genre: 'Hudba' };
      const venue = venueMap.get(item.venueId) || { name: 'Neznámá scéna' };
      const isFav = favorites.includes(item.id);
      const hasConflict = isFav && conflictingEventIds.has(item.id);

      if (item.day !== currentDayGroup && state.selectedDay === 'all') {
        currentDayGroup = item.day;
        html += `<h3 style="margin: 2rem 0 1rem; color: var(--accent-cyan); font-size: 1.4rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">${daysMap[item.day] || item.day}</h3>`;
      }

      const typeBadgeClass = item.type === 'concert' ? 'var(--accent-cyan)' : (item.type === 'talk' ? 'var(--accent-amber)' : 'var(--accent-purple)');
      const typeLabel = item.type === 'concert' ? 'Koncert' : (item.type === 'talk' ? 'Talk' : 'Workshop');

      html += `
        <article class="card ${hasConflict ? 'card-conflict card-has-conflict' : ''}" style="margin-bottom: 1rem; padding: 1.25rem; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div style="flex: 1; min-width: 260px;">
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
              <time datetime="${item.day}T${item.startTime}" style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary); background: var(--bg-surface-elevated); padding: 0.2rem 0.6rem; border-radius: var(--radius-sm);">
                ${item.startTime}
              </time>
              <span style="font-size: 0.8rem; color: ${typeBadgeClass}; font-weight: 700; text-transform: uppercase;">
                ${typeLabel} (${item.durationMin} min)
              </span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">•</span>
              <a href="venues.html#${item.venueId}" style="font-size: 0.85rem; color: var(--text-secondary);">
                📍 ${venue.name}
              </a>
              ${hasConflict ? `<span class="conflict-badge">⚠️ Časová kolize v mém programu!</span>` : ''}
            </div>

            <h4 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.25rem;">
              <a href="performer-detail.html?id=${item.performerId}" style="color: var(--text-primary);">
                ${item.title}
              </a>
            </h4>
            
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0;">
              Interpret: <strong><a href="performer-detail.html?id=${item.performerId}">${perf.name}</a></strong> 
              (${perf.genre} • ${perf.country}) – ${item.description}
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button 
              class="btn btn-secondary btn-fav-toggle" 
              data-id="${item.id}"
              aria-pressed="${isFav ? 'true' : 'false'}"
              aria-label="${isFav ? 'Odebrat z mého programu' : 'Přidat do mého programu'}"
              style="padding: 0.5rem 0.9rem; font-size: 0.85rem; min-height: 44px; border-color: ${isFav ? 'var(--accent-amber)' : 'var(--border-subtle)'}; color: ${isFav ? 'var(--accent-amber)' : 'var(--text-secondary)'};"
            >
              ${isFav ? '★ V mém programu' : '☆ Přidat'}
            </button>
            <a href="performer-detail.html?id=${item.performerId}" class="btn btn-secondary" style="padding: 0.5rem 0.9rem; font-size: 0.85rem; min-height: 44px; display: inline-flex; align-items: center;">
              Detail →
            </a>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;

    // Obsluha kliknutí na tlačítka oblíbených
    container.querySelectorAll('.btn-fav-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        toggleFavorite(id);
      });
    });
  }

  // První vykreslení
  render();
}
