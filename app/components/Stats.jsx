import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';

// Components
import StatsSelector       from './stats/Selector';
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
                <StatsSelector
                  statDetails={this.props.statDetails}
                  profileDetails={this.props.profileDetails}
                  commitStatDetails={this.props.commitStatDetails}
                />
                <StatsWindow
                    selectedPosition={this.props.statDetails.selectedPosition}
                    selectedStat={this.props.statDetails.selectedStat}
                    selectedPlayers={this.props.statDetails.selectedPlayers}
                />
            </Container>
        );
    }

    componentDidMount() {
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
`;
