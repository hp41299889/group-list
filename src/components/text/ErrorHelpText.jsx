const ErrorHelpText = (props) => {
  const { text } = props;

  return (
    <div
      style={{
        backgroundColor: text ? "#f9ebe8" : "white",
      }}
    >
      <span style={{ color: "#ec7851" }}>{text}</span>
    </div>
  );
};

export default ErrorHelpText;
