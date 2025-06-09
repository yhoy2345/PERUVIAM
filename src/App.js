import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './App.css';

const PeruviamSolution = () => {
  // Datos 
  const alcoholData = [
    { sample: 1, alcohol: 4.8 },
    { sample: 2, alcohol: 5.1 },
    { sample: 3, alcohol: 5.0 },
    { sample: 4, alcohol: 4.7 },
    { sample: 5, alcohol: 5.2 },
    { sample: 6, alcohol: 5.0 },
    { sample: 7, alcohol: 4.9 },
    { sample: 8, alcohol: 5.3 },
    { sample: 9, alcohol: 4.7 },
    { sample: 10, alcohol: 5.0 },
    { sample: 11, alcohol: 5.0 },
    { sample: 12, alcohol: 5.1 },
    { sample: 13, alcohol: 4.6 },
    { sample: 14, alcohol: 4.2 },
    { sample: 15, alcohol: 5.1 },
    { sample: 16, alcohol: 4.9 },
    { sample: 17, alcohol: 5.3 },
    { sample: 18, alcohol: 4.7 },
    { sample: 19, alcohol: 5.0 },
    { sample: 20, alcohol: 5.0 }
  ];

  // Calculos 
  const mean = (alcoholData.reduce((sum, item) => sum + item.alcohol, 0) / alcoholData.length).toFixed(2);
  const sortedData = [...alcoholData].sort((a, b) => a.alcohol - b.alcohol);
  const median = sortedData.length % 2 === 0 
    ? ((sortedData[sortedData.length/2 - 1].alcohol + sortedData[sortedData.length/2].alcohol) / 2).toFixed(2)
    : sortedData[Math.floor(sortedData.length/2)].alcohol.toFixed(2);
  
  const modeMap = {};
  let maxCount = 0, mode = [];
  alcoholData.forEach(item => {
    const val = item.alcohol.toFixed(1);
    modeMap[val] = (modeMap[val] || 0) + 1;
    if (modeMap[val] > maxCount) {
      maxCount = modeMap[val];
      mode = [val];
    } else if (modeMap[val] === maxCount) {
      mode.push(val);
    }
  });
  
  const range = (Math.max(...alcoholData.map(item => item.alcohol)) - Math.min(...alcoholData.map(item => item.alcohol))).toFixed(2);

  // Datos 
  const controlChartData = alcoholData.map((item, index) => ({
    sample: `M${index + 1}`,
    alcohol: item.alcohol,
    mean: +mean,
    ucl: (+mean + 0.22).toFixed(2),
    lcl: (+mean - 0.22).toFixed(2)
  }));

  const paretoData = [
    { name: 'Fermentación irregular', value: 45 },
    { name: 'Malta inconsistente', value: 30 },
    { name: 'Falta capacitación', value: 15 },
    { name: 'Otros', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const kpiData = [
    { name: 'Actual', lotes: 60, costos: 20, satisfaccion: 65 },
    { name: 'Meta (6 meses)', lotes: 90, costos: 10, satisfaccion: 85 }
  ];

  return (
    <div className="peruviam-solution">
      <header className="solution-header">
        <h1>PROPUESTA DE SOLUCIÓN PARA PERUVIAM</h1>
        <p className="subtitle">Optimización de procesos mediante Calidad Total</p>
      </header>

      <section className="stats-section">
        <h2>📊 Análisis Estadístico del % de Alcohol</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Media (Promedio)</h3>
            <div className="stat-value">{mean}%</div>
            <p>Objetivo: 5.0%</p>
          </div>
          
          <div className="stat-card">
            <h3>Mediana</h3>
            <div className="stat-value">{median}%</div>
            <p>50% de los datos</p>
          </div>
          
          <div className="stat-card">
            <h3>Moda</h3>
            <div className="stat-value">{mode.join(', ')}%</div>
            <p>Valor más frecuente</p>
          </div>
          
          <div className="stat-card">
            <h3>Rango</h3>
            <div className="stat-value">{range}%</div>
            <p>4.6% - 5.3%</p>
          </div>
        </div>

        <div className="chart-container">
          <h3>Gráfico de Control (X-R)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={controlChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sample" />
              <YAxis domain={[4.0, 5.5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="alcohol" stroke="#8884d8" name="% Alcohol" />
              <Line type="monotone" dataKey="mean" stroke="#82ca9d" name="Media" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="ucl" stroke="#ff7300" name="LSC" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="lcl" stroke="#ff7300" name="LIC" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="analysis-section">
        <h2>🔍 Análisis de Causa-Raíz</h2>
        
        <div className="two-column">
          <div className="cause-effect">
            <h3>Diagrama de Ishikawa</h3>
            <div className="ishikawa-diagram">
              <div className="main-bone"></div>
              <div className="category" style={{ top: '30%', left: '20%' }}>Materia Prima</div>
              <div className="category" style={{ top: '10%', left: '40%' }}>Métodos</div>
              <div className="category" style={{ top: '50%', left: '40%' }}>Personal</div>
              <div className="category" style={{ top: '30%', left: '60%' }}>Medición</div>
              <div className="category" style={{ top: '70%', left: '50%' }}>Ambiente</div>
            </div>
          </div>
          
          <div className="pareto-chart">
            <h3>Diagrama de Pareto</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paretoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {paretoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="solution-section">
        <h2>🚀 Estrategia de Implementación</h2>
        
        <div className="pdca-cycle">
          <div className="phase plan">
            <h3>PLAN</h3>
            <p>Documentar procedimientos</p>
            <p>Capacitar en SPC</p>
          </div>
          <div className="phase do">
            <h3>DO</h3>
            <p>Implementar controles</p>
            <p>Gráficos en producción</p>
          </div>
          <div className="phase check">
            <h3>CHECK</h3>
            <p>Auditorías mensuales</p>
            <p>Verificar cumplimiento</p>
          </div>
          <div className="phase act">
            <h3>ACT</h3>
            <p>Ajustar procesos</p>
            <p>Mejora continua</p>
          </div>
        </div>
      </section>

      <section className="kpi-section">
        <h2>📌 Indicadores Clave (KPIs)</h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={kpiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="lotes" fill="#8884d8" name="% Lotes dentro de especificación" />
            <Bar dataKey="costos" fill="#82ca9d" name="Costos de no calidad (%)" />
            <Bar dataKey="satisfaccion" fill="#ffc658" name="Satisfacción cliente (/100)" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="benefits-section">
        <h2>🎯 Beneficios Esperados</h2>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="icon">💰</div>
            <h3>Reducción de costos</h3>
            <p>50% menos en reprocesos (S/10,000 mensuales)</p>
          </div>
          <div className="benefit-card">
            <div className="icon">📈</div>
            <h3>Calidad consistente</h3>
            <p>Variabilidad controlada (σ ≤ 0.15%)</p>
          </div>
          <div className="benefit-card">
            <div className="icon">🏆</div>
            <h3>Certificación ISO</h3>
            <p>Preparación para ISO 9001 en 12 meses</p>
          </div>
          <div className="benefit-card">
            <div className="icon">😊</div>
            <h3>Clientes satisfechos</h3>
            <p>6.5 → 8.5/10 en encuestas</p>
          </div>
        </div>
      </section>
      

      <footer className="solution-footer">
        <p>© {new Date().getFullYear()} Propuesta de Calidad Total - PERUVIAM</p>
      </footer>
    </div>
  );
};

export default PeruviamSolution;