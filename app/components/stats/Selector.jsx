import React                from 'react';
import styled               from 'styled-components';
import date                 from 'date-and-time';










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
                <PositionSel>
                {"WHAT"}
                </PositionSel>
                <PlayerSel>
                {"HI"}
                </PlayerSel>
                <StatSel>
                {"YO"}
                </StatSel>
            </Container>
        );
    }

    componentDidMount() {

    }

}





const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: red;
    width: 20vw;


`;

const PositionSel = styled.div`
    height: 30vh;
    background-color: blue;

`;

const PlayerSel = styled.div`
    height: 30vh;
    background-color: green;


    
`;


const StatSel = styled.div`

    height: 40vh;
    background-color: purple;



`;
