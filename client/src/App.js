import React, { useState } from 'react';
import Charts from './components/Charts/index';
import Sidebar from './components/Sidebar/Sidebar';

export default function App() {
  const [checkedValue, setCheckedValue] = useState([]);

  return (
    <>
      <Sidebar checkedValue={checkedValue} setCheckedValue={setCheckedValue} />
      <Charts checkedValue={checkedValue} />
    </>
  );
}
