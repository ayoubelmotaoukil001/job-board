function filterOffer(offres, filters) {
    return offres.filter(offer => {

        const matchesCity = !filters.city || offer.ville === filters.city

        const matchesContract = !filters.contract || offer.typeContract === filters.contract

        return matchesCity && matchesContract
    })
}