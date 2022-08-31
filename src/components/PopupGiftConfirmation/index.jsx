import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Rose from '../../static/images/rosegift.png';
import whatsapp from '../../static/icons/whatsapp.png';
import classes from "./style.module.scss";
import windowDimension from '../../utils/useWindowDimensions';

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

const PopupGiftConfirmation = withStyles(styles)((props) => {
  const { open, handleClose, submitGiftConfirmation, confirmationSuccess } = props;
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [receipt, setReceipt] = useState('');
  const [note, setNote] = useState('');
  const { width } = windowDimension();
  useEffect(() => {
    if (confirmationSuccess) {
      setName('');
      setDestination('');
      setReceipt('');
      setNote('');
    }
  }, [confirmationSuccess])
  const selectDestination = (e) => {
    setDestination(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      category: destination,
      receipt,
      notes: note,
    }
    submitGiftConfirmation(payload);
    if (confirmationSuccess) {
      setName('');
      setDestination('');
      setReceipt('');
      setNote('');
    }
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      overlayStyle={{ backgroundColor: 'transparent' }}
      style={{
        fontFamily: "'Charm', cursive",
      }}
    >
      <DialogContent
        dividers
        style={{
          overflowY: `${width !== 'lg' ? 'scroll' : 'hidden'}`,
          backgroundColor: "#000000",
          border: '1px solid #fbd258',
          borderRadius: '6px'
        }}
      >
        <div className={classes.popupWrapper}>
          <div className={classes.closeIcon} onClick={handleClose}>
            &#10006;
          </div>
          <div className={classes.popupTitleWrapper} onClose={handleClose}>
            <img className={classes.headerImg} src={Rose} alt="Rose" />
            <p>Konfirmasi Hadiah</p>
          </div>
          <div className={classes.subtitle}>
            <p>Konfirmasi kiriman anda untuk memudahkan kami dalam melakukan pendataan</p>
          </div>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.separate}>
              <div className={classes.column}>
                <label for="name">Nama Pengirim</label>
                <input input type='text' value={name} placeholder='Nama' name="name" required onChange={(e) => setName(e.target.value)} />
              </div>
              <div className={classes.column}>
                <label for="destination">Tujuan Pengiriman</label>
                <select name="destination" onChange={selectDestination}>
                  <option value="" disabled>-- Pilih Tujuan --</option>
                  <option value="Hadiah Fisik">Alamat Rumah</option>
                  <option value="Rekening">Mandiri / 1260010034469 / Gilang Firdaus</option>
                </select>
              </div>
            </div>
            <label for="receipt">Nomor Resi</label>
            <input className={`${destination.toLowerCase() === 'rekening' ? classes.disabled : ''}`} disabled={destination.toLowerCase() === 'rekening'} input type='text' value={receipt} placeholder='Nomor Resi' name="receipt" required onChange={(e) => setReceipt(e.target.value)} />
            <label for="note">Catatan</label>
            <textarea type='text' name="note" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className={classes.infoWrapper}>
              <a
                rel="noreferrer"
                href="https://wa.me/6281779809537?text=Hallo%20saya%20mau%20konfirmasi%20pengiriman"
                target="_blank">
                <img src={whatsapp} alt="whatsapp" className={classes.whatsapp} />
              </a>
              <button type='submit' className={classes.actionBtn}>Kirim</button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default PopupGiftConfirmation;
