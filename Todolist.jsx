import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const Todolist = () => {
  const getData = () => {
    let all = localStorage.getItem("list");
    if (all) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };
  const [data, setData] = useState("");
  const [list, setList] = useState(getData());
  const [num,setNum]=useState(null)
  const [istrue,setIstrue]=useState(false)

  const handleUpdate=(item,ind)=>{
     setData(item)
     setNum(ind)
     setIstrue(true)
  }
  const handleAdd = () => {
   if(istrue===true){
     list.splice(num,1,data)
     setNum(null)
     setIstrue(false)
     setData("")
   }
   else{
    if(data.trim()!=""){
        setList([...list,data])
        setData("")
    }
   }
};
  const handleDelete = () => {
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <React.Fragment>
      <Card sx={{ backgroundColor: "#F0E68C" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} align="center">
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontStyle: "italic",
                  color: "#0000CD",
                }}
                variant="h2"
              >
                Add Your Task Here
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setData(e.target.value)}
                variant="outlined"
                fullWidth
                title="Enter Your Task"
                label="explore here..."
                value={data}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                fullWidth
                onClick={handleAdd}
                variant="contained"
                color="success"
                sx={{ height: "55px" }}
              >
                {istrue?"update":"add"}
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                fullWidth
                onClick={handleDelete}
                variant="contained"
                color="error"
                sx={{ height: "55px" }}
              >
                Delete All
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            {list.map((item, ind) => {
              return (
                <Grid item xs={3}>
                  <Card 
                    align="center"
                    sx={{
                      backgroundColor: "#90EE90",
                      fontFamily: "fantasy",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    <CardContent onClick={()=>handleUpdate(item,ind)}>
                      {ind + 1} {item}
                    </CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography variant="h6">Completed</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Checkbox defaultChecked/>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">Pending</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Checkbox />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Todolist;
