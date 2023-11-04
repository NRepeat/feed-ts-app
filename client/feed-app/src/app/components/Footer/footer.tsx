'use client'

import { userApi } from '@/app/api/userApi';
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


function Footer() {
  const [role, setRole] = useState("customer");
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get('news');

  useEffect(() => {
    async function fetchUserRole() {
      if (session?.user?.email) {
        try {
          const moderator = await userApi.getUser(session.user.email);
          if (moderator?.data.data.role) {
            setRole(moderator.data.data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    }

    fetchUserRole();
  }, [session?.user?.email]);

  const contactInfo = (
    <div>
      <p>Email: example@example.com</p>
      <p>Phone: +1 123-456-7890</p>
      <p>Address: 123 Main Street, City, Country</p>
    </div>
  );

  // if (role === "moderator" && search) {
  //   return (
   

  //   );
  // }

  return contactInfo;
}
export default Footer;
