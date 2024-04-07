import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ msg, visible }) => {
  return visible && <section>HUOM! {msg}</section>;
};

export default ErrorMessage;
