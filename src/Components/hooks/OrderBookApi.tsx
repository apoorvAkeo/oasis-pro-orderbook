import { useEffect, useState } from "react";
import restActions from '../actions/Rest';
//https://api-public.sandbox.pro.coinbase.com
//const client = new W3CWebSocket('wss://ws-feed-public.sandbox.pro.coinbase.com');
//const client = new WebSocket("wss://ws-feed.pro.coinbase.com");

const OrderBookApi = (product_id: unknown, sharedData: any, depth = undefined) => {
  const [ob, setOB] = useState({
    product_id: product_id,
    buys: [],
    asks: [],
    spread: '...'
  });
  const [spread, setspread] = useState('..');
  var buysArray:any = [];
  var sellArray:any = [];

   const [wholeData, setWholeData] = useState([
    {type:'snapshot', product_id:'BTC-USD', asks: [], bids: []},
  ]);
  
  //api calling setup
  useEffect(()=>{
    restActions
    .GET(`order/`)
    .then((res) => {
       let ask = res['asks'];
       ask.map((data) => sellArray.push([`${data.price}`,`${data.quantity}`]));
       let previousObject = [...wholeData];
       previousObject[0].asks = sellArray;
       let buy = res['bids'];
       buy.map((data) => buysArray.push([`${data.price}`,`${data.quantity}`]));
       previousObject[0].bids = buysArray;
       setWholeData(previousObject);
       setspread(res['spread']);
    })
    .catch((error) => {
      console.log(error.toJSON()) 
    })
   },[sharedData]);


  useEffect(() => {
    
     {wholeData.map((data:any) => {
        if (data.type === "snapshot") {   
            setOB((prevOB) => {
              data.asks.sort((a: any[], b: any[]) =>
                Number(a[0]) < Number(b[0])
                  ? -1
                  : Number(a[0]) > Number(b[0])
                  ? 1
                  : 0
              );
              data.bids.sort((a: any[], b: any[]) =>
                Number(a[0]) < Number(b[0])
                  ? 1
                  : Number(a[0]) > Number(b[0])
                  ? -1
                  : 0
              );

              return {
                ...prevOB,
                asks: data.asks.slice(0, depth),
                buys: data.bids.slice(0, depth),
                spread: spread
              };
            });
          } else if (data.type === "l2update") {
            const removedItems = data.changes.filter((el: any[]) => Number(el[2]) === 0);
            const removedAsks = removedItems
              .filter((el: string[]) => el[0] === "sell")
              .map((el: any[]) => el[1]);
            const removedBuys = removedItems
              .filter((el: string[]) => el[0] === "buy")
              .map((el: any[]) => el[1]);
            const addedItems = data.changes.filter((el: any[]) => Number(el[2]) !== 0);
            const addedAsks = addedItems
              .filter((el: string[]) => el[0] === "sell")
              .map((el: string | any[]) => el.slice(1));
            const addedBuys = addedItems
              .filter((el: string[]) => el[0] === "buy")
              .map((el: string | any[]) => el.slice(1));
            setOB((prevOB) => {
              const asks = [...prevOB.asks]
                .filter((ask) => !removedAsks.includes(ask[0]))
                .concat(addedAsks);
              const buys = [...prevOB.buys]
                .filter((buy) => !removedBuys.includes(buy[0]))
                .concat(addedBuys);
              asks.sort((a, b) =>
                Number(a[0]) < Number(b[0])
                  ? -1
                  : Number(a[0]) > Number(b[0])
                  ? 1
                  : 0
              );
              buys.sort((a, b) =>
                Number(a[0]) < Number(b[0])
                  ? 1
                  : Number(a[0]) > Number(b[0])
                  ? -1
                  : 0
              );
              return {
                ...prevOB,
                asks: asks.slice(0, depth),
                buys: buys.slice(0, depth),
                spread: spread
              };
            });
          } else if (data.type === "subscriptions") {
          } else {
            throw new Error();
          }
     })}
       
    
  }, [product_id, depth, sharedData, spread]);

  return ob;
};

export default OrderBookApi;