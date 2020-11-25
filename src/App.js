import './App.css';
import React, {useState} from'react';
import AppBar from'@material-ui/core/AppBar';
import Tabs from'@material-ui/core/Tabs';
import Tab from'@material-ui/core/Tab';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';

function App() {
  const[value, setValue] = useState('one');

  const handleChange = (event, value) => {
      setValue(value);
  };
  
  return (
    <div>
      <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="one" label="CUSTOMERS"/> 
                    <Tab value="two" label="TRAININGS"/>
                    <Tab value="three" label="CALENDAR"/>
                    <Tab value="four" label="STATISTICS"/>
                </Tabs>
            </AppBar>
            {value === 'one' && <div><Customerlist /></div>}
            {value === 'two' && <div><Traininglist /></div>}
            {value === 'three' && <div><Calendar /></div>}
            {value === 'four' && <div><Statistics /></div>}
        </div>
    </div>
  );
}

export default App;
