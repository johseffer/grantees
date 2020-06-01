
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const StyledButton = withStyles((theme) => ({
    root: {
        '&.MuiButton-outlined': {
            borderColor: '#1FBFAE',
            '&:hover': {
                borderColor: 'rgb(25, 179, 163)',
            },
        },
        '&:not(.MuiButton-outlined)': {
            color: 'white',
            backgroundColor: '#1FBFAE',
            '&:hover': {
                backgroundColor: 'rgb(25, 179, 163)',
            },
        }   
    }
  }))(Button);

  export default StyledButton