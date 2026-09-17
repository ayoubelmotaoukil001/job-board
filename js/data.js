async function getOffers() {

    try{

    const response = await fetch("./job-board/data/json")
    const offers = await response.json()

    console.log(offers)
    }

    catch(error) {
        console.log(error)
    }
   
}
getOffers()