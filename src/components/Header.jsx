import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <section>
        <p data-testid="email-field">{email}</p>
        <div className="expenses-header">
          <p data-testid="total-field">Despesa Total: R$ 0,00</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
