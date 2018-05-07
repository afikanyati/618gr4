// Dependencies
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import date                 from 'date-and-time';

// Components
import Practice    from './calendar/Practice';
import DatePicker  from './calendar/DatePicker';
import DrillSchedule       from './calendar/DrillSchedule';


// Settings
const timeIncrements = 10;  // measured in minutes

/**
 * The Calendar component is a component used to
 */
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
            <DateContainer>
                  <DatePicker
                      selectedDate={this.props.practiceDetails.selectedDate}
                      changeSelectedDate={this.changeSelectedDate}
                      practiceRecord={this.props.practiceDetails.practiceRecord}
                      practiceKey={this.practiceKey} />
                  <Practice
                      selectedDate={this.props.practiceDetails.selectedDate}
                      selectedPractice={this.props.practiceDetails.selectedPractice}
                      setPracticeDescription={this.setPracticeDescription}
                      setPracticeTime={this.setPracticeTime} />
              </DateContainer>
              <DrillScheduleContainer>
                  <DrillSchedule
                      selectedPractice={this.props.practiceDetails.selectedPractice}
                      timeIncrements={timeIncrements}
                      updateDrills={this.props.commitPracticeDetails}
                  />
              </DrillScheduleContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Calendar");
    }

    // ========== Methods ===========

    changeSelectedDate = (newDate)=> {
        let newSelectedPractice = this.props.practiceDetails.practiceRecord[this.practiceKey(newDate)];
        this.props.practiceDetails.selectedDate = newDate;
        this.props.practiceDetails.selectedPractice = newSelectedPractice;
        this.props.commitPracticeDetails();
    };

    setPracticeDescription = (description) => {
        if (this.props.practiceDetails.selectedPractice) {
          this.props.practiceDetails.selectedPractice.description = description;
          this.props.commitPracticeDetails()
        }
    };

    setPracticeTime = (startTime, endTime) => {
        let practiceRecord = this.props.practiceDetails.practiceRecord;
        let selectedDate = this.props.practiceDetails.selectedDate;
        let selectedPractice = practiceRecord[this.practiceKey(selectedDate)];

        if (!startTime) {
            // Remove practice
            selectedPractice = null;

        } else {
            // Add practice
            selectedPractice = {
                description: selectedPractice ? selectedPractice.description : "",
                startTime: startTime,
                endTime: endTime,
                drills: selectedPractice ? selectedPractice.drills : [],
                drillDuration: 0, //drills.reduce((acc, drill) => acc + drill.duration, 0),
                practiceDuration: date.subtract(endTime, startTime).toMinutes() / timeIncrements,
            };

            // Prune extra drills
            let prunedDrills = [];
            for (let drill of selectedPractice.drills) {
                selectedPractice.drillDuration += drill.duration;
                prunedDrills.push(drill);
                if (selectedPractice.drillDuration >= selectedPractice.practiceDuration) {
                  drill.duration -= selectedPractice.drillDuration - selectedPractice.practiceDuration;
                  selectedPractice.drillDuration = selectedPractice.practiceDuration;
                  break;
                }
            }
            selectedPractice.drills = prunedDrills;
        }

        practiceRecord[this.practiceKey(selectedDate)] = selectedPractice;
        this.props.practiceDetails.selectedPractice = selectedPractice;
        this.props.commitPracticeDetails()
    };

    practiceKey = (practiceDate) => { return date.format(practiceDate, 'M/D/Y') };
}

// ============= PropTypes ==============

Calendar.propTypes = {
  practiceDetails: PropTypes.object.isRequired,
  commitPracticeDetails: PropTypes.func.isRequired,
};

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.4;
    border-right: 1px solid #e0e0e0;
`;

const DrillScheduleContainer = styled.div`
    flex: 0.6;
`;
