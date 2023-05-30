import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  deleteExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section className="table-container">
        <table>
          <thead className="table-header">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {
              expenses && expenses.map(({
                id, description, tag, method, value, currency, exchangeRates,
              }) => {
                const convertedCurrency = exchangeRates[currency];
                const exchangeRate = parseFloat(convertedCurrency.ask).toFixed(2);
                const convertedValue = (value * convertedCurrency.ask).toFixed(2);
                return (
                  <tr className="tr-body" key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{parseFloat(value).toFixed(2)}</td>
                    <td>{convertedCurrency.name}</td>
                    <td>{exchangeRate}</td>
                    <td>{convertedValue}</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        className="btn btn-warning button-edit"
                        onClick={ () => this.editExpense(id) }
                      >
                        <FontAwesomeIcon icon={ faPenToSquare } />
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        className="btn btn-danger"
                        onClick={ () => this.deleteExpense(id) }
                      >
                        <FontAwesomeIcon className="trash-icon" icon={ faTrash } />
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
