import NavBarLink from "./NavBarLink";
import styles from "./NavBar.module.scss";

const navData = [
  { text: "Продукты", name: "products" },
  { text: "Пользователи", name: "clients" },
  { text: "Категории", name: "categories" },
  { text: "Города", name: "cities" },
  { text: "Бренды", name: "brands" },
  { text: "Протоколы", name: "protocols" },
  { text: "Заказы", name: "orders" },
  { text: "Баннеры", name: "banners" },
  { text: "Семинары", name: "seminars" },
  { text: "Промокоды", name: "promocodes" },
];

const NavBar = () => {
  return (
    <div className={styles.wrapper}>
      <nav>
        {navData.map((item, index) => (
          <NavBarLink key={index} {...item} />
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
