import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';

class App extends Component {
    render() {
        return(
            <div>
                <h1>Hello React <Glyphicon glyph="heart" />  </h1>
            </div>
        );
    }
};
export default App;