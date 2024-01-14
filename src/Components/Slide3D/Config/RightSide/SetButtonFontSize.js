import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetButtonFontSize(props) {
  const { config, updateConfig } = props;
  const { buttonFontSize = 30 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('buttonFontSize', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Video Title Bar ] Font Size : {buttonFontSize}
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={buttonFontSize}
        onChange={onChange}
        min={5}
        max={40}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetButtonFontSize);