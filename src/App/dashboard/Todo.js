import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const TodoContainer = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.primaryColor}
  padding: 0.5em;
  margin: 0.5em;
`;


class Todo extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }

  render() {
    const {
      id, name, done, createdAt,
    } = this.props;
    return (
      <TodoContainer>
        <div>{id}</div>
        <div>{name}</div>
        <div>{JSON.stringify(done)}</div>
        <div>{createdAt}</div>
      </TodoContainer>
    );
  }
}


export default Todo;
