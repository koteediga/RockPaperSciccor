import {Component} from 'react'
import './index.css'

import Popup from 'reactjs-popup'
import {Heading, Image} from './styleComponent'

class HomeComponent extends Component {
  state = {
    score: 0,
    isActive: false,
    isButton: false,
    activeId: '',
    opponentChoice: '',
    result: '',
  }

  onChange = () => {
    this.setState({
      isActive: true,
    })
  }

  playAgain = () => {
    this.setState({
      activeId: '',
      opponentChoice: '',
      result: '',
      isButton: false,
    })
  }

  rockButton = id => {
    const opponentChoices = ['ROCK', 'PAPER', 'SCISSORS']
    const opponentChoice =
      opponentChoices[Math.floor(Math.random() * opponentChoices.length)]
    let result = ''

    if (id === opponentChoice) {
      result = 'IT IS DRAW'
    } else if (
      (id === 'ROCK' && opponentChoice === 'SCISSORS') ||
      (id === 'PAPER' && opponentChoice === 'ROCK') ||
      (id === 'SCISSORS' && opponentChoice === 'PAPER')
    ) {
      result = 'YOU WON'
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      result = 'YOU LOSE'
      this.setState(prevState => ({score: prevState.score - 1}))
    }

    this.setState({
      activeId: id,
      opponentChoice,
      result,
      isButton: true,
    })
  }

  render() {
    const {
      score,
      isActive,
      isButton,
      activeId,
      opponentChoice,
      result,
    } = this.state
    const {choicesList} = this.props
    return (
      <div className="container">
        <Heading>Rock Paper Scissors</Heading>
        <div>
          <div>
            <p>Score</p>
            <p className="para">{score}</p>
          </div>
        </div>
        <div>
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
                    className="image"
                  />
                </div>
                <div>
                  <h1>OPPONENT</h1>
                  <img
                    src={
                      choicesList.find(each => each.id === opponentChoice)
                        .imageUrl
                    }
                    alt="opponent choice"
                    className="image"
                  />
                </div>
                <p>{result}</p>
                <button onClick={this.playAgain}>PLAY AGAIN</button>
              </div>
            ) : (
              <ul>
                {choicesList.map(each => (
                  <li key={each.id}>
                    <button
                      data-testid={`${each.id.toLowerCase()}Button`}
                      onClick={() => this.rockButton(each.id)}
                    >
                      <Image src={each.imageUrl} alt={each.id} />
                    </button>
                  </li>
                ))}
              </ul>
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
