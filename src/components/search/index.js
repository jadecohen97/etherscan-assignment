import React, { useState } from "react";
import { api_key, BaseUrl } from "../../constants/api_key";
import { Header } from "../../components/header/header";
import "./index.css";
import Tippy from "@tippyjs/react";

const TransactionsList = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const getResults = async () => {
    setLoading(true);
    try {
      await fetch(
        `${BaseUrl}/api?module=account&action=txlist&address=${search}&startblock=0&endblock=99999999&sort=desc&apikey=${api_key}`
      )
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          if (!(response?.status === "0")) {
            setErrorMessage("");
            setResult(response.result);
          } else if (response?.message === "No transactions found") {
            setErrorMessage(response.message);
          } else {
            setErrorMessage(response.result);
          }
        });
    } catch (err) {
      setLoading(true);
      setErrorMessage(err);
    }
  };
  return (
    <div>
      <Header />
      <div>
        <input
          className="searchBar"
          type="search"
          placeholder="Search By Ethereum Address"
          onChange={handleChange}
        />
        <button className="searchBtn" onClick={getResults}>
          Search
        </button>
      </div>
      {errorMessage && !loading ? (
        <div className="errMessage">{errorMessage}</div>
      ) : (
        <div className="tableWrapper">
          <table>
            {result.length >= 1 ? (
              result?.map((res) => (
                <thead key={res.hash}>
                  <tr>
                    <th>Time Stamp</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Transaction Value</th>
                    <th>Confirmations</th>
                    <th>hash</th>
                  </tr>
                  <tr>
                    <td>{res.timeStamp}</td>
                    <Tippy className="tippy" content={res.from}>
                      <td style={{ color: "#3498db" }}>{res.from}</td>
                    </Tippy>
                    <Tippy className="tippy" content={res.to}>
                      <td style={{ color: "#3498db" }}>{res.to}</td>
                    </Tippy>
                    <td>{res.value}</td>
                    <td>{res.confirmations}</td>
                    <Tippy className="tippy" content={res.hash}>
                      <td style={{ color: "#3498db" }}>{res.hash}</td>
                    </Tippy>
                  </tr>
                </thead>
              ))
            ) : (
              <thead></thead>
            )}
          </table>
        </div>
      )}
    </div>
  );
};
export default TransactionsList;
