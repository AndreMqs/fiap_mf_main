import { ModeSelectorProps } from '../../types/components';

import styles from './NewTransaction.module.scss';

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className={styles.modeSelector}>
      <button
        className={`${styles.modeButton} ${currentMode === 'manual' ? styles.active : ''}`}
        onClick={() => onModeChange('manual')}
      >
        Entrada Manual
      </button>
      <button
        className={`${styles.modeButton} ${currentMode === 'csv' ? styles.active : ''}`}
        onClick={() => onModeChange('csv')}
      >
        Upload CSV
      </button>
    </div>
  );
}; 