import {isOfferFollowed} from './storage.js'; 

export function renderLoading(container)
{
    container.replaceChildren() ;

    const p = document.createElement("p") ;
    p.className = 'loading-state' ;
    p.textContent = 'offers is loading' ;
    container.appendChild(p);
}
export function renderError(container , message)
{
    container.replaceChildren() ;

    const p =document.createElement("p") ;
    p.className = "error-state" ;
    p.textContent = message ;
    container.appendChild(p) ;
}
export function renderEmpty (container)
{
    container.replaceChildren() ;
    const p = document.createElement("p") ;
    p.className = "empty-state" ;
    p.textContent ="there no match result for what are u searching for " ;

    container.appendChild(p) ;
}
export function updateOfferCount(countElement , count) 
{
    if(countElement)
    {
        countElement.textContent =`${count} ise number of offers` ;
    }

}


export function createOfferCard(offer) {
    // header
    const card = document.createElement("article") ;
    card.className = 'card' ;
    const cardHeader = document.createElement("div") ;
    cardHeader.className = 'card-header' ;
    // badge
    const badgeContrat = document.createElement("span") ;
    badgeContrat.className =`badge-${offer.typeContrat.toLowerCase()}`  //to understand i write it using ai  
    badgeContrat.textContent = offer.typeContrat ;
    // butoon
    const btnFollow = document.createElement("button") ;
    btnFollow.className =  "btn-follow" ;
    btnFollow.dataset.id = offer.id;
    const isFollowed = isOfferFollowed(offer.id) ;
    btnFollow.textContent = isFollowed? "unfollow" : "follow" ;

    cardHeader.appendChild(btnFollow) ;
    cardHeader.appendChild(badgeContrat) ;

    const title = document.createElement('h3');
    title.textContent = offer.titre;
    const company = document.createElement('p');
    company.className = 'company';
    company.textContent = `${offer.entreprise} - ${offer.ville}`;

    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = `publied at: ${offer.datePublication}`;

    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = offer.descriptionCourte;

    const techList = document.createElement('div');
    techList.className = 'tech-list';

    function appendTech(tech) {
    const badgeTech = document.createElement('span');
    badgeTech.className = 'badge-tech';
    badgeTech.textContent = tech;
    techList.appendChild(badgeTech);
    }
    offer.technologies.forEach(appendTech);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';

    const detailLink = document.createElement('a');
    detailLink.href = `offre-detail.html?id=${offer.id}`;
    detailLink.className = 'btn btn-outline';
    detailLink.textContent = 'offer details';

      cardFooter.appendChild(detailLink);

    card.appendChild(cardHeader);
    card.appendChild(title);
    card.appendChild(company);
    card.appendChild(date);
    card.appendChild(desc);
    card.appendChild(techList);
    card.appendChild(cardFooter);

    return card;
}

export function renderOffers(container, offers) {
  container.replaceChildren();

  if (!offers || offers.length === 0) {
    renderEmpty(container);
    return;
  }

  function appendOffer(offer) {
    const cardElement = createOfferCard(offer);
    container.appendChild(cardElement);
  }

  offers.forEach(appendOffer);
} 