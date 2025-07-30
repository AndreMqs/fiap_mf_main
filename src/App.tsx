import styles from './App.module.scss';
import MainPage from './components/MainPage/MainPage';

const App = () => {

  return (
    <div className={styles.global}>
      <MainPage />
    </div>
  );
};

export default App;
