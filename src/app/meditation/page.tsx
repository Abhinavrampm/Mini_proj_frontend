import { About } from '../components/Pomodoro/About';
import { Card } from '../components/Pomodoro/Card';
import { Header } from '../components/Pomodoro/Header';
import { Timer } from '../components/Pomodoro/Timer';

const Page = () => {
  return (
    <main style={{ backgroundImage: `url('/night-sky.jpg')`, backgroundSize: 'cover' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <Card>
          <Header />
          <Timer />
        </Card>
        <About />
      </div>
    </main>
  );
}

export default Page;
