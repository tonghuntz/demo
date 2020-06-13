import React, { useState,useEffect} from 'react';

const Khets = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [khets, setkhets] = useState([]);
  useEffect(() => {
    fetch("/api/khet")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setkhets(result);
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
		<select id="khet">
		{khets.map(khet => (
			<option value={khet.KHETID}>{khet.KHETNAME}</option>
		))}
		</select>
  );
  }
};

export default Khets;