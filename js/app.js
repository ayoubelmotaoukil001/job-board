import { fetchOffers } from './data.js';
import {
  renderLoading,
  renderError,
  renderOffers,
  updateOfferCount
} from './render.js';
import { applyAllFilters } from './filters.js';
import { toggleFollowOffer } from './storage.js';

let allOffers = [];

const currentFilters = {
  keyword: '',
  contract: 'all',
  city: '',
  technologies: [],
  sortOrder: 'recent'
};

const container = document.querySelector('#offers-container');
const countElement = document.querySelector('#offer-count');
const searchInput = document.querySelector('#search-input');
const contractSelect = document.querySelector('#contract-filter');
const citySelect = document.querySelector('#city-filter');
const sortSelect = document.querySelector('#sort-select');
const techCheckboxes = document.querySelectorAll('input[name="tech"]');

function updateUI() {
  const filteredOffers = applyAllFilters(allOffers, currentFilters);
  renderOffers(container, filteredOffers);
  updateOfferCount(countElement, filteredOffers.length);
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentFilters.keyword = e.target.value;
    updateUI();
  });
}

if (contractSelect) {
  contractSelect.addEventListener('change', (e) => {
    currentFilters.contract = e.target.value;
    updateUI();
  });
}

if (citySelect) {
  citySelect.addEventListener('change', (e) => {
    currentFilters.city = e.target.value;
    updateUI();
  });
}

if (techCheckboxes.length > 0) {
  techCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const checkedTechs = [];
      techCheckboxes.forEach((cb) => {
        if (cb.checked) {
          checkedTechs.push(cb.value);
        }
      });
      currentFilters.technologies = checkedTechs;
      updateUI();
    });
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    currentFilters.sortOrder = e.target.value;
    updateUI();
  });
}

if (container) {
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-follow');
    if (!btn) return;

    const offerId = Number(btn.dataset.id);
    const isNowFollowed = toggleFollowOffer(offerId);

    btn.textContent = isNowFollowed ? 'unfollow' : 'follow';
  });
}

async function init() {
  if (!container) return;

  renderLoading(container);

  try {
    allOffers = await fetchOffers();
    updateUI();
  } catch (error) {
    renderError(container, 'Erreur lors du chargement des offres.');
  }
}

init();