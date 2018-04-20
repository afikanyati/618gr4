import React                from 'react';
import styled               from 'styled-components';
import date                 from 'date-and-time';

// Components
// import Practice    from './calendar/Practice';
// import DatePicker  from './calendar/DatePicker';
// import DrillSchedule       from './calendar/DrillSchedule';
import Selector       from './stats/Selector';
import StatsWindow    from './stats/StatsWindow';



export default class Stats extends React.Component {


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
                <Selector>
                </Selector>
                <StatsWindow>
                </StatsWindow>
            </Container>
        );
    }


    // render() {
    //     return (
    //         <Container>
    //         <DateContainer>
    //               <DatePicker
    //                   selectedDate={this.state.selectedDate}
    //                   changeSelectedDate={this.changeSelectedDate} />
    //               <Practice
    //                   selectedDate={this.state.selectedDate}
    //                   selectedPractice={this.state.selectedPractice}
    //                   setPractice={this.setPractice} />
    //           </DateContainer>
    //           <DrillScheduleContainer>
    //               <DrillSchedule
    //                   selectedPractice={this.state.selectedPractice}
    //                   addDrill={this.addDrill}
    //                   editDrillName={this.editDrillName}
    //                   editDrillDuration={this.editDrillDuration} />
    //           </DrillScheduleContainer>
    //         </Container>
    //     );
    // }

    x = (i) => {
      return i.index;
    }

    componentDidMount() {

    }

}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 100vh;
`;

// const Selector = styled.div`
//     display: flex;
//     flex-direction:column;
//     width: 20vw;
//     height: 100vh;


// `;


// const StatsWindow = styled.div`
//     width: 60vw;
//     height:100vh;
// `;
