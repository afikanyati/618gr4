// Dependencies
import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import date                 from 'date-and-time';

// Components
import Practice    from './calendar/Practice';
import DatePicker  from './calendar/DatePicker';
import DrillSchedule       from './calendar/DrillSchedule';


/**
 * The Calendar component is a component used to
 */
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            selectedPractice: -1, // should be an integer that points to selected practice in practices array on selectedDate. Set to null when date changed
            practiceRecord: {}    // dict keyed by date.format(day, m/d/y) with corresponding array of practices; a practice is dict of drills keyed by hour (or whatever increment we choose)
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
                      practiceRecord={this.state.practiceRecord}
                      selectedPractice={this.state.selectedPractice}
                      addPractice={this.addPractice}
                      changeSelectedPractice={this.changeSelectedPractice} />
              </DateContainer>
              <DrillScheduleContainer>
                  <DrillSchedule
                      selectedDate={this.state.selectedDate}
                      selectedPractice={this.state.selectedPractice}
                      practiceRecord={this.state.practiceRecord}
                      addDrill={this.addDrill}
                      editDrillName={this.editDrillName}
                      editDrillDuration={this.editDrillDuration}
                      range={this.range} />
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
            selectedPractice: null
        });
    };

    /**
     * [changeSelectedPractice description]
     * @param  {[type]} practiceIndex [description]
     */
    changeSelectedPractice = (practiceIndex) => {
        this.setState({
            selectedPractice: practiceIndex
        });
    }

    /**
     * [addPractice description]
     * @param {[type]} name      [description]
     */
    addPractice = (name, startTime) => {
        // TODO Ensure no duplicate practices
        let practiceRecord = {...this.state.practiceRecord};
        let practice = {
            name: name,
            startTime: date.format(startTime, 'hh:mm A'),
            drills: {}
        };

        if (practiceRecord[date.format(this.state.selectedDate, 'M/D/Y')]) {
            // Add practe to existing date key
            practiceRecord[date.format(this.state.selectedDate, 'M/D/Y')].push(practice);
        } else {
            // Create new date key and add practice
            practiceRecord[date.format(this.state.selectedDate, 'M/D/Y')] = [practice];
        }

        this.setState({
            practiceRecord: practiceRecord
        }, () => {
            console.log("Practice Record: ", practiceRecord);
        });
    }

    /**
     * [addDrill description]
     * @param {[type]} hour [description]
     */
    addDrill = (timeBlock) => {
        console.log("Time: ", timeBlock);
        let practiceRecord = {...this.state.practiceRecord};
        practiceRecord[date.format(this.state.selectedDate, 'M/D/Y')][this.state.selectedPractice]['drills'][timeBlock] = {name: "New Drill", durationFactor: 1};

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
        practiceRecord[date.format(this.state.selectedDate, 'M/D/Y')][this.state.selectedPractice]['drills'][timeBlock]['name'] = name;

        this.setState({
            practiceRecord: practiceRecord
        });
    }

    /**
     * [editDrillDuration description]
     * @param  {[type]} durationFactor [description]
     */
    editDrillDuration = (timeBlock, durationFactor) => {
        let practiceRecord = {...this.state.practiceRecord};
        practiceRecord[date.format(this.state.selectedDate, 'M/D/Y')][this.state.selectedPractice]['drills'][timeBlock]['durationFactor'] = durationFactor;

        this.setState({
            practiceRecord: practiceRecord
        });
    }

    /**
     * [range description]
     * @param  {[type]} start    [description]
     * @param  {[type]} end      [description]
     * @param  {Number} step [description]
     */
    range = (start, end, step = 1) => {
        end -= 1; // Makes range end exclusive
        const len = Math.floor((end - start) / step) + 1;
        return Array(len).fill().map((_, idx) => start + (idx * step));
    }

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
