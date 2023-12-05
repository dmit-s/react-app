import SvgIcon from "../../../../components/SvgIcon/SvgIcon";

const PromotionsRemove = () => {
  return (
    <div>
      <div>
        Количество выбранных позиций: <span>3</span>
      </div>
      <button>
        <SvgIcon iconName="trash" />
        Удалить
      </button>
    </div>
  );
};

export default PromotionsRemove;
