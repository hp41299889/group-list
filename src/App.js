import AgeGroupPriceList from "./components/list/AgeGroupPriceList";

function App() {
  const onChangeAgeGroupList = (results) => {
    console.log(results);
  };

  return (
    <div className="App" style={{ padding: 16 }}>
      <AgeGroupPriceList onChange={onChangeAgeGroupList} />
    </div>
  );
}

export default App;
