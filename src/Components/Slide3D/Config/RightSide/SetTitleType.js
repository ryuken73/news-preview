import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SetTitleType(props) {
  const { config, updateConfig } = props;
  const { titleType } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('titleType', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Select Title Type 
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={titleType}
        onChange={onChange}
      >
        <FormControlLabel value="fullWidth" control={<Radio />} label="Full Width" />
        <FormControlLabel value="center" control={<Radio />} label="Center" />
        <FormControlLabel value="transparent" control={<Radio />} label="Transparent" />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(SetTitleType);