import React from "react";

const checkBoxList = ({ checkedList, handleCheck }) => {
  return (
    <div className="checkboxList">
      {checkedList.map((item) => {
        return (
          <label key={item.key}>
            <input name={item.name} checked={item.checked} type="checkbox" onChange={handleCheck} />
            {item.label}
          </label>
        )
      })}
    </div>
  )
}

export default checkBoxList;