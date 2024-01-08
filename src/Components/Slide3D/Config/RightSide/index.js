import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetTitleFontSize from './SetTitleFontSize';

function LeftSide(props) {
  const {config, updateConfig} = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleFontSize config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <p></p>
    </DialogContent>
  );
}

export default React.memo(LeftSide);