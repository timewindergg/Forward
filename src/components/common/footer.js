import React, { Component } from 'react';

import './styles/footer.css';

class Footer extends Component{
  render(){
    return(
      <div className="footer">
        <div className="credits">
          <div className="credit-by">
            <div>Art by&nbsp;&nbsp;</div>
            <div>Developed by&nbsp;&nbsp;</div>
          </div>
          <div className="creditors">
            <div>
              <a href="https://mrpedosloth.deviantart.com/" target="_blank" rel="noopener noreferrer">Paul Wang</a>
            </div>
            <div>
              <a href="https://github.com/tyuo9980" target="_blank" rel="noopener noreferrer">Peter Li</a>
            </div>
            <div>
              <a href="https://github.com/NullCodex" target="_blank" rel="noopener noreferrer">Jameson Yu</a>
            </div>
            <div>
              <a href="https://github.com/Celsius273" target="_blank" rel="noopener noreferrer">Kelvin Jiang</a>
            </div>
          </div>
        </div>
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