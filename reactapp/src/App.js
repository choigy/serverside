import React from 'react';
import Students from './components/Students';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import './App.css';

const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    miniWidth: 650
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  table: {
    minWidth: 650,
  }
}));



function App(props) {
  const classes = useStyles();
  var [state, setState] = React.useState({
    list:[],
    searchKey:'',
  });

  const {searchKey} = state;

  React.useEffect(()=>{
    fetch('/students')
    .then((res)=>res.json())
    .then((json)=>{
      setState({
        ...state,
        list:json})
    })
  },[])

  
  const handleChange=(e)=>{
    e.preventDefault()
    const {name, value}=e.target;
    setState({
      ...state,
      [name]: value
    })
    
  }

  

  const filteredComponent=(data)=>{
    data=data.filter((c)=>{
      return c.name.indexOf(state.searchKey)>-1||c.phone.indexOf(state.searchKey)>-1||c.highschool.indexOf(state.searchKey)>-1||c.displayname.indexOf(state.searchKey)>-1;
    });
    return data.map((c)=>{
      return <Students key={c.id} id={c.id} name={c.name} displayname={c.displayname} highschool={c.highschool} phone={c.phone}/>
    });
  };
  

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKey"
                value={searchKey}
                onChange={handleChange}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div>
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">아이디</TableCell>
              <TableCell align="right">고등학교</TableCell>
              <TableCell align="right">전화번호</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComponent(state.list)}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
    
  );
}


export default App;
