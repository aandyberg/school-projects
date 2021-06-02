import React, { useState } from "react";
import Axios from "axios";

const GetSession = () => {
  const [respData, setRespData] = useState("");

  const api = Axios.create({
    baseURL: "http://www.grupp13.icsweb.se/php/",
  });
  const getSession = async () => {
    await api
      .get("get_session.php")
      .then(async (res) => {
        console.log(res);
        if (res.data === null) {
          console.log("inen i null");
          setRespData("");
        } else {
          console.log("inne i else");
          setRespData(res.data);
        }
        console.log("här");
        console.log(respData);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getSession,
    respData,
  };
};

export default GetSession;
