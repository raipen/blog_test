import React from 'react';
const Main = ({ data }) => {
  const onClick = () => {
    console.log('click');
  };
  return (
    <div onClick={onClick}>
      <h1>메인</h1>
    </div>
  );
};

export default Main;