/*
 *  Root of flowread.com: Web framework build on
 *  Firebase + ReactJS, written in JS ES6 compiled with babelJS,
 *  Bundled with webpack and NPM.
 *  written by Afika Nyati.
 */

// Dependencies
import React                    from 'react';
import styled                   from 'styled-components';
import { CSSTransitionGroup }   from 'react-transition-group';
import initReactFastclick       from 'react-fastclick';

// Components
import Calendar                      from './Calendar';
import Stats                         from './Stats';



// Initialize Firebase

// Initializing to enable Touch Tap events. It is global
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
            view : "Calendar"
        };
    }

    componentWillMount() {
    }

    render() {
        let view;

        switch(this.state.view) {
            case "Profile":
                // view = <Profile />;
                view = null;
                break;
            case "Calendar":
                view = <Calendar />;
                break;
            case "Stats":
                // view = <Stats />;
                view = <Stats />;
                break;
        }

        return(
            <Container>
                <SideBar>
                    <Navigation>
                        <NavItem
                        onClick = {this.toggleViewState.bind({}, "Profile")}>
                            {"Profile"}
                        </NavItem>
                        <NavItem
                        onClick = {this.toggleViewState.bind({}, "Calendar")}>
                            {"Calendar"}
                        </NavItem>
                        <NavItem
                        onClick = {this.toggleViewState.bind({}, "Stats")}>
                            {"Stats"}
                        </NavItem>
                    </Navigation>
                </SideBar>
                {view}
            </Container>
        );
    }

    componentDidMount() {
        // console.log("++++++App");
    }

    componentWillUnmount() {
    }

    // ========== Methods ===========

   toggleViewState = (newView) => {
      this.setState({
          view: newView
      })
   }

}

// ============= Styled Components ==============
const SideBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 20vw;
  height: 100vh;
`;

const Navigation = styled.ul`

`;

const NavItem = styled.li`

`;


const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`;
