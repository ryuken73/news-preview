import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetAutoRotate from './SetAutoRotate';
import SetMoveUpward from './SetMoveUpward';
import SetScaleOrigin from './SetScaleOrigin';
import SetUseTitleBar from './SetUseTitleBar';
import SetButtonFontSize from './SetButtonFontSize';
import SetButtonWidth from './SetButtonWidth';
import SetSeekZero from './SetSeekZero';
import SetAutoPlay from './SetAutoPlay';

function LeftSide(props) {
  const {config, updateConfig} = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetAutoRotate config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetMoveUpward config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetScaleOrigin config={config} updateConfig={updateConfig} />
      </DialogContentText>
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
    </DialogContent>
  );
}

export default React.memo(LeftSide);