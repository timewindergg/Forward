import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  state = {
    quotes : ["Some things do get better with time.",
              "Time flies like an arrow; fruit flies like banana.",
              "Here's the thing about time; if you can't make the most out of any given moment, then you don't deserve a single extra second.",
              "Things aren't gonna' improve themselves.",
              "Time to start some trouble.",
              "One mistake, means I start over. From the very beginning...and over...and over again. Until I get it right.",
              "It's not how much time you have, it's how you use it.",
              "One step closer to greater understanding!",
              "Indeed, a wise choice."]
  }

  render() {
    return (
      <div className="Home">
        <div className="content">
          <h1>Timewinder</h1>
          <h3>League match timeline statistics</h3>

          <div id="quote"></div>

          <div id="lookup">
            <select id="searchServer" className="form-control">
              <option value="na">NA</option>
              <option value="euw">EUW</option>
              <option value="eune">EUNE</option>
              <option value="kr">KR</option>
              <option value="br">BR</option>
              <option value="lan">LAN</option>
              <option value="las">LAS</option>
              <option value="oce">OCE</option>
              <option value="ru">RU</option>
              <option value="tr">TR</option>
            </select>
            <input id="searchField" className="textfield form-control" type="text" placeholder="Enter Summoner Name" />
            <input id="searchButton" className="button" type="submit" name="commit" value="Search" />
          </div>

          <div id="searchLoader" className="loader"></div>

          <div className="clear"></div>

          <div id="error">
          </div>

          <div id="history"></div>
          </div>
      </div>
    );
  }
}

export default Home;
