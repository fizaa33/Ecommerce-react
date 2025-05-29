import React, { useEffect } from 'react';
import './order-status.css';
import '../media.css';

import Sidebar from '../../components/sidebar';
import { observer } from 'mobx-react-lite';
import { rootStore } from '../../stores';
import { useParams } from 'react-router';

const OrderStatus = observer(() => {
  const orderStore = rootStore.orderStore;
  const { id } = useParams();
  const orderDetail = orderStore.orderStatus;

  useEffect(() => {
    orderStore.OrderStatus(id);
  }, [id]);


  const items = orderDetail?.items ?? [];

  return (
    <div className='container'>
    <div className="account-container d-flex">
      <Sidebar />
      <div className="account-main">
        <div className="ord-heading">
          <h4>Order History</h4>
          <p className="gray-text">Track your order</p>
        </div>
        <div className="completed">
          <p>Please wait, we are still processing your order.</p>
          <p>We will notify you for any changes in your order.</p>
        </div>
        <table className="table table-striped border-radius order-table">
          <tbody id="showTableData">
            <tr>
              <td>
                <h6>Order Code</h6>
              </td>
              <td id="orderId" className="gray-text">{orderDetail.orderId}</td>
            </tr>
            <tr>
              <td>
                <h6>Amount Paid</h6>
              </td>
              <td id="totalAmount" className="gray-text">${orderDetail.totalAmount}</td>
            </tr>
            <tr>
              <td>
                <h6>Order Status</h6>
              </td>
              <td id="status" className="gray-text">{orderDetail.status}</td>
            </tr>
            <tr>
              <td>
                <h6>Send To</h6>
              </td>
              <td id="orderAddress" className="gray-text">{orderDetail.city} , {orderDetail.street}, {orderDetail.region}</td>
            </tr>
            <tr>
              <td>
                <h6>Payment Type</h6>
              </td>
              <td className="gray-text">Cash on Delivery</td>
            </tr>
          </tbody>
        </table>
        <div className="allorderItems">
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <div key={item.id} className="div1 mt-3">
                  <div className="cartItem-img">
                    <img className="cart-drop-img" src={`https://ecomerceapis.runasp.net/${item.productImagePath}`} alt={item.productName} />
                  </div>
                  <div className="div1-1">
                    <h5>{item.productName}</h5>
                    <div className="pricedetail">
                      <div className="addprice">
                       
                        <span>$ {item.price || 0}</span>
                      </div>
                      <div className="deleteprice">
                        <div className="underline">
                          <span className="item-quantity">{item.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p></p>  
          )}
        </div>
      </div>
    </div>
    </div>
  );
});

export default OrderStatus;
