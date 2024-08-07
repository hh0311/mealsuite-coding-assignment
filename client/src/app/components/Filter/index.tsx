import React, { useEffect, useState } from 'react';
import Select from '../Select';
import Checkbox from '../Checkbox';
import { getSafeValue } from '../../helpers.ts';

type FilterComponentTypes = 'select' | 'checkbox';

type FieldProps = {
  value: string | null;
  data: { value: string | boolean; text?: string; [key: string]: any }[];
  type: FilterComponentTypes;
};
export type FilterFields = Record<string, FieldProps>;

export type FilterProps = {
  fields: FilterFields;
  onChange?: (filters: Record<string, string>) => void;
};

function Filter({ fields, onChange }: FilterProps) {
  const handleOnChange = (fieldName: string) => (value: any) => {
    onChange?.({ [fieldName]: value });
  };

  const getFilterType = (field: FieldProps, fieldName: string) => {
    const components: Record<FilterComponentTypes, any> = {
      select: (
        <Select
          label={fieldName}
          options={field.data}
          fieldName={fieldName}
          onValueChange={handleOnChange(fieldName)}
        />
      ),
      checkbox: (
        <Checkbox
          label={fieldName}
          options={field.data}
          fieldName={fieldName}
          onValueChange={handleOnChange(fieldName)}
        />
      ),
    };

    return getSafeValue(components, field.type, null);
  };

  return (
    <div>
      {Object.keys(fields).map((fieldName) => {
        const field = fields[fieldName];
        const filterComponent = getFilterType(field, fieldName);

        return <div key={fieldName}>{filterComponent}</div>;
      })}
    </div>
  );
}

export default Filter;
