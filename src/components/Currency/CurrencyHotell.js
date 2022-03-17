import React, { useEffect, useState, useCallback } from "react";
import CurrencyList from "./CurrencyList";
import useHttpGet from "../../hooks/useHttpGet";
const Currency = (props) => {
  const [currency, setCurrency] = useState([]);

  const { isLoading, error, fetchDataHandler } = useHttpGet({
    url: `https://v6.exchangerate-api.com/v6/284d94a411d3ab129c840a38/pair/${props.localCurr}/${props.hotellCurr}`,
  });

  const currencyHandler = useCallback(async () => {
    let dataHotell = await fetchDataHandler();
    setCurrency(dataHotell);
  }, []);

  useEffect(() => {
    currencyHandler();
  }, [currencyHandler]);

  return (
    <React.Fragment>
      {!isLoading && currency.length !== 0 && (
        <CurrencyList
          currency={props.currency}
          hotellCurr={currency}
          localCurr={props.localCurr}
        ></CurrencyList>
      )}
      {!isLoading && currency.length === 0 && !error && <p>No data</p>}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </React.Fragment>
  );
};
export default Currency;
