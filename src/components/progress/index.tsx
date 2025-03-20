import { UserType } from '@/types';
import { Box, ProgressProps, Progress as RadixProgress, Text } from '@radix-ui/themes';

export type SkillKey = keyof UserType["stats"]["skills"];

export const skillKeys: SkillKey[] = ["math", "reading", "speaking", "writing"];

const COLOR_MAP: Record<SkillKey, ProgressProps['color']> = {
	"math": "indigo",
	"reading": "cyan",
	"speaking": "orange",
	"writing": "crimson"
}

const Progress = ({ skill, current, max, ...rest }: { skill: SkillKey, current: number, max: number } & ProgressProps) => {
	const progress = current / max * 100;
	return (
		<Box p="2">
			<Text>{skill.charAt(0).toLocaleUpperCase()}{skill.slice(1)}</Text>
			<RadixProgress size="3" value={progress} {...rest} color={COLOR_MAP[skill]} />
		</Box>
	);
}

export default Progress;