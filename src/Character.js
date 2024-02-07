import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

function Character({ name, species, status, image }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <Card style={{ margin: "30px", width: "300px" }}>
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {showMore && (
          <>
            <Typography variant="body2" color="text.secondary">
              Species: {species}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {status}
            </Typography>
          </>
        )}
        <Button size="small" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show less" : "Show more"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default Character;
