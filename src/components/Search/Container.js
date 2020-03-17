import React from 'react'
import Search from './Search'

export default class ContainerForSerch extends React.PureComponent {

  state = {
    valueForSearch: ''
  }

  onChange = (event, { newValue }) => {
    this.setState({
      valueForSearch: newValue
    });
  };

  render () {
    return (
      <Search handleChange={this.onChange} name={this.state.valueForSearch}/>
    )
  }
}