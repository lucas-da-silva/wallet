import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { emailChange } from '../redux/actions';

const MINIMUM_CHARACTERES = 5;

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const disabled = this.validationSubmit();
    this.setState({ [name]: value, isDisabled: !disabled });
  };

  validationSubmit = () => {
    const { emailInput, passwordInput } = this.state;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailInput) && passwordInput.length >= MINIMUM_CHARACTERES;
  };

  submitForm = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { emailInput } = this.state;
    dispatch(emailChange(emailInput));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ this.submitForm }>
          <input
            type="text"
            name="emailInput"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="passwordInput"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
          />
          <button disabled={ isDisabled } type="submit">Entrar</button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
