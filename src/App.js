import './App.css';
import SortableTbl from "react-sort-search-table";
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

  const { columns, headings } = getTableColumnInfo();

  const paging = false;
  const defaultCss = false;
  
  return (
    <div className="App">
      <SortableTbl
			tblData={bankData}
      tHead={headings}
      dKey={columns}
      paging={paging}
      defaultCSS={defaultCss}
		/>
    </div>
  );
}

function getTableColumnInfo() {
  const columns = [];
  const headings = [];
  const tableDefinitions = {
    "character": "Character",
    "name": "Item Name",
    "count": "Quantity"
  }

  for (let [key, value] of Object.entries(tableDefinitions)) {
    columns.push(key);
    headings.push(value);
  }

  return { columns, headings };
}

const getTableDataFromInventoryFiles = async() => {
  const itemRegexp = new RegExp(/(?:General|Bank)\d-Slot\d{1,2}\s(.*)\s\d{3,6}\s(\d+)/g);
  const bankData = [];
  const load = require.context('./inventory-files', false, /\.txt$/);

  const files = load.keys().map(load);
  for (const file of files) {
    const f = await fetch(file);
    const text = await f.text();
    const matches = [...text.matchAll(itemRegexp)];
    matches.forEach(x => {
      const existingItem = bankData.find(item => item.name === x[1]);
      if (existingItem) {
        existingItem.count += parseInt(x[2]);
      }
      else {
        bankData.push({
          character: file.match(/media\/(.+?)\./)[1],
          name: x[1],
          count: parseInt(x[2])
        });
      }
    });
  }

  return bankData;
}

export default App;
