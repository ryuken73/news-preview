import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetTitleFontSize(props) {
  const { config, updateConfig } = props;
  const { titleFontSize = 10 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('titleFontSize', value);
    },
    [updateConfig]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Set Title Font Size
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={titleFontSize}
        onChange={onChange}
        min={5}
        max={40}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetTitleFontSize);