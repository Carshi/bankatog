import SortableTbl from "react-sort-search-table";
import React from 'react';

const Table = ({ data }) => {
  function getTableColumnInfo() {
    const columns = [];
    const headings = [];
    const tableDefinitions = {
      "character": "Character",
      "name": "Item Name",
      "location": "Location",
      "count": "Quantity"
    }
  
    for (let [key, value] of Object.entries(tableDefinitions)) {
      columns.push(key);
      headings.push(value);
    }
  
    return { columns, headings };
  }

  const { columns, headings } = getTableColumnInfo();
  
  return (
    <SortableTbl
    tblData={data}
    tHead={headings}
    dKey={columns}
    paging={false}
    defaultCSS={false}
  />);
}

export { Table };