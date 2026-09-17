const STORAGE_KEY = "followedOffers"

function getFollowedOffers() {

    const storedOffers = localStorage.getItem(STORAGE_KEY)

    if(!storedOffers) {
        return []
    }

    return JSON.parse(storedOffers)

}