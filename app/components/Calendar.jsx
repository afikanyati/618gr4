// Libs
import React            from 'react';
import date             from 'date-and-time';
import styled           from 'styled-components';
import update           from 'immutability-helper';

// Components
import EventAdder               from './calendar/EventAdder';
import Month                    from './calendar/Month';
import Drill                    from './calendar/Drill';
import Day                      from './calendar/Day';

/**
 * The Day component is a component used to
 */
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarDate: new Date(),
            selectedDate: new Date(),
            events: {}
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
            <MonthEventContainer>
                  <Month
                      selectedDate={this.state.selectedDate}
                      changeSelectedDate={this.changeSelectedDate} />
                  <EventAdder
                      selection={this.state.selectedDate}
                      getDayOfWeek={this.getDayOfWeek}
                      currentDate={this.state.selectedDate}
                      getMonthDays={this.getMonthDays}
                      range={this.range} />
              </MonthEventContainer>
              <DayContainer>
                  <Day
                      selectedDate={this.state.selectedDate}
                      addEvent={this.addEvent}
                      events={this.state.events}
                      editEventDuration={this.editEventDuration}
                      range={this.range} />
              </DayContainer>
              <DrillContainer>
                  <Drill>

                  </Drill>
              </DrillContainer>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Day");
    }

    // ========== Methods ===========
    changeSelectedDate = (newDate)=> {
        // TODO ?
        //selection = update(selection, {
        //    day: {$set: newDay},
        //    month: {$set: newMonth},
        //    year: {$set: newYear}
        //});

        this.setState({
            selectedDate: newDate,
        });
    };

    addEvent = (from, to) => {
        let events = {...this.state.events};
        if (events[this.state.selectedDate.year] && events[this.state.selectedDate.year][this.state.selectedDate.month] && events[this.state.selectedDate.year][this.state.selectedDate.month][this.state.selectedDate.day] && !events[this.state.selectedDate.year][this.state.selectedDate.month][this.state.selectedDate.day][from]) {
            events[this.state.selectedDate.year] = {
                [this.state.selectedDate.month]: {
                    [this.state.selectedDate.day]: {...events[this.state.selectedDate.year][this.state.selectedDate.month][this.state.selectedDate.day],
                        [from]: {
                            name: "New Event",
                            location: "Unspecified Location",
                            to: to
                        }
                    }
                }
            };
        } else {
            events[this.state.selectedDate.year] = {
                [this.state.selectedDate.month]: {
                    [this.state.selectedDate.day]: {
                        [from]: {
                            name: "New Event",
                            location: "Unspecified Location",
                            to: to
                        }
                    }
                }
            };
        }

        this.setState({
            events: events
        }, () => {
            console.log("EVENTSSS: ", this.state.events);
        });
    }

    editEventDuration = (year, month, day, from, to) => {
        console.log("TOOO: ", to);
        let events = update(this.state.events, {
            [year]: {
                [month]: {
                    [day]: {
                        [from]: {
                            to: {$set: to}
                        }
                    }
                }
            }
        });
        console.log("EEEE: ", events);

        this.setState({
            events: events
        }, () => {
            console.log("EVENTSSS: ", this.state.events);
        });
    }

    getDayOfWeek = (year, month, day) => {
        let dateObj = new Date(year, month, day);
        return dateObj.getDay();
    }

    getMonthDays = (year, month) => {
        let d= new Date(year, month + 1, 0);
        return d.getDate();
    }

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

const MonthEventContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.3;
    border-right: 1px solid #e0e0e0;
`;

const DayContainer = styled.div`
    flex: 0.4;
`;

const DrillContainer = styled.div`
    flex: 0.3;
`;
