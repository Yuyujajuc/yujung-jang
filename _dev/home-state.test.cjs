const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('projects.js', 'utf8');
test('Safe-T has list cover, title and filter metadata', () => {
  const project = vm.runInNewContext(source.split('const projectsContainer =')[0] + '\nprojects.find(p => p.id === "safet")');
  assert.ok(project.title);
  assert.equal(project.category, 'Identity');
  assert.equal(project.date, '2026');
  assert.equal(project.cover.src, 'videos/safet/cover.mp4');
  assert.equal(project.views.grid.cover.src, 'videos/safet/grid-cover.mp4');
});
function controller(saved) {
  const listeners = {};
  const storage = new Map(saved ? [['portfolio:return', JSON.stringify(saved)]] : []);
  const container = { innerHTML: '' };
  const document = { querySelector: selector => selector === '.projects' ? container : null, body: { dataset: {} }, querySelectorAll: () => [], addEventListener: (name, fn) => { listeners[name] = fn; }, dispatchEvent: () => {} };
  const window = { addEventListener: () => {}, scrollY: 417, scrollTo: () => {} };
  const context = vm.createContext({ document, window, location: {search:''}, history:{}, URLSearchParams, sessionStorage: {getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}, CustomEvent:class {}, requestAnimationFrame:()=>{}, ResizeObserver:class {observe(){} disconnect(){}} });
  vm.runInContext(fs.readFileSync('project-view.js','utf8'), context);
  return {document, window, listeners, storage, context, container};
}
test('fresh home defaults to grid; early list click survives renderer initialization', () => {
  const c=controller();
  assert.equal(c.window.PortfolioHome.state.view,'grid');
  c.listeners.click({target:{closest:s=>s==='.view-button'?{dataset:{view:'list'}}:null}});
  c.window.PortfolioHome.sync();
  assert.equal(c.document.body.dataset.view,'list');
  vm.runInContext(source, c.context);
  assert.ok(c.container.innerHTML.includes('videos/safet/cover.mp4'));
  assert.ok(!c.container.innerHTML.includes('videos/safet/grid-cover.mp4'));
});
test('return restores view, category and scroll target', () => {
  const c=controller({view:'list',category:'Identity',scrollY:417});
  assert.equal(c.window.PortfolioHome.state.view,'list');
  assert.equal(c.window.PortfolioHome.state.category,'Identity');
  assert.equal(c.window.PortfolioHome.state.scrollY,417);
});
test('view listener loads before styles and visible buttons', () => {
  const html=fs.readFileSync('index.html','utf8');
  assert.ok(html.indexOf('src="project-view.js') < html.indexOf('rel="stylesheet"'));
});

test('project click saves all three values for the next home visit', () => {
  const c = controller();
  c.window.PortfolioHome.state.view = 'grid';
  c.window.PortfolioHome.state.category = 'Identity';
  c.listeners.click({target:{closest:selector=>selector.startsWith('.projects a')?{}:null}});
  const saved = JSON.parse(c.storage.get('portfolio:return'));
  assert.deepEqual(saved, {view:'grid', category:'Identity', scrollY:417});
  const returned = controller(saved);
  vm.runInContext(source, returned.context);
  assert.ok(returned.container.innerHTML.includes('id=safet'));
  assert.ok(!returned.container.innerHTML.includes('id=bluetooth'));
});
