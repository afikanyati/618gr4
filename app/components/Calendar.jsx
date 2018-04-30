// Dependencies
import React                from 'react';
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
          selectedDate: new Date(),
          selectedPractice: null,
          practiceRecord: {},  // Maps date.format(day, m/d/y) to corresponding practice.
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
            <DateContainer>
                  <DatePicker
                      selectedDate={this.state.selectedDate}
                      changeSelectedDate={this.changeSelectedDate}
                      practiceRecord={this.state.practiceRecord}
                      practiceKey={this.practiceKey} />
                  <Practice
                      selectedDate={this.state.selectedDate}
                      selectedPractice={this.state.selectedPractice}
                      setPractice={this.setPractice}
                      editPractice={this.editPractice} />
              </DateContainer>
              <DrillScheduleContainer>
                  <DrillSchedule
                      selectedPractice={this.state.selectedPractice}
                      addDrill={this.addDrill}
                      removeDrill={this.removeDrill}
                      editDrill={this.editDrill}
                      timeIncrements={timeIncrements} />
              </DrillScheduleContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Calendar");
    }

    // ========== Methods ===========

    changeSelectedDate = (newDate)=> {
        this.setState({
            selectedDate: newDate,
            selectedPractice: this.state.practiceRecord[this.practiceKey(newDate)]
        });
    };

    setPractice = (startTime, endTime) => {
        let practiceRecord = {...this.state.practiceRecord};

        let practice;
        if (!startTime) {
            // Remove practive
            practice = null;
        } else {
            let drills = practiceRecord[this.practiceKey(this.state.selectedDate)] ? practiceRecord[this.practiceKey(this.state.selectedDate)].drills: {};
            // Add practice
            practice = {
                description: "",
                startTime: startTime,
                endTime: endTime,
                drills: drills
            };
        }

        practiceRecord[this.practiceKey(this.state.selectedDate)] = practice;

        this.setState({
            practiceRecord: practiceRecord,
            selectedPractice: practice,
        });
    };

    editPractice = (description, startTime, endTime) => {
        if (this.state.selectedPractice) {
            let selectedPractice = this.state.selectedPractice;
            if (description) selectedPractice.description = description;
            if (startTime) selectedPractice.startTime = startTime;
            if (endTime) selectedPractice.endTime = endTime;

            this.setState({
                selectedPractice: selectedPractice
            });
        }
    };

    addDrill = (timeBlockOffset) => {
        this.state.selectedPractice.drills[timeBlockOffset] = {
            name: "New Drill",
            duration: 1
        };
        this.setState({
          practiceRecord: this.state.practiceRecord
        });
    };

    removeDrill = (timeBlockOffset, e) => {
        e.stopPropagation();
        delete this.state.selectedPractice.drills[timeBlockOffset];
        this.setState({
          practiceRecord: this.state.practiceRecord
        });
    };

    editDrill = (timeBlockOffset, field, value) => {
        this.state.selectedPractice.drills[timeBlockOffset][field] = value;

        this.setState({
            practiceRecord: this.state.practiceRecord
        });
    };

    practiceKey = (practiceDate) => { return date.format(practiceDate, 'M/D/Y') };
}

// ============= PropTypes ==============

Calendar.propTypes = {

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
