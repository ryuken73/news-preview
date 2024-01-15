import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetIdleVideoWidth(props) {
  const { config, updateConfig } = props;
  const { idleVideoWidth = 600 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('idleVideoWidth', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'lightblue' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Video ] Idle Video Width : {idleVideoWidth}
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={idleVideoWidth}
        onChange={onChange}
        min={500}
        max={2000}
        step={50}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetIdleVideoWidth);