import React, { Component } from 'react';
import update from 'immutability-helper';
// import _ from 'lodash';
import { Elevator } from './components/garage';
import { Grid, Col } from 'react-bootstrap';
import CustomPanel from './components/customPanel';

class App extends Component {
    constructor() {
        super();
        this.state = {
            parkingSpaces: [],
            examplePersons: [
                {
                    name: "John Smith",
                    email: "johnsmith@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/09/01/822711_user_512x512.png"
                },{
                    name: "Json Statham",
                    email: "jsonrocks@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/05/26/771189_man_512x512.png"
                },{
                    name: "Mona Lisa",
                    email: "lisam@example.com",
                    pictureUrl: "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png"
                },{
                    name: "Erica Mathias",
                    email: "mathiase@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/08/18/813793_people_512x512.png"
                },{
                    name: "Lucas Beardman",
                    email: "bman@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/07/26/802011_man_512x512.png"
            }]
        }
    }

    // Generates elevators regarding to number got as parameter
    setInitialStatus = (numberOfElevators) => {
        let newParkingSpaces = [];

        for(let i=0; i<numberOfElevators; i++){
            newParkingSpaces = newParkingSpaces.concat({
                id: i+1,
                upperSpace: {
                    free: true,
                    person: {
                        name: "",
                        email: "",
                        puctureUrl: ""
                    }
                },
                lowerSpace: {
                    free: true,
                    person: {
                        name: "",
                        email: "",
                        puctureUrl: ""
                    }
                }
                
            });
        }
        this.setState({parkingSpaces: newParkingSpaces});
    };

    //Renders 9 elevators
    componentWillMount() {
        this.setInitialStatus(9);
    }

    //Used to get a person's name, email and picture will be implemented later
    getPersonData = () => {
        const randomNumber = Math.floor(Math.random() * 5);
        return(
            this.state.examplePersons[randomNumber]
        );
    }

    takeParkingSpace = (elevatorNumber) => {
        this.getPersonData();
        const elevatorIndex = elevatorNumber-1;
        const currentStateOfParkings = this.state.parkingSpaces;
        const newStateOfParkings =  currentStateOfParkings[elevatorIndex].upperSpace.free ? 
                                    update(currentStateOfParkings, {[elevatorIndex]: {upperSpace: {
                                        free: {$set: false},
                                        person: {$set: this.getPersonData()}
                                    }}}) :
                                    update(currentStateOfParkings, {[elevatorIndex]: {lowerSpace: {
                                        free: {$set: false},
                                        person: {$set: this.getPersonData()}
                                    }}});

        this.setState({parkingSpaces: newStateOfParkings});
    }

    leaveParkingSpace = (elevatorNumber, upperElevator) => {        
        const elevatorIndex = elevatorNumber - 1;
        const currentStateOfParkings = this.state.parkingSpaces;
        let newStateOfParkings;

        if (upperElevator) {
            newStateOfParkings =  update(currentStateOfParkings, {[elevatorIndex]: {
                upperSpace:{
                    free: {$set: false},
                    person: {$set: currentStateOfParkings[elevatorIndex].lowerSpace.person}
                },
                lowerSpace: {
                    free: {$set: true},
                    person: {$set: ""}
                }
            }})
        } else if (!upperElevator) {
            newStateOfParkings =  update(currentStateOfParkings, {[elevatorIndex]: {
                upperSpace:{
                    free: {$set: false},
                    //person: {$set: currentStateOfParkings[elevatorIndex].upperSpace.person}
                },
                lowerSpace: {
                    free: {$set: true},
                    person: {$set: ""}
                }
            }});
        } 
        if (upperElevator && currentStateOfParkings[elevatorIndex].lowerSpace.free) {
            newStateOfParkings =  update(currentStateOfParkings, {[elevatorIndex]: {
                upperSpace:{
                    free: {$set: true},
                    person: {$set: ""}
                }
            }});
        }

        this.setState({parkingSpaces: newStateOfParkings});
    }

    render(){
        const { parkingSpaces } = this.state;
        return(
            <CustomPanel header={"Parking System"} bsStyle="primary">
                <Grid>
                    { 
                    parkingSpaces.map( (parkingSpace, index) => {
                        return(
                            <Col md={4} key={index}>
                                <Elevator key={parkingSpace.id} 
                                    parkingSpaceNumber={parkingSpace.id} 
                                    {...parkingSpace}
                                    takeParkingSpace={this.takeParkingSpace}
                                    leaveParkingSpace={this.leaveParkingSpace}
                                />
                            </Col>
                        );
                    }) 
                    }
                </Grid> 
            </CustomPanel>
        );
    }
};
export default App;