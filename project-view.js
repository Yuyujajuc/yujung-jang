// Install before styles/media load so even an early view click is retained.
(() => {
  // Fresh-visit view: 'grid' or 'list'. Keep index.html's initial view in sync.
  const defaultView = 'grid';
  const key = 'portfolio:return';
  const categories = ['all', 'Presentation', 'Editorial', 'Identity', 'Motion + Web', 'Infographics', 'other'];
  let saved;
  try {
    saved = JSON.parse(sessionStorage.getItem(key));
    sessionStorage.removeItem(key);
  } catch { /* Browsing still works when storage is unavailable. */ }
  const requestedCategory = new URLSearchParams(location.search).get('category');
  const state = {
    view: ['grid', 'list'].includes(saved?.view) ? saved.view : defaultView,
    category: categories.includes(requestedCategory) ? requestedCategory :
      categories.includes(saved?.category) ? saved.category : 'all',
    scrollY: !requestedCategory && Number.isFinite(saved?.scrollY) ? Math.max(0, saved.scrollY) : 0
  };
  let restoring = state.scrollY > 0;
  let observer;
  history.scrollRestoration = 'manual';

  function sync() {
    if (!document.body) return;
    document.body.dataset.view = state.view;
    document.querySelectorAll('.view-button').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
    document.querySelectorAll('.filter').forEach(button => {
      const active = button.dataset.filter === state.category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  function stopRestoring() {
    restoring = false;
    observer?.disconnect();
  }
  function restore() {
    if (restoring) window.scrollTo({ top: state.scrollY, behavior: 'instant' });
  }
  function save() {
    state.scrollY = window.scrollY;
    try { sessionStorage.setItem(key, JSON.stringify(state)); } catch { /* Optional persistence. */ }
  }
  document.addEventListener('click', event => {
    const view = event.target.closest('.view-button');
    const category = event.target.closest('.filter');
    if (view || category) {
      stopRestoring();
      if (view) state.view = view.dataset.view === 'grid' ? 'grid' : 'list';
      if (category) {
        state.category = category.dataset.filter;
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      sync();
      document.dispatchEvent(new CustomEvent('portfolio:homechange'));
    }
    if (event.target.closest('.projects a[href^="project.html"]')) save();
  });
  // Stop automatic corrections as soon as the visitor starts interacting.
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(name =>
    window.addEventListener(name, stopRestoring, { passive: true }));
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    try { sessionStorage.removeItem(key); } catch { /* Optional persistence. */ }
    sync();
    restoring = state.scrollY > 0;
    restore();
  });
  window.PortfolioHome = {
    state, sync,
    restoreScroll(root) {
      if (!restoring) return;
      // Reapply while fonts/media settle; a saved offset can initially exceed page height.
      observer = new ResizeObserver(restore);
      observer.observe(root);
      window.addEventListener('load', restore, { once: true });
      document.fonts?.ready.then(restore);
      requestAnimationFrame(restore);
    }
  };
})();
