import Card from "../../components/Card";
import { Link, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { AppContext } from "../../app.context";
import testImage from "../../assets/CardImage/download.jpg";
import TextField from "@mui/material/TextField";

const removeDuplicate = (arr) => {
  // const uniqueArray = [...new Set(arr)];
  const uniqueCategories = Array.from(new Set(arr.map((s) => s.category)));
  console.log("uni", uniqueCategories);
  return uniqueCategories;
};
const removeDuplicate2 = (arr) => {
  // const uniqueArray = [...new Set(arr)];
  const uniqueCategories = Array.from(new Set(arr.map((s) => s.sub_category)));
  console.log("uni", uniqueCategories);
  return uniqueCategories;
};
const removeDuplicate3 = (arr) => {
  // const uniqueArray = [...new Set(arr)];
  const uniqueCategories = Array.from(new Set(arr.map((s) => s.sub_sub_category)));
  console.log("uni", uniqueCategories);
  return uniqueCategories;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Home = () => {

  const theme = useTheme();
  const [personName1, setPersonName1] = useState([]);
  const [personName2, setPersonName2] = useState([]);
  const [personName3, setPersonName3] = useState([]);
  const [pageR, setPageR] = useState(false);
  const [allData, setAllData] = useState([]);
  //   const [allData2, ] = useState([]);
  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);
  const [setCat3, setCat3setCat3] = useState([]);
  const { allData2, setAllData2, allFiles, setAllFiles, allFiles2, setAllFiles2 } = useContext(AppContext);

  useEffect(() => {
    setAllData(allFiles2);
    setAllData2(allFiles2);
  }, [allFiles2]);

  const handleChangeC1 = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setPersonName1(
      value
      // On autofill we get a stringified value.
      //   typeof value === "string" ? value.split(",") : value
    );
    if (value == "") {
      setCat1(allData);
      setAllData2(allData);
    } else {
      const filtered = allData.filter((f) => f.category == value);
      setAllData2(filtered);
      console.log("fil1", filtered);
      setCat1(filtered);
    }
  };
  const handleChangeC2 = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setPersonName2(
      value
      // On autofill we get a stringified value.
      //   typeof value === "string" ? value.split(",") : value
    );

    if (value == "") {
      setCat2(cat1);
      setAllData2(cat1);
    } else {
      const filtered = cat1.filter((f) => f.sub_category == value);
      console.log("fil2", filtered);
      setCat2(filtered);
      setAllData2(filtered);
    }
  };

  const handleChangeC3 = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    setPersonName3(
      value
      // On autofill we get a stringified value.
      //   typeof value === "string" ? value.split(",") : value
    );

    if (value == "") {
      setCat3(cat2);
      setAllData2(cat2);
    } else {
      const filtered = cat2.filter((f) => f.sub_sub_category == value);
      setCat3(filtered);
      console.log("fil3", filtered);
      setAllData2(filtered);
    }
  };
  const searchItem = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);
    // setPersonName3(
    //   value
      // On autofill we get a stringified value.
      //   typeof value === "string" ? value.split(",") : value
    // );

    if (value == "") {
    //   setCat3(cat2);
      setAllData2(allData);
    } else {
      const filtered = allData.filter((f) => f.doc_name.includes(value));
    //   setCat3(filtered);
      setAllData2(filtered);
    }
  };


  return (
    <div>

<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4  mb-12 ">

<TextField
style={{width:"100%"}} 
    required
    id="outlined-required"
    label="Search"
    onChange={searchItem}
    //   defaultValue="Hello World"
  />

  <FormControl sx={{ m: 1, width: "100%" }}>
    <InputLabel id="demo-multiple-name-label">Category</InputLabel>
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple={false}
      value={personName1}
      onChange={handleChangeC1}
      input={<OutlinedInput label="Name" />}
      MenuProps={MenuProps}
    >
      <MenuItem
        //   key={s}
        value={""}
        style={getStyles("", personName1, theme)}
      >
        Select
      </MenuItem>
      {removeDuplicate(allData)?.map((s) => (
        <MenuItem
          key={s}
          value={s}
          style={getStyles(s, personName1, theme)}
        >
          {s}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <FormControl sx={{ m: 1, width: "100%" }}>
    <InputLabel id="demo-multiple-name-label">
      Sub Category
    </InputLabel>
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple={false}
      value={personName2}
      onChange={handleChangeC2}
      input={<OutlinedInput label="Name" />}
      MenuProps={MenuProps}
    >
      <MenuItem
        //   key={s}
        value={""}
        style={getStyles("", personName2, theme)}
      >
        Select
      </MenuItem>

      {removeDuplicate2(cat1)?.map((s) => (
        <MenuItem
          key={s}
          value={s}
          style={getStyles(s, personName2, theme)}
        >
          {s}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl sx={{ m: 1, width: "100%" }}>
    <InputLabel id="demo-multiple-name-label">
      Sub sub Category
    </InputLabel>
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple={false}
      value={personName3}
      onChange={handleChangeC3}
      input={<OutlinedInput label="Name" />}
      MenuProps={MenuProps}
    >
      <MenuItem
        //   key={s}
        value={""}
        style={getStyles("", personName3, theme)}
      >
        Select
      </MenuItem>

      {removeDuplicate3(cat2)?.map((s) => (
        <MenuItem
          key={s}
          value={s}
          style={getStyles(s, personName3, theme)}
        >
          {s}
        </MenuItem>
      ))}
    </Select>
  </FormControl>



  {/* <div>
    <LoadingButton loading={false} variant="contained">
      Search
    </LoadingButton>
  </div> */}
</div>

      <Card/>
    </div>
  );
};

export default Home;
