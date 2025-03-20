"use client"
import Loading from '@/components/loading';
import Progress, { skillKeys } from '@/components/progress';
import { UserType } from '@/types';
import { Avatar, Box, Flex, Heading, Spinner, Text } from '@radix-ui/themes';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';




export default function User() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <Loading />

  return (
    <Box p="4">
      <Flex gap="3">
        <Flex flexShrink="0">
          <Avatar
            size="8"
            src={`data:image/jpeg;base64,${user?.image}`}
            fallback={user?.first_name?.charAt(0) || 'U'}
          />
        </Flex>
        <Flex align="center">
          <Box>
            <Heading>{user?.first_name}{" "}{user?.last_name}</Heading>
            <Text as='p'>{user?.stats.current_streak_in_days} day Streak</Text>
            <Text as='p'>{user?.stats.total_sessions_played} Sessions</Text>
          </Box>
        </Flex>
      </Flex>
      <Box>
        {skillKeys.map(skill => (
          <Progress key={skill} skill={skill} current={user?.stats.skills[skill].current || 0} max={user?.stats.skills[skill].max || 0} />
        ))}

      </Box>
    </Box>
  )
}