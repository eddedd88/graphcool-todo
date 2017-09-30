import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo'
import List from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import CircularProgress from 'material-ui/CircularProgress'
import AddTodoDialog from './components/AddTodoDialog'
import TodoItem from './components/TodoItem'
import AddFab from './components/AddFab'

class App extends Component {
  state = {
    addingTodo: false
  }

  componentDidMount() {
    this.createTodoesSubscription = this.props.data.subscribeToMore({
      document: todoesSubscription,
      updateQuery: (previousState, { subscriptionData }) => {
        let allTodoes
        if (subscriptionData.data.Todo.mutation === 'CREATED') {
          const newTodo = subscriptionData.data.Todo.node
          allTodoes = previousState.allTodoes.concat([ newTodo ])
        } else if (subscriptionData.data.Todo.mutation === 'DELETED') {
          const deleteTodoId = subscriptionData.data.Todo.previousValues.id
          allTodoes = previousState.allTodoes.filter(t => t.id !== deleteTodoId)
        }

        return {
          allTodoes
        }
      },
      onError: (err) => console.error(err),
    })
  }

  handleClickAddTodo = () => {
    this.setState({
      addingTodo: true
    })
  }

  handleClose = () => {
    this.setState({
      addingTodo: false
    })
  }

  handleSubmit = newTodoDescription => {
    const { createTodo } = this.props

    createTodo({
      variables: {
        description: newTodoDescription
      }
    })
    .then(this.handleClose)
  }

  handleDelete = todoId => {
    this.props.deleteTodo({
      variables: {
        id: todoId
      }
    })
  }

  render() {
    const {
      data: {
        allTodoes,
        loading
      }
    } = this.props

    const { addingTodo } = this.state

    return (
      <div>
        <AppBar title='My Todo' />
        {!loading
          ? (
            <div>
              <List>
                {allTodoes && allTodoes.map(
                  ({ id, description }) => (
                    <TodoItem
                      key={id}
                      id={id}
                      description={description}
                      onClick={this.handleDelete}
                    />
                  )
                )}
              </List>
              <AddFab onClick={this.handleClickAddTodo} />
            </div>
          ) : (
            <CircularProgress />
          )
        }
        <AddTodoDialog
          onRequestClose={this.handleClose}
          onSubmit={this.handleSubmit}
          open={addingTodo}
        />
      </div>
    )
  }
}

const allTodoes = gql`
  query TodoAppQuery {
    allTodoes {
      id
      description
      done
    }
  }
`

const createTodo = gql`
  mutation createTodo ($description: String!) {
    createTodo(description: $description) {
      id
      description,
      done
    }
  }
`

const deleteTodo = gql`
  mutation deleteTodo ($id: ID!) {
    deleteTodo (id: $id) {
      id
    }
  }
`

const todoesSubscription = gql`
  subscription updateTodo {
    Todo {
      mutation
      node {
        id
        description
        done
      }
      previousValues {
        id
      }
    }
  }
`

export default compose(
  graphql(allTodoes),
  // , {
  //   name: 'allTodoes',
  //   props: props => {
  //     return {
  //       subscribeToNewTodoes: params => {
  //         console.log(props)
  //         return props.allTodoes.subscribeToMore({
  //           document: todoesSubscription,
  //           variables: {
  //             description: params.description,
  //             done: params.done
  //           },
  //           updateQuery: (prev, { subscription }) => {
  //               if (!subscription.data) {
  //                   return prev;
  //               }
  //               const newFeedItem = subscription.data.todoAdded
  //               console.log(prev)
  //               return Object.assign({}, prev, {
  //                   entry: {
  //                       allTodoes: [ newFeedItem, ...prev.entry.allTodoes ]
  //                   }
  //               });
  //           }
  //         })
  //       }
  //     }
  //   }
  // }),
  graphql(createTodo, {
    name: 'createTodo',
    // options: {
    //   update: (proxy, { data: { createTodo } }) => {
    //     const data = proxy.readQuery({ query: allTodoes })
    //     data.allTodoes.push(createTodo)
    //     proxy.writeQuery({ query: allTodoes, data })
    //   }
    // }
  }),
  graphql(deleteTodo, {
    name: 'deleteTodo',
    // options: {
    //   update: (proxy, { data: { deleteTodo } }) => {
    //     const data = proxy.readQuery({ query: allTodoes })
    //     const newTodoes = data.allTodoes.filter(todo => todo.id !== deleteTodo.id)
    //     Object.assign(data, {
    //       allTodoes: newTodoes
    //     })
    //     proxy.writeQuery({ query: allTodoes, data })
    //   }
    // }
  })
)(App)
