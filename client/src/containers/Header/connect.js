import { connect } from 'react-redux';
import Header from './header';

// TODO: import action to open order modal (that will just toggle open)
// import

const mapState = state => ({
  testState: state.auth,
});

export default connect(mapState)(Header);
