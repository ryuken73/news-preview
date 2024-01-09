import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetTitleType from './SetTitleType';
import SetTitleFontSize from './SetTitleFontSize';
import SetTitleFontWeight from './SetTitleFontWeight';
import SetTitleOpacity from './SetTitleOpacity';
import SetItemRadius from './SetItemRadius';
import SetAnimationTime from './SetAnimationTime';

function RightSide(props) {
  const {config, updateConfig} = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleType config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleFontSize config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleFontWeight config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleOpacity config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetItemRadius config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetAnimationTime config={config} updateConfig={updateConfig} />
      </DialogContentText>
      <p></p>
    </DialogContent>
  );
}

export default React.memo(RightSide);