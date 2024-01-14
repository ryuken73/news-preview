import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetScaleOrigin(props) {
  const { config, updateConfig } = props;
  const { scaleOrigin = 0 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('scaleOrigin', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Global ] Scale Origin (0 == top) : {scaleOrigin}
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={scaleOrigin}
        onChange={onChange}
        min={-300}
        max={300}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetScaleOrigin);