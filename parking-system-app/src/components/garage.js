import React from 'react';
import { Row, Col, Image, Label, Button } from 'react-bootstrap';

const ParkingSpace = (props) => {
    const {
        takeParkingSpace, 
        leaveParkingSpace,
        elevatorNumber
    } = props;
    return(
        <Row>
            <Col md={12} className="text-center parking-space" >
                <Row>
                    <Col md={12}>
                        {
                            (props.free) ?
                                (<Image src="https://www.abm.com/aviation/wp-content/uploads/sites/52/2016/03/Aviation_Airport_Parking_Icons_Frame6a-1.png" alt="parking space photo" width="25%" circle />)
                                :
                                (<Image src="http://icons.iconarchive.com/icons/icons-land/vista-elements/256/Cancel-2-icon.png" alt="parking space photo" width="25%" circle />)                            
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {
                        (props.free) ?
                            <Button bsStyle="success" 
                                onClick={() => takeParkingSpace(elevatorNumber)}>
                                Park here!
                            </Button>
                            :
                            <Button bsStyle="danger" 
                                onClick={
                                    props.upperElevator ?
                                    () => leaveParkingSpace(elevatorNumber, true) :
                                    () => leaveParkingSpace(elevatorNumber, false)
                                    }>
                                Leave Parking Space!
                            </Button>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
export { ParkingSpace };

const singleSpace = (props) => {
    return(
        <Row>
            <Col md={12}>
                <ParkingSpace free={props.upFree}
                    takeParkingSpace={props.takeParkingSpace}
                    leaveParkingSpace={props.leaveParkingSpace}
                    elevatorNumber={props.id}/>
            </Col>
        </Row>
    );
};

const doubleSpace = (props) => {
    return(
        <Row>
            <Col md={12}>
                <ParkingSpace free={props.upFree}
                    takeParkingSpace={props.takeParkingSpace}
                    leaveParkingSpace={props.leaveParkingSpace}
                    elevatorNumber={props.id}
                    upperElevator={true}/>
            </Col>
            <Col md={12}>
                <hr />
            </Col>
            <Col md={12}>
                <ParkingSpace free={props.downFree}
                    takeParkingSpace={props.takeParkingSpace}
                    leaveParkingSpace={props.leaveParkingSpace}
                    elevatorNumber={props.id}
                    upperElevator={false}/>
            </Col>
        </Row>
    );
};

const Elevator = (props) => {
    return(
        <Col md={12} className="elevator" >
            <Row className="text-center">
                <Col md={3} className="elevator-number">
                    <h3><Label bsStyle="info">#{props.parkingSpaceNumber}</Label></h3>
                </Col>
            </Row>
            {
                props.upFree ?
                singleSpace(props) :
                doubleSpace(props)
            }
        </Col>
    );
}
export { Elevator };