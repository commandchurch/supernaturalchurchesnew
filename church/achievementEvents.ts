import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";

// Event types for spiritual achievements
export type AchievementEventType =
    | 'PRAYER_WARRIOR_ACHIEVED'
    | 'BIBLE_SCHOLAR_COMPLETED'
    | 'SOUL_WINNER_MILESTONE'
    | 'MIRACLE_WORKER_DOCUMENTED'
    | 'DISCIPLESHIP_LEADER'
    | 'CHURCH_PLANTER_ACTIVATED'
    | 'TESTIMONY_SHARED'
    | 'MINISTRY_SERVICE_COMPLETED';

// Spiritual ranks
export type SpiritualRank =
    | 'BELIEVER'
    | 'DISCIPLE'
    | 'MINISTER'
    | 'EVANGELIST'
    | 'PASTOR'
    | 'APOSTLE'
    | 'CARDINAL';

// Achievement event data interfaces
export interface PrayerWarriorEvent {
    sessions_led: number;
    participants_count: number;
    location?: string;
}

export interface BibleScholarEvent {
    course_id: string;
    course_name: string;
    completion_percentage: number;
}

export interface SoulWinnerEvent {
    conversions: number;
    conversion_stories: string[];
    outreach_method: string;
}

export interface MiracleWorkerEvent {
    healings: number;
    healing_types: string[];
    testimonies: string[];
}

export interface DiscipleshipLeaderEvent {
    disciples_mentored: number;
    mentorship_hours: number;
    discipleship_topics: string[];
}

export interface ChurchPlanterEvent {
    churches_planted: number;
    church_locations: string[];
    community_impact: string;
}

export interface TestimonySharedEvent {
    testimony_type: string;
    impact_level: 'PERSONAL' | 'COMMUNITY' | 'REGIONAL' | 'GLOBAL';
    witness_count: number;
}

export interface MinistryServiceEvent {
    hours_served: number;
    service_type: string;
    beneficiaries_served: number;
}

// Achievement event interface
export interface AchievementEvent {
    event_id: string;
    user_id: string;
    event_type: AchievementEventType;
    event_data: PrayerWarriorEvent | BibleScholarEvent | SoulWinnerEvent |
                MiracleWorkerEvent | DiscipleshipLeaderEvent | ChurchPlanterEvent |
                TestimonySharedEvent | MinistryServiceEvent;
    occurred_at: string;
    version: number;
}

// User spiritual achievements interface
export interface UserSpiritualAchievements {
    user_id: string;
    current_spiritual_rank: SpiritualRank;
    total_achievements: number;
    spiritual_score: number;
    prayer_sessions_led: number;
    bible_studies_completed: number;
    souls_won: number;
    miracles_documented: number;
    disciples_mentored: number;
    churches_planted: number;
    testimonies_shared: number;
    ministry_hours_served: number;
    last_achievement_at?: string;
    rank_achieved_at?: string;
}

// Submit achievement event parameters
interface SubmitAchievementEventParams {
    event_type: AchievementEventType;
    event_data: any;
}

// Submit achievement event response
interface SubmitAchievementEventResponse {
    event_id: string;
    achievement_unlocked: boolean;
    new_rank?: SpiritualRank;
    spiritual_points_earned: number;
}

// Submit a spiritual achievement event
export const submitAchievementEvent = api<SubmitAchievementEventParams, SubmitAchievementEventResponse>(
    { expose: true, method: "POST", path: "/church/achievements/events", auth: true },
    async ({ event_type, event_data }) => {
        // Get authenticated user
        const userId = "current_user_id"; // This will be replaced with actual auth

        try {
            // Insert achievement event
            const eventResult = await churchDB.queryRow<{ event_id: string }>`
                INSERT INTO achievement_events (user_id, event_type, event_data)
                VALUES (${userId}, ${event_type}, ${JSON.stringify(event_data)})
                RETURNING event_id
            `;

            if (!eventResult) {
                throw APIError.internal("Failed to record achievement event");
            }

            // Get updated user achievements
            const userAchievements = await churchDB.queryRow<UserSpiritualAchievements>`
                SELECT * FROM user_spiritual_achievements WHERE user_id = ${userId}
            `;

            if (!userAchievements) {
                throw APIError.internal("Failed to retrieve user achievements");
            }

            // Check if rank changed
            const rankChanged = userAchievements.rank_achieved_at &&
                new Date(userAchievements.rank_achieved_at).getTime() >
                Date.now() - 60000; // Within last minute

            return {
                event_id: eventResult.event_id,
                achievement_unlocked: true,
                new_rank: rankChanged ? userAchievements.current_spiritual_rank : undefined,
                spiritual_points_earned: calculateSpiritualPoints(event_type, event_data)
            };

        } catch (error) {
            console.error('Failed to submit achievement event:', error);
            throw APIError.internal("Failed to process achievement event");
        }
    }
);

// Calculate spiritual points for an achievement
function calculateSpiritualPoints(event_type: AchievementEventType, event_data: any): number {
    switch (event_type) {
        case 'PRAYER_WARRIOR_ACHIEVED':
            return event_data.sessions_led * 10;
        case 'BIBLE_SCHOLAR_COMPLETED':
            return 150;
        case 'SOUL_WINNER_MILESTONE':
            return event_data.conversions * 100;
        case 'MIRACLE_WORKER_DOCUMENTED':
            return event_data.healings * 150;
        case 'DISCIPLESHIP_LEADER':
            return event_data.disciples_mentored * 80;
        case 'CHURCH_PLANTER_ACTIVATED':
            return event_data.churches_planted * 200;
        case 'TESTIMONY_SHARED':
            return 50;
        case 'MINISTRY_SERVICE_COMPLETED':
            return event_data.hours_served * 5;
        default:
            return 0;
    }
}

// Get user spiritual achievements
interface GetUserAchievementsParams {
    user_id?: string; // Optional, defaults to current user
}

interface GetUserAchievementsResponse {
    achievements: UserSpiritualAchievements;
    recent_events: AchievementEvent[];
}

export const getUserAchievements = api<GetUserAchievementsParams, GetUserAchievementsResponse>(
    { expose: true, method: "GET", path: "/church/achievements/user", auth: true },
    async ({ user_id }) => {
        const targetUserId = user_id || "current_user_id"; // Replace with actual auth

        try {
            // Get user achievements
            const achievements = await churchDB.queryRow<UserSpiritualAchievements>`
                SELECT * FROM user_spiritual_achievements WHERE user_id = ${targetUserId}
            `;

            if (!achievements) {
                throw APIError.notFound("User achievements not found");
            }

            // Get recent achievement events
            const recentEvents = await churchDB.queryAll<AchievementEvent>`
                SELECT event_id, user_id, event_type, event_data, occurred_at, version
                FROM achievement_events
                WHERE user_id = ${targetUserId}
                ORDER BY occurred_at DESC
                LIMIT 10
            `;

            return {
                achievements,
                recent_events: recentEvents
            };

        } catch (error) {
            console.error('Failed to get user achievements:', error);
            throw APIError.internal("Failed to retrieve achievements");
        }
    }
);

// Get achievement leaderboard
interface GetAchievementLeaderboardParams {
    rank?: SpiritualRank;
    category?: string;
    limit?: number;
}

interface LeaderboardEntry {
    user_id: string;
    rank: SpiritualRank;
    spiritual_score: number;
    achievements_count: number;
    category_score: number;
}

interface GetAchievementLeaderboardResponse {
    leaderboard: LeaderboardEntry[];
    total_count: number;
}

export const getAchievementLeaderboard = api<GetAchievementLeaderboardParams, GetAchievementLeaderboardResponse>(
    { expose: true, method: "GET", path: "/church/achievements/leaderboard" },
    async ({ rank, category, limit = 50 }) => {
        try {
            let query = `
                SELECT user_id, current_spiritual_rank, spiritual_score, total_achievements
                FROM user_spiritual_achievements
                WHERE 1=1
            `;
            const params: any[] = [];
            let paramIndex = 1;

            if (rank) {
                query += ` AND current_spiritual_rank = $${paramIndex}`;
                params.push(rank);
                paramIndex++;
            }

            query += ` ORDER BY spiritual_score DESC LIMIT $${paramIndex}`;
            params.push(limit);

            const leaderboard = await churchDB.queryAll<LeaderboardEntry>`${query}`;

            // Get total count
            let countResult: { count: number } | null;
            if (rank) {
                countResult = await churchDB.queryRow<{ count: number }>`
                    SELECT COUNT(*) as count FROM user_spiritual_achievements
                    WHERE current_spiritual_rank = ${rank}
                `;
            } else {
                countResult = await churchDB.queryRow<{ count: number }>`
                    SELECT COUNT(*) as count FROM user_spiritual_achievements
                `;
            }

            return {
                leaderboard: leaderboard.map(entry => ({
                    ...entry,
                    category_score: entry.spiritual_score // This would be filtered by category in real implementation
                })),
                total_count: countResult ? countResult.count : 0
            };

        } catch (error) {
            console.error('Failed to get achievement leaderboard:', error);
            throw APIError.internal("Failed to retrieve leaderboard");
        }
    }
);