import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../redux/actions';
import getApi from '../services';

class WalletForm extends Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { valueInput, descriptionInput, currencyInput, methodInput,
      tagInput } = this.state;
    const { id, dispatch } = this.props;
    const exchangeRates = await getApi();
    const ask = valueInput * (exchangeRates[currencyInput].ask);
    dispatch(addExpense({
      id,
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      exchangeRates,
    }, ask));
    this.setState({
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { valueInput, descriptionInput, currencyInput, methodInput,
      tagInput } = this.state;
    return (
      <form onSubmit={ this.submitForm }>
        <label htmlFor="value-input">
          Valor:
          <input
            id="value-input"
            type="number"
            name="valueInput"
            data-testid="value-input"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          <select
            data-testid="currency-input"
            name="currencyInput"
            id="currency-input"
            value={ currencyInput }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currency) => <option key={ currency }>{currency}</option>)
            }
          </select>
        </label>
        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            name="methodInput"
            id="method-input"
            value={ methodInput }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <select
            data-testid="tag-input"
            name="tagInput"
            id="tag-input"
            value={ tagInput }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            type="text"
            name="descriptionInput"
            data-testid="description-input"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  id: wallet.expenses.length,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
