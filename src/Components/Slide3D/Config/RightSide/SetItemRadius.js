import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetItemRadius(props) {
  const { config, updateConfig } = props;
  const { radius = 600 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('radius', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Global ] Rotate Radius
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={radius}
        onChange={onChange}
        min={400}
        max={1000}
        step={20}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetItemRadius);