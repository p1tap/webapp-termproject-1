import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '1rem',
    padding: '8px 16px',
    maxWidth: '300px',
    lineHeight: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
  },
}));

export default CustomTooltip;