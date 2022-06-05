import './App.css';
import SortableTbl from "react-sort-search-table";

function App() {
  const itemRegexp = new RegExp(/(?:General|Bank)\d-Slot\d{1,2}\s(.*)\s\d{3,6}\s(\d+)/g);
  const bankData = [];
  const files = require.context('./inventory-files', false, /\.txt$/)
  files.keys().map(files).forEach(file => {
    fetch(file)
    .then(r => r.text())
    .then(text => {
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
    });
  });
  
  const columns = [
    "character",
    "name",
    "count"
  ];
  const headings = [
    "Character",
    "Item Name",
    "Quantity"
  ]
  const paging = false;
  return (
    <div className="App">
      <SortableTbl
			tblData={bankData}
      tHead={headings}
      dKey={columns}
      paging={paging}
		/>
    </div>
  );
}

export default App;
