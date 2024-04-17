import { About } from '../components/Pomodoro/About';
import { Card } from '../components/Pomodoro/Card';
import { Header } from '../components/Pomodoro/Header';
import { Timer } from '../components/Pomodoro/Timer';

const page=() => {
  return (
    <main>
      <Card>
        <Header />
        <Timer />
      </Card>
      <About />
    </main>
  );
}
export default page;
