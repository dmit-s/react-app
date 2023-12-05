const PromotionsTop = () => {
  return (
    <div>
      <div>
        <div className="filter">
          <label>Показывать</label>
          <input type="number" value={10} />
        </div>
        <div className="pagination">
          <div className="pagination__body">
            <label>Страница</label>
            <input type="number" value={1} />
            из <span>1</span>
          </div>
          <div className="pagination__buttons">
            <button>{"<"}</button>
            <button>{">"}</button>
          </div>
        </div>
      </div>
      <button>Добавить акцию</button>
    </div>
  );
};

export default PromotionsTop;
