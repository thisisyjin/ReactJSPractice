import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);

  const onChange = e => {
    setMoney(e.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then(json => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
      <input
        onChange={onChange}
        value={money}
        type="number"
        placeholder="Your Money(USD)"
      ></input>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map(coin => (
            <option>
              {Math.floor(money / coin.quotes.USD.price)} {coin.symbol}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
