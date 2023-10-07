import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import { useState } from 'react'

function Profiles() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-button-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            alt="Tiendeptrai"
            sx={{ width: 30, height: 30 }}
            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.6435-9/120463031_1270691523283088_7067634687663855665_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=9vlEWiN-0pcAX9ojn1-&_nc_oc=AQnNWCYo9HvIXY8HxRRo0uUGTbPwkQtkjPnQPK6FlytMDeIlQ52U-iQAMbmPZ88FBiyIVO3aRxtot1xafM_dY1Qe&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfCYo_FXBCPsQ3r0fyo_cem2EHL6fdQjq6A6va5Ck4dSug&oe=6548F128"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
