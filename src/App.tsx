import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { IPostOffice } from "./helpers/types";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<HTMLElement>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const App = () => {
  const API_POST_OFFICE_BY_POST_OFFICE =
    "https://api.postalpincode.in/postoffice";
  const API_POST_OFFICE_BY_PINCODE = "https://api.postalpincode.in/pincode";

  const [loading, setLoading] = useState<boolean>(false);
  const [inpSearchByPincodeValue, setInpSearchByPincodeValue] =
    useState<string>("");
  const [inpSearchByPostOfficeValue, setInpSearchByPostOfficeValue] =
    useState<string>("");
  const [modalPostOffice, setModalPostOffice] = useState<boolean>(false);
  const [postOffices, setPostOffices] = useState<IPostOffice[]>([]);
  const [chosenPostOffice, setChosenPostOffice] = useState<IPostOffice | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  async function getPostOfficesBySearching(
    pincode: string,
    postOffice: string
  ) {
    if (!pincode && !postOffice) {
      setPostOffices([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setError("");

    try {
      const { data } = await axios.get(
        pincode
          ? `${API_POST_OFFICE_BY_PINCODE}/${pincode}`
          : `${API_POST_OFFICE_BY_POST_OFFICE}/${postOffice}`
      );

      if (data[0]?.Status === "Error" || data[0]?.Status === "404") {
        setError(data[0]?.Message || "No post offices found");
        setPostOffices([]);
      } else {
        setPostOffices(data[0]?.PostOffice || []);
      }
    } catch (error) {
      setError("Failed to fetch post offices");
      setPostOffices([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getPostOfficesBySearching(
        inpSearchByPincodeValue,
        inpSearchByPostOfficeValue
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [inpSearchByPincodeValue, inpSearchByPostOfficeValue]);

  const handlePostOfficeClick = (item: IPostOffice) => {
    setChosenPostOffice(item);
    setModalPostOffice(true);
  };

  return (
    <div className="app_component">
      <div className="block_header_center flex justify-center">
        <header className="header px-5 py-2 bg-gray-400 mt-7 rounded-md">
          <h1 className="text-center font-[600]">
            Search the post offices with pincode or post office name
          </h1>
          <div className="input_block max-w-3xl flex justify-center gap-2 mx-auto mt-3 flex-wrap">
            <input
              type="password"
              className="outline-none p-[5px_20px] rounded-[20px] bg-[#0f0f47] text-[#fff] max-w-[280px] placeholder:text-[#fff]"
              placeholder="Search by pincode"
              value={inpSearchByPincodeValue}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]*$/.test(value)) {
                  setInpSearchByPincodeValue(value);
                  setInpSearchByPostOfficeValue("");
                }
              }}
            />
            <input
              type="search"
              className="outline-none p-[5px_20px] rounded-[20px] bg-[#0f0f47] text-[#fff] max-w-[280px] placeholder:text-[#fff]"
              placeholder="Search by post office"
              value={inpSearchByPostOfficeValue}
              onChange={(e) => {
                setInpSearchByPostOfficeValue(e.target.value);
                setInpSearchByPincodeValue("");
              }}
            />
          </div>
        </header>
      </div>

      <section className="section flex flex-wrap justify-center gap-4 mt-3 max-w-5xl mx-auto">
        {loading ? (
          <div className="loader"></div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : hasSearched && postOffices.length === 0 ? (
          <div>No post offices found</div>
        ) : !hasSearched ? (
          <div>Enter pincode or post office name to search</div>
        ) : (
          postOffices.map((item, index) => (
            <div
              key={index}
              className="w-[280px] bg-[#c7c7c7] shadow-2xl p-[10px] flex flex-col gap-1 rounded-[20px] cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handlePostOfficeClick(item)}
            >
              <h1 className="text-[#555555] font-[700] text-[20px]">
                Name: <span className="text-blue-900">{item.Name}</span>
              </h1>
              <h1 className="text-[#444343] font-[700] text-[16px]">
                Country: {item.Country}
              </h1>
            </div>
          ))
        )}

        <Dialog
          open={modalPostOffice}
          TransitionComponent={Transition}
          onClose={() => setModalPostOffice(false)}
          PaperProps={{
            sx: {
              borderRadius: "20px",
              padding: "10px",
              minWidth: "300px",
            },
          }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Post Office Details</h2>
              <button
                onClick={() => setModalPostOffice(false)}
                className="text-2xl hover:text-gray-600"
              >
                &times;
              </button>
            </div>

            {chosenPostOffice && (
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {chosenPostOffice.Name}
                </p>
                <p>
                  <strong>Branch Type:</strong> {chosenPostOffice.BranchType}
                </p>
                <p>
                  <strong>Country:</strong> {chosenPostOffice.Country}
                </p>
                <p>
                  <strong>District:</strong> {chosenPostOffice.District}
                </p>
                <p>
                  <strong>Division:</strong> {chosenPostOffice.Division}
                </p>
                <p>
                  <strong>Region:</strong> {chosenPostOffice.Region}
                </p>
                <p>
                  <strong>State:</strong> {chosenPostOffice.State}
                </p>
                <p>
                  <strong>Delivery Status:</strong>
                  <span
                    className={`ml-2 ${
                      chosenPostOffice.DeliveryStatus === "Non-Delivery"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {chosenPostOffice.DeliveryStatus}
                  </span>
                </p>
              </div>
            )}
          </div>
        </Dialog>
      </section>
    </div>
  );
};

export default App;
