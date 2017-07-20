import { connect } from 'react-redux';

import { addToCart, loadAllProducts } from '../actions';

import ProductsList from '../components/ProductsList.jsx';

const mapStateToProps = state => ({ products: state.products });

export default connect( mapStateToProps, { addToCart, loadAllProducts } )(ProductsList);
