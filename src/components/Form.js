import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

const Form = ({ check, setCheck }) => {
  const [cities, setCities] = useState(null);
  const [cityLang, setCityLang] = useState("en");

  const schema = object({
    name: string()
      .required("Name is required")
      .min(1, "Name is too short")
      .max(255, "Name is too long"),
    description: string().required("Address is required"),
    apartment_number: number()
      .required("Apartment number is required")
      .positive("Apartment number must be positive integer")
      .integer(),
    floor_number: number()
      .required("Floor number is required")
      .positive("Floor number must be positive integer"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/address/states/1/areas/").then((res) => {
      setCities(res.data);
    });
  }, []);

  const submitForm = (data, e) => {
    axios.post("http://127.0.0.1:8000/address/", data);
    setCheck(!check);
  };

  return (
    <Container
      sx={{
        width: { md: "80%", xs: "100%" },
        "& .MuiTextField-root": {
          m: 1,
          width: { md: "80%", xs: "100%" },
        },
        "& .MuiAlert-root": {
          mx: "auto",
          mt: 1,
          width: { md: "70%", xs: "90%" },
        },
      }}
    >
      <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
        <TextField {...register("name")} label="Name" variant="standard" />
        {errors?.name?.message && (
          <Alert variant="filled" severity="error">
            {errors?.name?.message}
          </Alert>
        )}

        <TextField
          {...register("description")}
          label="Address"
          variant="standard"
        />
        {errors?.description?.message && (
          <Alert variant="filled" severity="error">
            {errors?.description?.message}
          </Alert>
        )}

        <TextField
          {...register("apartment_number", {
            setValueAs: (v) => +v,
          })}
          type="number"
          label="Apartment No."
          variant="standard"
        />
        {errors?.apartment_number?.message && (
          <Alert variant="filled" severity="error">
            {errors?.apartment_number?.message}
          </Alert>
        )}

        <TextField
          {...register("floor_number", {
            setValueAs: (v) => +v,
          })}
          type="number"
          label="Floor No."
          variant="standard"
        />
        {errors?.floor_number?.message && (
          <Alert variant="filled" severity="error">
            {errors?.floor_number?.message}
          </Alert>
        )}

        <RadioGroup
          value={cityLang}
          onChange={(e) => setCityLang(e.target.value)}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            m={2}
          >
            <FormControlLabel
              value="en"
              control={<Radio />}
              label="English cities"
            />
            <FormControlLabel
              value="ar"
              control={<Radio />}
              label="المدن باللغة العربية"
            />
          </Stack>
        </RadioGroup>

        {cities && (
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel id="area">City</InputLabel>
            <Select
              {...register("area")}
              labelId="area"
              label="City"
              defaultValue={1}
            >
              {cities.map((city) => {
                return (
                  <MenuItem key={city.id} value={city.id}>
                    {cityLang === "en" ? city.name : city.name_ar}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

        <Button type="submit" variant="contained" sx={{ mt: 2, width: "50%" }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;
