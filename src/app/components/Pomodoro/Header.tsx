'use client';

import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import { useTimerStore } from './store/timerStore';

export const Header = () => {
  const { mode, breakLength, workLength } = useTimerStore();

  return (
    <Box component='header'>
      <Typography variant='h4' component='h1' color={red[600]}>
        Meditation Timer
      </Typography>
      <Typography variant='subtitle1' color={red[300]}>
        {mode === 'work'
          ? `Find a quiet space, sit comfortably, and focus on your breath for ${workLength} ${
              workLength > 1 ? 'minutes' : 'minute'
            }.`
          : `Take this ${breakLength}-minute break to relax and recharge.`}
      </Typography>
      <Typography variant='body2' color={red[300]} sx={{ mt: 1 }}>
        Use headphones for the best meditation experience.
      </Typography>
    </Box>
  );
};
