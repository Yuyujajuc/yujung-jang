/* Shared block renderer. Only pages explicitly opting in use these components. */
(() => {
  'use strict';
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const number = (value, fallback, min = 0, max = 10000) =>
    Number.isFinite(Number(value)) ? Math.min(max, Math.max(min, Number(value))) : fallback;
  const ratio = value => {
    if (typeof value === 'number' && value > 0) return String(value);
    if (typeof value === 'string' && /^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(value)) {
      const [w, h] = value.split('/').map(Number);
      if (w > 0 && h > 0) return `${w} / ${h}`;
    }
    return null;
  };

  function media(data = {}, options = {}) {
    const figure = el('figure', 'pb-figure');
    const stage = el('div', 'pb-media');
    const aspect = ratio(options.aspectRatio ?? data.aspectRatio);
    if (aspect) {
      stage.classList.add('pb-ratio');
      stage.style.aspectRatio = aspect;
    }
    stage.style.setProperty('--media-fit', options.fit || data.fit || 'contain');
    stage.style.setProperty('--media-position', data.position || '50% 50%');
    if (!data.src) {
      stage.classList.add('pb-placeholder');
      if (!aspect) stage.style.aspectRatio = '4 / 3';
      stage.setAttribute('role', 'img');
      stage.setAttribute('aria-label', data.placeholder || 'Media to be assigned');
      stage.append(el('span', '', data.placeholder || 'Media to be assigned'));
    } else if (data.type === 'video') {
      const video = el('video');
      video.preload = ['auto', 'metadata'].includes(data.preload) ? data.preload : 'none';
      video.loop = Boolean(data.loop);
      video.muted = data.muted ?? Boolean(data.autoplay);
      video.defaultMuted = video.muted;
      video.controls = data.controls ?? !data.autoplay;
      video.playsInline = data.playsinline !== false;
      if (data.poster) video.poster = data.poster;
      video.setAttribute('aria-label', data.alt || 'Project video');
      video.dataset.src = data.src;
      if (data.autoplayOnView) video.dataset.autoplayOnView = 'true';
      else if (data.autoplay) video.dataset.autoplay = 'true';
      if (data.width && data.height) { video.width = data.width; video.height = data.height; }
      stage.append(video);
    } else {
      const img = el('img');
      img.src = data.src;
      img.alt = data.alt || '';
      img.loading = options.hero ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (options.hero) img.fetchPriority = 'high';
      if (data.width && data.height) { img.width = data.width; img.height = data.height; }
      stage.append(img);
    }
    figure.append(stage);
    if (data.caption) figure.append(el('figcaption', '', data.caption));
    return figure;
  }

  function presentation(data, section) {
    section.classList.add('pb-presentation');
    section.tabIndex = 0;
    section.setAttribute('role', 'region');
    section.setAttribute('aria-roledescription', 'carousel');
    section.setAttribute('aria-label', data.label || 'Presentation');
    const stage = el('div', 'pb-presentation-stage');
    stage.style.aspectRatio = ratio(data.aspectRatio) || '16 / 9';
    const slides = data.slides || [];
    let index = 0;
    let visible = false;
    let manuallyPaused = false;
    let automaticPause = false;
    const figures = slides.map((slide, i) => {
      const figure = media({ ...slide, autoplay: false, autoplayOnView: false, controls: slide.controls ?? true }, { aspectRatio: data.aspectRatio || '16 / 9', fit: 'contain' });
      figure.hidden = i !== 0;
      figure.setAttribute('role', 'group');
      figure.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
      const video = figure.querySelector('video');
      if (video) {
        video.dataset.presentationSlide = 'true';
        video.muted = slide.muted ?? Boolean(slide.autoplay);
        video.defaultMuted = video.muted;
        video.addEventListener('pause', () => {
          if (!automaticPause && visible && i === index) manuallyPaused = true;
          automaticPause = false;
        });
        video.addEventListener('play', () => { manuallyPaused = false; });
      }
      stage.append(figure);
      return figure;
    });
    const controls = el('div', 'pb-presentation-controls');
    const previous = el('button', 'pb-presentation-previous', '←');
    const next = el('button', 'pb-presentation-next', '→');
    const counter = el('span', 'pb-presentation-counter');
    counter.setAttribute('aria-live', 'polite');
    previous.type = next.type = 'button';
    previous.setAttribute('aria-label', 'Previous slide');
    next.setAttribute('aria-label', 'Next slide');
    const fullscreen = el('button', 'pb-presentation-fullscreen');
    fullscreen.type = 'button';
    fullscreen.setAttribute('aria-label', 'Enter fullscreen');
    fullscreen.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/></svg>';
    fullscreen.hidden = !section.requestFullscreen;
    fullscreen.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement === section) await document.exitFullscreen();
        else await section.requestFullscreen();
      } catch { fullscreen.setAttribute('aria-label', 'Fullscreen unavailable — try again'); }
    });
    document.addEventListener('fullscreenchange', () => {
      fullscreen.setAttribute('aria-label', document.fullscreenElement === section ? 'Exit fullscreen' : 'Enter fullscreen');
    });
    controls.append(previous, next, fullscreen);
    stage.append(controls);
    section.append(stage, counter);
    function pause(video) {
      if (video && !video.paused) { automaticPause = true; video.pause(); }
    }
    function playback() {
      const video = figures[index]?.querySelector('video');
      if (!video) return;
      if (video.dataset.src) { video.src = video.dataset.src; delete video.dataset.src; }
      if (!visible || document.hidden) { pause(video); return; }
      if (slides[index].autoplay && !manuallyPaused && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.play().then(() => {
          if (!visible || document.hidden || figures[index]?.querySelector('video') !== video) pause(video);
        }).catch(() => { video.controls = true; });
      }
    }
    function show(target) {
      if (!slides.length) return;
      pause(figures[index]?.querySelector('video'));
      figures[index].hidden = true;
      index = Math.max(0, Math.min(slides.length - 1, target));
      figures[index].hidden = false;
      manuallyPaused = false;
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
      playback();
    }
    previous.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && document.fullscreenElement === section) {
        document.exitFullscreen().catch(() => {});
        return;
      }
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('video, input, textarea, select, [contenteditable="true"]')) return;
      // With multiple viewers, route keys to the one nearest the viewport centre.
      const viewers = [...document.querySelectorAll('.pb-presentation')].filter(viewer => {
        const rect = viewer.querySelector('.pb-presentation-stage').getBoundingClientRect();
        return rect.bottom > 0 && rect.top < innerHeight;
      });
      viewers.sort((a, b) => {
        const centre = viewer => { const r = viewer.querySelector('.pb-presentation-stage').getBoundingClientRect(); return Math.abs((r.top + r.bottom) / 2 - innerHeight / 2); };
        return centre(a) - centre(b);
      });
      if ((document.fullscreenElement || viewers[0]) !== section) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let start;
    stage.addEventListener('touchstart', event => {
      start = null;
      const video = event.target.closest('video');
      if (video?.controls && event.changedTouches[0].clientY > video.getBoundingClientRect().bottom - 48) return;
      start = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
    }, { passive: true });
    stage.addEventListener('touchend', event => {
      if (!start) return;
      const dx = event.changedTouches[0].clientX - start[0];
      const dy = event.changedTouches[0].clientY - start[1];
      start = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
        playback();
      }, { threshold: [0, 0.25] }).observe(stage);
    }
    document.addEventListener('visibilitychange', playback);
    show(0);
  }

  function area(node, margin = '0-column') {
    node.dataset.margin = ['full-bleed', '0-column', '1-column', '2-column'].includes(margin) ? margin : '0-column';
    return node;
  }

  function block(data) {
    const section = area(el('section', 'pb-block'), data.margin);
    section.dataset.block = data.type;
    if (data.label) section.setAttribute('aria-label', data.label);
    const gutter = number(data.gutter, 42, 0, 200);
    section.style.setProperty('--block-gutter', `${gutter}px`);
    if (data.type === 'big' || data.type === 'midsize') {
      const figure = media(data.media, { aspectRatio: data.aspectRatio, fit: data.fit });
      if (data.type === 'midsize') {
        section.classList.add('pb-midsize');
        const maxSpan = data.margin === '1-column' ? 10 : 12;
        const span = number(data.span, 6, 1, maxSpan);
        const available = data.margin === 'full-bleed' ? 12 : maxSpan;
        section.style.setProperty('--available-columns', available);
        figure.style.gridColumn = `span ${span}`;
        section.dataset.align = ['left', 'center', 'right'].includes(data.align) ? data.align : 'center';
        // Fractional starts allow a truly centered odd span in an even grid.
        const start = data.align === 'left' ? 0 : data.align === 'right' ? available - span : (available - span) / 2;
        figure.style.width = `calc((100% - (${available - 1} * var(--pb-gutter))) / ${available} * ${span} + (${span - 1} * var(--pb-gutter)))`;
        figure.style.marginLeft = `calc((100% + var(--pb-gutter)) / ${available} * ${start})`;
      }
      section.append(figure);
    } else if (data.type === 'presentation') {
      presentation(data, section);
    } else if (data.type === 'equal-grid') {
      section.classList.add('pb-equal-grid');
      section.style.setProperty('--equal-columns', Math.round(number(data.columns, 3, 1, 12)));
      section.style.setProperty('--mobile-columns', Math.round(number(data.mobileColumns, 1, 1, 4)));
      (data.items || []).forEach(item => section.append(media(item, { aspectRatio: data.aspectRatio, fit: data.fit || 'contain' })));
    } else if (data.type === 'collage') {
      section.classList.add('pb-collage');
      (data.rows || []).forEach(items => {
        const row = el('div', 'pb-collage-row');
        const columns = Math.round(number(data.columns, data.margin === '1-column' ? 10 : 12, 1, 24));
        row.style.setProperty('--collage-columns', columns);
        let used = 0;
        items.forEach(item => {
          const span = Math.round(number(item.span, 4, 1, columns));
          if (used + span > columns) throw new Error('Collage row spans exceed its column count. Start another row.');
          used += span;
          const cell = el('div', 'pb-collage-cell');
          cell.style.gridColumn = `span ${span}`;
          if (item.stack) {
            cell.classList.add('pb-stack');
            cell.style.gap = `${number(item.gutter, gutter, 0, 200)}px`;
            item.stack.forEach(entry => cell.append(media(entry)));
          } else cell.append(media(item.media || item));
          row.append(cell);
        });
        section.append(row);
      });
    } else throw new Error(`Unknown gallery block type: ${data.type}`);
    if (data.caption) {
      if (data.type === 'big' || data.type === 'midsize') {
        const figure = section.firstElementChild;
        figure.querySelector('figcaption')?.remove();
        figure.append(el('figcaption', 'pb-caption', data.caption));
      } else {
        // Captions sit outside the media grid, independently of its gutter.
        const figure = area(el('figure', 'pb-block pb-captioned-block'), data.margin);
        figure.dataset.block = data.type;
        section.classList.remove('pb-block');
        section.removeAttribute('data-margin');
        figure.append(section, el('figcaption', 'pb-caption', data.caption));
        return figure;
      }
    }
    return section;
  }

  function nextRowStart(bottom, rowHeight = 49, rowGutter = 20, offset = 37) {
    const pitch = rowHeight + rowGutter;
    const row = Math.floor((bottom - offset) / pitch);
    const within = bottom - (offset + row * pitch);
    return offset + (row + (within <= rowHeight / 4 + 0.01 ? 1 : 2)) * pitch;
  }

  function alignRows(root) {
    const blocks = [...root.querySelectorAll('.pb-gallery > .pb-block')];
    let pending = false;
    const update = () => {
      pending = false;
      const styles = getComputedStyle(root);
      const rowHeight = parseFloat(styles.getPropertyValue('--pb-row'));
      const rowGutter = parseFloat(styles.getPropertyValue('--pb-row-gutter'));
      const offset = parseFloat(styles.getPropertyValue('--pb-row-offset'));
      for (let index = 1; index < blocks.length; index++) {
        const previousBottom = blocks[index - 1].getBoundingClientRect().bottom + window.scrollY;
        const start = nextRowStart(previousBottom, rowHeight, rowGutter, offset);
        const customGap = blocks[index - 1].dataset.gapAfter;
        const gap = customGap === undefined ? start - previousBottom : Number(customGap);
        blocks[index].style.marginTop = `${gap}px`;
      }
    };
    const schedule = () => {
      if (!pending) { pending = true; requestAnimationFrame(update); }
    };
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(schedule);
      root.querySelectorAll('.pb-figure, .pb-info, .pb-block, figcaption').forEach(node => observer.observe(node));
    }
    window.addEventListener('resize', schedule);
    root.addEventListener('load', schedule, true);
    root.addEventListener('loadedmetadata', schedule, true);
    if (document.fonts) document.fonts.ready.then(schedule);
    schedule();
  }

  function observeVideos(root) {
    const load = video => {
      if (!video.dataset.src) return;
      video.src = video.dataset.src;
      delete video.dataset.src;
      if (video.dataset.autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.autoplay = true;
        video.play().catch(() => { video.controls = true; });
      } else if (video.dataset.autoplay) video.controls = true;
    };
    // Explicit preloading starts on page entry, independently of playback visibility.
    root.querySelectorAll('video[data-src]:not([data-presentation-slide])[preload="auto"], video[data-src]:not([data-presentation-slide])[preload="metadata"]').forEach(load);
    if (!('IntersectionObserver' in window)) {
      root.querySelectorAll('video[data-src]:not([data-presentation-slide])').forEach(load);
      root.querySelectorAll('video[data-autoplay-on-view]').forEach(video => { video.controls = true; });
      return;
    }
    // Attempt once, only after the video enters the viewport. Never restart a
    // video the visitor has paused or sought through using its native controls.
    const visiblePlayback = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.25) return;
        const video = entry.target;
        visiblePlayback.unobserve(video);
        load(video);
        video.controls = true;
        if (!video.paused || video.currentTime > 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        video.play().catch(() => { /* Sound autoplay may be blocked; native Play remains available. */ });
      });
    }, { threshold: 0.25 });
    root.querySelectorAll('video[data-autoplay-on-view]').forEach(video => {
      video.controls = true;
      // Manual interaction takes precedence, even before the visibility trigger.
      video.addEventListener('play', () => visiblePlayback.unobserve(video), { once: true });
      video.addEventListener('pointerdown', () => visiblePlayback.unobserve(video), { once: true });
      video.addEventListener('keydown', () => visiblePlayback.unobserve(video), { once: true });
      visiblePlayback.observe(video);
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { load(entry.target); observer.unobserve(entry.target); }
      });
    }, { rootMargin: '300px' });
    root.querySelectorAll('video[data-src]:not([data-presentation-slide])').forEach(video => observer.observe(video));
  }

  function render(project, root) {
    const page = project.page;
    if (!page || !Array.isArray(page.blocks)) throw new Error('A modular page requires page.blocks.');
    document.body.classList.add('modular-project');
    document.title = `${page.title || project.title} — Yujung Jang`;
    root.className = 'pb-page';
    root.replaceChildren();
    const hero = el('section', 'pb-hero');
    hero.setAttribute('aria-label', 'Project hero');
    hero.append(media(page.hero, { hero: true, aspectRatio: '4 / 1', fit: page.hero?.fit || 'contain' }));
    root.append(hero);
    const info = area(el('header', 'pb-info'), '1-column');
    info.append(el('h1', 'pb-title', page.title || project.title));
    const measurements = page.measurements ?? project.measurements;
    if (measurements) info.append(el('p', 'pb-measurements', measurements));
    const intro = el('div', 'pb-description');
    const description = page.description ?? project.description ?? [];
    const paragraphs = Array.isArray(description) ? description : description.trim().split(/\n\s*\n/);
    paragraphs.filter(Boolean).forEach(text => intro.append(el('p', '', text.trim())));
    info.append(intro);
    root.append(info);
    const gallery = el('div', 'pb-gallery');
    page.blocks.forEach(data => {
      const node = block(data);
      // A per-block exception replaces row snapping only for the following gap.
      if (typeof data.gapAfter === 'number' && Number.isFinite(data.gapAfter)) {
        node.dataset.gapAfter = String(number(data.gapAfter, 0, 0, 10000));
      }
      gallery.append(node);
    });
    root.append(gallery);
    observeVideos(root);
    alignRows(root);
  }
  window.ProjectBlocks = { render, block, media, nextRowStart };
})();
