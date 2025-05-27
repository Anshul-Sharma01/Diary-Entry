
import { DiaryProvider } from './context/DiaryContext';
import DiaryLayout from './components/layout/DiaryLayout';

function App() {
  return (
    <DiaryProvider>
      <DiaryLayout />
    </DiaryProvider>
  );
}

export default App;