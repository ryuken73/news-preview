import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetUseTitleBar from './SetUseTitleBar';
import SetButtonFontSize from './SetButtonFontSize';
import SetButtonWidth from './SetButtonWidth';
import SetSeekZero from './SetSeekZero';
import SetAutoPlay from './SetAutoPlay';

function RightSide(props) {
  const {config, updateConfig} = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetUseTitleBar config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetButtonFontSize config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetButtonWidth config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetSeekZero config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetAutoPlay config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <p></p>
    </DialogContent>
  );
}

export default React.memo(RightSide);