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
      console.log(error) 
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
          }
          else {
            throw new Error();
          }
     })}
       
    
  }, [product_id, depth, sharedData, spread]);

  return ob;
};

export default OrderBookApi;