import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetAnimationTime(props) {
  const { config, updateConfig } = props;
  const { animationTime = 0.6 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('animationTime', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Global ] Animation Time (seconds)
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={animationTime}
        onChange={onChange}
        min={0.1}
        max={2}
        step={0.1}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetAnimationTime);