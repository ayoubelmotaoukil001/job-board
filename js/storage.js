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

function removeFollowedOffer(offerId) {
    
    const followedOffers = getFollowedOffers()

    const updateOffers = followedOffers.filter(id => id !== offerId)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updateOffers))
}

function isFollowed(offerId) {
    return getFollowedOffers().includes(offerId)
}

