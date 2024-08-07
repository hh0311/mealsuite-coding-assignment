import React, { useEffect, useState } from 'react';
import { getSafeValue } from '../../helpers.ts';
import styles from './style.module.css';

export type SelectOptions = { value: string | boolean; text?: string };
export type SelectProps = {
  label: string;
  fieldName: string;
  options?: SelectOptions[];
  onValueChange?: (event: string) => void;
  defaultValue?: string | number;
};

function Select({
  label,
  fieldName,
  options,
  onValueChange,
  defaultValue,
}: SelectProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles['select']}>
      <label htmlFor={label}>{label}</label>
      <select
        name={fieldName}
        id={label}
        onChange={(event) => {
          onValueChange?.(event.currentTarget.value);
          setValue(event.currentTarget.value);
        }}
        value={value}
      >
        {options?.map((option) => {
          const optValue = getSafeValue(option, 'value');
          return (
            <option key={optValue} value={optValue}>
              {getSafeValue(option, 'text')}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
