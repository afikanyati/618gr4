import React                from 'react';
import styled               from 'styled-components';
import date                 from 'date-and-time';


export default class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: "",
            stat: "",
            player: ""
        }
    }

    componentWillMount() {

    }

    render() {

        let statsel;

        let playersel;

        statsel = this.getStatSel(this.state.position)

        playersel = this.getPlayerSel(this.state.position)


        return (
            <Container>
                <PositionSel>
                    <NavItem
                    onClick = {this.selectPosition.bind({}, "goalie")}>
                        {"goalie"}
                    </NavItem>
                    <NavItem
                    onClick = {this.selectPosition.bind({}, "defense")}>
                        {"defense"}
                    </NavItem>
                    <NavItem
                    onClick = {this.selectPosition.bind({}, "offense")}>

                        {"offense"}
                    </NavItem>
                </PositionSel>
                {statsel}
                {playersel}

            </Container>
        );
    }

    componentDidMount() {

    }

    getStatSel = () => {
        let stats = {"goalie": ["blocks","misses","attempts"],
                     "defense": ["possession time", "turnovers", "blocks"],
                     "offense": ["possession time", "turnovers", "shots", "goals"]};

        if (this.state.position == "") {
            return <StatSel></StatSel>

        }
        if (this.state.position != ""){
            return(
                <StatSel>
                    {
                        stats[this.state.position].map((stat) => {
                            return (
                                    <NavItem
                                    onClick = {this.setStat.bind({}, stat)}>
                                    {stat}

                                    </NavItem>
                                );
                        })
                    }
                </StatSel>
            );
        }

    }

    getPlayerSel = () => {
        let players = {"goalie": ["Pyotr Hasborn", "Martin Shkrelli", "Donald Trump", "Barack Obama"],
                       "defense": ["Victor Fink", "Mitchell", "SCARFACE", "The Red Telletubby"],
                       "offense": ["Afika Nyati", "Taylor Herr", "Abigail Russell", "Efraim THEROCK"]
                        };

        if (this.state.position == "") {
            return <PlayerSel></PlayerSel>;
        }

        if (this.state.position != "") {
            return (
                <PlayerSel>
                    {
                        players[this.state.position].map((player) => {
                            return (
                                    <PlayerItem
                                    onClick = {this.addPlayer.bind({}, player)}>
                                    {player}
                                    </PlayerItem>
                                );
                        })

                    }

                </PlayerSel>


            );
        }
    }

    selectPosition = (newPosition) => {
      this.setState({
          position: newPosition
      })


    }

    setStat = (newStat) => {
        this.setState({
            stat: newStat
        })
    }

    addPlayer = (newPlayer) => {
        this.setState({
            stat: newPlayer
        })
    }




}





const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: red;
    width: 20vw;


`;

const PositionSel = styled.ul`
    height: 30vh;
    background-color: blue;

`;


const NavItem = styled.li`
    
`;

const PlayerItem = styled.li`

`;

const PlayerSel = styled.div`
    height: 30vh;
    background-color: green;



`;


const StatSel = styled.div`

    height: 40vh;
    background-color: purple;



`;
