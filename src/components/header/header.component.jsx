import SearchBox from "../searchbox/searchbox.component";
import UnitConverter from "../unitconverter/unitconverter.component";
import "./header.styles.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <SearchBox />
        <UnitConverter />
      </div>
    </>
  );
};

export default Header;
