import React from 'react'
import {AppBar, Button, Toolbar, Typography} from "@mui/material"
import { Box } from '@mui/system'

export const Header = () => {


  return (


    <AppBar sx={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,122,1) 35%, rgba(0,212,255,1) 100%);"}}>
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        <Box display= "flex" marginLeft="auto">
          <Button color="warning" variant="contained" sx={{margin: 1, borderRadius:10}}>Login</Button>
          <Button color="warning" variant="contained" sx={{margin: 1, borderRadius:10}}>SignUp</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
