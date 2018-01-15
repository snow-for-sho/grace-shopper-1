import React, { Comonent } from 'react';
import { connect } from 'react-redux';
import { fetchOrders} from '../store/orders';



class MyOrders extends Component {

  componentDidMount() {
    const user = this.props.user;
    if (user.id) this.props.fetchData(user.id);
  }

  render () {
  
    return (
      <div>
      <h3>My Order History</h3>
      <ul>
        {this.props.order.map((order) =>
          Date: {order.date} Status: {order.status}
        )}
      </ul>
      </div>


    );

  }
}

const mapState = (state) => {
  return {
    orders: state.order
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchData: (userId) => {
    }
  };
};

export default connect(mapState, mapDispatch)(MyOrders);