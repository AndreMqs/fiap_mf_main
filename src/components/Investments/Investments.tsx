import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import { INVESTMENTS_MOCK } from '../../utils/constants';

import styles from './Investments.module.scss';

const ChartWrapper = ({ children, width, height }: { children: React.ReactNode; width: number; height: number }) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      {children}
    </div>
  );
};

export default function Investments() {
  const rendaFixa = INVESTMENTS_MOCK.rendaFixa;
  const rendaVariavel = INVESTMENTS_MOCK.rendaVariavel;
  const total = INVESTMENTS_MOCK.total;
  const data = INVESTMENTS_MOCK.chartData;

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

  return (
    <div className={styles.investmentsContainer}>
      <div className={styles.investmentsContent}>
        <span className={styles.title}>Investimentos</span>
        <span className={styles.total}>Total: R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        <div className={styles.yields}>
          <div className={styles.yieldBox}>
            <span className={styles.yieldTitle}>Renda Fixa</span>
            <span className={styles.yieldValue}>R$ {rendaFixa.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
          <div className={styles.yieldBox}>
            <span className={styles.yieldTitle}>Renda variável</span>
            <span className={styles.yieldValue}>R$ {rendaVariavel.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
        </div>
        <span className={styles.statistics}>Estatísticas</span>
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