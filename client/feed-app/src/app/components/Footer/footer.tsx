'use client'


import React from 'react'


function Footer() {



  const contactInfo = (
    <div className='bg-black text-cyan-50 flex justify-between p-3'>
      <div>
        Contact info
        <p>Email: example@example.com</p>
        <p>Phone: +1 123-456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className='text-center'>
        <strong>Nikinc</strong>

      </div>
    </div>
  );


  return contactInfo;
}
export default Footer;
