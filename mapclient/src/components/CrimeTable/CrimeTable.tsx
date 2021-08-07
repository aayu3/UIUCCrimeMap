import React from "react";
import { JSCrimeEvent } from "../../App";
import { MDBDataTable } from 'mdbreact';
import { DataGrid ,GridColumns} from '@material-ui/data-grid';



export const CrimeTable:React.FC<{crimes: JSCrimeEvent[]}> = (properties) => {
  const crimes=properties.crimes.map(x=>({...x,id:JSON.stringify(x)}));
  const columns:GridColumns=[
    {
      headerName: 'ID',
      field: 'CaseID',
      sortable: true,
      width: 120
    },
    {
      headerName: 'Date Reported',
      field: 'DateReported',
      sortable: true,
      width: 150
    },
    {
      headerName: 'Time Reported',
      field: 'TimeReported',
      sortable: true,
      width: 100
    },
    {
      headerName: 'Time Occurred',
      field: 'jsDateTimeOccurred',
      sortable: true,
      width: 200,
      valueGetter:({row})=>{
       if(row.jsDateTimeOccurred){
         return row.jsDateTimeOccurred
       }
       return row.jsDateOccured
      },
      valueFormatter:({value,row})=>{
        let dta=null;
        if(row.jsDateTimeOccurred){
          dta=row.jsDateTimeOccurred
        }else{
          dta=row.jsDateOccured
        }
        try{
          return new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'numeric', day: 'numeric',hour: 'numeric', minute: 'numeric'}).format(dta as Date)
        }catch(e){
          return "UNKNOWN"
        }
      }
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
      headerName: 'Place',
      field: 'StreetAddress',
      sortable: true,
      width: 300
    },
    {
      headerName: 'Crime Description',
      field: 'Description',
      sortable: true,
      width: 325
    },
    {
      headerName: 'Disposition',
      field: 'Disposition',
      sortable: true,
      width: 200
    }
  ]

  return (
    <DataGrid
     
      columns={columns}
      rows={crimes}
    />
  );

} 


