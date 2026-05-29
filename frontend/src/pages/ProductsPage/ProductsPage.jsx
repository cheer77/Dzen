import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/orders/ordersSlice.js';
import { selectOrders, selectOrdersStatus } from '../../features/orders/selectors.js';
import { fetchProducts, setTypeFilter } from '../../features/products/productsSlice.js';
import {
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectTypeFilter
} from '../../features/products/selectors.js';
import { formatDateOnly, getProductPriceText } from '../../utils/formatters.js';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);
  const productsStatus = useSelector(selectProductsStatus);
  const ordersStatus = useSelector(selectOrdersStatus);
  const productsError = useSelector(selectProductsError);
  const typeFilter = useSelector(selectTypeFilter);
  const [draftType, setDraftType] = useState(typeFilter);
  const [filterError, setFilterError] = useState('');

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }

    if (ordersStatus === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, ordersStatus, productsStatus]);

  const productTypes = useMemo(
    () => [...new Set(products.map((product) => product.type))].sort(),
    [products]
  );
  const allowedTypes = useMemo(() => ['all', ...productTypes], [productTypes]);
  const visibleProducts =
    typeFilter === 'all'
      ? products
      : products.filter((product) => product.type === typeFilter);

  const getOrderTitle = (orderId) =>
    orders.find((order) => order.id === orderId)?.title || 'Unknown order';

  useEffect(() => {
    const savedType = window.localStorage.getItem('productsTypeFilter');

    if (savedType) {
      setDraftType(savedType);
    }
  }, []);

  useEffect(() => {
    if (productTypes.length === 0) {
      return;
    }

    if (allowedTypes.includes(draftType)) {
      dispatch(setTypeFilter(draftType));
      window.localStorage.setItem('productsTypeFilter', draftType);
      setFilterError('');
      return;
    }

    setDraftType('all');
    dispatch(setTypeFilter('all'));
    window.localStorage.setItem('productsTypeFilter', 'all');
  }, [allowedTypes, dispatch, draftType, productTypes.length]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    if (!allowedTypes.includes(draftType)) {
      setFilterError('Please select an existing product type.');
      return;
    }

    dispatch(setTypeFilter(draftType));
    window.localStorage.setItem('productsTypeFilter', draftType);
    setFilterError('');
  };

  return (
    <section className="products-page">
      <div className="page-heading">
        <h2 className="page-heading__title">Products</h2>
        <p className="page-heading__subtitle">All products with warranty dates and order links.</p>
      </div>

      <form className="products-page__toolbar filter-form" onSubmit={handleFilterSubmit}>
        <label className="field" htmlFor="type-filter">
          <span className="field__label">Type</span>
          <select
            className="field__select"
            id="type-filter"
            value={draftType}
            onChange={(event) => setDraftType(event.target.value)}
          >
            <option value="all">All types</option>
            {productTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <button className="button button--primary" type="submit">
          Apply
        </button>
        {filterError && <p className="filter-form__error">{filterError}</p>}
      </form>

      {productsStatus === 'loading' && <p className="state-message">Loading products...</p>}
      {productsError && <p className="state-message state-message--error">{productsError}</p>}

      {productsStatus !== 'loading' && !productsError && (
        <div className="products-table">
          <div className="products-table__row products-table__row--head">
            <span>Title</span>
            <span>Type</span>
            <span>Warranty</span>
            <span>Price</span>
            <span>Order</span>
          </div>
          {visibleProducts.map((product) => (
            <article className="products-table__row" key={product.id}>
              <span>
                <strong>{product.title}</strong>
                <br />
                <small>SN: {product.serialNumber}</small>
              </span>
              <span>
                {product.type}
                <br />
                <small>{product.specification}</small>
              </span>
              <span>
                {product.guarantee.start} - {product.guarantee.end}
                <br />
                <small>
                  {formatDateOnly(product.guarantee.start)} - {formatDateOnly(product.guarantee.end)}
                </small>
              </span>
              <span>{getProductPriceText(product)}</span>
              <span>{getOrderTitle(product.order)}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
