// Libs
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import Rnd              from 'react-rnd';
import update                   from 'immutability-helper';

// Components
import EventAdder               from './calendar/EventAdder';
import Month                    from './calendar/Month';
import Drill                    from './calendar/Drill';
import Day                    from './calendar/Day';

/**
 * The Day component is a component used to
 */
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: {
                day: 0,
                month: 0,
                year: 0
            },
            selection: {
                day: 0,
                month: 0,
                year: 0
            },
            events: {}
        }
    }

    componentWillMount() {
        // console.log("-----Calendar");
        let todayDate = new Date();
        let currentDate = {
            day: todayDate.getDate(),
            month: todayDate.getMonth(),
            year: todayDate.getFullYear()
        };

        let selection = {
            day: currentDate.day,
            month: currentDate.month,
            year: currentDate.year
        };

        this.setState({
            currentDate: currentDate,
            selection: selection
        });
    }

    render() {
        return (
            <Container>
            <MonthEventContainer>
                  <Month
                      getDayOfWeek={this.getDayOfWeek}
                      selection={this.state.selection}
                      changeSelection={this.changeSelection}
                      currentDate={this.state.currentDate}
                      getMonthDays={this.getMonthDays}
                      range={this.range} />
                  <EventAdder
                      selection={this.state.selection}
                      getDayOfWeek={this.getDayOfWeek}
                      currentDate={this.state.currentDate}
                      getMonthDays={this.getMonthDays}
                      range={this.range} />
              </MonthEventContainer>
              <DayContainer>
                  <Day
                      selection={this.state.selection}
                      addEvent={this.addEvent}
                      events={this.state.events}
                      editEventDuration={this.editEventDuration}
                      currentDate={this.state.currentDate}
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
    changeSelection = (year, month, day)=> {
        let selection = this.state.selection;
        let newYear = year != selection.year ? year : selection.year;
        let newMonth = month != selection.month ? month : selection.month;
        let newDay = day != selection.day ? day : selection.day;

        selection = update(selection, {
            day: {$set: newDay},
            month: {$set: newMonth},
            year: {$set: newYear}
        });

        this.setState({
            selection: selection
        });
    }

    addEvent = (from, to) => {
        let events = {...this.state.events};
        if (events[this.state.selection.year] && events[this.state.selection.year][this.state.selection.month] && events[this.state.selection.year][this.state.selection.month][this.state.selection.day] && !events[this.state.selection.year][this.state.selection.month][this.state.selection.day][from]) {
            events[this.state.selection.year] = {
                [this.state.selection.month]: {
                    [this.state.selection.day]: {...events[this.state.selection.year][this.state.selection.month][this.state.selection.day],
                        [from]: {
                            name: "New Event",
                            location: "Unspecified Location",
                            to: to
                        }
                    }
                }
            };
        } else {
            events[this.state.selection.year] = {
                [this.state.selection.month]: {
                    [this.state.selection.day]: {
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
