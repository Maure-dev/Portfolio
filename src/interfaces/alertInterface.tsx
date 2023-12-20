// import menuCloseLight from "../../components/assets/mobile/menuclose-light.svg";
// import menuCloseDark from "../../components/assets/mobile/menuclose-dark.svg";
// import circleCheck from "../../components/assets/circle_check.svg";
// import circleAlert from "../../components/assets/circle_alert.svg";
// import { ContactContext } from "@src/containers/contexts/contactContext";
// import { useContext } from "react";
// import type { AlertInterfaceType } from "../../containers/entities/entities";

// export const AlertInterface = ({ className }: AlertInterfaceType) => {
//   const { alert, alertStatus, handleAlert } = useContext(ContactContext);
//   return (
//     <div
//       className={`${alert ? "opacity-100" : "opacity-0"} ${
//         alertStatus === "success" ? "bg-primaryGreen" : "bg-primaryRed"
//       } py-4 px-6 rounded-lg flex items-center justify-between font-semibold transition-all duration-300 ${
//         className ? className : ""
//       }`}
//     >
//       <div className="flex items-center lg:mr-16">
//         <img
//           className="mr-4 lg:mr-2 w-6 lg:w-5"
//           src={alertStatus === "success" ? circleCheck : circleAlert}
//           alt="Status Alert Icon"
//         />
//         <p
//           className={`${
//             alertStatus === "success" ? "opacity-100" : "opacity-0 w-0 h-0"
//           }`}
//           data-mirage-key="alertSuccessContact"
//         ></p>
//         <p
//           className={`${
//             alertStatus === "error" ? "opacity-100" : "opacity-0 w-0 h-0"
//           } text-white`}
//           data-mirage-key="alertErrorContact"
//         ></p>
//       </div>

//       <button
//         className="bg-transparent w-6 lg:w-3"
//         onClick={() => {
//           return handleAlert(false);
//         }}
//       >
//         <img
//           src={alertStatus === "success" ? menuCloseLight : menuCloseDark}
//           alt="Close Button"
//         />
//       </button>
//     </div>
//   );
// };
