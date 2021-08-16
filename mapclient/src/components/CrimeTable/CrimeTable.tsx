import React, { useState } from "react";
import { JSCrimeEvent } from "../../App";
import { MDBDataTable } from "mdbreact";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

import { Popover, Typography } from "@material-ui/core";

import Map from "../../components/map/Map";
import RoomIcon from "@material-ui/icons/Room";

export const PlaceCell = ({ value, row, hasFocus }: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Typography
        onClick={handlePopoverOpen}
        aria-owns={open ? "mouse-over-popover" + row.id : undefined}
        aria-haspopup="true"
      >
        <RoomIcon />
        {value}
      </Typography>
      <Popover
        id={"mouse-over-popover" + row.id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        disableEnforceFocus
        disableAutoFocus
        onBackdropClick={handlePopoverClose}
      >
        <div
          style={{
            width: "50vw",
            height: "50vh",
            maxHeight: "50vw",
            maxWidth: "50vh",
          }}
        >
          {open ? (
            <Map
              showNav={false}
              crimeData={[row]}
              location={{
                lat: parseFloat(row.Latitude) ?? 0,
                lng: parseFloat(row.Longitude) ?? 0,
                zoom: 15,
              }}
              mode= {"https://api.maptiler.com/maps/positron/style.json?key=gbetYLSD5vR8MdtZ88AQ"}
            />
          ) : undefined}
        </div>
      </Popover>
    </div>
  );
};
export const CrimeTable: React.FC<{ crimes: JSCrimeEvent[] }> = (
  properties
) => {
  const crimes = properties.crimes.map((x) => ({
    ...x,
    id: JSON.stringify(x),
  }));
  const columns: GridColumns = [
    {
      headerName: "ID",
      field: "CaseID",
      sortable: true,
      width: 120,
    },
    {
      headerName: "Time Reported",
      field: "jsDateTimeReported",
      sortable: true,
      width: 200,
      valueGetter: ({ row }) => {
        if (row.jsDateTimeReported) {
          return row.jsDateTimeReported;
        }
        return row.jsDateTimeReported;
      },
      valueFormatter: ({ value, row }) => {
        let dta = null;
        if (row.jsDateTimeReported) {
          dta = row.jsDateTimeReported;
        } else {
          dta = row.jsDateTimeReported;
        }
        try {
          return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(dta as Date);
        } catch (e) {
          return "UNKNOWN";
        }
      },
    },
    {
      headerName: "Time Occurred",
      field: "jsDateTimeOccurred",
      sortable: true,
      width: 200,
      valueGetter: ({ row }) => {
        if (row.jsDateTimeOccurred) {
          return row.jsDateTimeOccurred;
        }
        return row.jsDateOccured;
      },
      valueFormatter: ({ value, row }) => {
        let dta = null;
        if (row.jsDateTimeOccurred) {
          dta = row.jsDateTimeOccurred;
        } else {
          dta = row.jsDateOccured;
        }
        try {
          return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(dta as Date);
        } catch (e) {
          return "UNKNOWN";
        }
      },
    },
    // {
    //   headerName: 'Time Occurred',
    //   field: 'jsTimeOccurred',
    //   sortable: true,
    //   width: 100,
    //   valueFormatter:({value,row})=>{
    //     try{
    //       return new Intl.DateTimeFormat('en-US',{hour: 'numeric', minute: 'numeric'}).format(row.jsDateTimeOccurred)
    //     }catch(e){
    //       return "UNKNOWN"
    //     }
    //   }
    // },
    {
      headerName: "Place",
      field: "StreetAddress",
      sortable: true,
      width: 400,
      renderCell: (props: { value: any; row: any; hasFocus: boolean }) => {
        return <PlaceCell {...props} />;
        //  return hasFocus||true?<div style={{width:300,height:200}}><Map showNav={false} crimeData={[row]} location={{lat:row.Latitude,lng:row.Longitude,zoom:15}}/></div>:value
      },
    },
    {
      headerName: "Crime Description",
      field: "Description",
      sortable: true,
      width: 325,
    },
    {
      headerName: "Disposition",
      field: "Disposition",
      sortable: true,
      width: 200,
    },
  ];

  return <DataGrid columns={columns} rows={crimes} />;
};
