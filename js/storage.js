const STORAGE_KEY = "followedOffers"

function getFollowedOffers() {

    const storedOffers = localStorage.getItem(STORAGE_KEY)

    if(!storedOffers) {
        return []
    }

    return JSON.parse(storedOffers)

}

function addFollowedOffer(offerId) {
    
    const followedOffers = getFollowedOffers()

    if(!followedOffers.includes(offerId)) {
        followedOffers.push(offerId)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify-followedOffers)
}
