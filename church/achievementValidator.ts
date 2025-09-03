import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import {
    AchievementEventType,
    SpiritualRank,
    PrayerWarriorEvent,
    BibleScholarEvent,
    SoulWinnerEvent,
    MiracleWorkerEvent,
    DiscipleshipLeaderEvent,
    ChurchPlanterEvent,
    TestimonySharedEvent,
    MinistryServiceEvent
} from "./achievementEvents";

// Achievement validation result
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    spiritualPoints: number;
    suggestedRank?: SpiritualRank;
}

// Achievement requirement checker
export class AchievementValidator {

    // Validate prayer warrior achievement
    static async validatePrayerWarrior(event: PrayerWarriorEvent, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        let spiritualPoints = 0;

        // Check minimum requirements
        if (event.sessions_led < 1) {
            errors.push("Must have led at least 1 prayer session");
        }

        if (event.participants_count < 3) {
            errors.push("Prayer session must have at least 3 participants");
        }

        // Calculate points based on impact
        if (event.sessions_led >= 1) {
            spiritualPoints = event.sessions_led * 10;
        }

        // Check for existing achievements to prevent duplicates
        if (event.sessions_led > 1) {
            const existingSessions = await this.getExistingPrayerSessions(userId);
            if (existingSessions >= event.sessions_led) {
                warnings.push("Achievement may already be recorded for this level");
            }
        }

        // Validate location if provided
        if (event.location && event.location.length > 100) {
            errors.push("Location description too long (max 100 characters)");
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            spiritualPoints,
            suggestedRank: this.calculateSuggestedRank(spiritualPoints, 'PRAYER_WARRIOR_ACHIEVED')
        };
    }

    // Validate Bible scholar achievement
    static async validateBibleScholar(event: BibleScholarEvent, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        let spiritualPoints = 0;

        // Check course completion
        if (event.completion_percentage < 100) {
            errors.push("Course must be 100% complete for achievement");
        }

        if (!event.course_id) {
            errors.push("Valid course ID required");
        }

        // Check if course exists in academy
        const courseExists = await this.validateCourseExists(event.course_id);
        if (!courseExists) {
            errors.push("Invalid or non-existent course ID");
        }

        // Award points for completion
        if (event.completion_percentage === 100) {
            spiritualPoints = 150;
        }

        // Check for duplicate course completion
        const alreadyCompleted = await this.checkCourseAlreadyCompleted(userId, event.course_id);
        if (alreadyCompleted) {
            warnings.push("Course already completed - achievement may be duplicate");
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            spiritualPoints,
            suggestedRank: this.calculateSuggestedRank(spiritualPoints, 'BIBLE_SCHOLAR_COMPLETED')
        };
    }

    // Validate soul winner achievement
    static async validateSoulWinner(event: SoulWinnerEvent, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        let spiritualPoints = 0;

        // Check minimum conversions
        if (event.conversions < 1) {
            errors.push("Must have at least 1 conversion to claim achievement");
        }

        // Validate conversion stories
        if (event.conversions > 0 && (!event.conversion_stories || event.conversion_stories.length === 0)) {
            errors.push("Conversion stories required for verification");
        }

        if (event.conversion_stories && event.conversion_stories.length !== event.conversions) {
            errors.push("Number of stories must match number of conversions");
        }

        // Check outreach method
        const validMethods = ['personal_evangelism', 'church_outreach', 'community_service', 'digital_ministry', 'mission_trip'];
        if (!validMethods.includes(event.outreach_method)) {
            errors.push("Invalid outreach method specified");
        }

        // Calculate points
        if (event.conversions >= 1) {
            spiritualPoints = event.conversions * 100;
        }

        // High conversion warning
        if (event.conversions > 10) {
            warnings.push("High conversion count will require additional verification");
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            spiritualPoints,
            suggestedRank: this.calculateSuggestedRank(spiritualPoints, 'SOUL_WINNER_MILESTONE')
        };
    }

    // Validate miracle worker achievement
    static async validateMiracleWorker(event: MiracleWorkerEvent, userId: string): Promise<ValidationResult> {
        const errors: string[] = [];
        const warnings: string[] = [];
        let spiritualPoints = 0;

        // Check minimum healings
        if (event.healings < 1) {
            errors.push("Must have documented at least 1 healing");
        }

        // Validate healing types
        const validTypes = ['physical', 'emotional', 'spiritual', 'relational', 'financial', 'mental'];
        if (event.healing_types) {
            for (const type of event.healing_types) {
                if (!validTypes.includes(type)) {
                    errors.push(`Invalid healing type: ${type}`);
                }
            }
        }

        // Require testimonies for verification
        if (event.healings > 0 && (!event.testimonies || event.testimonies.length === 0)) {
            errors.push("Healing testimonies required for verification");
        }

        // Calculate points
        if (event.healings >= 1) {
            spiritualPoints = event.healings * 150;
        }

        // Require witness verification for major healings
        if (event.healings >= 3) {
            warnings.push("Major healing claims require witness verification");
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            spiritualPoints,
            suggestedRank: this.calculateSuggestedRank(spiritualPoints, 'MIRACLE_WORKER_DOCUMENTED')
        };
    }

    // Calculate suggested rank based on spiritual points
    private static calculateSuggestedRank(points: number, eventType: AchievementEventType): SpiritualRank {
        const totalScore = points; // This would be combined with existing score

        if (totalScore >= 10000) return 'CARDINAL';
        if (totalScore >= 5000) return 'APOSTLE';
        if (totalScore >= 2500) return 'PASTOR';
        if (totalScore >= 1000) return 'EVANGELIST';
        if (totalScore >= 500) return 'MINISTER';
        if (totalScore >= 100) return 'DISCIPLE';
        return 'BELIEVER';
    }

    // Helper methods for validation
    private static async getExistingPrayerSessions(userId: string): Promise<number> {
        const result = await churchDB.queryRow<{ sessions_led: number }>`
            SELECT COALESCE(SUM((event_data->>'sessions_led')::INTEGER), 0) as sessions_led
            FROM achievement_events
            WHERE user_id = ${userId} AND event_type = 'PRAYER_WARRIOR_ACHIEVED'
        `;
        return result ? result.sessions_led : 0;
    }

    private static async validateCourseExists(courseId: string): Promise<boolean> {
        // This would call the academy service to validate course exists
        // For now, return true as placeholder
        return true;
    }

    private static async checkCourseAlreadyCompleted(userId: string, courseId: string): Promise<boolean> {
        const result = await churchDB.queryRow<{ count: number }>`
            SELECT COUNT(*) as count
            FROM achievement_events
            WHERE user_id = ${userId}
            AND event_type = 'BIBLE_SCHOLAR_COMPLETED'
            AND event_data->>'course_id' = ${courseId}
        `;
        return (result?.count || 0) > 0;
    }
}

// API endpoint for validating achievements
interface ValidateAchievementParams {
    event_type: AchievementEventType;
    event_data: any;
}

interface ValidateAchievementResponse {
    validation: ValidationResult;
}

export const validateAchievement = api<ValidateAchievementParams, ValidateAchievementResponse>(
    { expose: true, method: "POST", path: "/church/achievements/validate", auth: true },
    async ({ event_type, event_data }) => {
        try {
            let validationResult: ValidationResult;

            // Get authenticated user
            const userId = "current_user_id"; // Replace with actual auth

            switch (event_type) {
                case 'PRAYER_WARRIOR_ACHIEVED':
                    validationResult = await AchievementValidator.validatePrayerWarrior(
                        event_data as PrayerWarriorEvent, userId
                    );
                    break;
                case 'BIBLE_SCHOLAR_COMPLETED':
                    validationResult = await AchievementValidator.validateBibleScholar(
                        event_data as BibleScholarEvent, userId
                    );
                    break;
                case 'SOUL_WINNER_MILESTONE':
                    validationResult = await AchievementValidator.validateSoulWinner(
                        event_data as SoulWinnerEvent, userId
                    );
                    break;
                case 'MIRACLE_WORKER_DOCUMENTED':
                    validationResult = await AchievementValidator.validateMiracleWorker(
                        event_data as MiracleWorkerEvent, userId
                    );
                    break;
                default:
                    validationResult = {
                        isValid: false,
                        errors: [`Unsupported achievement type: ${event_type}`],
                        warnings: [],
                        spiritualPoints: 0
                    };
            }

            return { validation: validationResult };

        } catch (error) {
            console.error('Achievement validation failed:', error);
            throw APIError.internal("Failed to validate achievement");
        }
    }
);