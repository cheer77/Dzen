const toDate = (value) => new Date(String(value).replace(' ', 'T'));

export const formatHumanDate = (value) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(toDate(value));

export const formatDateOnly = (value) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(toDate(value));

export const formatMoney = (amount, currency) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency
  }).format(amount);

export const getProductPrice = (product, symbol) =>
  product.price.find((priceItem) => priceItem.symbol === symbol)?.value || 0;

export const getProductPriceText = (product) =>
  product.price
    .map((priceItem) => formatMoney(priceItem.value, priceItem.symbol))
    .join(' / ');
