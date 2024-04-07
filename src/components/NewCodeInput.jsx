import React, { useState, useEffect } from 'react';
const NewCodeInput = ({ inputUserID, setInputUserID, readOnly, value }) => {
  const [segments, setSegments] = useState([
    { value: value ? value.substring(0, 8) : '', length: 8 },
    { value: value ? value.substring(8, 12) : '', length: 4 },
    { value: value ? value.substring(12, 16) : '', length: 4 },
    { value: value ? value.substring(16, 20) : '', length: 4 },
    { value: value ? value.substring(20, 32) : '', length: 12 },
  ]);

  const onPaste = (event) => {
    event.preventDefault(); // ✅
    const pasted = event.clipboardData.getData('text/plain');

    let pointer = 0;
    const sliced = segments.map((s, i, a) => {
      const ret = pasted.slice(pointer, pointer + s.length);

      pointer = pointer + s.length;

      return { ...s, value: ret };
    });

    setSegments(sliced);
    setInputUserID(pasted);
  };

  const update = (index) => {
    return (event) => {
      if (event.target.value.length === 32) setInputUserID(event.target.value);
      setSegments((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], value: event.target.value },
        ...prev.slice(index + 1),
      ]);
    };
  };

  return (
    <section>
      <p
        className={
          segments.filter((s) => s.value.length > 0).length > 0
            ? 'bold'
            : 'display-none'
        }
      >
        {segments.map((s, i) =>
          i === 0 || s.value.length === 0 ? (
            <span key={`dash-${i}`}>{s.value}</span>
          ) : (
            '-' + s.value
          )
        )}
      </p>
      <section className='input-fields'>
        {segments.map((s, i) => (
          <>
            {i === 0 ? '' : <span>-</span>}
            <SegmentInput
              name={`field-${i}`}
              maxLength={s.length}
              handleChange={update(i)}
              readOnly={readOnly}
              value={s.value}
              onPaste={onPaste}
            />
          </>
        ))}
      </section>
    </section>
  );
};

const SegmentInput = ({
  name,
  maxLength,
  handleChange,
  readOnly,
  value,
  onPaste,
}) => {
  return (
    <input
      type='text'
      name={name}
      maxLength={maxLength}
      onChange={handleChange}
      readOnly={readOnly}
      value={value}
      onPaste={onPaste}
    />
  );
};

export default NewCodeInput;
