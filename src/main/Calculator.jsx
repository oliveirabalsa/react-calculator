import React, { Component } from 'react';
import Button from '../components/Button';
import Display from '../components/Display';

import './Calculator.css';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === '=';
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.value[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  state = {
    ...initialState,
  };
  render() {
    const addDigit = (n) => this.addDigit(n);
    const setOperation = (op) => this.setOperation(op);

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" triple click={() => this.clearMemory()} />
        {/* sendo que op eh o callback do botao */}
        <Button label="/" operation click={(op) => setOperation(op)} />
        <Button label="7" click={(n) => addDigit(n)} />
        <Button label="8" click={(n) => addDigit(n)} />
        <Button label="9" click={(n) => addDigit(n)} />
        <Button label="*" operation click={(op) => setOperation(op)} />
        <Button label="4" click={(n) => addDigit(n)} />
        <Button label="5" click={(n) => addDigit(n)} />
        <Button label="6" click={(n) => addDigit(n)} />
        <Button label="-" operation click={(op) => setOperation(op)} />
        <Button label="1" click={(n) => addDigit(n)} />
        <Button label="2" click={(n) => addDigit(n)} />
        <Button label="3" click={(n) => addDigit(n)} />
        <Button label="+" operation click={(op) => setOperation(op)} />
        <Button label="0" double click={(n) => addDigit(n)} />
        <Button label="." click={(n) => addDigit(n)} />
        <Button label="=" operation click={(op) => setOperation(op)} />
      </div>
    );
  }
}
