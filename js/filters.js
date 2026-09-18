function filterOffers(offres, filters) {

    return offres.filter(offer => {

        const matchesCity = !filters.city || offer.ville.toLowerCase() === filters.city.toLowerCase();

        const matchesContract =
            !filters.contract ||
            offer.typeContrat.toLowerCase() === filters.contract.toLowerCase();

        const matchesTechnology =
            !filters.technology ||
            offer.technologies.some(technology => technology.toLowerCase() === filters.technology.toLowerCase()
            );

        const matchesSearch = !filters.search ||
            offer.titre.toLowerCase().includes(filters.search.toLowerCase()) ||
            offer.entreprise.toLowerCase().includes(filters.search.toLowerCase()) ||
            offer.descriptionCourte.toLowerCase().includes(filters.search.toLowerCase());

        return (matchesCity && matchesContract && matchesTechnology && matchesSearch)
    });
}
