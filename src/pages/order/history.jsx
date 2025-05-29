import React, { useEffect } from 'react';
import { Container, Nav, Tab, Table } from 'react-bootstrap';
import Sidebar from '../../components/sidebar';
import '../layout.css'
import '../media.css'
import './history.css'
import { observer } from 'mobx-react-lite';
import { rootStore } from '../../stores';
import { Link } from 'react-router';

const History = observer(() => {
  const historyStore = rootStore.historyStore;
  useEffect(() => {
    historyStore.GetHistory();
  }, [])
  const allOrders = historyStore.history.length;
  const deliveredOrders = historyStore.history.filter((val) => val.status === "delivered").length;
  const canceledOrders = historyStore.history.filter((val) => val.status === "canceled").length;
  const returnedOrders = historyStore.history.filter((val) => val.status === "returned").length;
  return (
    <div className='container'>
      <br />
      <p className="gray-text">
        Home › Account › <span className="blue-text">Personal Data</span>
      </p>
      <div className="account-container">
        <Sidebar />
        <div className="account-main">
          <h4>Order History</h4>
          <p className="gray-text">Track, return or purchase items</p>
          <Tab.Container defaultActiveKey="home">
            <Nav variant="tabs" className="w-100 border-bottom nav-tabs">
              <Nav.Item>
                <Nav.Link eventKey="home">
                  Current <div id="orderCount" className="number">{allOrders}</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="menu1">
                  Delivered <div id="deliverCount" className="number">{deliveredOrders}</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="menu2">
                  Canceled <div id="cancelCount" className="number">{canceledOrders}</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="menu3">
                  Returned <div id="returnCount" className="number">{returnedOrders}</div>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content className="py-3 main-div">
              <Tab.Pane eventKey="home">
                <div className='overflow-x-auto'>
                <Table bordered striped className="mt-4">
                  <thead>
                    <tr>
                      <th>Order Code</th>
                      <th>Placed On</th>
                      <th>Total</th>
                      <th>Order Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="allOrdersTable">
                    {historyStore.history
                      .map((val) => (
                        <tr key={val.orderId}>
                          <td>{val.orderId}</td>
                          <td>{val.orderDate.split('T')[0]}</td>
                          <td>{val.totalAmount}</td>
                          <td>{val.status}</td>
                          <td><Link to={`/order/status/${val.orderId}`}>view Detail</Link></td>
                        </tr>
                      ))}

                  </tbody>
                </Table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="menu1">
                 <div className='overflow-x-auto'>
                <Table bordered striped className="mt-4">
                  <thead>
                    <tr>
                      <th>Order Code</th>
                      <th>Placed On</th>
                      <th>Total</th>
                      <th>Order Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="deliveredOrders">
                  {historyStore.history
                      .filter((val) => val.status === "delivered")
                      .map((val) => (
                        <tr key={val.orderId}>
                          <td>{val.orderId}</td>
                          <td>{val.orderDate.split('T')[0]}</td>
                          <td>{val.totalAmount}</td>
                          <td>{val.status}</td>
                          <td><Link to={`/order/status/${val.orderId}`}>view Detail</Link></td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="menu2">
                 <div className='overflow-x-auto'>
                <Table bordered striped className="mt-4">
                  <thead>
                    <tr>
                      <th>Order Code</th>
                      <th>Placed On</th>
                      <th>Total</th>
                      <th>Order Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="canceledOrders">
                  {historyStore.history
                      .filter((val) => val.status === "canceled")
                      .map((val) => (
                        <tr key={val.orderId}>
                          <td>{val.orderId}</td>
                          <td>{val.orderDate.split('T')[0]}</td>
                          <td>{val.totalAmount}</td>
                          <td>{val.status}</td>
                          <td><Link to={`/order/status/${val.orderId}`}>view Detail</Link></td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="menu3">
                 <div className='overflow-x-auto'>
                <Table bordered striped className="mt-4">
                  <thead>
                    <tr>
                      <th>Order Code</th>
                      <th>Placed On</th>
                      <th>Total</th>
                      <th>Order Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="returnedOrders">
                  {historyStore.history
                      .filter((val) => val.status === "returned")
                      .map((val) => (
                        <tr key={val.orderId}>
                          <td>{val.orderId}</td>
                          <td>{val.orderDate.split('T')[0]}</td>
                          <td>{val.totalAmount}</td>
                          <td>{val.status}</td>
                          <td><Link to={`/order/status/${val.orderId}`}>view Detail</Link></td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
})

export default History;
