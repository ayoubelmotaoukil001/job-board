function filterOffer(offres, filters) {
    return offres.filter(offer => {

        const matchesCity = !filters.city || offer.ville === filters.city

        const matchesContract = !filters.contract || offer.typeContract === filters.contract

        const matchesTechnology = !filters.technology || offer.includes(filters.technology)

        const matchesSearch =!filters.titre.toLowercase().includes(filters.search.toLowercase()) || 
                             !filters.entreprise.toLowercase().includes(filters.search.toLowercase()) || 
                             !filters.descriptionCourte.toLowercase().includes(filters.search.toLowercase()) 

        return matchesCity && matchesContract && matchesTechnology && matchesSearch
    })
}   

function sortOffersByDate(offers) {
    return [...offers].sort((a, b) => {
        return new Date(b.datePublication) - new Date(a.datePublication)
    })
}

function resetFilters() {
    return {
        search: "",
        technology: "",
        city: "",
        contract: ""
    }
}