class CategoriesService {
  static instance;
  static getInstance() {
    if (!CategoriesService.instance) {
      CategoriesService.instance = new CategoriesService();
    }

    return CategoriesService.instance;
  }

  async getCategories() {
    return [
      {
        id: crypto.randomUUID(),
        name: "Биостимулирующий дневной крем",
        subcategories: [
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "Биостимулирующий дневной крем",
        subcategories: [
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "Биостимулирующий дневной крем",
        subcategories: [
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "Биостимулирующий дневной крем",
        subcategories: [
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
          {
            id: crypto.randomUUID(),
            name: "Lorem ipsum dolor sit amet consectetur adipisicing",
          },
        ],
      },
    ];
  }
}

export default CategoriesService.getInstance();
