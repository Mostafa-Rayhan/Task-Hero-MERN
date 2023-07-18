import axios from "axios";
import { createContext, useEffect, useState } from "react";
import base from "./components/Database";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [allFiles2, setAllFiles2] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [allData2, setAllData2] = useState([]);
  const [sRefresh, setSRefresh] = useState(false);
  const [mostD, setMostD]=useState([])

  const context = {
    allFiles,
    setAllFiles,
    refresh,
    setRefresh,
    allData2,
    setAllData2,
    sRefresh,
    setSRefresh,
    allFiles2,
    setAllFiles2,
    mostD,
    setMostD,
  }; 
  useEffect(() => {
    axios
      .get(`${base}/files`)
      .then(function (response) {
        // console.log("re", response)
        setAllFiles(response.data);
        const alld = response.data;
        console.log("all", alld);
        const filtered = alld.filter((f) => f.status == "approved");
        setAllFiles2(filtered);
        const mostDownloaded = alld.slice();

        // Sort the copied array based on the "downloads" field
        mostDownloaded.sort((a, b) => {
          if (a.downloads === undefined && b.downloads === undefined) {
            return 0;
          }
          if (a.downloads === undefined) {
            return 1;
          }
          if (b.downloads === undefined) {
            return -1;
          }
          return b.downloads - a.downloads;
        });

        console.log("most", mostDownloaded );
        setMostD(mostDownloaded)
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [refresh]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
