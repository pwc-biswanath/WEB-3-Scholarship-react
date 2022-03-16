
import AppBar from '@mui/material/AppBar';
import Home from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import {Box, Button,Avatar } from "@mui/material";
export default function StudentHeader({name}) {
    return(
        <AppBar position="relative" style={{backgroundColor:"#d25304",color:"#fff"}}>
        <Toolbar>
          <Link to="/" style={{textDecoration:"none"}}>
            <Home  style={{color:"#fff"}} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 1 }}>
            <Link to="/student-details" style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Dashboard
              </Button>
            </Link>
          </Box>
          
          <Avatar
            sx={{
              backgroundColor: '#e78d13',
              height: 40,
              width: 40,
              marginRight:1
            }}
          >
          </Avatar>

        <Typography variant="h6" color="inherit" noWrap>
          Student {name}
        </Typography>
        </Toolbar>
      </AppBar>
    )


}