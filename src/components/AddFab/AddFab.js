import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

type Props = {
  onClick: Function
}

class AddFab extends Component<Props> {
  render() {
    const { onClick } = this.props

    return (
      <FloatingActionButton
        onClick={onClick}
        style={{
          position: 'fixed',
          zIndex: 1,
          bottom: 20,
          right: 20
        }}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }

}

export default AddFab
