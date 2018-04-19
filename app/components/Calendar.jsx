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
                      changeSelectedDate={this.changeSelectedDate} />
                  <Practice
                      selectedDate={this.state.selectedDate}
                      selectedPractice={this.state.selectedPractice}
                      setPractice={this.setPractice} />
              </DateContainer>
              <DrillScheduleContainer>
                  <DrillSchedule
                      selectedPractice={this.state.selectedPractice}
                      addDrill={this.addDrill}
                      editDrillName={this.editDrillName}
                      editDrillDuration={this.editDrillDuration}
                      timeIncrements={timeIncrements} />
              </DrillScheduleContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Calendar");
    }

    // ========== Methods ===========

    /**
     * [changeSelectedDate description]
     * @param  {[type]} newDate [description]
     */
    changeSelectedDate = (newDate)=> {
        this.setState({
            selectedDate: newDate,
            selectedPractice: this.state.practiceRecord[this.practiceKey(newDate)]
        });
    };

    /**
     * [addPractice description]
     * @param {[type]} name      [description]
     */
    setPractice = (startTime, endTime) => {
        let practiceRecord = {...this.state.practiceRecord};

        let practice;
        if (!startTime) {
            practice = null;
        } else {
          practice = {
            startTime: startTime,
            endTime: endTime,
            drills: {}
          };
        }

        practiceRecord[this.practiceKey(this.state.selectedDate)] = practice;

        this.setState({
            practiceRecord: practiceRecord,
            selectedPractice: practice,
        });
    };

    /**
     * [addDrill description]
     * @param {[type]} hour [description]
     */
    addDrill = (timeBlock) => {
        console.log("Time: ", timeBlock);
        let practiceRecord = {...this.state.practiceRecord};
        practiceRecord[this.practiceKey(this.state.selectedDate)]['drills'][timeBlock] = {name: "New Drill", durationFactor: 1};

        this.setState({
            practiceRecord: practiceRecord
        });
    }

    /**
     * [editDrillName description]
     * @param  {[type]} time [description]
     * @param  {[type]} name [description]
     */
    editDrillName = (timeBlock, name) => {
        let practiceRecord = {...this.state.practiceRecord};
        practiceRecord[this.practiceKey(this.state.selectedDate)]['drills'][timeBlock]['name'] = name;

        this.setState({
            practiceRecord: practiceRecord
        });
    };

    /**
     * [editDrillDuration description]
     * @param  {[type]} durationFactor [description]
     */
    editDrillDuration = (timeBlock, durationFactor) => {
        let practiceRecord = {...this.state.practiceRecord};
        practiceRecord[this.practiceKey(this.state.selectedDate)]['drills'][timeBlock]['durationFactor'] = durationFactor;

        this.setState({
            practiceRecord: practiceRecord
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
