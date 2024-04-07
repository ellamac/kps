const PopUp = ({ msg, handleOK, open, setOpen }) => {
  const handleClick = (ok) => {
    if (ok) handleOK();
    setOpen(false);
  };

  return (
    open && (
      <section className='popup'>
        <section className='card border'>
          <p>{msg}</p>
          <button onClick={() => handleClick(false)}>peruuta</button>
          <button onClick={() => handleClick(true)}>ok!</button>
        </section>
      </section>
    )
  );
};

export default PopUp;
