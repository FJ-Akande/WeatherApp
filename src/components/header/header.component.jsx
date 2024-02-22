import React from "react";
import SearchBox from "./searchbox/searchbox.component";
import UnitConverter from "./unitconverter/unitconverter.component";

const Header = ({
  units,
  setUnits,
  setDefaultLocation,
  setSearchedLocation,
}) => {
  return (
    <>
      <div className="header">
        <SearchBox units={units} setSearchedLocation={setSearchedLocation} />
        <UnitConverter
          units={units}
          setUnits={setUnits}
          setDefaultLocation={setDefaultLocation}
        />
      </div>
    </>
  );
};

export default Header;
