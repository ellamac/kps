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
          <button className='error' onClick={() => handleClick(false)}>
            peruuta
          </button>
          <button className='success' onClick={() => handleClick(true)}>
            ok!
          </button>
        </section>
      </section>
    )
  );
};

export default PopUp;
