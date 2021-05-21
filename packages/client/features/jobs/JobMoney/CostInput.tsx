import { Input } from 'antd';
import React from 'react';
import { formatMoney } from '~/shared/formatHelper';

const CostInput = React.forwardRef<any, any>(
  ({ handleOnChange, ...rest }, ref) => {
    return (
      <Input
        ref={ref as any}
        onChange={e =>
          handleOnChange(e.target.value, formatMoney(e.target.value))
        }
        style={{ width: '150px', textAlign: 'right' }}
        {...rest}
      />
    );
  },
);

export default CostInput;
