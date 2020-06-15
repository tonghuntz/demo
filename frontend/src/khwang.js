import React, { useState,useEffect} from 'react';

const Khwangs = () => {
  const [khwangs, setkhwangs] = useState([]);
  const [khwangID, setKhwangID] = useState('');
  useEffect(() => {
    fetch("/api/khwang")
      .then(res => res.json())
      .then(
        (result) => {
          setkhwangs(result);
        }
      )
  }, [])

    return (  
		<select id="khwang" value='1' onChange={e => setKhwangID(e.target.value)}>
		{khwangs.map(khwang => (
			<option key={khwang.KHWANGID} value={khwang.KHWANGID}>{khwang.KHWANGNAME}</option>
		))}
		</select>
  );
};

export default Khwangs;