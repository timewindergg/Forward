import React, { Component } from 'react';

import './styles/footer.css';

class Footer extends Component{
  render(){
    return(
      <div className="footer">
        <div className="disclaimer">
          <span>
            timewinder.gg isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
          </span>
        </div>
        <div className="social">
          <a href="https://discord.gg/pT78Nz6" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-discord"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;