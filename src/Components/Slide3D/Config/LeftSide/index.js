import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetAutoRotate from './SetAutoRotate';
import SetUseTitleBar from './SetUseTitleBar';
import SetSeekZero from './SetSeekZero';

function LeftSide(props) {
  const {config, updateConfig} = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetAutoRotate config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetUseTitleBar config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetSeekZero config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <p></p>
    </DialogContent>
  );
}

export default React.memo(LeftSide);