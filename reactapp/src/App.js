import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Students from './components/Students';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
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
    miniWidth: 650,
  },
  loginButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
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
  var [thstate, setThstate] = React.useState({first:[]});

  var [state, setState] = React.useState({
    list:[],
    searchKey:'',
  });

  const [toggle, setToggle] = React.useState(false);

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

  const handleToggle = () => {
    setToggle(!toggle)
  }
  

  const filteredComponent=(data)=>{
    data=data.filter((c)=>{
      return c.name.indexOf(state.searchKey)>-1||c.phone.indexOf(state.searchKey)>-1||c.highschool.indexOf(state.searchKey)>-1||c.displayname.indexOf(state.searchKey)>-1||c.email.indexof(state.searchKey)>-1;
    });
    return data.map((c)=>{
      return <Students key={c.id} id={c.id} name={c.name} displayname={c.displayname} highschool={c.highschool} phone={c.phone} email={c.email}/>
    });
  };
  

  return (
    <Router>
    <div>
      
      
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              김동한 논술학원
            </Typography>
            <div className={classes.loginButton}>
              <Button variant="contained" color="primary">
                <Link exact to='/auth/google'>
                  google
                </Link>
              </Button>
            </div>
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
      <Drawer
            open={toggle}
            onClick={handleToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List>
              <ListItem >
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <Link exact to="/">
                <ListItemText>logout</ListItemText>
                </Link>
              </ListItem>
              <ListItem >
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <Link exact to="/student">
                <ListItemText>학생명단</ListItemText>
                </Link>
              </ListItem>
              <ListItem >
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <Link exact to="/class">
                <ListItemText>수업리스트</ListItemText>
                </Link>
              </ListItem>
              <ListItem >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link exact to="/control">
                <ListItemText>수업배정</ListItemText>
                </Link>
              </ListItem>
            </List>
          </Drawer>
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
              <TableCell align="right">이메일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <Route exact path="/student">{filteredComponent(state.list)}</Route>
          </TableBody>
        </Table>
        </TableContainer>
      </div>
      <div>
        <Route exact path="/">Hello!!</Route>
      </div>
    </div>
    </Router>
    
  );
}


export default App;
