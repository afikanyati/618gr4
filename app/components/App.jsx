/*
 *  Root of flowread.com: Web framework build on
 *  Firebase + ReactJS, written in JS ES6 compiled with babelJS,
 *  Bundled with webpack and NPM.
 *  written by Afika Nyati.
 */

// Libararies
import React                    from 'react';
import firebase                 from 'firebase';
import config                   from '../../firebase_config.json';
import styled                   from 'styled-components';
import { CSSTransitionGroup }   from 'react-transition-group';
import update                   from 'immutability-helper';
import initReactFastclick       from 'react-fastclick';

// Components
import Day                      from './Day';
import EventAdder               from './EventAdder';
import Month                    from './Month';

// Initialize Firebase
firebase.initializeApp(config);

// Initializing to enable Touch Tap events. It is global
// Used by Material UI
initReactFastclick();

/**
 * Root of App.
 * NOTE: default signifies that this is the only class exported from this file.
 * The majority of the web application's logic and state variables are housed in this
 * component. It is the topmost component in the App tree.
 */
export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {},
            currentDate: {
                day: 0,
                month: 0,
                year: 0
            },
            selection: {
                day: 0,
                month: 0,
                year: 0
            }
        };
    }

    componentWillMount() {
        // console.log("-----App");
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
        return(
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
            </Container>
        );
    }

    componentDidMount() {
        // console.log("++++++App");
        window.addEventListener("resize", this.rerender);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.rerender);
    }

    // ========== Methods ===========

    /**
     * Function attached to a listener connected to window element
     * Rerenders entire app when visitor adjusts browser size
     */
   rerender = () => {
       this.setState({});
   }

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
       console.log("Bo");
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

// ============= Styled Components ==============
const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`;

const MonthEventContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.5;
    border-right: 1px solid #e0e0e0;
`;

const DayContainer = styled.div`
    flex: 0.5;
`;
