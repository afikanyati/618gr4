/*
 *  Root of flowread.com: Web framework build on
 *  Firebase + ReactJS, written in JS ES6 compiled with babelJS,
 *  Bundled with webpack and NPM.
 *  written by Afika Nyati.
 */

// Dependencies
import React                        from 'react';
import firebase                     from 'firebase';
import config                       from '../../firebase.json';
import styled                       from 'styled-components';
import { CSSTransitionGroup }       from 'react-transition-group';
import initReactFastclick           from 'react-fastclick';

// Components
import Profile                      from './Profile';
import Calendar                     from './Calendar';
import Stats                        from './Stats';
import DefaultPhoto                 from '../assets/images/default-avatar.png';



// Initialize Firebase
firebase.initializeApp(config);

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
            view : "Calendar",
            profileDetails: {
                name: "Victor Fink",
                avatar: null,
                position: "Goalie"
            }
        };
    }

    componentWillMount() {
    }

    render() {
        let view;

        switch(this.state.view) {
            case "Profile":
                view = <Profile
                    profileDetails={this.state.profileDetails}
                    modifyProfileDetails={this.modifyProfileDetails}/>;
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
                    <ProfileContainer img={!this.state.profileDetails.avatar ? DefaultPhoto : this.state.profileDetails.avatar} />
                    <Name>
                        {this.state.profileDetails.name}
                    </Name>
                    <Navigation>
                        <NavItem
                            selected={this.state.view == "Profile"}
                            onClick = {this.toggleViewState.bind({}, "Profile")}>
                            {"Profile"}
                        </NavItem>
                        <NavItem
                            selected={this.state.view == "Calendar"}
                            onClick = {this.toggleViewState.bind({}, "Calendar")}>
                            {"Calendar"}
                        </NavItem>
                        <NavItem
                            selected={this.state.view == "Stats"}
                            onClick = {this.toggleViewState.bind({}, "Stats")}>
                            {"Statistics"}
                        </NavItem>
                    </Navigation>
                    <LogoutButton>
                        Logout
                    </LogoutButton>
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

   modifyProfileDetails = (key, value) => {
       console.log(key, value);
       let profileDetails = this.state.profileDetails;
       profileDetails[key] = value;

       this.setState({
           profileDetails: profileDetails
       });
   };

}

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`;

const SideBar = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 20vw;
    height: 100vh;
    border-right: 1px solid #e0e0e0;
    z-index: 2;
`;

const Navigation = styled.ul`
    margin: 0px;
    padding: 0px;
    width: 100%;
`;

const NavItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    width: 100%;
    height: 50px;
    background: ${props => props.selected ?
            props.theme.red
        :
            props.theme.white
    };
    color: ${props => props.selected ?
            props.theme.white
        :
            "inherit"
    };
    cursor: pointer;
    transition: background 0.2s;
`;

const ProfileContainer = styled.div`
    width: 20vw;
    height: 20vw;
    background: none;
    background-image: ${props => 'url(' + props.img + ')'};
    background-position: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
    transition: box-shadow 0.15s background 0.2s;
`;

const Name = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 63px;
    font-size: 1.5em;
    font-weight: 700;
    color: ${props => props.theme.white};
    text-align: center;
    background: ${props => props.theme.black};
    margin: 0;
    padding: 15px 0;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    z-index: 1;
`;

const LogoutButton = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    height: 50px;
    width: 100%;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${props => props.theme.red};
    }
`;
