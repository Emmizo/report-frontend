import React, { useEffect, useState } from "react";
import axios from "axios";
const Report = () => {
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  var URL = "http://localhost:8000/api/";
  //block or resolve function
  const block = (id, status) => {
    const form_data = new FormData();
    form_data.append("id", id);
    form_data.append("status", status);
    axios.post(`${URL}status`, form_data, {}).then(
      () => {
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setIsLoading(false);
      }
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}report`);
      setReport(result.data);
    };
    setIsLoading(false);
    setTimeout(() => {
      fetchData();
    }, 1000);

  }, [setReport]);
  return (
    <div className='cover-report'>
      <div className='report-title'>Reports</div>
      <div className='report'>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <div>
            {report?.data?.length > 0 ? (
              report?.data?.map((data) => (
                <div className='message-report' key={data.id}>
                  <div className='col-data'>
                    <div>Id: {data.id}</div>
                    <div>
                      State :
                      {data.status === 0
                        ? "Open"
                        : data.status === 3
                        ? "blocked"
                        : "Resolved"}
                    </div>
                    <div>
                      <a href='#'>Details</a>
                    </div>
                  </div>
                  <div className='type-message'>
                    <div>Type: {data.report_type}</div>
                    <div>Message: {data.message}</div>
                  </div>
                  <div className='button float-right'>
                    <div>
                      <button
                        className='buttons'
                        onClick={() => block(data.id, 3)}
                      >
                        Block
                      </button>
                    </div>
                    <div>
                      <button
                        className='buttons'
                        onClick={() => block(data.id, 2)}
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Spam reported</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Report;
