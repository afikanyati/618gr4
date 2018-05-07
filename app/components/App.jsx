/*
 *  Web framework build in ReactJS, written in JS ES6 compiled with babelJS,
 *  Bundled with webpack and NPM.
 *  Written by Abigail Russell, Efraim Helman, Taylor Herr, and Afika Nyati
 */

// Dependencies
import React                        from 'react';
import styled                       from 'styled-components';
import { CSSTransitionGroup }       from 'react-transition-group';
import initReactFastclick           from 'react-fastclick';
import Snackbar                     from 'material-ui/Snackbar';
import getMuiTheme                  from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';

// Components
import Profile                      from './Profile';
import Calendar                     from './Calendar';
import Stats                        from './Stats';
import DefaultPhoto                 from '../assets/images/default-avatar.png';
import LacrosseLogo                 from '../assets/images/lacrosse-logo.svg'
import FacebookLogo                 from '../assets/images/facebook.svg';
import GoogleLogo                   from '../assets/images/google.svg';
import HomeBlack                    from '../assets/images/home-black.svg';
import HomeBlue                     from '../assets/images/home-blue.svg';

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
            loggedIn: false,
            forgotPassword: false,
            view : "Calendar",
            profileDetails: {
                name: "Victor Fink",
                avatar: null,
                position: "Goalie"
            },
            practiceDetails: {
                selectedDate: new Date(),
                selectedPractice: null,
                practiceRecord: {},  // Maps date.format(day, m/d/y) to corresponding practice.
            },
            statDetails: {
                selectedPosition: "",
                selectedStat: "",
                selectedPlayers: []
            },
            errors          : [],
            errorType       : {},
            currentError    : ""
        };
    }

    componentWillMount() {
    }

    render() {
        if (!this.state.loggedIn && this.state.forgotPassword) {
            return this.renderForgotPassword();
        } else if (!this.state.loggedIn) {
            return this.renderLandpage();
        } else {
            return this.renderLacrosseApp();
        }
    }

    componentDidMount() {
        // console.log("++++++App");
    }

    componentWillUnmount() {
    }

    // ========== Render Views ===========
    renderLandpage = () => {
        let errorStyle = {
            border: '2px solid #ec167c'
        };

        return (
            <Container direction="column">
                <HomeIconContainer
                    onClick={() => {this.handleHome}}>
                    <HomeIcon
                        iconBlack={HomeBlack}
                        iconBlue={HomeBlue}
                        onClick={() => {this.handleHome()}} />
                </HomeIconContainer>
                <LandpageLogoContainer>
                    <img src={LacrosseLogo} />
                    <LandpageSubtitle>
                        Let's Play!
                    </LandpageSubtitle>
                </LandpageLogoContainer>
                <LoginForm centered={true}>
                    <SocialButtonsContainer>
                        <SocialButton
                            onClick={() => {this.handleLogin("facebook")}}>
                            <SocialIconContainer>
                                <SocialIcon src={FacebookLogo} />
                            </SocialIconContainer>
                            <SocialWritingContainer>
                                <SocialWriting>Log In with Facebook</SocialWriting>
                            </SocialWritingContainer>
                        </SocialButton>
                        <SocialButton
                            onClick={() => {this.handleLogin("google")}}
                            className="social-button google">
                            <SocialIconContainer>
                                <SocialIcon src={GoogleLogo} />
                            </SocialIconContainer>
                            <SocialWritingContainer>
                                <SocialWriting>Log In with Google</SocialWriting>
                            </SocialWritingContainer>
                        </SocialButton>
                    </SocialButtonsContainer>
                    <Separator>
                        <span>or</span>
                    </Separator>
                    <FormContainer>
                        <SignInContainer>
                            <SignInInputContainer>
                                <SignInInput
                                    type="email"
                                    innerRef={comp => {this.email = comp}}
                                    style={this.state.errorType.email ? errorStyle : null}
                                    onKeyPress={this.checkEnter}
                                    placeholder="Email"
                                    required="true"
                                    maxLength="100" />
                            </SignInInputContainer>
                            <SignInInputContainer>
                                <SignInInput
                                    type="password"
                                    innerRef={comp => {this.password = comp}}
                                    style={this.state.errorType.password ? errorStyle : null}
                                    onKeyPress={this.checkEnter}
                                    placeholder="Password"
                                    required="true"
                                    maxLength="100"
                                    autoComplete="off" />
                            </SignInInputContainer>
                        </SignInContainer>
                    </FormContainer>
                    <FormContainer>
                        <ForgotPassword
                            onClick={() => {this.toggleForgotPassword()}}>
                            Forgot Password
                        </ForgotPassword>
                    </FormContainer>
                    <FormContainer>
                        <LoginButton
                            type="submit"
                            onClick={() => {this.handleLogin("email")}}>
                            Sign In
                        </LoginButton>
                    </FormContainer>
                </LoginForm>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="snackbar-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </Container>
        );
    }

    renderLacrosseApp = () => {
        let view;

        switch(this.state.view) {
            case "Profile":
                view = <Profile
                    profileDetails={this.state.profileDetails}
                    modifyProfileDetails={this.modifyProfileDetails}
                    commitStatDetails={this.commitStatDetails}
                    changeViewState={this.changeViewState} />;
                break;
            case "Calendar":
                view = <Calendar
                  practiceDetails={this.state.practiceDetails}
                  commitPracticeDetails={this.commitPracticeDetails}
                />;
                break;
            case "Stats":
                // view = <Stats />;
                view = <Stats
                    statDetails={this.state.statDetails}
                    profileDetails={this.state.profileDetails}
                    commitStatDetails={this.commitStatDetails}
                 />;
                break;
        }

        return(
            <Container direction="row">
                <SideBar>
                    <LacrosseLogoContainer>
                        <img src={LacrosseLogo} />
                    </LacrosseLogoContainer>
                    <ProfileContainer img={!this.state.profileDetails.avatar ? DefaultPhoto : this.state.profileDetails.avatar} />
                    <Name>
                        {this.state.profileDetails.name}
                    </Name>
                    <Navigation>
                        <NavItem
                            selected={this.state.view == "Profile"}
                            onClick = {this.changeViewState.bind({}, "Profile")}>
                            {"Profile"}
                        </NavItem>
                        <NavItem
                            selected={this.state.view == "Calendar"}
                            onClick = {this.changeViewState.bind({}, "Calendar")}>
                            {"Calendar"}
                        </NavItem>
                        <NavItem
                            selected={this.state.view == "Stats"}
                            onClick = {this.changeViewState.bind({}, "Stats")}>
                            {"Statistics"}
                        </NavItem>
                    </Navigation>
                    <LogoutButton onClick={() => this.handleLogin("logout")}>
                        Logout
                    </LogoutButton>
                </SideBar>
                {view}
            </Container>
        );
    }

    renderForgotPassword = () => {
        let errorStyle = {
            border: '2px solid #ec167c'
        };

        return (
            <Container direction="column">
                <HomeIconContainer
                    onClick={() => {this.handleHome()}}>
                    <HomeIcon
                        iconBlack={HomeBlack}
                        iconBlue={HomeBlue} />
                </HomeIconContainer>
                <LandpageLogoContainer>
                    <img src={LacrosseLogo} />
                    <LandpageSubtitle>
                        Forgot your password?
                    </LandpageSubtitle>
                </LandpageLogoContainer>
                <LoginForm centered={false}>
                    <FormContainer>
                        <SignInInput
                            type="email"
                            innerRef={comp => {this.forgotEmail = comp}}
                            style={this.state.errorType.forgotEmail ? errorStyle : null}
                            onKeyPress={this.checkEnter}
                            placeholder="Email"
                            required="true"
                            maxLength="100" />
                    </FormContainer>
                    <FormContainer>
                        <LoginButton
                            type="submit"
                            onClick={() => {this.handleReset()}}>
                            Reset
                        </LoginButton>
                    </FormContainer>
                </LoginForm>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="snackbar-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </Container>
        );
    }

    // ========== Methods ===========

   changeViewState = (newView) => {
        document.title = `La+ - ${newView}`;
        this.setState({
            view: newView,
            errors: [],
            errorType: {},
            currentError: ""
        });
   };

   modifyProfileDetails = (key, value) => {
       console.log(key, value);
       let profileDetails = this.state.profileDetails;
       profileDetails[key] = value;

       this.setState({
           profileDetails: profileDetails
       });
   };

   // commit and propagate modifications made by children
   commitPracticeDetails = () => {
     this.setState({
         practiceDetails: this.state.practiceDetails,
     });
   }

   commitStatDetails = (statDetails) => {
     this.setState({
         statDetails: statDetails,
     });
   }

   handleLogin = (type) => {
       let login = false;
       let errorType = {};

       switch (type) {
            case "facebook":
                login = true;
                document.title = `La+ - ${this.state.view}`;
                break;
            case "google":
                login = true;
                document.title = `La+ - ${this.state.view}`;
                break;
            case "email":
                // Clear errors from any previous form submission
                this.state.errors = [];
                this.state.errorType = {};
                this.state.currentError = "";

                // Get new data
                let email = this.email.value;
                let password = this.password.value;

                // Validate Input
                if (email.length == 0) {
                    this.state.errors.push("Please enter an email address.");
                    errorType['email']= true;

                } else if(!/.+@.+\..+/.test(email)) {
                    this.state.errors.push("The email address you supplied is invalid.");
                    errorType['email']= true;
                }

                if (password.length == 0) {
                    this.state.errors.push("Please enter your password.");
                    errorType['password'] = true;
                }

                if (email.length > 0 &&
                    password.length > 0 &&
                    email != "ballofflame@mit.edu" &&
                    password != "lacrosse") {
                    this.state.errors.push("There was an error with your email/password combination. Please try again.");
                    errorType['email'] = true;
                    errorType['password'] = true;
                }

                if (this.state.errors.length == 0) {
                    document.title = `La+ - ${this.state.view}`;
                    login = true;
                }

                for (let i = 0; i < this.state.errors.length; i++) {
                    setTimeout(() => {
                        this.setState({
                            currentError: this.state.errors[i]
                        });
                    }, 3000 * i);
                }
                break;
            case "logout":
                login = false;
                document.title = "La+";
                break;
       }

       this.setState({
           loggedIn: login,
           errorType: errorType
       });
   }

   toggleForgotPassword = () => {
       this.setState({
           forgotPassword: !this.state.forgotPassword,
           errors: [],
           errorType: {},
           currentError: ""
       }, () => {
           if (this.state.forgotPassword) {
               console.log("yo");
               this.forgotEmail.focus();
           }
       });
   }

   handleReset = () => {
        let email = this.forgotEmail.value;
        let errorType = {};
        this.state.errors = [];
        this.state.errorType = {};
        this.state.currentError = "";

        if(email.length == 0) {
            this.state.errors.push("Please enter an email address.");
            errorType['forgotEmail'] = true;
        } else if(!/.+@.+\..+/.test(email)) {
            this.state.errors.push("The email address you supplied is invalid.");
            errorType['forgotEmail'] = true;
        }

        if (this.state.errors.length == 0) {
            this.state.errors.push(`Password reset email sent to: ${email}.`);
        }

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
            }, 3000 * i);
        }

        this.setState({
            errorType: errorType
        });
    }

    handleHome = () => {
        console.log("hello");
        this.setState({
            loggedIn: false,
            forgotPassword: false,
            errors: [],
            errorType: {},
            currentError: ""
        });
    }

    checkEnter = (e) => {
        if (e.key === 'Enter' && !this.state.forgotPassword) {
            this.handleLogin("email");
        } else if (e.key === 'Enter' && this.state.forgotPassword) {
            this.handleReset();
        }
    };
}

// ============= Styled Components ==============

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    width: 100vw;
    height: 100vh;
`;

const LacrosseLogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    z-index: 1;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

    & img {
        height: 30px;
    }
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
    height: 40px;
    font-size: 1em;
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

const LandpageLogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 40%;

    & img {
        height: 150px;
    }
`;

const LandpageSubtitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    font-size: 1.5em;
    font-weight: 700;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.centered ? 'center' : 'flex-start'};
    margin-top: ${props => props.centered ? '0px' : '40px'};
    height: 60%;
`;

const SocialButtonsContainer = styled.div`
    display: block;
    margin: 0;
    width: 530px;
    height: auto;
`;

const SocialButton = styled.div`
    display: inline-flex;
    border-radius: 0px !important;
    width: 255px;
    height: 43.2px;
    margin: 5px 5px;
    border-radius: 3px;
    flex: 1 1 50%;
    -webkit-flex: 1 1 50%;
    cursor: pointer;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    background: ${props => props.theme.black};
    transition: box-shadow 0.2s;

    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;

const SocialIconContainer = styled.div`
    width: 43px;
    height: 2.65em;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SocialIcon = styled.img`
    width: 20px;
`;

const SocialWritingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
`;

const SocialWriting = styled.h3`
    color: ${props => props.theme.white};
    font-size: 0.9em;
	font-weight: 300;
	margin: 0;
`;

const Separator = styled.h2`
    width: 520px;
    text-align: center;
    border-bottom: 1px solid #000000;
    line-height: 0.1em;
    margin: 20px 5px 10px;
    font-size: 1em;

    & span {
        background:#fff;
        padding:0 10px;
    	font-weight: 400;
    	color: ${props => props.theme.black};
    }
`;

const FormContainer = styled.div`
    display: block;
    width: 530px;
    text-align: center;
`;

const SignInContainer = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 530px;
`;

const SignInInputContainer = styled.li`
    margin-bottom: 0.8em;
    display: inline-block;
	width: 255px;
	margin: 5px;
`;

const SignInInput = styled.input`
    border-radius: 3px;
    border: none;
    padding: 1em 1em;
    width: 100%;
    height: 43.2px;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.lightGray};
    font-size: 1em;
	font-weight: 300;
    line-height: normal;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.22);
    margin: 0;
`;

const LoginButton = styled.button`
    position: relative;
    width: 150px;
    height: 43.2px;
    margin: 0 auto;
    margin-top: 10px;
    background: ${props => props.theme.red};
    border-radius: 0px;
    cursor: pointer;
    box-shadow: 0px;
    font-size: 0.9em;
    font-weight: 300;
    color: ${props => props.theme.white};
    border: none;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,.5), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow 0.2s;

    &:hover {
        box-shadow: 0 8px 16px -4px rgba(0,0,0,.5), 0 6px 2px -4px rgba(0,0,0,.2), 0 2px 10px 0 rgba(0,0,0,.12);
    }
`;

const ForgotPassword = styled.span`
    margin: 10px 0 20px 0;
    font-size: 0.8em;
    color: ${props => props.theme.black};
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${props => props.theme.blue};
    }
`;

const HomeIconContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
`;

const HomeIcon = styled.div`
    height: 60px;
    width: 60px;
    background: none;
    background-image: ${props => 'url(' + props.iconBlack + ')'};
    background-position: 50%;
    background-size: 50%;
    background-repeat: no-repeat;
    transition: background-image 0.2s;
    cursor: pointer;
    z-index: 1;

    &:hover {
        background-image: ${props => 'url(' + props.iconBlue + ')'};
    }
`;
