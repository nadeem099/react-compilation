import React from "react";

type Props = {
  name: string;
  
};

const HelloWorld = ({ name, }: Props) => {
  return (
    <div>
      Hello {name}
    </div>
  );
};
export default HelloWorld;
