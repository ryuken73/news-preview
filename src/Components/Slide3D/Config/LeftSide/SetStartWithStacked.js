import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

function SetAutoRotate(props) {
  const { config, updateConfig } = props;
  const { startWithStacked = true, stackOpacity = 1 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('startWithStacked', value === 'yes');
    },
    [updateConfig]
  );
  const onChangeStackOpacity = React.useCallback((event) => {
      const { value } = event.target;
      updateConfig('stackOpacity', value);
    },
    [updateConfig]
  );

  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        [ Global ] Start With Video Stacked
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={startWithStacked ? 'yes' : 'no'}
        onChange={onChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="True" />
        <FormControlLabel value="no" control={<Radio />} label="False" />
      </RadioGroup>
      {startWithStacked && (
        <FormControl>
          <FormLabel
            sx={{ color: 'yellow' }}
            id="demo-row-radio-buttons-group-label"
          >
            [ ----- ] Initial Opacity  : {stackOpacity}
          </FormLabel>
          <Slider
            aria-label="swipeThreshold"
            value={stackOpacity}
            onChange={onChangeStackOpacity}
            min={0}
            max={1}
            step={0.1}
            valueLabelDisplay="auto"
          />
    </FormControl>

      )}
    </FormControl>
  );
}

export default React.memo(SetAutoRotate);
