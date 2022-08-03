import { useEffect, useState } from "react";

//https://api-public.sandbox.pro.coinbase.com
//const client = new W3CWebSocket('wss://ws-feed-public.sandbox.pro.coinbase.com');
const client = new WebSocket("wss://ws-feed.pro.coinbase.com");

const OrderBookApi = (product_id: unknown, sharedData: any, depth = undefined) => {
  const [ob, setOB] = useState({
    product_id: product_id,
    buys: [],
    asks: []
  });
 // console.log("shhhh",sharedData);
  const [wholeData, setWholeData] = useState([
    { type: 'snapshot', product_id: 'BTC-USD', asks:[ ["388393.093","0.12920"],["109200.20","0.182833"],["23071.20","0.082833"],["109200.20","0.182833"],["4000.34","5000.43"],["109200.20","0.182833"],["4000.34","5000.43"] ], bids: [ ["109200.20","0.182833"],["23071.20","0.082833"],["109200.20","0.182833"],["23071.20","0.082833"],["4000.34","5000.43"],["109200.20","0.182833"],["4000.34","5000.43"] ]},
    { type: 'l2update', product_id: 'BTC-USD', changes:["buy","23071.20","0.082833"] },
    { type: 'l2update', product_id: 'BTC-USD', changes:["sell","388393.093","0.12920"] },
    { type: 'l2update', product_id: 'BTC-USD', changes:["buy","109200.20","0.182833"] },
    { type: 'l2update', product_id: 'BTC-USD', changes:["buy","23071.20","0.082833"] },
    { type: 'l2update', product_id: 'BTC-USD', changes:["buy","109200.20","0.182833"] },
    { type: 'l2update', product_id: 'BTC-USD', changes:["sell","109200.20","0.182833"] },
    { type: 'l2update', product_id: 'BTC-USD', changes:["sell","4000.34","5000.43"] },
  ]);
  
  useEffect(() => {
        if(sharedData.type){
            //add new array into existing one
            const updatedWholeData = [...wholeData];
            updatedWholeData.push(sharedData);
            setWholeData(updatedWholeData);
            // setOB((prevOB) => { return {...prevOB, asks: prevOB.asks, buys: prevOB.buys } });
            
            //add price and percentage into first array (snapshot)
            
            var price = Object.values(sharedData.changes)[1];
            var percent = Object.values(sharedData.changes)[2];
            var newArry: any = [price,percent];
             console.log("shareddata",sharedData);
            //push if selling 
                if (wholeData[0].asks && Object.values(sharedData.changes)[0] === 'sell'){
                wholeData[0].asks.push(newArry);
                //setOB((prevOB) => { return {...prevOB, asks: prevOB.asks, buys: prevOB.buys } });
                }else{ //push if buying
                    if(wholeData[0].bids)
                    wholeData[0].bids.push(newArry);
                }
            }
            // console.log("wholeData",wholeData);
            
            // console.log("neArray",newArry);
            // console.log("extract first data",wholeData[0]);
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
              //console.log('setting from snapshot');
             // console.log({...prevOB, asks: data.asks, buys: data.bids });
              return {
                ...prevOB,
                asks: data.asks.slice(0, depth),
                buys: data.bids.slice(0, depth)
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
              //console.log("setting from update");
              //console.log(prevOB);
              //console.log({...prevOB, asks: asks, buys: buys });
              return {
                ...prevOB,
                asks: asks.slice(0, depth),
                buys: buys.slice(0, depth)
              };
            });
          } else if (data.type === "subscriptions") {
          } else {
            throw new Error();
          }
     })}
       
    
  }, [product_id, depth, sharedData]);

//   useEffect(() => {
//       client.onopen = () => {
//       client.send(
//         JSON.stringify({
//           type: "subscribe",
//           product_ids: [product_id],
//           channels: ["level2"]
//         })
//       );
//     };

//     client.onmessage = (message) => {
//       //console.log("incoming data",message.data);
//       const data = JSON.parse(message.data);
//       //console.log(data);
//       if (data.type === "snapshot") {   
//         setOB((prevOB) => {
//           data.asks.sort((a: any[], b: any[]) =>
//             Number(a[0]) < Number(b[0])
//               ? -1
//               : Number(a[0]) > Number(b[0])
//               ? 1
//               : 0
//           );
//           data.bids.sort((a: any[], b: any[]) =>
//             Number(a[0]) < Number(b[0])
//               ? 1
//               : Number(a[0]) > Number(b[0])
//               ? -1
//               : 0
//           );
//           //console.log('setting from snapshot');
//           //console.log({...prevOB, asks: data.asks, buys: data.bids });
//           return {
//             ...prevOB,
//             asks: data.asks.slice(0, depth),
//             buys: data.bids.slice(0, depth)
//           };
//         });
//       } else if (data.type === "l2update") {
//         const removedItems = data.changes.filter((el: any[]) => Number(el[2]) === 0);
//         const removedAsks = removedItems
//           .filter((el: string[]) => el[0] === "sell")
//           .map((el: any[]) => el[1]);
//         const removedBuys = removedItems
//           .filter((el: string[]) => el[0] === "buy")
//           .map((el: any[]) => el[1]);
//         const addedItems = data.changes.filter((el: any[]) => Number(el[2]) !== 0);
//         const addedAsks = addedItems
//           .filter((el: string[]) => el[0] === "sell")
//           .map((el: string | any[]) => el.slice(1));
//         const addedBuys = addedItems
//           .filter((el: string[]) => el[0] === "buy")
//           .map((el: string | any[]) => el.slice(1));
//         setOB((prevOB) => {
//           const asks = [...prevOB.asks]
//             .filter((ask) => !removedAsks.includes(ask[0]))
//             .concat(addedAsks);
//           const buys = [...prevOB.buys]
//             .filter((buy) => !removedBuys.includes(buy[0]))
//             .concat(addedBuys);
//           asks.sort((a, b) =>
//             Number(a[0]) < Number(b[0])
//               ? -1
//               : Number(a[0]) > Number(b[0])
//               ? 1
//               : 0
//           );
//           buys.sort((a, b) =>
//             Number(a[0]) < Number(b[0])
//               ? 1
//               : Number(a[0]) > Number(b[0])
//               ? -1
//               : 0
//           );
//           //console.log("setting from update");
//           //console.log(prevOB);
//           //console.log({...prevOB, asks: asks, buys: buys });
//           return {
//             ...prevOB,
//             asks: asks.slice(0, depth),
//             buys: buys.slice(0, depth)
//           };
//         });
//       } else if (data.type === "subscriptions") {
//       } else {
//         throw new Error();
//       }
//     };

//     setTimeout(() => {
//       client.close();
//     }, 4000);

//     return () => {
//       //console.log('unmounted');
//       client.close();
//     };
//   }, [product_id, depth]);

  return ob;
};

export default OrderBookApi;