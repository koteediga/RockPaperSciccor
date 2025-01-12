import {Component} from 'react'
import './index.css'
import Popup from 'reactjs-popup'

class HomeComponent extends Component {
  state = {
    score: 0,
    isActive: false,
    isButton: false,
    activeId: '',
    opponentChoice:'',
  }

  onChange = () => {
    this.setState({
      isActive: true,
    })
  }


  
  rockButton = id => {
    if (id === 'ROCK') {
      this.setState({
        isButton: true,
        activeId: id,
      })
    }
  }

  render() {
    const {score, isActive, isButton, activeId} = this.state
    const {choicesList} = this.props
    return (
      <div className="container">
        <h1>Rock Paper Scissors</h1>
        <div>
          <div>
            <p>Score</p>
            <p className="para">{score}</p>
          </div>
        </div>
        <div>
          <ul>
            {choicesList.map(each => (
              <li key={each.id}>
                <button
                  data-testid={`${each.id.toLowerCase()}Button`}
                  onClick={() => this.rockButton(each.id)}
                >
                  <img src={each.imageUrl} alt={each.id} className="image" />
                </button>
              </li>
            ))}
          </ul>
          <div>
            {isButton ? (
              <div>
                <div>
                  <h1>YOU</h1>
                  <img
                    src={
                      choicesList.find(each => each.id === activeId).imageUrl
                    }
                    alt="your choice"
                  />
                </div>
                <div>
                  <h1>OPPONENT</h1>
                  <img src={} alt="opponent choice" />
                </div>
                <button>PLAY AGAIN</button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <Popup
            trigger={<button className="rules-button">RULES</button>} // Button triggers popup
            modal
            nested
          >
            {close => (
              <div className="popup-content">
                <h2>Rules</h2>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="rules-image"
                />
                <button className="close-button" onClick={close}>
                  Close
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default HomeComponent
