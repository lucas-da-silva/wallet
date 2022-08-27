import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <section>
        <p data-testid="email-field">{email}</p>
        <div className="expenses-header">
          <p>Despesa Total: R$</p>
          <p data-testid="total-field">
            {total.toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
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
