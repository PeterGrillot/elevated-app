
export type UserType = {
    first_name: string;
    last_name: string;
    image: string;
    stats: {
        current_streak_in_days: number;
        skills: {
            math: {
                current: number;
                level: string;
                max: number
            };
            reading: {
                current: number;
                level: string;
                max: number
            };
            speaking: {
                current: number;
                level: string;
                max: number
            };
            writing: {
                current: number;
                level: string;
                max: number
            }
        },
        total_sessions_played: number
    }
}