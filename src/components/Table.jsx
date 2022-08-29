import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          <thead>
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
          <tbody>
            {
              expenses && expenses.map(({
                id, description, tag, method, value, currency, exchangeRates,
              }) => {
                const convertedCurrency = exchangeRates[currency];
                const exchangeRate = parseFloat(convertedCurrency.ask).toFixed(2);
                const convertedValue = (value * convertedCurrency.ask).toFixed(2);
                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{parseFloat(value).toFixed(2)}</td>
                    <td>{convertedCurrency.name}</td>
                    <td>{exchangeRate}</td>
                    <td>{convertedValue}</td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.deleteExpense(id) }
                      >
                        Excluir
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
