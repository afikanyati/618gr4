import React                from 'react';
import styled               from 'styled-components';
import date                 from 'date-and-time';


export default class StatsWindow extends React.Component {

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
            </Container>
        );
    }

    componentDidMount() {

    }

}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: yellow;
    width: 60vw;


`;
