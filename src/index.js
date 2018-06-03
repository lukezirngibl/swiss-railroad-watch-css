import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%vw;
  flex-direction: column;
`;

const Circle = styled.div`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  position: relative;
`;

const WatchEdge = Circle.extend`
  border-radius: 50%;
  height: 350px;
  width: 350px;
  padding: 2px;
  background: linear-gradient(45deg, #cdcec6, #dbdbdd);
`;

const WatchEdge1 = Circle.extend`
  padding: 2px;
  background: linear-gradient(45deg, #7e8a88, #60606c);
`;

const WatchEdge2 = Circle.extend`
  padding: 8px;
  background: #010204;
`;

const WatchEdge3 = Circle.extend`
  padding: 4px;
  background: linear-gradient(45deg, #adb6bb, #a4afb3);
`;

const WatchEdge4 = Circle.extend`
  padding: 2px;
  background: linear-gradient(45deg, #555f69, #5a686b);
`;

const WatchEdge5 = Circle.extend`
  padding: 2px;
  background: linear-gradient(45deg, #394448, #313a3f);
`;

const WatchEdge6 = Circle.extend`
  padding: 5px;
  background: linear-gradient(45deg, #adb6bb, #a4afb3);
`;

const WatchFace = Circle.extend`
  background-color: white;
  box-shadow: inset 1px 1px 1px 1px #d8e1e6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotationCircle = styled.div`
  width: 100%;
  height: 100%;
  transform: rotate(${props => (props.n)}deg);
  position: absolute;
  top: 0;
  left: 0;
`;

const Mark = styled.div`
  width: ${props => (props.n % 5 / 6) === 0 ? '8px' : '4px'};
  height: ${props => (props.n / 6) % 5 === 0 ? '30px' : '10px'};
  background-color: black;
  position: absolute;
  left: calc(50% - ${props => (props.n / 6) % 5 === 0 ? '4px' : '2px'});
  top: 8px;
`;

const SecondBar = styled.div`
  position: absolute;
  left: calc(50% - 1.5px);
  width: 3px;
  top: 50px;
  height: 150px;
  background-color: #c2011e;
`;

const SecondCircle = styled.div`
  background-color: #c2011e;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  position: absolute;
  top: 39px;
  left: calc(50% - 11px);
`;

const SecondOuterCircle = styled.div`
  background-color: #c2011e;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  position: absolute;
  top: calc(50% - 6px);
  left: calc(50% - 6px);
`;

const SecondInnerCircle = styled.div`
  background-color: black;
  border-radius: 1px;
  height: 2px;
  left: calc(50% - 1px);
  top: calc(50% - 1px);
  width: 2px;
  z-index: 1;
`;

const Bar = styled.div`
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  height: 0;
  position: absolute;
`;

const HourBar = Bar.extend`
  border-bottom: 130px solid black;
  width: 20px;
  top: 50px;
  left: calc(50% - 10px);
`;

const MinuteBar = Bar.extend`
  border-bottom: 170px solid black;
  width: 16px;
  top: 12px;
  left: calc(50% - 8px);
`;

const Shadow = styled.div`
  background: red;
  border-radius: 50%;
  height: 15px;
  width: 275px;
  margin-top: 25px;
  background-color: #DEDEDE;
`;

class Watch extends Component {

  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      s: date.getSeconds() + (date.getMinutes() * 60) + ((date.getHours() % 12) * 3600) - 1,
    }
  }

  componentDidMount() {
    this.interval = setInterval(
      () => { this.setState({ s: this.state.s >= 43200 ? 0 : this.state.s + 1 }); },
      1000,
    );
  }

  renderTick = (tick, key) => (
    <RotationCircle key={key} n={key * 6}>
      <Mark n={key * 6} />
    </RotationCircle>
  );

  render() {
    let ticks = new Array(60);
    for(let i = 0; i < ticks.length; i++) {
      ticks[i] = i;
    }
    const seconds = this.state.s % 60;
    const minutes = Math.floor(this.state.s / 60);
    const hours = Math.floor(minutes / 60);
    return (
      <Wrapper>
        <WatchEdge>
          <WatchEdge1>
            <WatchEdge2>
              <WatchEdge3>
                <WatchEdge4>
                  <WatchEdge5>
                    <WatchEdge6>
                      <WatchFace>
                        {ticks.map(this.renderTick)}
                        <RotationCircle n={(hours * 30) + (((minutes % 60) / 60) * 30)} >
                          <HourBar />
                        </RotationCircle>
                        <RotationCircle n={((minutes % 60) * 6) + ((seconds / 60) * 6)} >
                          <MinuteBar />
                        </RotationCircle>
                        <RotationCircle n={(seconds % 60) * 6} >
                          <SecondCircle />
                          <SecondBar />
                        </RotationCircle>
                        <SecondInnerCircle />
                        <SecondOuterCircle />
                      </WatchFace>
                    </WatchEdge6>
                  </WatchEdge5>
                </WatchEdge4>
              </WatchEdge3>
            </WatchEdge2>
          </WatchEdge1>
        </WatchEdge>
        <Shadow />
      </Wrapper>
    );
  }
}

ReactDOM.render(
  <Watch />, document.getElementById('react'),
);
