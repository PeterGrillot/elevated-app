import { UserType } from "@/types";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import styles from './styles.module.css'

const UserCard = ({ user }: { user: UserType }) => {
	return (
		<Card className={styles.card}>
			<Flex gap="3" align="center">
				<Avatar
					size="3"
					src={`data:image/jpeg;base64,${user.image}`}
					fallback={user?.first_name?.charAt(0) || 'U'}
				/>
				<Box>
					<Text as="p" size="2" weight="bold">
						{user.first_name} {user.last_name}
					</Text>
				</Box>
			</Flex>
		</Card>
	);
}

export default UserCard;