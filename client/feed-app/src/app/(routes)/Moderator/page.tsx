import React from 'react';
import { getServerSession } from "next-auth/next";
import { userApi } from '@/app/api/userApi';
import { postApi } from '@/app/api/postApi';
import { autchConfig } from '../../../../config/auth';
import ModeratorDashboard from '@/app/components/ModeratoDashBoard/moderatorDashBoard';

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

async function ModeratoPage() {
  try {
    const session: Session | null = await getServerSession(autchConfig);

    if (!session) {
      return <div className='h-screen text-center text-red-600 text-2xl'>Error: Session not found</div>;
    }

    const moderatorResponse = await userApi.getUser(session.user.email);

    if (!moderatorResponse?.data || !moderatorResponse?.data.data.user) {
      return <>Error: Moderator data not available</>;
    }

    const moderatorRole = moderatorResponse?.data.data.user.role;
    const role = moderatorRole ? moderatorRole : "customer";

    if (role === "moderator") {
      const postsResponse = await postApi.getAllPosts();

      if (postsResponse.data && postsResponse.data.data) {
        const posts = JSON.parse(JSON.stringify(postsResponse.data.data)); // Serialize the data

        return (
          <div className='min-h-screen'>
            <ModeratorDashboard posts={posts} />
          </div>
        );
      } else {
        return <>Error: Posts data not available</>;
      }
    } else {
      return <>Error: User is not a moderator</>;
    }
  } catch (error) {
    return <>Error</>;
  }
}

export default ModeratoPage;
