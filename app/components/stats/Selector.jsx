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

        let statsel;

        let playersel;

        statsel = this.getStatSel(this.props.selectedPosition)

        playersel = this.getPlayerSel(this.props.selectedPosition)

        console.log(this.props.selectedPlayers)

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

        console.log(this.props.selectedPosition);
        if (this.props.selectedPosition == "") {
            return <StatSel></StatSel>

        }
        if (this.props.selectedPosition != ""){
            return(
                <StatSel>
                    {
                        stats[this.props.selectedPosition].map((stat) => {
                            return (
                                    <NavItem
                                    onClick = {this.selectStat.bind({}, stat)}>
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

        if (this.props.selectedPosition == "") {
            return <PlayerSel></PlayerSel>;
        }

        if (this.props.selectedPosition != "") {
            return (
                <PlayerSel>
                    {
                        players[this.props.selectedPosition].map((player) => {
                            return (
                                    <PlayerItem
                                    onClick = {this.addRemovePlayer.bind({}, player)}>
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
      this.props.setPosition(newPosition);
      this.clearPlayers();
    }

    selectStat = (newStat) => {
      this.props.setStat(newStat);
    }

    addRemovePlayer = (newPlayer) => {
        console.log("HEY")
        let players = this.props.selectedPlayers.slice();
        if (players.indexOf(newPlayer) >= 0) {
            players.splice(players.indexOf(newPlayer), 1);
        }

        else {
            players.push(newPlayer);
        }

        this.props.setPlayers(players)

    }

    clearPlayers = () => {
        this.props.setPlayers([]);
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
