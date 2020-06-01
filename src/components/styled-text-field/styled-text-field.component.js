import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#1FBFAE',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1FBFAE',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#1FBFAE',
            },
        },
    },
})(TextField);

export default StyledTextField