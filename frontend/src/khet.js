import React, { useState,useEffect} from 'react';

const Khets = () => {
  const [khets, setkhets] = useState([]);
  const [khetID, setKhetID] = useState('');
  useEffect(() => {
    fetch("/api/khet")
      .then(res => res.json())
      .then(
        (result) => {
          setkhets(result);
        }
      )
  }, [])

    return (   
		<select id="khet" value='1' onChange={e => setKhetID(e.target.value)}>
		{khets.map(khet => (
			<option key={khet.KHETID} value={khet.KHETID}>{khet.KHETNAME}</option>
		))}
		</select>
  );
};

export default Khets;