import React, { Dispatch, SetStateAction } from "react";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

type Props = {
  items: string[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<any[]>>;
};

export const ListSelection: React.FC<Props> = ({
  items,
  selected,
  setSelected,
}) => {
  const toggleValue = (value) => () => {
    if (selected.indexOf(value) > -1) {
      setSelected(selected.filter((l) => l !== value));
    } else {
      setSelected((oldState) => [...oldState, value]);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {items.map((value, idx) => (
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={selected.indexOf(idx) > -1}
                onChange={toggleValue(idx)}
                name={value}
              />
            }
            label={value}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default ListSelection;
