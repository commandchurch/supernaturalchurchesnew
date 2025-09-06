import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";

interface ChurchStaffMember {
  id: string;
  fullName: string;
  email: string;
  mobile?: string;
  status: 'pending' | 'signed_up_free' | 'signed_up_paid' | 'inactive';
  invitedAt: string;
  signedUpAt?: string;
  coursesAccess: string[]; // Array of course IDs
  churchId: string;
}

interface AddChurchStaffParams {
  churchId: string;
  fullName: string;
  email: string;
  mobile?: string;
}

interface AddChurchStaffResponse {
  success: boolean;
  staffMember: ChurchStaffMember;
}

interface GetChurchStaffParams {
  churchId: string;
}

interface GetChurchStaffResponse {
  staffMembers: ChurchStaffMember[];
}

interface UpdateStaffCourseAccessParams {
  staffId: string;
  courseIds: string[];
}

interface UpdateStaffCourseAccessResponse {
  success: boolean;
  staffMember: ChurchStaffMember;
}

interface SendStaffInvitationsParams {
  churchId: string;
  staffIds: string[];
}

interface SendStaffInvitationsResponse {
  success: boolean;
  sentCount: number;
}

// Add church staff member
export const addChurchStaff = api<AddChurchStaffParams, AddChurchStaffResponse>(
  { expose: true, method: "POST", path: "/church/staff/add" },
  async ({ churchId, fullName, email, mobile }) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw APIError.invalidArgument("Invalid email format");
    }

    // Check if email is already in use for this church
    const existingStaff = await churchDB.queryRow<{ id: string }>`
      SELECT id FROM church_staff WHERE church_id = ${churchId} AND email = ${email}
    `;

    if (existingStaff) {
      throw APIError.alreadyExists("Staff member with this email already exists");
    }

    const staffId = `${churchId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const staffMember: ChurchStaffMember = {
      id: staffId,
      fullName,
      email,
      mobile,
      status: 'pending',
      invitedAt: new Date().toISOString(),
      coursesAccess: [],
      churchId
    };

    // Insert into database
    await churchDB.exec`
      INSERT INTO church_staff (
        id, church_id, full_name, email, mobile, status, invited_at, courses_access
      ) VALUES (
        ${staffId}, ${churchId}, ${fullName}, ${email}, ${mobile || null},
        ${staffMember.status}, ${staffMember.invitedAt}, ${JSON.stringify(staffMember.coursesAccess)}
      )
    `;

    return {
      success: true,
      staffMember
    };
  }
);

// Get church staff members
export const getChurchStaff = api<GetChurchStaffParams, GetChurchStaffResponse>(
  { expose: true, method: "GET", path: "/church/staff/:churchId" },
  async ({ churchId }) => {
    const staffRows = await churchDB.query`
      SELECT id, church_id, full_name, email, mobile, status, invited_at, signed_up_at, courses_access
      FROM church_staff
      WHERE church_id = ${churchId}
      ORDER BY invited_at DESC
    `;

    const staffMembers: ChurchStaffMember[] = staffRows.map(row => ({
      id: row.id,
      churchId: row.church_id,
      fullName: row.full_name,
      email: row.email,
      mobile: row.mobile,
      status: row.status,
      invitedAt: row.invited_at,
      signedUpAt: row.signed_up_at,
      coursesAccess: JSON.parse(row.courses_access || '[]')
    }));

    return { staffMembers };
  }
);

// Update staff course access
export const updateStaffCourseAccess = api<UpdateStaffCourseAccessParams, UpdateStaffCourseAccessResponse>(
  { expose: true, method: "PUT", path: "/church/staff/course-access" },
  async ({ staffId, courseIds }) => {
    // Update the database
    await churchDB.exec`
      UPDATE church_staff
      SET courses_access = ${JSON.stringify(courseIds)}
      WHERE id = ${staffId}
    `;

    // Get updated staff member
    const updatedRow = await churchDB.queryRow`
      SELECT id, church_id, full_name, email, mobile, status, invited_at, signed_up_at, courses_access
      FROM church_staff
      WHERE id = ${staffId}
    `;

    if (!updatedRow) {
      throw APIError.notFound("Staff member not found");
    }

    const staffMember: ChurchStaffMember = {
      id: updatedRow.id,
      churchId: updatedRow.church_id,
      fullName: updatedRow.full_name,
      email: updatedRow.email,
      mobile: updatedRow.mobile,
      status: updatedRow.status,
      invitedAt: updatedRow.invited_at,
      signedUpAt: updatedRow.signed_up_at,
      coursesAccess: JSON.parse(updatedRow.courses_access || '[]')
    };

    return {
      success: true,
      staffMember
    };
  }
);

// Send staff invitations
export const sendStaffInvitations = api<SendStaffInvitationsParams, SendStaffInvitationsResponse>(
  { expose: true, method: "POST", path: "/church/staff/send-invitations" },
  async ({ churchId, staffIds }) => {
    let sentCount = 0;

    for (const staffId of staffIds) {
      // Get staff member details
      const staffRow = await churchDB.queryRow`
        SELECT email, full_name FROM church_staff
        WHERE id = ${staffId} AND church_id = ${churchId}
      `;

      if (staffRow) {
        // In a real implementation, this would send an actual email
        // For now, we'll just mark as sent
        console.log(`Sending invitation to ${staffRow.email} (${staffRow.full_name})`);
        sentCount++;
      }
    }

    return {
      success: true,
      sentCount
    };
  }
);

// Remove staff member
export const removeChurchStaff = api<{ staffId: string }, { success: boolean }>(
  { expose: true, method: "DELETE", path: "/church/staff/remove/:staffId" },
  async ({ staffId }) => {
    await churchDB.exec`
      DELETE FROM church_staff WHERE id = ${staffId}
    `;

    return { success: true };
  }
);

// Check if user is from approved church
export const checkChurchApproval = api<{ userId: string }, { approved: boolean; churchId?: string; churchName?: string }>(
  { expose: true, method: "GET", path: "/church/approval/:userId" },
  async ({ userId }) => {
    // Check if user has church access (this would be stored in user profiles or a separate church_members table)
    const churchMember = await churchDB.queryRow<{ church_id: string; church_name: string }>`
      SELECT cm.church_id, c.name as church_name
      FROM church_members cm
      JOIN churches c ON cm.church_id = c.id
      WHERE cm.user_id = ${userId} AND c.approval_status = 'approved'
    `;

    if (churchMember) {
      return {
        approved: true,
        churchId: churchMember.church_id,
        churchName: churchMember.church_name
      };
    }

    return { approved: false };
  }
);

