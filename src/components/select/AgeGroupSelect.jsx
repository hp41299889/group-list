import { useMemo } from "react";
import ErrorHelpText from "../text/ErrorHelpText";

const LIMIT_START = 0;
const LIMIT_END = 20;

const AgeGroupSelect = (props) => {
  const { id, ageGroup, onChange, error } = props;
  const [start, end] = ageGroup;

  const errorText = error ? "年齡區間不可重疊" : "";

  const startOptions = useMemo(() => {
    const maxStart = end === 0 ? LIMIT_END : Math.min(end, LIMIT_END);
    return Array.from({ length: maxStart - LIMIT_START + 1 }, (_, index) => {
      const value = LIMIT_START + index;
      return (
        <option key={`start_${index}`} value={value}>
          {value}
        </option>
      );
    });
  }, [end]);

  const endOptions = useMemo(() => {
    const minEnd = start === 0 ? LIMIT_START : Math.max(start, LIMIT_START);
    return Array.from({ length: LIMIT_END - minEnd + 1 }, (_, index) => {
      const value = minEnd + index;
      return (
        <option key={`end_${index}`} value={value}>
          {value}
        </option>
      );
    });
  }, [start]);

  const onChangeStart = (e) => {
    const value = parseInt(e.target.value);
    onChange([value, end]);
  };

  const onChangeEnd = (e) => {
    const value = parseInt(e.target.value);
    onChange([start, value]);
  };

  return (
    <div style={{ padding: 4 }}>
      <label htmlFor={`age-start-${id}`} style={{ color: "#bcbcbc" }}>
        年齡
      </label>
      <div style={{ display: "flex", minHeight: "40px" }}>
        <select
          id={`age-start-${id}`}
          value={start}
          onChange={onChangeStart}
          style={{ width: "140px" }}
        >
          {start === "" && <option value="">請選擇起始年齡</option>}
          {startOptions}
        </select>
        <div>
          <span>~</span>
        </div>
        <select
          id="age-end"
          value={end}
          onChange={onChangeEnd}
          style={{ width: "140px" }}
        >
          {end === "" && <option value="">請選擇結束年齡</option>}
          {endOptions}
        </select>
      </div>
      <ErrorHelpText text={errorText} />
    </div>
  );
};

export default AgeGroupSelect;
