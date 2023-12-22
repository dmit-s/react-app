const Button = ({ children, className, handleClick }) => {
  return (
    <button
      onClick={handleClick ? handleClick : undefined}
      className={`${style.wrapper} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
