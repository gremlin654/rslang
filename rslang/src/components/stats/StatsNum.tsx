import '../../style/stats/StatsNum.scss';

export function StatsNum() {
    return (
        <div className="statistics-content">
            <h3>Успехи в играх</h3>
            <div className="statistics-content__table">
                <div className="statistics-content__table-item">
                    <div className="statistics-content__table-item-title">Игра</div>
                    <div className="statistics-content__table-item-title">Лучшая серия</div>
                    <div className="statistics-content__table-item-title">Правильные ответы %</div>
                    <div className="statistics-content__table-item-title">Всего слов</div>
                </div>
                <div className="statistics-content__table-item">
                    <div className="statistics-content__table-item-title">Спринт</div>
                    <div className="statistics-content__table-item-title">5</div>
                    <div className="statistics-content__table-item-title">100%</div>
                    <div className="statistics-content__table-item-title">100</div>
                </div>
                <div className="statistics-content__table-item">
                    <div className="statistics-content__table-item-title">Аудиовызов</div>
                    <div className="statistics-content__table-item-title">5</div>
                    <div className="statistics-content__table-item-title">100%</div>
                    <div className="statistics-content__table-item-title">100</div>
                </div>
            </div>
            <h3>Общее</h3>
            <div className="statistics-content__table-down">
                <div className="statistics-content__table-down-item">
                    <div className="statistics-content__table-down-item-title">Название</div>
                    <div className="statistics-content__table-down-item-title">Значение</div>
                </div>
                <div className="statistics-content__table-down-item">
                    <div className="statistics-content__table-down-item-title">Всего слов</div>
                    <div className="statistics-content__table-down-item-title">100</div>
                </div>
                <div className="statistics-content__table-down-item">
                    <div className="statistics-content__table-down-item-title">Правильные ответы</div>
                    <div className="statistics-content__table-down-item-title">100%</div>
                </div>
            </div>
        </div>
    )
}