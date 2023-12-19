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
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
      { id: crypto.randomUUID(), name: "Биостимулирующий дневной крем" },
    ];
  }
}

export default CategoriesService.getInstance();
