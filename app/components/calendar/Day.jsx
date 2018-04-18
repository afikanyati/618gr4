// Libs
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import Rnd              from 'react-rnd';

// Components

/**
 * The Day component is a component used to
 */
export default class Day extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // console.log("-----Day");
    }

    render() {
        return (
            <Container>
                <TimeContainer>
                    {
                        this.props.range(0, 24).map((hour) => {
                            return (
                                <HourContainer key={uuid.v4()}>
                                    <Hour>
                                        {`${hour}:00`}
                                    </Hour>
                                    <EventHour
                                        className="event-hour"
                                        onClick={this.props.addEvent.bind({}, hour, hour)}>
                                        {this.props.events[this.props.selection.year] && this.props.events[this.props.selection.year][this.props.selection.month] && this.props.events[this.props.selection.year][this.props.selection.month][this.props.selection.day] && this.props.events[this.props.selection.year][this.props.selection.month][this.props.selection.day][hour] ?
                                            <Rnd
                                                disableDragging={true}
                                                className={"event-item"}
                                                size={{ width: "100%",  height: `${this.props.events[this.props.selection.year][this.props.selection.month][this.props.selection.day][hour].to - hour + 1}00%`}}
                                                position={{ x: 0, y: 0 }}
                                                enableResizing={{
                                                    bottom: true,
                                                    bottomLeft: false,
                                                    bottomRight: false,
                                                    left: false,
                                                    right: false,
                                                    top: false,
                                                    topLeft: false,
                                                    topRight: false
                                                }}
                                                onResizeStop={(e, direction, ref, delta, position) => {
                                                        let eventHourHeight = document.getElementsByClassName('event-hour')[0].clientHeight;
                                                        let to = Math.floor(ref.offsetHeight / eventHourHeight);
                                                        this.props.editEventDuration(this.props.selection.year, this.props.selection.month, this.props.selection.day, hour, hour + to);
                                                  }}>
                                              {`${this.props.events[this.props.selection.year][this.props.selection.month][this.props.selection.day][hour].name} (${this.props.events[this.props.selection.year][this.props.selection.month][this.props.selection.day][hour].location})`}
                                            </Rnd>
                                        :
                                            null
                                        }
                                    </EventHour>
                                </HourContainer>
                            );
                        })
                    }
                </TimeContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Day");
    }

    // ========== Methods ===========


}

// ============= PropTypes ==============

Day.propTypes = {
    currentDate: PropTypes.object.isRequired,
    range: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    selection: PropTypes.object.isRequired,
    editEventDuration: PropTypes.func.isRequired
};

// ============= Styled Components ==============

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const HourContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: calc(1/24);
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
`;

const Hour = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-right: 1px solid #e0e0e0;
    height: 100%;
    width: 60px;
`;

const EventHour = styled.div`
    display: inline-block;
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
`;
