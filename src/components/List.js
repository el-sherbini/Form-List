import React, { useEffect, useState } from "react";
import { Container, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const List = ({ check, setCheck }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      hide: true,
    },
    {
      field: "area",
      headerName: "Area",
      minWidth: 120,
      width: 150,
      headerClassName: "headerDG",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      width: 200,
      headerClassName: "headerDG",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      width: 250,
      headerClassName: "headerDG",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "floor_number",
      headerName: "Floor No.",
      type: "number",
      minWidth: 80,
      width: 120,
      headerClassName: "headerDG",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "apartment_number",
      headerName: "Apartment No.",
      type: "number",
      minWidth: 150,
      width: 200,
      headerClassName: "headerDG",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      width: 140,
      headerClassName: "headerDG",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            title="Edit"
            onClick={() => editAddress(params.row, params.id)}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton title="Delete" onClick={() => deleteAddress(params.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </Container>
      ),
    },
  ];

  const editAddress = (newAddress, id) => {
    axios.put(`http://127.0.0.1:8000/address/${id}/`, newAddress);
    setCheck(!check);
  };

  const deleteAddress = (id) => {
    axios.delete(`http://127.0.0.1:8000/address/${id}/`);
    setCheck(!check);
  };

  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/address/").then((res) => {
      setAddresses(res.data);
    });
  }, [check]);

  return (
    <Container
      sx={{
        width: { md: "80%", xs: "100%" },
        height: "400px",
        mb: 2,
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#1565C0",
          color: "white",
          fontWeight: "bold",
        },
      }}
    >
      {addresses && (
        <DataGrid
          rows={addresses}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          editMode="row"
        />
      )}
    </Container>
  );
};

export default List;
