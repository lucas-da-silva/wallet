import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, fineshEditForm } from '../redux/actions';
import getApi from '../services';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = async (event, action) => {
    event.preventDefault();
    const { value, currency } = this.state;
    const { id, dispatch, idToEdit } = this.props;
    const exchangeRates = await getApi();
    const ask = value * (exchangeRates[currency].ask);
    if (action) {
      dispatch(fineshEditForm({ id: idToEdit, ...this.state, exchangeRates }, ask));
    } else {
      dispatch(addExpense({ id, ...this.state, exchangeRates }, ask));
    }
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form onSubmit={ (event) => this.submitForm(event, editor) }>
        <label htmlFor="value-input">
          Valor:
          <input
            id="value-input"
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          <select
            data-testid="currency-input"
            name="currency"
            id="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((coin) => <option key={ coin }>{coin}</option>)
            }
          </select>
        </label>
        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            name="method"
            id="method-input"
            value={ method }
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
            name="tag"
            id="tag-input"
            value={ tag }
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
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit">
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  id: wallet.expenses.length,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
