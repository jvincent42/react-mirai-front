import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';

import WithData from 'components/WithData';
import Button from 'components/Button';

import Todo from './Todo';


const GET_TODOS = gql`
  query {
    todos {
      id,
      name,
      done,
      createdAt
    }
  }
`;


const ADD_TODO = gql`
  mutation addTodo($todo: TodoInput) {
    addTodo(todo: $todo) {
      id,
      name,
      done,
      createdAt
    }
  }
`;


class Todos extends PureComponent {
  renderTodoList = ({ todos, refetch }) => (
    <React.Fragment>
      <Button onClick={() => refetch()}>refresh</Button>
      {todos.map(todo => <Todo key={todo.id} {...todo} />)}
    </React.Fragment>
  );

  setRef = node => this.input = node;

  renderAddTodo = addTodo => (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const todo = {
          name: this.input.value,
          content: '',
        };
        addTodo({ variables: { todo } });
        this.input.value = '';
      }}>
        <input type="text" ref={this.setRef} />
        <button type="submit">Add todo</button>
      </form>
    </div>
  );

  render() {
    return (
      <React.Fragment>

        <WithData query={GET_TODOS}>
          {this.renderTodoList}
        </WithData>

        <Mutation
          mutation={ADD_TODO}
          update={(cache, { data: { addTodo } }) => {
            const { todos } = cache.readQuery({ query: GET_TODOS });
            cache.writeQuery({
              query: GET_TODOS,
              data: { todos: [addTodo].concat(todos) },
            });
          }}
        >
          {this.renderAddTodo}
        </Mutation>

      </React.Fragment>
    );
  }
}


export default Todos;
