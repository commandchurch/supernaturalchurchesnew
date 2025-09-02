import { api } from "encore.dev/api";
import { userDB } from "./db";

interface TrackBonusParams {
  userId: string;
  bonusType: 'silver_upgrade' | 'bonus_500' | 'bonus_1000' | 'bonus_2000';
  currentCount: number;
  requiredCount: number;
}

interface TrackBonusResponse {
  success: boolean;
  bonusEarned: boolean;
  message: string;
  bonusAmount?: number;
}

// Track bonus eligibility and award bonuses when requirements are met
export const trackBonus = api<TrackBonusParams, TrackBonusResponse>(
  { auth: true, expose: true, method: "POST", path: "/user/track-bonus" },
  async ({ userId, bonusType, currentCount, requiredCount }) => {
    const bonusEarned = currentCount >= requiredCount;

    if (bonusEarned) {
      // Award the bonus
      let bonusAmount = 0;
      let message = '';

      switch (bonusType) {
        case 'silver_upgrade':
          message = 'Congratulations! You\'ve earned a 28-day Silver upgrade!';
          break;
        case 'bonus_500':
          bonusAmount = 500;
          message = 'Congratulations! You\'ve earned a $500 AUD bonus!';
          break;
        case 'bonus_1000':
          bonusAmount = 1000;
          message = 'Congratulations! You\'ve earned a $1,000 AUD bonus!';
          break;
        case 'bonus_2000':
          bonusAmount = 2000;
          message = 'Congratulations! You\'ve earned a $2,000 AUD bonus!';
          break;
      }

      // Record the bonus in the database
      await userDB.queryRow`
        INSERT INTO user_bonuses (user_id, bonus_type, amount, earned_at, status)
        VALUES (${userId}, ${bonusType}, ${bonusAmount}, NOW(), 'pending')
      `;

      return {
        success: true,
        bonusEarned: true,
        message,
        bonusAmount
      };
    }

    return {
      success: true,
      bonusEarned: false,
      message: `Progress: ${currentCount}/${requiredCount} ${bonusType.replace('_', ' ')}`
    };
  }
);