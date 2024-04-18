import { Box, Typography } from '@mui/material';

export const About = () => {
  return (
    <Box component='article' py={5}>
      <Typography variant='h5' component='h3' pb={1} pt={4} textAlign='center'>
        Importance of Meditation
      </Typography>
      <Typography
        component='p'
        sx={{
          fontSize: { xs: '16px', md: '18px' },
          px: { xs: 2, md: 0 },
        }}
        textAlign='justify'
      >
        Meditation is a practice that has been used for centuries to promote mental and emotional
        well-being. It involves focusing the mind and eliminating distractions to achieve a state
        of deep relaxation and heightened awareness.
      </Typography>
      <Typography variant='h5' component='h3' pb={1} pt={4} textAlign='center'>
        Benefits of Meditation
      </Typography>
      <Typography
        component='p'
        sx={{
          fontSize: { xs: '16px', md: '18px' },
          px: { xs: 2, md: 0 },
        }}
        textAlign='justify'
      >
        - Reduces stress and anxiety<br />
        - Improves concentration and focus<br />
        - Enhances self-awareness and mindfulness<br />
        - Promotes emotional health and well-being<br />
        - Increases relaxation and inner peace<br />
      </Typography>
      <Typography variant='h5' component='h3' pb={1} pt={4} textAlign='center'>
        Applying Pomodoro Technique to Meditation
      </Typography>
      <Typography
        component='p'
        sx={{
          fontSize: { xs: '16px', md: '18px' },
          px: { xs: 2, md: 0 },
        }}
        textAlign='justify'
      >
        While the Pomodoro Technique is traditionally used for time management in work tasks, it
        can also be adapted for meditation practice. Set a timer for a specific duration of
        meditation, such as 10 or 20 minutes. Focus on your breath or a chosen meditation object
        during this time. Take short breaks in between sessions to rest and rejuvenate. This
        structured approach can help you establish a regular meditation practice and experience its
        numerous benefits.
      </Typography>
    </Box>
  );
};
