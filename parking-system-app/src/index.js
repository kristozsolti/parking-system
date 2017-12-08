import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Glyphicon} from 'react-bootstrap';

const App = () => {
    return(
        <div>
            <h1>Hello React <Glyphicon glyph="heart" />  </h1>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
