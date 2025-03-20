"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";
import styles from "./page.module.css";
import Link from "next/link"
import { UserType } from "@/types";

import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Progress, { skillKeys } from "@/components/progress";
import Loading from "@/components/loading";

export default function Users() {
  const scrollRef = useRef(null)

  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
        }
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <Loading />

  return (
    <div ref={scrollRef} className={styles.scrollArea}>
      {users && users?.map((user, index) => (
        <Card index={index} key={user.first_name}>
          <Box className={styles.container} key={user.first_name}>
            <Flex align="center" gap="3" direction="column" style={{ marginTop: 200 }}>
              <Avatar
                size="4"
                radius="full"
                src={`data:image/jpeg;base64,${user.image}`}
                fallback={user?.first_name?.charAt(0) || 'U'}
              />
              <Text as="p" size="4" weight="bold">
                {user.first_name} {user.last_name}
              </Text>
              <Text as="span">{user?.stats.current_streak_in_days} day Streak - {user?.stats.total_sessions_played} Sessions</Text>
            </Flex>

            <Box>
              {skillKeys.map(skill => (
                <Progress key={skill} skill={skill} current={user?.stats.skills[skill].current || 0} max={user?.stats.skills[skill].max || 0} />
              ))}
            </Box>
          </Box>
        </Card>
      ))}
    </div>
  )
}

function Card({ children, index }: PropsWithChildren<{ index: number }>) {
  return (
    <motion.div
      className={`card-container-${index} ${styles.cardContainer}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div className={styles.splash} />
      <motion.div variants={cardVariants} className={styles.card}>
        {children}
      </motion.div>
    </motion.div>
  )
}

const cardVariants: Variants = {
  offscreen: {
    filter: 'blur(5px)',
    y: 200,
    rotate: -10,
    zoom: 0.75
  },
  onscreen: {
    filter: 'blur(0)',
    y: 50,
    rotate: 0,
    zoom: 1,
    transition: { ease: ["easeIn", "easeOut"] }
  },
}
