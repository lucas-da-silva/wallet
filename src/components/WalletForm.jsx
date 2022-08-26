import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input id="value-input" type="text" data-testid="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input id="description-input" type="text" data-testid="description-input" />
        </label>
        <label htmlFor="currency-input">
          <select data-testid="currency-input" name="coin" id="currency-input">
            {
              currencies.map((currency) => <option key={ currency }>{currency}</option>)
            }
          </select>
        </label>
        <label htmlFor="method-input">
          <select data-testid="method-input" name="methodInput" id="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <select data-testid="tag-input" name="tagInput" id="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
