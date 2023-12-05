import NavBarLink from "./NavBarLink";

const navData = [
  { text: "Продукты", icon: "products" },
  { text: "Пользователи", icon: "clients" },
  { text: "Категории", icon: "categories" },
  { text: "Города", icon: "cities" },
  { text: "Бренды", icon: "brands" },
  { text: "Протоколы", icon: "protocols" },
  { text: "Заказы", icon: "orders" },
  { text: "Баннеры", icon: "banners" },
  { text: "Семинары", icon: "seminars" },
  { text: "Промокоды", icon: "promocodes" },
];

const NavBar = () => {
  return (
    <div>
      <NavBarLink />
    </div>
  );
};

export default NavBar;
