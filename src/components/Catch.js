import React, { Component } from 'react';

export default class Catch extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  retry() {
    return this.setState(() => ({ hasError: false }));
  }

  render() {
    return this.state.hasError ? (
      <>
        <h1>Something went wrong.</h1>
        <button type="button" onClick={this.retry.bind(this)}>
          Retry
        </button>
      </>
    ) : (
      this.props.children
    );
  }
}
