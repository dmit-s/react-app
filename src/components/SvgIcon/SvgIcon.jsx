import useDynamicSVGImport from "../../hooks/useDynamicSVGImport";

const SvgIcon = ({ iconName, svgClass }) => {
  const { loading, SvgIcon } = useDynamicSVGImport(iconName);

  return (
    <>
      {loading && <div>Loading...</div>}
      {SvgIcon && <SvgIcon className={svgClass} />}
    </>
  );
};

export default SvgIcon;
