import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetDegreeOfLast(props) {
  const { config, updateConfig } = props;
  const { degreeOfLast = 10 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('degreeOfLast', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Global ] Degree for Standby  : {degreeOfLast}
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={degreeOfLast}
        onChange={onChange}
        min={0}
        max={60}
        step={1}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetDegreeOfLast);