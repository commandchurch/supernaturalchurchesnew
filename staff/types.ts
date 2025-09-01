export interface StaffProfile {
  id: number;
  userId?: string | null;
  fullName: string;
  email?: string | null;
  mobile?: string | null;
  paid: boolean;
  avatarUrl?: string | null;
  driversLicenseFrontUrl?: string | null;
  wantsChildrenWork: boolean;
  wantsMinistryTeam: boolean;
  blueCardNumber?: string | null;
  blueCardExpiry?: string | null; // ISO date
  policyAcknowledged: boolean;
  backgroundCheckCompleted: boolean;
  policeCheckCompleted: boolean;
  trainingCompletedManual: boolean;
  formsLastSentAt?: string | null;
  createdAt: string;
  updatedAt: string;

  // Derived compliance
  compliance?: {
    requiresBlueCard: boolean;
    hasBlueCard: boolean;
    requiresMinistryTraining: boolean;
    ministryTrainingCompleted: boolean;
    documentsComplete: boolean;
    eligible: boolean;
  };
}
