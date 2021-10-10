import { Component } from "react";
import Joi from "joi";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ value, name }) => {
    const property = { [name]: value };
    const schema = Joi.object({
      [name]: this.schema.extract([name]),
    });
    const { error } = schema.validate(property);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ target }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const validation = this.validateProperty(target);

    data[target.name] = target.value;
    if (validation !== null) {
      errors[target.name] = validation;
    } else {
      errors[target.name] = "";
    }

    this.setState({
      data,
      errors,
    });
  };

  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });

    this.setState({
      errors: errors || {},
    });

    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const validation = this.validate();
    if (validation !== null) return false;

    return true;
  };
}

export default Form;
