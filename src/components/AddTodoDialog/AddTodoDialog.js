import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


type Props = {
  open: boolean,
  onRequestClose: Function,
  onSubmit: Function
}

type State = {
  description: string
}

class AddTodoDialog extends Component<Props, State> {
  state = {
    description: ''
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { description } = this.state

    onSubmit(description)

    this.setState({
      description: ''
    })
  }

  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value
    })
  }

  render() {
    const { onRequestClose, open } = this.props
    const { description } = this.state

    return (
      <Dialog
        open={open}
        onRequestClose={onRequestClose}
        actions={[
          <FlatButton
            label='Cancel'
            primary
            onClick={onRequestClose}
          />,
          <FlatButton
            label='Submit'
            primary
            onClick={this.handleSubmit}
          />,
        ]}>
        <TextField
          autoFocus
          floatingLabelText='What needs to be done?'
          onChange={this.handleDescriptionChange}
          value={description}
        />
      </Dialog>
    )
  }
}

export default AddTodoDialog
