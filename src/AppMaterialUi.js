import React , { useEffect, useState }from 'react';
import logo from "./logo.svg"
import { createWorker } from 'tesseract.js';
import Resizer from 'react-image-file-resizer';
import Modal from './Modal';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Divider, Input } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    width: '25%',
    height: '25%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelInput:{
    width: "100%",
    backgroundColor: "red",
    display: "flex",
    width: "100%",
    display: "flex",
    backgroundColor: "silver",
    padding: "1em",
    borderRadius:" 5px",
    justifyContent: "center",
    boxShadow: "1px 1px 1px 0px grey"
  },
  inputFile:{
    display: "none"
  },
  contador:{
    width: "100%",
    backgroundColor: "#b3db4b",
    display: "flex",
    width: "100%",
    display: "flex",
    padding: "1em",
    borderRadius:" 5px",
    justifyContent: "center"
    }

}));


export default function AppMaterialUi() {
  const classes = useStyles();

    // funciones de App y estados

    const [carga, setCarga] = useState("");
    const [imagen, setImagen] = useState()
  const [contact,setContact] = useState({})
  const [read, setRead] = useState(false)
  const [dataMotor, setDataMotor] = useState({
  motorName:"",
  volts:"",
  ampers:"",
  powerFactor:"", 
  startMode: "",
  hp:"", 
  KW:"", 
  dailyUse:"",
  monthyUse:""})
  const [motor, setMotor] = useState([])
  const [cotiz,setCotiz] = useState(false)

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 200, 600, 'PNG', 5, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
  });

  const worker = createWorker({
    logger: m => setCarga(m.progress),
  });
  const doOCR = async (imagen) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagen);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');

  async function handleRead (e){
    const file = e.target.files[0];
    /* const image = await resizeFile(file);*/ 
    setImagen(file); 
    doOCR(file);
  }

  function handleAddPic(e){
    setDataMotor({...dataMotor,img:e.target.files[0]})
  }

  function handleChangeContact(e){
    setContact({...contact, [e.target.name] :e.target.value} )
  }

  function handleChangeMotor(e){
    setDataMotor({...dataMotor, [e.target.name] :e.target.value} )
  }

  function handleAdd(){
    setMotor([...motor,dataMotor])
    setDataMotor({
      motorName:"",
      volts:"",
      ampers:"",
      powerFactor:"", 
      hp:"", 
      KW:"", 
      dailyUse:"",
      monthyUse:""})
  }

  useEffect(()=>{
    if(motor.length!==0){
      setRead(true)
    }
  },[motor])


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!cotiz
      ?
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar} 
        src={logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
        Engine Optimization
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="pname"
                name="projectName"
                variant="outlined"
                disabled={read}
                fullWidth
                id="projectMame"
                label="Project Name"
                autoFocus
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled={read}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                disabled={read}
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                disabled={read}
                fullWidth
                id="kwh"
                label="KWh"
                name="kwh"
                autoComplete="kwh"
                type="number"
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
           
            <Grid item xs={12} sm={12}>
              <label className={classes.labelInput}
              for="placa" 
              component="h1" 
              variant="h5"
              >
              Read Motor
              </label>
              <Input className={classes.inputFile}
              id="placa"
              type= "file"
                ></Input>
            </Grid>
        
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="motorName"
                label="Motor Name"
                name="motorName"
                autoComplete="mname"
                value={dataMotor.motorName}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl item xs={12} variant="outlined" className={classes.formControl} >
              <InputLabel id="demo-simple-select-outlined-label">Start Mode</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="startMode"
                  label="Start Mode"
                  value= {dataMotor.startMode}
                  onChange={handleChangeMotor}
                >
                  <MenuItem value='Directa / (Y-D)'>Directa / (Y-D)</MenuItem>
                  <MenuItem value='Variador de frecuencia'>Variador de frecuencia</MenuItem>
                  <MenuItem value= 'Partidor suave'>Partidor suave</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="volts"
                label="Volts"
                name="volts"
                autoComplete="volts"
                type="number"
                value={dataMotor.volts}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ampers"
                label="Ampers"
                name="ampers"
                autoComplete="ampers"
                type="number"
                value= {dataMotor.ampers}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="powerFactor"
                label="PowerFactor"
                name="powerFactor"
                autoComplete="pfactor"
                type="number"
                value= {dataMotor.powerFactor}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="hp"
                label="Hp"
                name="hp"
                autoComplete="hp"
                type="number"
                value={dataMotor.hp}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="KW"
                label="KW"
                name="KW"
                autoComplete="KW"
                type="number"
                value={dataMotor.KW}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="dailyUse"
                label="Daily Use"
                name="dailyUse"
                autoComplete="dailyUse"
                type="number"
                value={dataMotor.dailyUse}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="monthyUse"
                label="Monthy Use"
                name="monthyUse"
                autoComplete="monthyUse"
                type="number"
                value={dataMotor.monthyUse}
                onChange= {handleChangeMotor}
              />
            </Grid>
         
            <Grid item xs={12} sm={12}>
              <label className={classes.labelInput}
                for="archivo" 
                component="h1" 
                variant="h5"
              >
                <AddAPhotoIcon/>
              </label>
              <Input className={classes.inputFile}
                id="archivo"
                type= "file"
              >
              </Input>
            </Grid>

            <Grid item xs={12} sm={12}>
              <label className={classes.contador}
                component="h1" 
                variant="h5"
              > 
              Added Engines: {motor.length}
              </label>

            </Grid>
         </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                display="flex"
                onClick= {(e)=>{ 
                  e.preventDefault()
                  console.log(dataMotor, contact)
                  setRead(true)
                  handleAdd()
                }}
              > 
              Add Motor
              </Button>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                display="flex"
                onClick={(e)=>{
                  e.preventDefault()
                  console.log(motor)
                }}
              > Quote
              </Button>
            </Grid>
        </Grid>
        
      </form>
    </div>
    :
   <Modal/>}

    </Container>
  );
}