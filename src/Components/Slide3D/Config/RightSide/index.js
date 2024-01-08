import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetTitleFontSize from './SetTitleFontSize';
import SetTitleOpacity from './SetTitleOpacity';

function RightSide(props) {
  const {config, updateConfig} = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleFontSize config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleOpacity config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <p></p>
    </DialogContent>
  );
}

export default React.memo(RightSide);