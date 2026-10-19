
let bagItemObjects = [];
const convinienceFee = 99;
 let totalPrice ;
    let totalDiscount ;
    let finalPayment ;
function initializeBagPage() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}
function displayBagSummary(){
    totalPrice =0;
    totalDiscount =0;
    finalPayment = 0;
let bagSummary = document.querySelector('.bag-summary');
    bagItemObjects.forEach( bagItem => {
        totalPrice += bagItem.original_price;
        totalDiscount+= bagItem.original_price - bagItem.current_price;   
 } )
finalPayment = totalPrice - totalDiscount + convinienceFee;
bagSummary.innerHTML = 
        ` <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${bagItemObjects.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalPrice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convinienceFee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
};

function loadBagItemObjects() {
    bagItemObjects = bagCount
        .map(itemID => items.find(item => item.id == itemID))
        .filter(item => item !== undefined);
}

function displayBagItems() {
    const containerElement =
        document.querySelector('.bag-items-container');
    if (!containerElement) return;

    let innerHtml = '';

    bagItemObjects.forEach(bagItem => {
        innerHtml += generateItemHTML(bagItem);
    });

    containerElement.innerHTML = innerHtml;
}

function removeItem(itemID) {
  let index = bagCount.indexOf(itemID);
  bagCount.splice(index,1);
    // bagCount = bagCount.filter(
    //     item => item != itemID
    // );

    localStorage.setItem(
        'bagCount',
        JSON.stringify(bagCount)
    );

    loadBagItemObjects();
    displayBagItems();
    displayBagItem();
    displayBagSummary();
}

function generateItemHTML(item) {
    return `
        <div class="bag-item-container">
            <div class="item-left-part">
                <img class="bag-item-img"
                     src="../${item.image}"
                     alt="${item.item_name}">
            </div>

            <div class="item-right-part">
                <div class="company">${item.company}</div>
                <div class="item-name">${item.item_name}</div>

                <div class="price-container">
                    <span class="current-price">
                        Rs. ${item.current_price}
                    </span>
                    <span class="original-price">
                        Rs. ${item.original_price}
                    </span>
                    <span class="discount-percentage">
                        ${item.discount_percentage}% OFF
                    </span>
                </div>

                <div class="return-period">
                    <span class="return-period-days">
                        ${item.return_period ?? 'N/A'}
                    </span>
                    return available
                </div>

                <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">
                        ${item.delivery_date ?? 'N/A'}
                    </span>
                </div>
            </div>

            <button class="remove-from-cart"
                    onclick="removeItem('${item.id}')"
                    aria-label="Remove ${item.item_name}">
                X
            </button>
        </div>
    `;
}

initializeBagPage();
