
let bagItemCountElement = document.querySelector('.bag-item-count');
let itemsContainer = document.querySelector('.items-container');
let bagCount = [];

function onLoad() {
    const count = JSON.parse(
        localStorage.getItem('bagCount')
    );
    bagCount = Array.isArray(count) ? count : [];
    displayBagItem();
    displayItems();
}
window.addEventListener('pageshow', function () {
    const count = JSON.parse(
        localStorage.getItem('bagCount')
    );

    bagCount = Array.isArray(count) ? count : [];
    displayBagItem();
});
function displayBagItem() {
    if (!bagItemCountElement) {
        return;
    }

    if (bagCount.length === 0) {
        bagItemCountElement.style.visibility = 'hidden';
    } 
    else {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagCount.length;
    }
}

function addItem(num) {
    bagCount.push(num);

    localStorage.setItem(
        'bagCount',
        JSON.stringify(bagCount)
    );

    displayBagItem();
}

function displayItems() {
    if (!itemsContainer) {
        return;
    }

    let innerHtml = '';

    items.forEach((item) => {
        innerHtml += `
            <div class="item-container">
                <img class="item-image"
                     src="${item.image}"
                     alt="${item.item_name}">

                <div class="rating">
                    ${item.rating.stars} ⭐ | ${item.rating.count}
                </div>

                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>

                <div class="price">
                    <span class="current-price">
                        ${item.current_price}
                    </span>
                    <span class="original-price">
                        ${item.original_price}
                    </span>
                    <span class="discount">
                        ${item.discount_percentage}% OFF
                    </span>
                </div>

                <button class="btn-add-bag"
                        onclick="addItem('${item.id}')">
                    Add to bag
                </button>
            </div>
        `;
    });

    itemsContainer.innerHTML = innerHtml;
}

onLoad();
