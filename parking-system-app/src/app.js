import React, { Component } from 'react';
import update from 'immutability-helper';
import { Elevator } from './components/garage';
import { Grid, Col } from 'react-bootstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            parkingSpaces: []
        }
    }

    // Generates elevators regarding to number got as parameter
    setInitialStatus = (numberOfElevators) => {
        let newParkingSpaces = [];

        for(let i=0; i<numberOfElevators; i++){
            newParkingSpaces = newParkingSpaces.concat({
                id: i+1,
                upFree: true,
                downFree: true
            });
        }
        this.setState({parkingSpaces: newParkingSpaces});
    };

    //Renders 9 elevators
    componentWillMount() {
        this.setInitialStatus(9);
    }

    takeParkingSpace(elevatorNumber) {
        const elevatorIndex = elevatorNumber-1;
        const currentStateOfParkings = this.state.parkingSpaces;
        const newStateOfParkings =  currentStateOfParkings[elevatorIndex].upFree ? 
                                    update(currentStateOfParkings, {[elevatorIndex]: {upFree: {$set: false}}}) :
                                    update(currentStateOfParkings, {[elevatorIndex]: {downFree: {$set: false}}});

        this.setState({parkingSpaces: newStateOfParkings});
    }

    leaveParkingSpace(elevatorNumber, upperElevator) {
        console.log('leave elevator #' + elevatorNumber + '. Upper ? -> ' + upperElevator)
        // const elevatorIndex = elevatorNumber - 1;
        // const currentStateOfParkings = this.state.parkingSpaces;
        // const newStateOfParkings =  currentStateOfParkings[elevatorIndex].downFree ? 
        //                             update(currentStateOfParkings, {[elevatorIndex]: {
        //                                 downFree: {$set: true},
        //                                 upFree: {$set: false}
        //                             }}) :
        //                             update(currentStateOfParkings, {[elevatorIndex]: {upFree: {$set: true}}});

        // this.setState({parkingSpaces: newStateOfParkings});
    }

    render(){
        const { parkingSpaces } = this.state;
        return(
            <Grid>
                { parkingSpaces.map( (parkingSpace, index) => {
                    return(
                        <Col md={4} key={index}>
                            <Elevator key={parkingSpace.id} 
                                parkingSpaceNumber={parkingSpace.id} 
                                {...parkingSpace}
                                takeParkingSpace={this.takeParkingSpace.bind(this)}
                                leaveParkingSpace={this.leaveParkingSpace.bind(this)}
                            />
                        </Col>
                    );
                }) }
            </Grid> 
        );
    }
};
export default App;