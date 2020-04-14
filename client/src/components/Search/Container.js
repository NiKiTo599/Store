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
    const { width } = this.props;
    return (
      <Search width={width} handleChange={this.onChange} name={this.state.valueForSearch}/>
    )
  }
}