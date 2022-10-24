  
import React ,{useState} from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, color, casesType, isRed, ...props }) {
  console.log("color", color, casesType)
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} infoBox--${color}`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        
        <h2  className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
           Total {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;