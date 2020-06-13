import React, { useState,useEffect} from 'react';

const Provinces = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [provinces, setprovinces] = useState([]);
  useEffect(() => {
    fetch("/api/province")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setprovinces(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (  
		<select id="province">
		{provinces.map(province => (
			<option value={province.PROVINCEID}>{province.PROVINCENAME}</option>
		))}
		</select>
  );
  }
};

export default Provinces;