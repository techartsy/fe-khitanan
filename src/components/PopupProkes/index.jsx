import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Mask from "../../static/icons/mask.png";
import Distancing from "../../static/icons/distancing.png";
import Hand from "../../static/icons/hand.png";
import Temp from "../../static/icons/temperature.png";
import kpopupBg from '../../static/images/kpopupBg.png';
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
      }}
    >
      <DialogContent
        dividers
        style={{
          overflowY: "hidden",
          backgroundColor: "#000000",
          backgroundImage: `url(${kpopupBg})`,
          backgroundRepeat: 'no-repeat',
          width: !isMobile && '360px',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className={classes.popupWrapper}>
          <div className={classes.prokesTitle} onClose={handleClose}>
            <p>Protokol Kesehatan (Covid - 19)</p>
          </div>
          <div className={classes.prokesTop}>
            <div className={classes.iconWrapperPopup}>
              <img src={Mask} alt="mask" className={classes.iconProkes} />
              <p>Tamu undangan wajib mengenakan masker</p>
            </div>
            <div className={classes.iconWrapperPopup}>
              <img
                src={Hand}
                alt="washing-hand"
                className={classes.iconProkes}
              />
              <p>Cuci tangan menggunakan sabun atau hand sanitizer</p>
            </div>
          </div>
          <div className={classes.prokesBottom}>
            <div className={classes.iconWrapperPopup}>
              <img src={Temp} alt="temperatur" className={classes.iconProkes} />
              <p>Suhu tubuh normal dibawah 37,5 c</p>
            </div>
            <div className={classes.iconWrapperPopup}>
              <img
                src={Distancing}
                alt="social-distancing"
                className={classes.iconProkes}
              />
              <p>Menjaga jarak antar sesama minimal 1 meter</p>
            </div>
          </div>
          <div className={classes.appeal}>
            <p>Demi mendukung kesehatan bersama alangkah baiknya bagi para tamu undangan
              wajib mematuhi protokol kesehatan untuk mencegah penularan covid 19</p>
          </div>
          <div className={classes.closePopupBtn} onClick={handleClose}>
            <p>Tutup</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default PopupProkes;
