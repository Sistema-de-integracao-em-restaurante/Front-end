import React, { useEffect, useState } from 'react';
import connection from './images/restaurantmenor.png';
import restaurant from './images/Restaurant.png'; 

const Home = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img 
              src={connection} 
              alt="Home" 
              style={{ 
                width: '90%', 
                height: 'auto', 
                objectFit: 'contain',
                maxWidth: '100%',
                marginTop: '35px',
              }} 
            />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img 
              src={restaurant} 
              alt="Home" 
              style={{ 
                width: '90%', 
                height: 'auto', 
                objectFit: 'contain',
                maxWidth: '100%',
                marginTop: '42px',
              }} 
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;

// const Home = () => {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 d-flex align-items-center justify-content-center">
//             <img src={connection} alt="Home" style={{ width: '90%', height: '50%' }} />
//           </div>
//           <div className="col-md-6 d-flex align-items-center justify-content-center">
//             <img src={restaurant} alt="Home" style={{ width: '90%', height: '100%' }} />
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default Home;

// const Home = () => {
//     return (
//         <div className="col-md-6 d-flex align-items-center justify-content-center">
//         <img src={connection} alt="Home" style={{ width: '70%', height: '70%'}} /> {}
//         </div>
//         <div className="col-md-6 d-flex align-items-center justify-content-center">
//         <img src={restaurant} alt="Home" style={{ width: '70%', height: '70%'}} /> {}
//         </div>
//     );
//   };
  
//   export default Home;