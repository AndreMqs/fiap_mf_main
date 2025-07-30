import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useEffect, useState } from 'react';

import { useStore } from '../../store/useStore';

import styles from './CategoryChart.module.scss';

const ChartWrapper = ({ children, width, height }: { children: React.ReactNode; width: number; height: number }) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      {children}
    </div>
  );
};

export default function CategoryChart() {
  const { getCategoryData } = useStore();
  const data = getCategoryData();

  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 425);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasMounted) return null;

  if (!data || data.length === 0) {
    return (
      <div className={styles.categoryChartContainer}>
        <div className={styles.categoryChartContent}>
          <span className={styles.title}>Gastos por Categoria</span>
          <div>Nenhum dado disponível</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.categoryChartContainer}>
      <div className={styles.categoryChartContent}>
        <span className={styles.title}>Gastos por Categoria</span>
        <div className={styles.chartContainer}>
          {isMobile ? (
            <div className={styles.mobileChartAndLegend}>
              <ChartWrapper width={300} height={180}>
                <PieChart width={300} height={180}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={35}
                    label={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartWrapper>
              <div className={styles.mobileLegendWrapper}>
                {data.map((item) => (
                  <div key={item.name} className={styles.mobileLegendItem}>
                    <span className={styles.mobileLegendDot} style={{ backgroundColor: item.color }} />
                    <span className={styles.mobileLegendText}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.desktopChartWrapper}>
              <ChartWrapper width={400} height={220}>
                <PieChart width={400} height={220}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={40}
                    label={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ChartWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 