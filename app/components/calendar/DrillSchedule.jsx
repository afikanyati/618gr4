// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import date             from 'date-and-time';
import Rnd              from 'react-rnd';
import _ from 'lodash'

// Components
import Drill                from './Drill';


/**
 * The DrillSchedule component is a component used to
 */
export default class DrillSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // console.log("-----DrillSchedule");
    }

    render() {
        if (this.props.selectedPractice) {
            return this.renderDrillSchedule();
        } else {
            return this.renderPracticeSelectorMessage();
        }
    }

    componentDidMount() {
        // console.log("+++++DrillSchedule");
    }

    // ========== View Methods ===========

    renderDrillSchedule = () => {
        return (
            <Container>
                <ScheduleContainer>
                    {
                    this.getTimeBlocks().map((timeBlock, index, arr) => {
                        let timeBlockString = this.timeBlockKey(timeBlock);
                        return (
                            <TimeBlockContainer
                                numBlocks={arr.length}
                                key={uuid.v4()}>
                                <TimeBlockLabel>
                                    {timeBlockString}
                                </TimeBlockLabel>
                                <TimeBlock
                                    className="event-hour"
                                    onClick={this.props.addDrill.bind({}, timeBlockString)}>
                                    {!this.props.selectedPractice.drills[timeBlockString] ? null :
                                        <Rnd
                                            disableDragging={true}
                                            className={"event-item"}
                                            size={{ width: "100%",  height: `${this.props.selectedPractice.drills[timeBlockString].durationFactor}00%`}}
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
                                                    //this.props.editEventDuration(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth(), this.props.selectedDate.day, hour, hour + to);
                                              }}>
                                          {this.props.selectedPractice.drills[timeBlockString].name}
                                        </Rnd>
                                    }
                                </TimeBlock>
                            </TimeBlockContainer>
                        );
                    })
                    }
                </ScheduleContainer>
            </Container>
        );
    };

    renderPracticeSelectorMessage = () => {
        return (
            <p>Select Practice to See Schedule</p>
        );
    };

    // ========== Methods ===========

    getTimeBlocks = () => {
      let startTime = this.props.selectedPractice.startTime;
      let endTime = this.props.selectedPractice.endTime;
      let duration = date.subtract(endTime, startTime).toMinutes();

      return _.range(0, duration, this.props.timeIncrements).map((offset) => {return date.addMinutes(startTime, offset)})
    };

    timeBlockKey = (timeBlock) => { return date.format(timeBlock, 'h:mm A') };
}

// ============= PropTypes ==============

DrillSchedule.propTypes = {
    selectedPractice: PropTypes.object,
    addDrill: PropTypes.func.isRequired,
    editDrillName: PropTypes.func.isRequired,
    editDrillDuration: PropTypes.func.isRequired,
    timeIncrements: PropTypes.number.isRequired,
};

// ============= Styled Components ==============

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const ScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const TimeBlockContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: ${props => 'calc(1/' + props.numBlocks + ')'};
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
`;

const TimeBlockLabel = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-right: 1px solid #e0e0e0;
    height: 100%;
    width: 60px;
`;

const TimeBlock = styled.div`
    display: inline-block;
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
`;
