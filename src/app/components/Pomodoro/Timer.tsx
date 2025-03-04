'use client';

import { useState, useEffect } from 'react';
import { Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import { useTimerStore } from './store/timerStore';
import { formatTime } from './utils/formatTime';

import { Button } from './Button';
import { Settings } from './Settings';

const backgroundMusicSrc = '/backgroundMusic.mp3';
const bellSoundSrc = '/bell.mp3';

export const Timer = () => {
  const { isRunning, mode, timeLeft, changeMode, countDown, resetTimer, toggleTimer } =
    useTimerStore();

  const [backgroundMusic] = useState(new Audio(backgroundMusicSrc));

  useEffect(() => {
    let tick: NodeJS.Timeout | null = null;

    if (isRunning) {
      tick = setInterval(() => {
        countDown();
      }, 1000);
      backgroundMusic.loop = true;
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }

    if (timeLeft === 0) {
      const bellSound = new Audio(bellSoundSrc);
      bellSound.play();
    } else if (timeLeft < 0) {
      changeMode(mode === 'break' ? 'work' : 'break');
    }

    return () => {
      if (tick) {
        clearInterval(tick);
      }
    };
  }, [backgroundMusic, changeMode, countDown, isRunning, mode, timeLeft]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: red[400],
          borderRadius: '50%',
          height: 180,
          width: 180,
          mx: 'auto',
          my: 5,
          position: 'relative',
        }}
      >
        <Typography
          component='h2'
          variant='h6'
          sx={{
            position: 'absolute',
            top: '10%',
            opacity: 0.8,
            textTransform: 'capitalize',
          }}
        >
          Meditation
        </Typography>
        <Typography component='h1' variant='h3'>
          {formatTime(timeLeft)}
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          position='absolute'
          bottom={-10}
        >
          <Button
            icon={isRunning ? <Pause /> : <PlayArrow />}
            label={isRunning ? 'Pause the timer' : 'Start the timer'}
            onClick={() => toggleTimer()}
          />
          <Button icon={<RestartAlt />} label='Reset the timer' onClick={() => resetTimer()} />
        </Stack>
      </Box>
      <Settings />
    </>
  );
};
