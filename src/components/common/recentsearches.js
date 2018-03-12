import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecentSearches extends Component {
  render() {
    const { recentSearches } = this.props;

    const searches = Object.keys(recentSearches).map((search) => {
      return (
        <Link to={`/p/${recentSearches[search].region}/${recentSearches[search].name}`}>
          <div className="recent-search">
            {recentSearches[search].name}
          </div>
        </Link>
      );
    });

    return (
      <div className="searches">
        {searches}
      </div>
    );
  }
}

export default RecentSearches;
