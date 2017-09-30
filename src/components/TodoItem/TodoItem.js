import React, { Component } from 'react'
import ListItem from 'material-ui/List/ListItem'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

type Props = {
  id: string,
  description: string,
  onClick: Function
}

class TodoItem extends Component<Props> {
  handleClick = () => {
    const { id, onClick } = this.props
    onClick(id)
  }

  render () {
    const { id, description } = this.props

    return (
      <ListItem
        key={id}
        primaryText={description}
        rightIcon={
          <DeleteIcon onClick={this.handleClick} />
        }
      />
    )
  }
}

export default TodoItem
