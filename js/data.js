async function getOffers() {

    try{

    const response = await fetch("./data/offers.json")

    if(!response.ok) {
        throw new Error("erreur lors de chargement des offres")
    }
    
    const offers = await response.json()

    console.log(offers)
    }

    catch(error) {
        console.log(error)
    }
   
}
getOffers()
