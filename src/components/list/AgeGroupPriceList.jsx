import { useState, useEffect } from "react";
import PriceInput from "../input/PriceInput";
import AgeGroupSelect from "../select/AgeGroupSelect";
import { getNumberIntervals } from "../../utils/basic/number";

const AgeGroupPriceList = (props) => {
  const { onChange } = props;
  const [list, setList] = useState([
    {
      ageGroup: [6, 11],
      price: "0",
    },
    {
      ageGroup: [5, 8],
      price: "0",
    },
    {
      ageGroup: [17, 20],
      price: "0",
    },
    {
      ageGroup: [7, 7],
      price: "0",
    },
    {
      ageGroup: [14, 17],
      price: "0",
    },
  ]);
  const [disabledAddButton, setDisabledAddButton] = useState(false);

  const onChangePrice = (price, index) => {
    if (/^-?\d*\.?\d*$/.test(price)) {
      const updatedList = list.map((item, i) =>
        i === index ? { ...item, price } : item
      );
      setList(updatedList);
    }
  };

  const onChangeAgeGroup = (ageGroup, index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, ageGroup } : item
    );
    setList(updatedList);
  };

  const addNewPriceSetting = () => {
    setList([...list, { ageGroup: [0, 0], price: "0" }]);
  };

  const removePriceSetting = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const checkOverlap = (ageGroup, index) => {
    return list.some((item, i) => {
      if (i === index) return false;
      const [min1, max1] = item.ageGroup;
      const [min2, max2] = ageGroup;
      return min1 <= max2 && max1 >= min2;
    });
  };

  useEffect(() => {
    const intervals = getNumberIntervals(list.map((item) => item.ageGroup));
    if (intervals.notInclude.length === 0) {
      setDisabledAddButton(true);
    } else {
      setDisabledAddButton(false);
    }
    onChange(intervals);
  }, [list, onChange]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "800px" }}
    >
      {list.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid",
            borderRadius: "4px",
            padding: 4,
            margin: 4,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>價格設定 - {index + 1}</span>
            <button
              style={{
                color: "#f14f20",
                background: "none",
                border: "none",
                padding: 4,
                font: "inherit",
                cursor: "pointer",
                outline: "inherit",
                maxWidth: "120px",
              }}
              onClick={() => removePriceSetting(index)}
            >
              Ｘ刪除
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AgeGroupSelect
              id={index}
              ageGroup={item.ageGroup}
              error={checkOverlap(item.ageGroup, index)}
              onChange={(ageGroup) => onChangeAgeGroup(ageGroup, index)}
            />
            <PriceInput
              id={index}
              price={item.price}
              onChange={(value) => onChangePrice(value, index)}
            />
          </div>
        </div>
      ))}
      <button
        style={{
          color: disabledAddButton ? "#9e9e9e" : "#50beb5",
          background: "none",
          border: "none",
          padding: 4,
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
          maxWidth: "120px",
        }}
        onClick={addNewPriceSetting}
        disabled={disabledAddButton}
      >
        ＋新增價格設定
      </button>
    </div>
  );
};

export default AgeGroupPriceList;
