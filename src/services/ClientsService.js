class UserService {
  static instance;
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async getClients() {
    return [
      {
        id: crypto.randomUUID(),
        name: "Фурсова Елизавета",
        email: "curtis.weaver@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Пименов Максим",
        email: "debbie.baker@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Фурсова Елизавета",
        email: "curtis.weaver@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Пименов Максим",
        email: "debbie.baker@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Фурсова Елизавета",
        email: "curtis.weaver@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Пименов Максим",
        email: "debbie.baker@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Фурсова Елизавета",
        email: "curtis.weaver@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Пименов Максим",
        email: "debbie.baker@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Фурсова Елизавета",
        email: "curtis.weaver@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Пименов Максим",
        email: "debbie.baker@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Фурсова Елизавета",
        email: "curtis.weaver@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Пименов Максим",
        email: "debbie.baker@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
      {
        id: crypto.randomUUID(),
        name: "Мощева Елена",
        email: "nathan.roberts@example.com",
        tel: "+ 7 (923) 234-34-23",
      },
    ];
  }
}

export default UserService.getInstance();
