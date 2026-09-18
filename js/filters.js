export function applyAllFilters(offers, filters = {}) {
  if (!Array.isArray(offers)) return [];

  let result = offers.filter((offer) => {
    // 1. Keyword / Search filter
    const searchKeyword = filters.keyword || filters.search;
    if (searchKeyword && searchKeyword.trim() !== '') {
      const kw = searchKeyword.toLowerCase().trim();
      const matchTitre = offer.titre?.toLowerCase().includes(kw);
      const matchEntreprise = offer.entreprise?.toLowerCase().includes(kw);
      const matchDesc = offer.descriptionCourte?.toLowerCase().includes(kw);
      if (!matchTitre && !matchEntreprise && !matchDesc) {
        return false;
      }
    }

    // 2. Contract filter ('stage', 'alternance', or 'all')
    if (filters.contract && filters.contract !== 'all' && filters.contract !== '') {
      if (offer.typeContrat?.toLowerCase() !== filters.contract.toLowerCase()) {
        return false;
      }
    }

    // 3. City filter
    if (filters.city && filters.city !== '' && filters.city !== 'all') {
      if (offer.ville?.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    // 4. Technology filter
    const tech = filters.technology || filters.technologies;
    if (tech) {
      if (Array.isArray(tech) && tech.length > 0) {
        const offerTechs = offer.technologies?.map((t) => t.toLowerCase()) || [];
        const hasTech = tech.some((t) => offerTechs.includes(t.toLowerCase()));
        if (!hasTech) return false;
      } else if (typeof tech === 'string' && tech.trim() !== '') {
        const offerTechs = offer.technologies?.map((t) => t.toLowerCase()) || [];
        if (!offerTechs.includes(tech.toLowerCase().trim())) return false;
      }
    }

    return true;
  });

  // Sorting
  if (filters.sortOrder === 'oldest') {
    result.sort((a, b) => new Date(a.datePublication) - new Date(a.datePublication));
  } else {
    // Default: recent first
    result.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
  }

  return result;
}

export function filterOffers(offres, filters) {
  return applyAllFilters(offres, filters);
}

export function sortOffersByDate(offers) {
  return [...offers].sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
}

export function resetFilters() {
  return {
    keyword: '',
    search: '',
    technology: '',
    technologies: [],
    city: '',
    contract: 'all',
    sortOrder: 'recent'
  };
}



