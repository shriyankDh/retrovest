// src/components/MarketAnalysis.jsx
import React, { useEffect, useState } from 'react';
import './MarketAnalysis.css'; // We'll create this file next
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Indian indices with Yahoo Finance symbols
const indexSymbols = [
  { symbol: '^BSESN', name: 'Sensex' },
  { symbol: '^NSEI', name: 'Nifty 50' },
  { symbol: '^NSEBANK', name: 'Bank Nifty' }
];

// Define sectors with Indian company tickers (.NS suffix)
const sectorTickers = {
  "Information Technology": ["TCS.NS", "INFY.NS", "WIPRO.NS"],
  "Pharmaceuticals": ["SUNPHARMA.NS", "CIPLA.NS", "DRREDDY.NS"],
  "Financial Services": ["HDFCBANK.NS", "ICICIBANK.NS", "KOTAKBANK.NS"],
  "Consumer Goods": ["HINDUNILVR.NS", "ITC.NS", "DMART.NS"],
  "Energy": ["ONGC.NS", "GAIL.NS", "POWERGRID.NS"]
};

// Utility function to fetch data via your backend proxy
const fetchData = (symbols, callback) => {
  const url = `/api/quote?symbols=${symbols.join(',')}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.quoteResponse && data.quoteResponse.result) {
        callback(data.quoteResponse.result);
      } else {
        callback([]);
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      callback([]);
    });
};

function Indices() {
    const [indicesData, setIndicesData] = useState([]);
  
    const fetchIndices = () => {
      const symbols = indexSymbols.map(item => item.symbol);
      fetchData(symbols, (data) => {
        const merged = data.map(item => {
          const indexInfo = indexSymbols.find(ind => ind.symbol === item.symbol);
          return { ...item, displayName: indexInfo ? indexInfo.name : item.symbol };
        });
        setIndicesData(merged);
      });
    };
  
    useEffect(() => {
      fetchIndices();
      const interval = setInterval(fetchIndices, 30000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="indices-container">
        {indicesData.map(index => {
          const change = index.regularMarketChangePercent;
          // Decide background color if you want inline or use "positive"/"negative" classes:
          const cardClass = "card" + (typeof change === 'number' ? (change < 0 ? " negative" : " positive") : "");
          
          return (
            <div key={index.symbol} className={cardClass}>
              <h3>{index.displayName}</h3>
              <p><strong>Price:</strong> {index.regularMarketPrice}</p>
              <p>
                <strong>% Change:</strong>{" "}
                {typeof change === "number"
                  ? change.toFixed(2)
                  : "N/A"}%
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  
  

  function SectorSection({ sector, tickers }) {
    const [companiesData, setCompaniesData] = useState([]);
  
    const fetchCompanies = () => {
      fetchData(tickers, setCompaniesData);
    };
  
    useEffect(() => {
      fetchCompanies();
      const interval = setInterval(fetchCompanies, 30000);
      return () => clearInterval(interval);
    }, [tickers]);
  
    return (
      <div>
        <h2 className="sector-title">{sector}</h2>
        <div className="company-cards">
          {companiesData.map(company => {
            const change = company.regularMarketChangePercent;
            const cardClass = "card" + (typeof change === 'number' ? (change < 0 ? " negative" : " positive") : "");
            
            return (
              <div key={company.symbol} className={cardClass}>
                <h3>{company.shortName || company.symbol}</h3>
                <p><strong>LTP:</strong> {company.regularMarketPrice}</p>
                <p>
                  {" "}
                  {typeof change === "number" ? (
        <>
          {change < 0 ? (
            <FaArrowDown style={{ color: 'red', verticalAlign: 'middle' }} />
          ) : (
            <FaArrowUp style={{ color: 'green', verticalAlign: 'middle' }} />
          )}
          {change.toFixed(2)}%
        </>
      ) : "N/A"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  

function MarketAnalysis() {
  return (
    <div className="market-analysis-container">
      <h1>Indian Market Sector Analysis</h1>
      <Indices />
      {Object.entries(sectorTickers).map(([sector, tickers]) => (
        <SectorSection key={sector} sector={sector} tickers={tickers} />
      ))}
    </div>
  );
}

export default MarketAnalysis;
