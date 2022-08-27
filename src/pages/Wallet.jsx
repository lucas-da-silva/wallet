import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchApi } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  render() {
    const { isLoading } = this.props;
    return (
      <section>
        <Header />
        {
          isLoading ? <h1>Carregando...</h1> : <WalletForm />
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isFetching,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
