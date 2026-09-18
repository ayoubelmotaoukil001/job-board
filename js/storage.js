const STORAGE_KEY = "followedOffers";

export function getFollowedOffers() {
  const storedOffers = localStorage.getItem(STORAGE_KEY);
  if (!storedOffers) {
    return [];
  }
  try {
    return JSON.parse(storedOffers);
  } catch (e) {
    return [];
  }
}

export function isOfferFollowed(offerId) {
  return getFollowedOffers().includes(Number(offerId));
}

export function isFollowed(offerId) {
  return isOfferFollowed(offerId);
}

export function addFollowedOffer(offerId) {
  const followedOffers = getFollowedOffers();
  const idNum = Number(offerId);
  if (!followedOffers.includes(idNum)) {
    followedOffers.push(idNum);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(followedOffers));
}

export function removeFollowedOffer(offerId) {
  const followedOffers = getFollowedOffers();
  const idNum = Number(offerId);
  const updatedOffers = followedOffers.filter((id) => id !== idNum);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOffers));
}

export function toggleFollowOffer(offerId) {
  const idNum = Number(offerId);
  if (isOfferFollowed(idNum)) {
    removeFollowedOffer(idNum);
    return false;
  } else {
    addFollowedOffer(idNum);
    return true;
  }
}
