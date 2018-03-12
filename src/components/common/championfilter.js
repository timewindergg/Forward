import React, { Component } from 'react';

import { getChampionIconUrlByImage } from '../../shared/helpers/staticImageHelper';

import Autosuggest from 'react-autosuggest';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class ChampionFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter'){
      this.props.onKeyPress(event.target.value);
      event.preventDefault();
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = (value) => {
    const {champions} = this.props;

    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');

    return champions.filter(champion => regex.test(this.getSuggestionValue(champion)));
  }

  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const { version } = this.props;

    return (
      <div className="champion-suggestion">
        <img src={getChampionIconUrlByImage(suggestion.img.split('.')[0], version)}/>
        <span className="name">{suggestion.name}</span>
      </div>
    );
  }

  render() {
    const { value, suggestions} = this.state;

    const { championsData, imageVersion} = this.props;

    const inputProps = {
      placeholder: "Search for champions",
      value: value,
      onChange: this.onChange,
      onKeyPress: this.handleKeyPress,
    };

    return (
      <div className="champion-filter">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default ChampionFilter;