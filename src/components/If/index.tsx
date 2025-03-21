import React, {ReactNode} from 'react';

const If = (props: {condition: boolean | undefined; children: ReactNode}) => {
  if (props.condition) {
    return <>{props.children}</>;
  }
  return null;
};

export default If;
