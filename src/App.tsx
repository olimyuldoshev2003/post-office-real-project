import axios from "axios";
import { useEffect, useState } from "react";
import { IPostOffice } from "./helpers/types";

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

  const [error, setError] = useState<string>("");

  // const

  // Getting data from database
  async function getPostOfficesBySearching(
    pincode: string,
    postOffice: string
  ) {
    setLoading(true);
    try {
      if (pincode !== "" || postOffice !== "") {
        const { data } = await axios.get(
          pincode !== "" && postOffice === ""
            ? `${API_POST_OFFICE_BY_PINCODE}/${pincode}`
            : pincode === "" && postOffice !== ""
            ? `${API_POST_OFFICE_BY_POST_OFFICE}/${postOffice}`
            : pincode !== "" && postOffice !== ""
            ? `${
                (alert("You can't search like this"),
                setInpSearchByPincodeValue(""),
                setInpSearchByPostOfficeValue(""))
              }`
            : pincode === "" && postOffice === ""
            ? ``
            : ``
        );

        if (data.Status === "404") {
          setError(data.Message);
        } else if (data.Status === "Error") {
          setError(data.Message);
        } else {
          setPostOffices(data.at(0)?.PostOffice);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostOfficesBySearching(
      inpSearchByPincodeValue,
      inpSearchByPostOfficeValue
    );
  }, [inpSearchByPincodeValue, inpSearchByPostOfficeValue]);

  return (
    <>
      <div className="app_component">
        <div className="block_header_center flex justify-center">
          <header className="header px-5 py-2 bg-gray-400 mt-7 rounded-md">
            <h1 className="text-center font-[600]">
              Search the post offices with pincode or post office name
            </h1>
            <div className="input_block max-w-3xl flex justify-center gap-2 mx-auto mt-3">
              <input
                type="password"
                name=""
                id=""
                className="outline-none p-[5px_20px] rounded-[20px] bg-[#0f0f47] text-[#fff] max-w-[280px] placeholder:text-[#fff]"
                placeholder="Search by pincode"
                value={inpSearchByPincodeValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  // Only set the value if it's empty or contains only numbers
                  if (value === "" || /^[0-9]*$/.test(value)) {
                    setInpSearchByPincodeValue(value);
                  }
                }}
              />
              <input
                type="search"
                name=""
                id=""
                className="outline-none p-[5px_20px] rounded-[20px] bg-[#0f0f47] text-[#fff] max-w-[280px] placeholder:text-[#fff]"
                placeholder="Search by post office"
                value={inpSearchByPostOfficeValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setInpSearchByPostOfficeValue(event.target.value)
                }
              />
            </div>
          </header>
        </div>

        <section className="section flex flex-wrap justify-center gap-4 mt-3 max-w-5xl mx-auto">
          {postOffices?.map((item: IPostOffice, index) => {
            return (
              <div
                key={index}
                className="w-[280px] bg-[#c7c7c7] shadow-2xl p-[10px] flex flex-col gap-1 rounded-[20px] cursor-pointer"
                onClick={() => {
                  alert("Hello");
                }}
              >
                <h1 className="text-[#555555] font-[700] text-[20px]">
                  Name: <span className="text-blue-900">{item.Name}</span>
                </h1>
                {/* <h1 className="text-[#161616] font-[700] text-[16px]">
                  Branch Type: {item.BranchType}
                </h1> */}
                <h1 className="text-[#444343] font-[700] text-[16px]">
                  Country: {item.Country}
                </h1>
                {/* <h1 className="text-[#444343] font-[700] text-[16px]">
                  District: {item.District}
                </h1>
                <h1 className="text-[#444343] font-[700] text-[16px]">
                  Division : {item.Division}
                </h1>
                <h1 className="text-[#444343] font-[700] text-[16px]">
                  Region : {item.Region}
                </h1>
                <h1 className="text-[#444343] font-[700] text-[16px]">
                  State : {item.State}
                </h1>
                <h1 className={`text-[#444343] font-[700] text-[16px]`}>
                  Delivery Status :
                  <span
                    className={`${
                      item.DeliveryStatus === "Non-Delivery"
                        ? `text-[red]`
                        : `text-[green]`
                    } ml-[20px]`}
                  >
                    {item.DeliveryStatus}
                  </span>
                </h1> */}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default App;
