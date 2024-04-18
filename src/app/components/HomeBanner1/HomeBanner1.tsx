import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import { AiOutlineEye } from 'react-icons/ai';
import './HomeBanner1.css';

const HomeBanner1 = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const headingStyle = {
    WebkitTextStroke: '1px var(--col1)',
    color: 'transparent',
    fontSize: '10rem',
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: '20px' // Adjust the margin-bottom as needed
  };

  const getData = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/report/getreport', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setData(data.data);
        } else {
          setData([]);
        }
        setLoading(false); // Set loading to false after data fetching is complete
      })
      .catch(err => {
        console.log(err);
        setData([]);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
     
      <div className='meters'>
        {!loading &&
          data &&
          data.map((item: any, index: number) => {
            return (
              <div className='card' key={index}>
                <div className='card-header'>
                  <div className='card-header-box'>
                    <div className='card-header-box-name'>{item.name}</div>
                    <div className='card-header-box-value'>
                      {parseInt(item.value)} {item.unit}
                    </div>
                  </div>
                  <div className='card-header-box'>
                    <div className='card-header-box-name'>Target</div>
                    <div className='card-header-box-value'>
                      {parseInt(item.goal)} {item.goalUnit}
                    </div>
                  </div>
                </div>
                <CircularProgress
                  className='circular'
                  color='neutral'
                  determinate
                  size='lg'
                  value={(item.value / item.goal) * 100}>
                  <div className='textincircle'>
                    <span>{parseInt(item.value)}</span>
                    <span className='hrline'></span>
                    <span>{parseInt(item.goal)}</span>
                  </div>
                </CircularProgress>
                <button
                  onClick={() => {
                    window.location.href = `/report/${item.name}`;
                  }}>
                  Show report
                  <AiOutlineEye />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomeBanner1;
