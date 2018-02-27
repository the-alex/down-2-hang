import React from 'react';
import Hello from './Hello.js';
import Main from './Main.js';

// Import only main components
const App = () => (
  <div>
    {/* <Header /> */}
    <Main />
    <Hello />
  </div>
);

export default App;
