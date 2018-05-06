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
    }

    componentWillMount() {

    }

    render() {
        return (
            <Container>
                <Selector
                  statDetails={this.props.statDetails}
                  profileDetails={this.props.profileDetails}
                  setPosition={this.setPosition}
                  setStat={this.setStat}
                  setPlayers={this.setPlayers}>
                </Selector>
                <StatsWindow
                    selectedPosition={this.props.statDetails.selectedPosition}
                    selectedStat={this.props.statDetails.selectedStat}
                    selectedPlayers={this.props.statDetails.selectedPlayers}>
                </StatsWindow>
            </Container>
        );
    }

    componentDidMount() {

    }

    setPosition = (position) => {
        let statDetails = this.props.statDetails;
        statDetails.selectedPosition = position;
        this.props.commitStatDetails(statDetails);
    }
    setStat = (stat) => {
        let statDetails = this.props.statDetails;
        statDetails.selectedStat = stat;
        this.props.commitStatDetails(statDetails);
    }
    setPlayers = (players) => {
        let statDetails = this.props.statDetails;
        statDetails.selectedPlayers = players;
        this.props.commitStatDetails(statDetails);
    }

}

// ============= PropTypes ==============

Stats.propTypes = {
  statDetails: PropTypes.object.isRequired,
  commitStatDetails: PropTypes.func.isRequired,
  profileDetails: PropTypes.object.isRequired,
};

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 100vh;
`;
