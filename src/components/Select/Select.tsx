import { isNil } from "lodash";
import cn from "classnames";
import { useEffect, useState } from "react";

import { MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

import styles from "./Select.module.scss"


export default function Select(props: SelectProps) {
  const {value, options, placeholder, onChange} = props;
  const [selectValue, setSelectValue] = useState<string>(placeholder ?? '');

  const MenuProps = {
    PaperProps: {
      style: {
        border: '1px solid #47A138',
        borderTop: 'none',
        borderRadius: '0px 0px 8px 8px',
        width: 252
      },
    },
  };

  useEffect(() => {
    if (isNil(value) || value==='') {
      setSelectValue(placeholder ?? '');
      return;
    }

    setSelectValue(value);
  }, [value]);

  const handleItemSelected = (e: SelectChangeEvent<string>) => {
    onChange(e.target.value);
  }

  const getIsSelectedOption = (option: string) => {
    return selectValue === option;
  }
  
  return (
    <MuiSelect
      className={styles.transactionSelect}
      value={selectValue}
      onChange={handleItemSelected}
      MenuProps={MenuProps}
    >
      <MenuItem disabled value={placeholder}>
        {placeholder}
      </MenuItem>
      {options.map((option) =>
        <MenuItem 
          key={option}
          className={cn(styles.transactionOption, {[styles.selectedOption]: getIsSelectedOption(option)})} 
          value={option}
        >
          {option}
        </MenuItem>
      )}
    </MuiSelect>
  );
}


interface SelectProps {
  value: string;
  onChange: (option: string) => void;
  options: string[];
  placeholder?: string;
  style?: any;
}