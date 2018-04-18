// Libs
import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import uuid             from 'uuid';
import Rnd              from 'react-rnd';

// Components

/**
 * The Day component is a component used to
 */
export default class Drill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // console.log("-----Day");
    }

    render() {
        return (
            <Container>
            </Container>
        );
    }

    componentDidMount() {
        // console.log("+++++Day");
    }

    // ========== Methods ===========


}

// ============= PropTypes ==============

Drill.propTypes = {

};

// ============= Styled Components ==============

const Container = styled.div`
    
`;
