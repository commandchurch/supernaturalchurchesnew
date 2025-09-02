import { userDB } from "./db";

// Process multi-level bonuses for downline signups
export async function processMultiLevelBonuses(
  referrerId: string,
  membershipTier: string,
  pointsEarned: number,
  currentLevel: number,
  maxLevels: number
) {
  if (currentLevel > maxLevels) return;

  // Find the referrer's referrer (upline)
  const uplineResult = await userDB.queryRow<{ referrer_id: string }>`
    SELECT referrer_id FROM user_signups
    WHERE new_user_id = ${referrerId}
    ORDER BY signup_date DESC LIMIT 1
  `;

  if (!uplineResult?.referrer_id) return;

  const uplineId = uplineResult.referrer_id;

  // Flat commission amounts based on membership tier
  const tierCommissions = {
    'BRONZE': 8,
    'SILVER': 14,
    'GOLD': 60,
    'DIAMOND': 200
  };

  // Simple commission rates for each level (1-7): 20%, 10%, 5%, 3%, 2%, 1%, 1%
  // Diamond gets special rate: 35% on level 1
  const standardRates = [0.20, 0.10, 0.05, 0.03, 0.02, 0.01, 0.01];
  const diamondLevel1Rate = 0.35;

  let commissionRate = standardRates[currentLevel - 1] || 0.01;

  // Diamond members get 35% on level 1 instead of 20%
  if (currentLevel === 1 && membershipTier === 'DIAMOND') {
    commissionRate = diamondLevel1Rate;
  }

  // Calculate commission based on tier value and level rate
  const baseCommission = tierCommissions[membershipTier as keyof typeof tierCommissions] || 8;
  const multiLevelCommission = Math.floor(baseCommission * commissionRate);

  // Points remain the same (based on membership tier)
  const multiLevelPoints = pointsEarned;

  if (multiLevelPoints > 0) {
    // Add to downline tracking table
    await userDB.queryRow`
      INSERT INTO user_downline (
        user_id, downline_user_id, membership_tier, level,
        points_earned, commission_rate
      )
      VALUES (
        ${uplineId}, ${referrerId}, ${membershipTier}, ${currentLevel},
        ${multiLevelPoints}, ${commissionRate}
      )
      ON CONFLICT (user_id, downline_user_id, level) DO UPDATE SET
        points_earned = user_downline.points_earned + ${multiLevelPoints}
    `;

    // Update downline levels table
    await userDB.queryRow`
      INSERT INTO user_downline_levels (
        user_id, membership_tier, level, points_at_level, members_at_level
      )
      VALUES (
        ${uplineId}, ${membershipTier}, ${currentLevel}, ${multiLevelPoints}, 1
      )
      ON CONFLICT (user_id, membership_tier, level) DO UPDATE SET
        points_at_level = user_downline_levels.points_at_level + ${multiLevelPoints},
        members_at_level = user_downline_levels.members_at_level + 1
    `;

    // Update downline summary
    await userDB.queryRow`
      INSERT INTO user_downline_summary (
        user_id, membership_tier, total_points, total_members, next_payout_date
      )
      VALUES (
        ${uplineId}, ${membershipTier}, ${multiLevelPoints}, 1, calculate_next_payout_date()
      )
      ON CONFLICT (user_id, membership_tier) DO UPDATE SET
        total_points = user_downline_summary.total_points + ${multiLevelPoints},
        total_members = user_downline_summary.total_members + 1
    `;

    // Add to user_points table for bonus calculations
    await userDB.queryRow`
      INSERT INTO user_points (
        user_id, total_points, earned_points, source_type,
        source_id, level, membership_tier, downline_level
      )
      VALUES (
        ${uplineId}, ${multiLevelPoints}, ${multiLevelPoints}, 'multi_level',
        ${referrerId}, ${currentLevel}, ${membershipTier}, ${currentLevel}
      )
      ON CONFLICT (user_id) DO UPDATE SET
        total_points = user_points.total_points + ${multiLevelPoints},
        earned_points = user_points.earned_points + ${multiLevelPoints}
    `;

    // Check for bonus triggers for upline
    const uplinePointsResult = await userDB.queryRow<{ total_points: number }>`
      SELECT total_points FROM user_points WHERE user_id = ${uplineId}
    `;

    const totalPoints = uplinePointsResult?.total_points || 0;

    // Trigger bonuses for upline if thresholds met
    if (totalPoints >= 25 && totalPoints % 25 === 0) {
      const bonusAmount = Math.floor(totalPoints / 25) * 200;
      await userDB.queryRow`
        INSERT INTO user_bonuses (user_id, bonus_type, amount, earned_at, status, source_level)
        VALUES (${uplineId}, 'points_bonus_25_ml_${currentLevel}', ${bonusAmount}, NOW(), 'pending', ${currentLevel})
      `;
    } else if (totalPoints >= 50 && totalPoints % 50 === 0) {
      const bonusAmount = Math.floor(totalPoints / 50) * 500;
      await userDB.queryRow`
        INSERT INTO user_bonuses (user_id, bonus_type, amount, earned_at, status, source_level)
        VALUES (${uplineId}, 'points_bonus_50_ml_${currentLevel}', ${bonusAmount}, NOW(), 'pending', ${currentLevel})
      `;
    } else if (totalPoints >= 100 && totalPoints % 100 === 0) {
      const bonusAmount = Math.floor(totalPoints / 100) * 2500;
      await userDB.queryRow`
        INSERT INTO user_bonuses (user_id, bonus_type, amount, earned_at, status, source_level)
        VALUES (${uplineId}, 'points_bonus_100_ml_${currentLevel}', ${bonusAmount}, NOW(), 'pending', ${currentLevel})
      `;
    } else if (totalPoints >= 200 && totalPoints % 200 === 0) {
      const bonusAmount = Math.floor(totalPoints / 200) * 5000;
      await userDB.queryRow`
        INSERT INTO user_bonuses (user_id, bonus_type, amount, earned_at, status, source_level)
        VALUES (${uplineId}, 'points_bonus_200_ml_${currentLevel}', ${bonusAmount}, NOW(), 'pending', ${currentLevel})
      `;
    }

    // Recursively process next level (up to 7 levels)
    await processMultiLevelBonuses(uplineId, membershipTier, pointsEarned, currentLevel + 1, Math.min(maxLevels, 7));
  }
}