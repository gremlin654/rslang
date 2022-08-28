import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import '../../style/stats/StatsGraph.scss';

export function StatsGraph() {
    const dataGames = [{name: 'Спринт', 'Слова': 5}, {name: 'Аудиовызов', 'Слова': 5}];
    const dataAll = [{date: 'Сегодня', 'Слова': 5}, {date: 'Вчера', 'Слова': 4}, {date: 'Позавчера', 'Слова': 3}];
    return (
        <div className="statistics-content">
            <h3>Игры</h3>
            <div className="chart-games">
                <BarChart width={600} height={300} data={dataGames}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey='Слова' fill="#8884d8" barSize={30} />
                </BarChart>
            </div>
            <h3>Общее</h3>
            <div className="chart-all">
                <LineChart width={600} height={300} data={dataAll} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey='Слова' stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    )
}