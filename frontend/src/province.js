import React, { useState,useEffect} from 'react';

const Provinces = () => {
  const [provinces, setprovinces] = useState([]);
  const [provinceID, setProvinceID] = useState('');
  useEffect(() => {
    fetch("/api/province")
      .then(res => res.json())
      .then(
        (result) => {
          setprovinces(result);
        }
      )
  }, [])
    return (  
		<select id="province" value='1' onChange={e => setProvinceID(e.target.value)}>
		{provinces.map(province => (
			<option key={province.PROVINCEID} value={province.PROVINCEID}>{province.PROVINCENAME}</option>
		))}
		</select>
  );
};

export default Provinces;
