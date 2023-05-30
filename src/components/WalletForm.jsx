import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, fineshEditForm, fineshSetupToEdit } from '../redux/actions';
import getApi from '../services';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  isToEditExpense = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const expenseToEdit = expenses[idToEdit];
    const { value, description, currency, method, tag } = expenseToEdit;
    this.setState({
      value, description, currency, method, tag,
    });
    dispatch(fineshSetupToEdit());
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
    const { currencies, editor, setupToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (setupToEdit) {
      this.isToEditExpense();
    }
    return (
      <section className="wallet-form-container">
        <form
          className="wallet-form"
          onSubmit={ (event) => this.submitForm(event, editor) }
        >
          <div className="input-group value-input">
            <span className="input-group-text">Valor</span>
            <input
              type="number"
              name="value"
              data-testid="value-input"
              className="form-control value-input"
              aria-label="Amount (to the nearest dollar)"
              value={ value }
              onChange={ this.handleChange }
            />
          </div>
          <div className="input-group currency-input">
            <span className="input-group-text">Moeda</span>
            <select
              data-testid="currency-input"
              name="currency"
              className="form-select"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((coin) => <option key={ coin }>{coin}</option>)
              }
            </select>
          </div>
          <div className="input-group method-input">
            <span className="input-group-text">Método de pagamento</span>
            <select
              data-testid="method-input"
              name="method"
              className="form-select"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div className="input-group tag-input">
            <span className="input-group-text">Tag</span>
            <select
              data-testid="tag-input"
              name="tag"
              className="form-select"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <div className="input-group description-input">
            <span className="input-group-text">Descrição</span>
            <input
              type="text"
              className="form-control"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </div>
          <button
            className={ editor ? 'btn btn-warning' : 'btn btn-primary' }
            type="submit"
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  id: wallet.expenses.length,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
  setupToEdit: wallet.setupToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setupToEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
