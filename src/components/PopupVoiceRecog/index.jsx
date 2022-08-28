import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { ImMic } from "react-icons/im";
import classes from "./style.module.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PopupProkes = withStyles(styles)((props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      style={{
        fontFamily: "'Merienda', cursive",
        overflowY: "hidden",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      PaperProps={{
        style: {
          borderRadius: '20px',
          border: '1px solid #fbd258',
          backgroundColor: '#000'
        },
      }}
    >
      <DialogContent
        dividers
        style={{
          backgroundColor: '#000',
          overflowY: "hidden",
          backgroundPosition: 'center',
        }}
      >
        <div className={classes.popupWrapper}>
          <div className={classes.prokesTitle} onClose={handleClose}>
            <p>Kirim pesanmu melalui suara :</p>
          </div>
          <div className={classes.content}>
            <ol>
              <li>Tekan dan tahan icon mic ( <ImMic className={classes.iconMic} /> ) yang ada pada sisi bawah kolom pesan</li>
              <li>Ucapkan pesan yang ingin kamu sampaikan</li>
              <li>Pesan akan tertulis secara otomatis melalui suara</li>
            </ol>
          </div>
          <div className={classes.closePopupBtn} onClick={handleClose}>
            <p>Lanjutkan</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default PopupProkes;
