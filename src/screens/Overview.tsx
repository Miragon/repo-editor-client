import React from 'react';
import DiagramContainer from "./DiagramContainer";

import './App.css';

const App: React.FC =  () => {
    return (
        <div>
          <h1>Header</h1>
            <DiagramContainer category="Latest"/>
            <DiagramContainer category="Frequently used"/>
            <DiagramContainer category="Starred"/>
        </div>
    );
}

export default App;
