/* eslint-env browser */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';


const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: dodgerblue;
  width: fit-content;
  height: fit-content;
  padding: 0.5em;
`;


class Prop extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    update: PropTypes.func,
  }

  static defaultProps = {
    update: null,
  }

  renderBoolean = () => {
    const { name, value, update } = this.props;
    return (
      <div>
        {name}:
        <input
          type="checkbox"
          onChange={() => update(!value)}
          checked={value}
          disabled={!update}
        />
      </div>
    );
  }

  renderString = () => {
    const { name, value, update } = this.props;
    return (
      <div>
        {name}:
        <input
          type="text"
          onChange={e => update(e.target.value)}
          value={value}
          disabled={!update}
        />
      </div>
    );
  }

  renderObject = () => {
    const { name, value } = this.props;
    return (
      <div>
        {name}: [Object]
        <button onClick={() => console.info(value)}>
          dump in console
        </button>
      </div>
    );
  }

  renderToString = () => {
    const { name, value } = this.props;
    return (
      <div>{name}: {JSON.stringify(value)}</div>
    );
  }

  render() {
    const { value } = this.props;
    return (
      <li>
        {typeof value === 'boolean' ? this.renderBoolean()
        : typeof value === 'string' ? this.renderString()
        : typeof value === 'object' ? this.renderObject()
        : this.renderToString()}
      </li>
    );
  }
}
export class DebugPanel extends PureComponent {
  static propTypes = {
    childProps: PropTypes.object,
    updateProp: PropTypes.func,
  }

  static defaultProps = {
    childProps: {},
    updateProp: () => null,
  }

  renderDebugPanel() {
    const { childProps, updateProp } = this.props;
    return (
      <Background>
        <button onClick={() => console.info(childProps)}>dump props in console</button>
        <ul>
          {Object.keys(childProps).map(key =>
            <Prop
              key={key}
              name={key}
              value={childProps[key]}
              update={updateProp(key)}
            />)}
        </ul>
      </Background>
    );
  }

  render() {
    return ReactDOM.createPortal(
      this.renderDebugPanel(),
      document.getElementsByTagName('body')[0],
    );
  }
}


export const debug = (options = {}) => Component => class Debug extends PureComponent {
  state = this.props;

  updateProp = prop => (value, cb) => this.setState({
    [prop]: value,
  }, cb)

  render() {
    return (
      <React.Fragment>
        <DebugPanel
          updateProp={this.updateProp}
          childProps={this.state}
          {...options}
        />
        <Component {...this.state} />
      </React.Fragment>
    );
  }
};


export class DebugContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    options: PropTypes.object,
  }

  static defaultProps = {
    options: {},
  }

  render() {
    const { children, options } = this.props;
    return (
      <React.Fragment>
        <DebugPanel
          childProps={children.props}
          {...options}
        />
        {children}
      </React.Fragment>
    );
  }
}

const pulse = keyframes`
  to {
    box-shadow: 0 0 0 3px rgba(232, 76, 61, 1);
  }
`;

const Pulse = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.3);
  &.active {
    animation: ${pulse} 0.1s 1 cubic-bezier(0.66, 0, 0, 1);
  }
`;


export const highlight = Component => class Highlight extends PureComponent {
  state = {
    active: false,
  }
  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timer);
    if (this.props !== nextProps) {
      this.setState({
        active: false,
      }, () => {
        this.timer = setTimeout(() => this.setState({
          active: true,
        }), 0);
      });
    }
  }

  render() {
    const { active } = this.state;
    return (
      <div style={{
        position: 'relative',
        width: 'fit-content',
        height: 'fit-content',
      }}>
        <Pulse className={active ? 'active' : ''} />
        <Component {...this.props} />
      </div>
    );
  }
};
