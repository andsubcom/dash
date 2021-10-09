import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Link
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";

export default function Table({
  headers = [],
  items = [],
  selected = [],
  selectable = false,
  bg = "secondary.card",
  color = "gray.800",
  renderActions = () => {}
}) {
  let itemsIds = items.map((item) => item.id);
  let [localSelected, setLocalSelected] = useState(selected);
  const setCheckedItems = (isChecked) => {
    setLocalSelected([]);
    if (isChecked === true) {
      setLocalSelected(itemsIds);
    }
  }

  const setCheckedItem = (item, isChecked) => {
    isChecked
      ? setLocalSelected([...localSelected, item])
      : setLocalSelected(localSelected.filter((i) => i !== item));
  }

  const renderCell = (item, c) => {
    if(headers[c].id === 'token') {
      return <Link color={'pink.600'} href='/' target='_blank'>{item[headers[c].id]}</Link>
    } else {
      return item[headers[c].id]
    }
  }

  return (
    <Box width="100%" bg={bg} color={color} rounded="lg" p={5}>
      <table className="chakra-ui-table">
        <thead>
          <tr>
            {selectable ? (
              <th data-column="global-selector">
                <Checkbox
                  isChecked={localSelected.length === itemsIds.length}
                  onChange={(e) => setCheckedItems(e.target.checked)}
                />
              </th>
            ) : (
              ""
            )}

            {headers.map((head, i) => (
              <th key={i} data-column={head.id}>
                {head.title}
              </th>
            ))}
            <th data-column="item-actions"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              {selectable ? (
                <td data-column="global-selector">
                  <Checkbox
                    defaultIsChecked={selected.includes(item.id)}
                    isChecked={localSelected.includes(item.id)}
                    onChange={(e) => setCheckedItem(item.id, e.target.checked)}
                  />
                </td>
              ) : (
                ""
              )}

              {Object.keys(item).map((column, c) => (
                <td key={c} data-column={headers[c]}>
                  {renderCell(item, c)}
                </td>
              ))}
              <td data-column="item-actions">
                { renderActions(item) }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
