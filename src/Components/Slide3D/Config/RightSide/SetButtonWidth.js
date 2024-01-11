import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetButtonWidth(props) {
  const { config, updateConfig } = props;
  const { buttonWidth = 200 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('buttonWidth', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Video Title Bar ] Width
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={buttonWidth}
        onChange={onChange}
        min={150}
        max={400}
        step={10}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetButtonWidth);