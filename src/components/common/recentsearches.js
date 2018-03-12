import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecentSearches extends Component {
  render() {
    const { recentSearches } = this.props;

    const searches = Object.keys(recentSearches).map((search) => {
      return (
        <Link to={`/p/${recentSearches[search].region}/${recentSearches[search].name}`}>
          <span className="recent-search">
            {recentSearches[search].name}
          </span>
        </Link>
      );
    });

    return (
      <div className="searches">
        <div>
          Recently Searched
        </div>
        {searches}
      </div>
    );
  }
}

export default RecentSearches;
