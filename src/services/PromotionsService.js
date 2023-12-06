class PromotionsService {
    static instance;
    static getInstance() {
      if (!PromotionsService.instance) {
        PromotionsService.instance = new PromotionsService();
      }
  
      return PromotionsService.instance;
    }
  
    async getPromotions() {
      return [
        {
          id: 1,
          category: "Эстетический уход",
          subcategory: 'Кислотные пилинги',
          brand: "Academie",
          goods: "Нормализующий лосьон, 200мл",
          cashback: "20%",
        },
        {
          id: 2,
          category: "Средства для коррекции фигуры и массажа ",
          subcategory: 'Очищение',
          brand: "Frolyis Pro",
          goods: "Активный специальный гель для душа с маслом макадамии, 200мл",
          cashback: "10%",
        },
        {
          id: 3,
          category: "Эстетический уход",
          subcategory: 'Тонизация',
          brand: "Academie",
          goods: "Восстанавливающий уход с кальцием, 50мл",
          cashback: "20%",
        },
      ];
    }
  }
  
  export default PromotionsService.getInstance();