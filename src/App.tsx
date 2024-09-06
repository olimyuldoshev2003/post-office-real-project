import axios from "axios";
import { useEffect, useState } from "react";
import { IPostOffice } from "./helpers/types";

const App = () => {
  const API_POST_OFFICE_BY_POST_OFFICE =
    "https://api.postalpincode.in/postoffice";
  const API_POST_OFFICE_BY_PINCODE = "https://api.postalpincode.in/pincode";

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
    try {
      if (pincode !== "" || postOffice !== "") {
        const { data } = await axios.get(
          pincode !== "" && postOffice === ""
            ? `${API_POST_OFFICE_BY_PINCODE}/${pincode}`
            : pincode === "" && postOffice !== ""
            ? `${API_POST_OFFICE_BY_POST_OFFICE}/${postOffice}`
            : ``
        );
        if (data.Status === "404") {
          setError(data.Message);
        } else if (data.Status === "Error") {
          setError(data.Message);
        } else {
          setPostOffices(data?.PostOffice);
        }
      }
    } catch (error) {
      console.error(error);
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
      <div className="app_component bg-blue-900 flex justify-center items-start h-screen">
        <header className="header max-w-3xl md:space-x-7 sm:space-x-0 px-5 py-2 bg-gray-400 mt-7 rounded-md">
          <input
            type="password"
            name=""
            id=""
            className="max-w-96 px-3 py-2 text-sm outline-yellow-500 border-[3px] border-blue-500 focus:border-red-500 rounded-md"
            placeholder="Search by pincode"
            value={inpSearchByPincodeValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInpSearchByPincodeValue(event.target.value)
            }
          />
          <input
            type="search"
            name=""
            id=""
            className="max-w-96 px-3 py-2 text-sm outline-yellow-500 border-[3px] border-blue-500 focus:border-red-500 rounded-md"
            placeholder="Search by post office"
            value={inpSearchByPostOfficeValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInpSearchByPostOfficeValue(event.target.value)
            }
          />
        </header>
        <section className="section">
          {postOffices?.map((item: IPostOffice, index) => {
            return (
              <div key={index}>
                <h1>{item.Country}</h1>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default App;
