import { render } from 'react-dom';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import React from "react";
import App from "./components/App";

const RootHtml = () => (
        <Router>
            <App/>
        </Router>
);
render(<RootHtml />, document.getElementById('root'));
