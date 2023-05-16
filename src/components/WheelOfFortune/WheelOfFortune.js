import React, { useState, useEffect, useRef } from 'react';

const items = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

const WheelOfFortune = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const wheelRef = useRef(null);
  const arrowRef = useRef(null);

  const spin = () => {
    setIsSpinning(true);
    const spinAngle = Math.floor(Math.random() * 3600 + 1440);
    wheelRef.current.style.transform = `rotate(${spinAngle}deg)`;
  };

  useEffect(() => {
    if (isSpinning) {
      const spinTimeout = setTimeout(() => {
        setIsSpinning(false);
        const currentAngle = wheelRef.current.style.transform;
        const angle = currentAngle.substring(7, currentAngle.length - 4) % 360;
        const itemIndex = Math.floor((360 - angle) / 18);
        setPrize(items[itemIndex]);
      }, 4000);
      return () => clearTimeout(spinTimeout);
    }
  }, [isSpinning]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: '250px',
          height: '250px',
          margin: '20px',
          borderRadius: '50%',
          border: '10px solid #000',
          overflow: 'hidden',
        }}
      >
        <div
  ref={wheelRef}
  style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #ffcd00, #ff9600)',
    transformOrigin: '50% 50%',
    transition: 'transform 4s ease-out',
    cursor: 'pointer',
  }}
>
  {items.map((item, index) => (
    <div
      key={index}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${index * 18 + 5}deg)`,
        textAlign: 'center',
        fontSize: '20px',
        width: '100px',
        height: '300px',
        lineHeight: '100px',
        border: '1px solid black',
      }}
    >
      {item}
    </div>
  ))}
</div>
<div
  ref={arrowRef}
  style={{
    position: 'absolute',
    width: '0',
    height: '0',
    top: '10%',
    left: 'calc(50% - 3px)',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '12px solid #000',
  }}
/>

        <div
          ref={arrowRef}
          style={{
            position: 'absolute',
            width: '0',
            height: '0',
            top: '10%',
            left: 'calc(50% - 3px)',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '12px solid #000',
          }}
        />
      </div>
      <button onClick={spin} disabled={isSpinning}>
        Запустить
      </button>
      {prize && (
        <div>
          <p>Ваш выигрыш:</p>
          <p>{prize}</p>
        </div>
      )}
    </div>
  );
};
export default WheelOfFortune;
