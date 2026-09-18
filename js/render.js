import { isOfferFollowed } from './storage.js';

export function renderLoading(container) {
    container.replaceChildren();

    const p = document.createElement("p");
    p.className = 'text-center py-8 text-gray-500 text-sm';
    p.textContent = 'offers is loading';
    container.appendChild(p);
}

export function renderError(container, message) {
    container.replaceChildren();

    const p = document.createElement("p");
    p.className = "text-center py-8 text-rose-600 text-sm font-medium";
    p.textContent = message;
    container.appendChild(p);
}

export function renderEmpty(container) {
    container.replaceChildren();
    const p = document.createElement("p");
    p.className = "text-center py-12 text-gray-500 text-sm col-span-full";
    p.textContent = "there no match result for what are u searching for ";

    container.appendChild(p);
}

export function updateOfferCount(countElement, count) {
    if (countElement) {
        countElement.textContent = count;
    }
}

export function createOfferCard(offer) {
    // header
    const card = document.createElement("article");
    card.className = 'bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4';
    
    const cardHeader = document.createElement("div");
    cardHeader.className = 'flex items-center justify-between gap-2';

    // badge
    const badgeContrat = document.createElement("span");
    const isStage = offer.typeContrat?.toLowerCase() === 'stage';
    badgeContrat.className = isStage 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase'
        : 'bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase';
    badgeContrat.textContent = offer.typeContrat;

    // button
    const btnFollow = document.createElement("button");
    btnFollow.className = "btn-follow text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-rose-50 transition";
    btnFollow.dataset.id = offer.id;
    const isFollowed = isOfferFollowed(offer.id);
    btnFollow.textContent = isFollowed ? "unfollow" : "follow";

    cardHeader.appendChild(badgeContrat);
    cardHeader.appendChild(btnFollow);

    // Title
    const title = document.createElement('h3');
    title.className = 'text-lg font-bold text-gray-900';
    title.textContent = offer.titre;

    const company = document.createElement('p');
    company.className = 'text-xs text-gray-500 font-medium';
    company.textContent = `${offer.entreprise} - ${offer.ville}`;

    // Date
    const date = document.createElement('p');
    date.className = 'text-xs text-gray-400';
    date.textContent = `publied at: ${offer.datePublication}`;

    // Description
    const desc = document.createElement('p');
    desc.className = 'text-xs text-gray-600 line-clamp-2 leading-relaxed';
    desc.textContent = offer.descriptionCourte;

    // Tech List
    const techList = document.createElement('div');
    techList.className = 'flex flex-wrap gap-1.5 pt-1';

    function appendTech(tech) {
        const badgeTech = document.createElement('span');
        badgeTech.className = 'bg-gray-50 border border-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded';
        badgeTech.textContent = tech;
        techList.appendChild(badgeTech);
    }

    // Card Footer
    const cardFooter = document.createElement('div');
    cardFooter.className = 'flex items-center justify-between border-t border-gray-100 pt-3';

    const detailLink = document.createElement('a');
    detailLink.href = `offre-detail.html?id=${offer.id}`;
    detailLink.className = 'text-xs font-semibold text-gray-900 hover:text-gray-600';
    detailLink.textContent = 'offer details →';

    cardFooter.appendChild(detailLink);

    // Append everything to card
    card.appendChild(cardHeader);
    card.appendChild(title);
    card.appendChild(company);
    if (offer.datePublication) card.appendChild(date);
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
