export default function MenuImage({ menu }) {
  return (
    <img
      src={menu.image}
      alt={menu.imageAlt}
      loading="lazy"
      className={
        menu.imageClass === "original"
          ? "original"
          : `diptych ${menu.imageClass}`
      }
    />
  );
}
