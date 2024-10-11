import { addComma } from "../../utils/basic/string";
import ErrorHelpText from "../text/ErrorHelpText";

const PriceInput = (props) => {
  const { id, currency = "TWD", price, onChange } = props;

  const errorText = price === "" ? "不可以為空白" : "";

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (/-^\d*\.?\d*$/.test(value)) {
      return;
    }
    onChange(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        minHeight: "95px",
      }}
    >
      <label style={{ color: "#bcbcbc" }} htmlFor={`price-${id}`}>
        入住費用(每人每晚)
      </label>
      <div
        style={{
          display: "flex",
          border: "1px solid",
          borderColor: "#bcbcbc",
          borderRadius: "5px",
          minHeight: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            padding: 4,
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            height: "100%",
          }}
        >
          <span style={{ color: "#828483" }}>{currency}</span>
        </div>
        <input
          id={`price-${id}`}
          onChange={handleChange}
          value={addComma(price)}
          placeholder="請輸入費用"
          style={{
            flexGrow: 1,
            border: "none",
            outline: "none",
            padding: "0 8px",
          }}
        />
      </div>
      <ErrorHelpText text={errorText} />
      <div style={{ color: "#bcbcbc", alignSelf: "flex-end" }}>
        輸入0表示免費
      </div>
    </div>
  );
};

export default PriceInput;
