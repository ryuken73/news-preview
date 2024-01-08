import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const CustomDialog = styled(Dialog)`
  z-index: 25000 !important;
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: black;
      opacity: 0.5;
      color: white;
      max-width: 1200px;
      width: 1000px;
      border: 1px white solid;
      border-radius: 10px;
    }
  }
`
const Container = styled.div`
  display: flex;
`
const ConfigDialog = props => {
  console.log(props)
  const { 
    configDialogOpen, 
    toggleDialogOpen ,
    config, 
    updateConfig,
  } = props;

  const handleYes = React.useCallback(() => {
    toggleDialogOpen();
  }, [toggleDialogOpen]);

  return (
      <CustomDialog open={configDialogOpen} onClose={handleYes}>
        <DialogTitle id="alert-dialog-title">Change Config</DialogTitle>
        <Container>
          <LeftSide config={config} updateConfig={updateConfig} />
          <Divider orientation="vertical" FlexItem />
          <RightSide config={config} updateConfig={updateConfig} />
        </Container>
        <DialogActions>
          <Button sx={{ color: 'white' }} onClick={handleYes} autoFocus>
            OK
          </Button>
        </DialogActions>
      </CustomDialog>
  );
}

export default React.memo(ConfigDialog);