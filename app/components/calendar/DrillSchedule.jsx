// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import date             from 'date-and-time';
import _                from 'lodash';

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
            <ScheduleContainer>
                {
                this.getTimeBlocks().map((timeBlock, index, arr) => {
                    let timeBlockString = this.timeBlockKey(timeBlock);
                    return (
                        <TimeBlockContainer
                            height={`${100/arr.length}%`}
                            numBlocks={arr.length}
                            key={uuid.v4()}>
                            <TimeBlockLabel>
                                {timeBlockString}
                            </TimeBlockLabel>
                            <TimeBlock
                                className="event-hour"
                                onClick={ () => this.handleAddDrill(index) }>
                                {
                                    !this.props.selectedPractice.drills[index] ? null :
                                    <Drill
                                        drill={this.props.selectedPractice.drills[index]}
                                        timeBlockOffset={index}
                                        removeDrill={this.props.removeDrill}
                                        editDrill={this.props.editDrill} />
                                }
                            </TimeBlock>
                        </TimeBlockContainer>
                    );
                })
                }
            </ScheduleContainer>
        );
    };

    renderPracticeSelectorMessage = () => {
        return (
            <EmptySchedule>
                <Text>Add Practice to Create Schedule</Text>
            </EmptySchedule>
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

    handleAddDrill = (timeBlockOffset) => {
        let drills = this.props.selectedPractice.drills;

        // check if already in use, directly, or by stretched drill
        if (drills[timeBlockOffset]) {
          return;
        }
        let offset = timeBlockOffset - 1;
        while (offset >= 0) {
            if (drills[offset]) {
                if (offset + drills[offset].duration > timeBlockOffset) {
                    return;
                }
                break;  // no earlier drill can stretch over a later one
            }
            offset -= 1;
        }

        this.props.addDrill(timeBlockOffset);
    }
}

// ============= PropTypes ==============

DrillSchedule.propTypes = {
    selectedPractice: PropTypes.object,
    addDrill: PropTypes.func.isRequired,
    removeDrill: PropTypes.func.isRequired,
    editDrill: PropTypes.func.isRequired,
    timeIncrements: PropTypes.number.isRequired,
};

// ============= Styled Components ==============

const ScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;http://localhost:8080/
    width: 100%;
`;

const TimeBlockContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: ${props => 'calc(1/' + props.numBlocks + ')'};
    height: ${props => props.height};
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
    width: 100px;
`;

const TimeBlock = styled.div`
    display: inline-block;
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
`;

const EmptySchedule = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Text = styled.h2`
    font-size: ${props => props.size};
    font-weight: 700;
    color: ${props => props.theme.black};
    text-align: ${props => props.center ?
            "center"
        :
            "left"
    };
    padding: 0px;
    margin: 0;
`;
