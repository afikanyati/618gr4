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
            console.log(this.props.selectedPractice)
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
                    _.range(0, 12).map((timeBlock, index, arr) => {
                        return (
                            <TimeBlockContainer
                                numBlocks={arr.length}
                                key={uuid.v4()}>
                                <TimeBlockLabel>
                                    {`${timeBlock}:00`}
                                </TimeBlockLabel>
                                <TimeBlock
                                    className="event-hour"
                                    onClick={this.props.addDrill.bind({}, timeBlock)}>
                                    {!this.props.selectedPractice['drills'][timeBlock] ? null :
                                        <Rnd
                                            disableDragging={true}
                                            className={"event-item"}
                                            size={{ width: "100%",  height: `${this.props.selectedPractice['drills'][timeBlock]['durationFactor']}00%`}}
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
                                          {this.props.selectedPractice['drills'][timeBlock]['name']}
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
}

// ============= PropTypes ==============

DrillSchedule.propTypes = {
    selectedPractice: PropTypes.object,
    addDrill: PropTypes.func.isRequired,
    editDrillName: PropTypes.func.isRequired,
    editDrillDuration: PropTypes.func.isRequired,
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
