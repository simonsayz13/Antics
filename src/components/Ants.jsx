import ant from "../ant.png";

export const AntLeft = () => {
  return <img src={ant} width={94} height={94} style={{ rotate: "0deg" }} />;
};

export const AntUp = () => {
  return <img src={ant} width={94} height={94} style={{ rotate: "90deg" }} />;
};

export const AntRight = () => {
  return <img src={ant} width={94} height={94} style={{ rotate: "180deg", transform: 'scaleY(-1)' }} />;
};
export const AntDown = () => {
  return <img src={ant} width={94} height={94} style={{ rotate: "270deg", transform: 'scaleY(-1)' }} />;
};



// return row.map((tile, jIndex) => {
//   if (tile === "w") {
//     if (antRowIndex === iIndex && antColIndex === jIndex) {
//       return (
//         <div
//           className="bg-white h-24 w-24 border-2"
//           key={`${iIndex}-${jIndex}`}
//         >
//           <img
//             src={ant}
//             width={94}
//             height={94}
//             style={{ rotate: `${directionDegree}deg` }}
//           />
//           ;
//         </div>
//       );
//     } else {
//       return (
//         <div
//           className="bg-white h-24 w-24 border-2"
//           key={`${iIndex}-${jIndex}`}
//         />
//       );
//     }
//   } else {
//     if (antRowIndex === iIndex && antColIndex === jIndex) {
//       return (
//         <div
//           className="bg-black h-24 w-24 border-2"
//           key={`${iIndex}-${jIndex}`}
//         >
//           <img
//             src={ant}
//             width={94}
//             height={94}
//             style={{ rotate: `${directionDegree}deg` }}
//           />
//           ;
//         </div>
//       );
//     } else {
//       return (
//         <div
//           className="bg-black h-24 w-24 border-2"
//           key={`${iIndex}-${jIndex}`}
//         />
//       );
//     }
//   }
// })