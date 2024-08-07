import React, { Fragment, useRef, useState } from 'react';
import { getSafeValue } from '../../helpers.ts';

export type CheckboxProps = {
  label: string;
  fieldName: string;
  options: { value: string | boolean; text?: string }[];
  onValueChange?: (data: string[]) => void;
  checked?: boolean;
};

function Checkbox({
  fieldName,
  label,
  options,
  onValueChange,
  checked,
}: CheckboxProps) {
  const checkedListRef = useRef<string[]>([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    if (checkedListRef.current.includes(value) && !checked) {
      checkedListRef.current.splice(checkedListRef.current.indexOf(value), 1);
    } else {
      checkedListRef.current = [...checkedListRef.current, value];
    }

    onValueChange?.(checkedListRef.current);
  };

  return (
    <div>
      <p>{label}</p>
      {options.map((option) => {
        const value = getSafeValue(option, 'value');
        const text = getSafeValue(option, 'text', value);

        return (
          <Fragment key={value}>
            <label htmlFor={label}>{text}</label>
            <input
              name={fieldName}
              id={label}
              type="checkbox"
              checked={checked}
              onChange={handleOnChange}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default Checkbox;
