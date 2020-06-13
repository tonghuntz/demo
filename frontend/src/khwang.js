import React, { useState,useEffect} from 'react';

const Khwangs = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [khwangs, setkhwangs] = useState([]);
  useEffect(() => {
    fetch("/api/khwang")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setkhwangs(result);
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
		<select id="khwang">
		{khwangs.map(khwang => (
			<option value={khwang.KHWANGID}>{khwang.KHWANGNAME}</option>
		))}
		</select>
  );
  }
};

export default Khwangs;