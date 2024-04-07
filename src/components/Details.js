import { Collapse } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Details = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapse in={open} onClick={() => setOpen((prev) => !prev)}>
      {props.children}
    </Collapse>
  );
};

export default Details;
