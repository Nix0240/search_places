import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import Table from "./components/Table/Table";
import fetchDataFromAPI from "./Services/api";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (searchQuery) => {
    setLoading(true);
    try {
      const fetchedData = await fetchDataFromAPI("IN", searchQuery, 10);
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    fetchData(searchValue.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <SearchBox
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onSearch={handleSearch}
      />
      <Table data={data} loading={loading} />
    </div>
  );
}

export default App;
