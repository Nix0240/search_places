import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.style.css";
import Pagination from "../Pagination/Pagination";

const Table = ({ data, loading }) => {
  const [flagUrls, setFlagUrls] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [maxItemsPerPage] = useState(10);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= maxItemsPerPage) {
      setItemsPerPage(value);
    } else if (value > maxItemsPerPage) {
      alert(`Maximum items per page allowed is ${maxItemsPerPage}`);
      setItemsPerPage(maxItemsPerPage);
    } else {
      alert("Please enter a valid number");
    }
  };

  const fetchFlag = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://www.countryflagsapi.com/png/${countryCode.toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };

  const fetchFlagsForData = async () => {
    const flagUrls = {};
    for (const item of data) {
      if (!flagUrls[item.countryCode]) {
        flagUrls[item.countryCode] = await fetchFlag(item.countryCode);
      }
    }
    setFlagUrls(flagUrls);
  };

  useEffect(() => {
    fetchFlagsForData();
  }, [data]);

  return (
    <div className="tableWrapper">
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.name}</td>
              <td>
                {item.country}
                {flagUrls[item.countryCode] && (
                  <img
                    src={flagUrls[item.countryCode]}
                    alt={`${item.country} flag`}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentItems.length === 0 && (
        <div className="no_data">No result found</div>
      )}
      <div className="pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={paginate}
        />
        <div className="limit-input">
          <span>Items per page:</span>
          <input
            type="number"
            value={itemsPerPage}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
