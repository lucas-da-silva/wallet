import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <section className="header-container">
        <div className="title-header">
          <h3>TrybeWallet</h3>
          <FontAwesomeIcon className="icon-sack-dollar" icon={ faSackDollar } />
        </div>
        <div className="email-total-header">
          <p className="email-header" data-testid="email-field">{email}</p>
          <div className="expenses-header">
            <p>Despesa Total: R$</p>
            <p data-testid="total-field">
              {total.toFixed(2)}
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  total: wallet.ask,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
