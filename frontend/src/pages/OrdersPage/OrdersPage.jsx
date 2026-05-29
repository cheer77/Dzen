import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal.jsx';
import { deleteOrder, fetchOrders } from '../../features/orders/ordersSlice.js';
import {
  selectOrders,
  selectOrdersError,
  selectOrdersStatus
} from '../../features/orders/selectors.js';
import { fetchProducts } from '../../features/products/productsSlice.js';
import { selectProducts, selectProductsStatus } from '../../features/products/selectors.js';
import {
  clearSelectedOrder,
  closeDeleteOrderModal,
  openDeleteOrderModal,
  selectOrder
} from '../../features/ui/uiSlice.js';
import {
  formatHumanDate,
  formatMoney,
  getProductPrice,
  getProductPriceText
} from '../../utils/formatters.js';

const getOrderProducts = (order, products) =>
  products.filter((product) => product.order === order.id);

const getOrderTotal = (orderProducts, symbol) =>
  orderProducts.reduce((sum, product) => sum + getProductPrice(product, symbol), 0);

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);
  const ordersStatus = useSelector(selectOrdersStatus);
  const productsStatus = useSelector(selectProductsStatus);
  const ordersError = useSelector(selectOrdersError);
  const selectedOrderId = useSelector((state) => state.ui.selectedOrderId);
  const orderIdToDelete = useSelector((state) => state.ui.orderIdToDelete);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);
  const orderToDelete = orders.find((order) => order.id === orderIdToDelete);
  const isLoading = ordersStatus === 'loading' || productsStatus === 'loading';

  useEffect(() => {
    if (ordersStatus === 'idle') {
      dispatch(fetchOrders());
    }

    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, ordersStatus, productsStatus]);

  const handleDelete = () => {
    dispatch(deleteOrder(orderIdToDelete));
    dispatch(closeDeleteOrderModal());

    if (selectedOrderId === orderIdToDelete) {
      dispatch(clearSelectedOrder());
    }
  };

  return (
    <section className="orders-page">
      <div className="page-heading">
        <h2 className="page-heading__title">Orders</h2>
        <p className="page-heading__subtitle">List of customer orders and their product totals.</p>
      </div>

      {isLoading && <p className="state-message">Loading orders...</p>}
      {ordersError && <p className="state-message state-message--error">{ordersError}</p>}

      {!isLoading && !ordersError && (
        <div className="orders-page__layout">
          <div className="orders-list">
            {orders.map((order) => {
              const orderProducts = getOrderProducts(order, products);
              const totalUSD = getOrderTotal(orderProducts, 'USD');
              const totalUAH = getOrderTotal(orderProducts, 'UAH');

              return (
                <article
                  className={`orders-list__item${
                    selectedOrderId === order.id ? ' orders-list__item--active' : ''
                  }`}
                  key={order.id}
                  onClick={() => dispatch(selectOrder(order.id))}
                >
                  <div className="orders-list__main">
                    <h3 className="orders-list__title">{order.title}</h3>
                    <span className="orders-list__meta">{orderProducts.length} products</span>
                  </div>
                  <div className="orders-list__date">
                    <span>{order.date}</span>
                    <strong>{formatHumanDate(order.date)}</strong>
                  </div>
                  <div className="orders-list__total">
                    <span>{formatMoney(totalUSD, 'USD')}</span>
                    <strong>{formatMoney(totalUAH, 'UAH')}</strong>
                  </div>
                  <button
                    className="button button--danger"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(openDeleteOrderModal(order.id));
                    }}
                  >
                    Delete
                  </button>
                </article>
              );
            })}
          </div>

          {selectedOrder && (
            <aside className="order-panel">
              <div className="order-panel__header">
                <h3 className="order-panel__title">{selectedOrder.title}</h3>
                <button
                  className="order-panel__close"
                  type="button"
                  onClick={() => dispatch(clearSelectedOrder())}
                  aria-label="Close order details"
                >
                  x
                </button>
              </div>
              <p className="order-panel__date">
                Created: {formatHumanDate(selectedOrder.date)}
              </p>
              <p className="order-panel__description">{selectedOrder.description}</p>
              <div className="order-panel__products">
                {getOrderProducts(selectedOrder, products).map((product) => (
                  <div className="order-panel__product" key={product.id}>
                    <strong>{product.title}</strong>
                    <span>{product.type}</span>
                    <span>{product.specification}</span>
                    <span>{getProductPriceText(product)}</span>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      )}

      {orderToDelete && (
        <Modal
          title="Delete order"
          confirmText="Delete"
          onClose={() => dispatch(closeDeleteOrderModal())}
          onConfirm={handleDelete}
        >
          Are you sure you want to delete "{orderToDelete.title}"?
        </Modal>
      )}
    </section>
  );
};

export default OrdersPage;
