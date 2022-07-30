import './App.css';
import { Item }  from './item.ts';
import { Table } from './table';
import { useEffect, useState } from 'react';

function App() {
  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const data = await getTableDataFromInventoryFiles();
      setBankData(data);
    }

    fetchData();
  }, []);
  
  return (
    <div className="App">
      <Table data={bankData} />
    </div>
  );
}

const getTableDataFromInventoryFiles = async() => {
  const itemRegexp = new RegExp(/(?<location>General|Bank)\d-Slot\d{1,2}\s(?<name>.*)\s\d{3,6}\s(?<count>\d+)/g);
  const bankData = [];
  const load = require.context('./inventory-files', false, /\.txt$/);

  const files = load.keys().map(load);
  for (const file of files) {
    const f = await fetch(file);
    const text = await f.text();
    const currentCharacter = file.match(/media\/(.+?)\./)[1]
    const matches = [...text.matchAll(itemRegexp)];

    matches.forEach(match => {
      const count = parseInt(match.groups.count);
      const currentItem = new Item(currentCharacter, match.groups.name, match.groups.location, count);

      const existingItem = bankData.find(item => item.equals(currentItem));
      if (existingItem) {
        existingItem.count += currentItem.count;
      }
      else {
        bankData.push(currentItem);
      }
    });
  }

  return bankData;
}

export default App;
