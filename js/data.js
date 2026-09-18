export async function fetchOffers() {
  try {
    const response = await fetch('./data/offers.json');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des offres');
    }
    const offers = await response.json();
    return offers;
  } catch (error) {
    console.error('fetchOffers error:', error);
    throw error;
  }
}

export async function getOffers() {
  return fetchOffers();
}

