import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import date                 from 'date-and-time';

// Components
// import Practice    from './calendar/Practice';
// import DatePicker  from './calendar/DatePicker';
// import DrillSchedule       from './calendar/DrillSchedule';
import Selector       from './stats/Selector';
import StatsWindow    from './stats/StatsWindow';



export default class Stats extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          selectedPosition: "",
          selectedStat: "",
          selectedPlayers: []
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <Container>
                <Selector
                  selectedPosition={this.state.selectedPosition}
                  selectedStat={this.state.selectedStat}
                  selectedPlayers={this.state.selectedPlayers}
                  setPosition={this.setPosition}
                  setStat={this.setStat}
                  setPlayers={this.setPlayers}>
                </Selector>
                <StatsWindow
                    selectedPosition={this.state.selectedPosition}
                    selectedStat={this.state.selectedStat}
                    selectedPlayers={this.state.selectedPlayers}>
                </StatsWindow>
            </Container>
        );
    }

    componentDidMount() {

    }

    setPosition = (position) => {
      this.setState({
          selectedPosition: position
      })
    }
    setStat = (stat) => {
      this.setState({
          selectedStat: stat
      })
    }
    setPlayers = (players) => {
      this.setState({
          selectedPlayers: players
      })
    }

}

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 100vh;
`;
