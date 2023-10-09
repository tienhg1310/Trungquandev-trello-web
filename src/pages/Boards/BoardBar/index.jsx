import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        borderBottom: '1px solid white'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Chip
          icon={<SpaceDashboardIcon />}
          label="Dasboard"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private workspace"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={MENU_STYLE}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Create
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '5px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title="Tienhg2001">
            <Avatar
              alt="Tienhg2001"
              src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.6435-9/120463031_1270691523283088_7067634687663855665_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=9vlEWiN-0pcAX9ojn1-&_nc_oc=AQnNWCYo9HvIXY8HxRRo0uUGTbPwkQtkjPnQPK6FlytMDeIlQ52U-iQAMbmPZ88FBiyIVO3aRxtot1xafM_dY1Qe&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfCYo_FXBCPsQ3r0fyo_cem2EHL6fdQjq6A6va5Ck4dSug&oe=6548F128"
            />
          </Tooltip>
          <Tooltip title="Tienhg2001">
            <Avatar
              alt="Tienhg2001"
              src="https://scontent.fhph1-1.fna.fbcdn.net/v/t1.6435-9/127199988_1534327923432311_6288909485846022495_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7a1959&_nc_ohc=HYNXqJfNnokAX90J8cz&_nc_ht=scontent.fhph1-1.fna&_nc_e2o=f&oh=00_AfDgGFjmaeOz10uuTmc7SLnUpgT8jOiUZWm43n5Evu6k7g&oe=654AABDD"
            />
          </Tooltip>
          <Tooltip title="Tienhg2001">
            <Avatar
              alt="Tienhg2001"
              src="https://scontent.fhph1-3.fna.fbcdn.net/v/t1.6435-9/120611345_1480578482140589_774060342293929475_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7a1959&_nc_ohc=OVCPzplCGrwAX9tIckc&_nc_ht=scontent.fhph1-3.fna&_nc_e2o=f&oh=00_AfD4jnu4KyrhDXGh8AL5ers5VwCD-eQlBn3jWRFrbO6mrg&oe=654AD38E"
            />
          </Tooltip>
          <Tooltip title="Tienhg2001">
            <Avatar
              alt="Tienhg2001"
              src="https://scontent.fhph2-1.fna.fbcdn.net/v/t1.6435-9/182465189_1440565249629047_6635660377241286394_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Q6VuClTJ_KQAX-RVWpQ&_nc_ht=scontent.fhph2-1.fna&_nc_e2o=f&oh=00_AfCBfGvsxOsrrZBqxp0cPdte2aNcozGmLYhObQwwr8uTJQ&oe=654AC6DE"
            />
          </Tooltip>
          <Tooltip title="Tienhg2001">
            <Avatar
              alt="Tienhg2001"
              src="https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-9/178482647_1437467649938807_5463060047402227308_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7a1959&_nc_ohc=-8eyLJ-GcFgAX9bqIG-&_nc_ht=scontent.fhph1-2.fna&_nc_e2o=f&oh=00_AfAwprBcCp52dr3HztsrNlXPYsyDv5bALYCcAK8X6ZDsjA&oe=654AC4A1"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
