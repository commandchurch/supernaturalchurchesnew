import React, { useMemo, useState, useEffect } from 'react';
import client from '../../client';
import { Users, Plus, UploadCloud, Send, Shield, ClipboardCheck, BadgeCheck, Baby, HandHeart } from 'lucide-react';

type Staff = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  fiveFoldMinistry: string;
  bio?: string;
  profilePicture?: string;
};

const empty = {
  fullName: '',
  email: '',
  mobile: '',
  paid: false,
  wantsChildrenWork: false,
  wantsMinistryTeam: false,
  userId: '',
};

export default function StaffManager() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const result = await client.staff.listStaff();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);



  const handleCreateStaff = async () => {
    try {
      await client.staff.createStaff({
        fullName: form.fullName,
        email: form.email || undefined,
        mobile: form.mobile || undefined,
        paid: form.paid,
        wantsChildrenWork: form.wantsChildrenWork,
        wantsMinistryTeam: form.wantsMinistryTeam,
        userId: form.userId || undefined,
      });
      setOpen(false);
      setForm(empty);
      // Refresh data
      const result = await client.staff.listStaff();
      setData(result);
    } catch (error) {
      console.error('Failed to create staff:', error);
    }
  };

  const handleSendForms = (id: string) => {
    // Simulate sending forms - just show alert for now
    alert('Forms sent (simulated). Staff will receive a notification/email to complete required documents.');
  };

  const uploadDL = async (staffId: string, file: File) => {
    // Simulate file upload - in real implementation would use Encore file storage
    alert('Driver\'s license upload simulated. Feature requires file storage implementation.');
  };

  const staff = data?.staff || [];
  const totals = useMemo(() => ({
    total: staff.length,
    paid: staff.filter(s => s.paid).length,
    volunteers: staff.filter(s => !s.paid).length,
    compliant: staff.filter(s => s.compliance?.eligible).length,
  }), [staff]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white heading-font">Staff & Volunteers</h2>
            <p className="text-gray-400 text-xs md:text-sm">Manage STAFF profiles, compliance, and training.</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="self-start md:self-auto bg-white text-black hover:bg-gray-200 px-3 py-2 md:px-4 md:py-2 font-semibold uppercase tracking-wide inline-flex items-center text-xs md:text-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
        <KPI label="Total" value={totals.total} />
        <KPI label="Paid" value={totals.paid} />
        <KPI label="Volunteers" value={totals.volunteers} />
        <KPI label="Compliant" value={totals.compliant} />
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <Th>Full Name</Th>
              <Th>Contact</Th>
              <Th>Paid</Th>
              <Th className="hidden sm:table-cell">Children</Th>
              <Th className="hidden sm:table-cell">Ministry Team</Th>
              <Th>Compliance</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={7} className="text-gray-400 p-3">Loading...</td></tr>
            )}
            {!isLoading && staff.map(s => (
              <tr key={s.id} className="border-b border-gray-800">
                <td className="px-2 py-3">
                  <div className="text-white font-semibold">{s.fullName}</div>
                  <div className="text-gray-400 text-[11px] md:text-xs">UserID: {s.userId || '—'}</div>
                </td>
                <td className="px-2 py-3">
                  <div className="text-gray-300">{s.email || '—'}</div>
                  <div className="text-gray-500 text-[11px] md:text-xs">{s.mobile || '—'}</div>
                </td>
                <td className="px-2 py-3">
                  <Toggle checked={s.paid} onChange={async (v) => {
                    try {
                      await client.staff.updateStaff({ id: s.id, paid: v });
                      const result = await client.staff.listStaff();
                      setData(result);
                    } catch (error) {
                      console.error('Failed to update staff:', error);
                    }
                  }} />
                </td>
                <td className="px-2 py-3 hidden sm:table-cell">
                  <Toggle checked={s.wantsChildrenWork} onChange={async (v) => {
                    try {
                      await client.staff.updateStaff({ id: s.id, wantsChildrenWork: v });
                      const result = await client.staff.listStaff();
                      setData(result);
                    } catch (error) {
                      console.error('Failed to update staff:', error);
                    }
                  }} />
                </td>
                <td className="px-2 py-3 hidden sm:table-cell">
                  <Toggle checked={s.wantsMinistryTeam} onChange={async (v) => {
                    try {
                      await client.staff.updateStaff({ id: s.id, wantsMinistryTeam: v });
                      const result = await client.staff.listStaff();
                      setData(result);
                    } catch (error) {
                      console.error('Failed to update staff:', error);
                    }
                  }} />
                </td>
                <td className="px-2 py-3">
                  <ComplianceBadges s={s} onUpdate={async (p) => {
                    try {
                      await client.staff.updateStaff({ id: s.id, ...p });
                      const result = await client.staff.listStaff();
                      setData(result);
                    } catch (error) {
                      console.error('Failed to update staff:', error);
                    }
                  }} onUploadDL={uploadDL} />
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-col gap-2 w-[160px]">
                    <button
                      onClick={() => handleSendForms(s.id)}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 inline-flex items-center justify-center gap-1 text-[11px] md:text-xs"
                    >
                      <Send className="h-3 w-3" /> Send Forms
                    </button>
                    <button
                      onClick={() => {
                        const uid = prompt("Set/Update UserID (for training tracking):", s.userId || "");
                        if (uid !== null) {
                          (async () => {
                            try {
                              await client.staff.updateStaff({ id: s.id, userId: uid || null });
                              const result = await client.staff.listStaff();
                              setData(result);
                            } catch (error) {
                              console.error('Failed to update staff:', error);
                            }
                          })();
                        }
                      }}
                      className="text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 text-[11px] md:text-xs"
                    >
                      Link User ID
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && staff.length === 0 && (
              <tr><td colSpan={7} className="text-gray-400 p-3">No staff yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-gray-800 border border-gray-700 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4 heading-font">Add Staff/Volunteer</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateStaff();
                }}
                className="space-y-3 md:space-y-4"
              >
                <Grid cols={2}>
                  <Input label="Full Name *" value={form.fullName} onChange={v => setForm({ ...form, fullName: v })} required />
                  <Input label="User ID (optional)" value={form.userId} onChange={v => setForm({ ...form, userId: v })} />
                </Grid>
                <Grid cols={2}>
                  <Input label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
                  <Input label="Mobile" value={form.mobile} onChange={v => setForm({ ...form, mobile: v })} />
                </Grid>
                <div className="flex items-center gap-4">
                  <Check label="Paid Staff" checked={form.paid} onChange={v => setForm({ ...form, paid: v })} />
                  <Check label="Wants to work with children" checked={form.wantsChildrenWork} onChange={v => setForm({ ...form, wantsChildrenWork: v })} />
                  <Check label="Wants to join Ministry Team" checked={form.wantsMinistryTeam} onChange={v => setForm({ ...form, wantsMinistryTeam: v })} />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm">
                    Save
                  </button>
                  <button type="button" className="border border-gray-600 text-white hover:bg-gray-700 px-4 py-2 font-semibold uppercase tracking-wide text-sm" onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-6 bg-blue-500/10 text-blue-300 border border-blue-500/20 p-3 text-xs">
                <p className="mb-1 font-semibold inline-flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Training Requirements
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>If working with children: valid Blue Card required.</li>
                  <li>If on Ministry Team (laying hands on the sick): must complete the training course "Ministering at a Church Meeting".</li>
                  <li>All staff/volunteers: policy acknowledgement, background/police checks, and a copy of driver's license (front) on file.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KPI({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 p-3 md:p-4 text-center">
      <div className="text-[11px] md:text-xs text-gray-400">{label}</div>
      <div className="text-lg md:text-2xl font-bold text-white heading-font">{value}</div>
    </div>
  );
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left text-gray-400 font-semibold py-2 px-2 ${className || ''}`}>{children}</th>;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`px-2 py-1 text-[11px] md:text-xs font-semibold ${checked ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}
    >
      {checked ? 'Yes' : 'No'}
  </button>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="text-white text-xs md:text-sm inline-flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function Input({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-white font-semibold mb-1 text-xs md:text-sm">{label}{required ? ' *' : ''}</label>
      <input value={value} onChange={e => onChange(e.target.value)} required={required} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-xs md:text-sm" />
    </div>
  );
}

function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return <div className={`grid grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''} gap-2 md:gap-4`}>{children}</div>;
}

function ComplianceBadges({ s, onUpdate, onUploadDL }: {
  s: Staff;
  onUpdate: (p: any) => void;
  onUploadDL: (id: string, file: File) => void;
}) {
  const c = s.compliance;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Badge
          icon={<Baby className="h-3 w-3" />}
          label="Blue Card"
          needed={!!c?.requiresBlueCard}
          ok={!!c?.hasBlueCard}
          onClickConfig={() => {
            const num = prompt("Blue Card Number:", s.blueCardNumber || "");
            const exp = prompt("Blue Card Expiry (YYYY-MM-DD):", s.blueCardExpiry || "");
            onUpdate({ blueCardNumber: num || null, blueCardExpiry: exp || null });
          }}
        />
        <Badge
          icon={<HandHeart className="h-3 w-3" />}
          label="Ministry Training"
          needed={!!c?.requiresMinistryTraining}
          ok={!!c?.ministryTrainingCompleted}
          onClickConfig={() => {
            if (confirm("Mark training as completed manually? This is an override.")) {
              onUpdate({ trainingCompletedManual: true });
            }
          }}
        />
        <Badge
          icon={<ClipboardCheck className="h-3 w-3" />}
          label="Docs"
          needed={true}
          ok={!!c?.documentsComplete}
          onClickConfig={() => {
            const policy = confirm("Toggle Policy Acknowledged?");
            const background = confirm("Toggle Background Check Completed?");
            const police = confirm("Toggle Police Check Completed?");
            onUpdate({
              policyAcknowledged: policy ? !s.policyAcknowledged : s.policyAcknowledged,
              backgroundCheckCompleted: background ? !s.backgroundCheckCompleted : s.backgroundCheckCompleted,
              policeCheckCompleted: police ? !s.policeCheckCompleted : s.policeCheckCompleted,
            });
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-[11px] md:text-xs text-gray-400">Driver’s License (front):</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => e.target.files?.[0] && onUploadDL(s.id, e.target.files[0])}
          className="text-[11px] md:text-xs text-gray-300"
        />
        {s.driversLicenseFrontUrl && <span className="text-[11px] md:text-xs text-green-400">Uploaded</span>}
      </div>
      <div className="text-[11px] md:text-xs">
        {c?.eligible ? (
          <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 font-semibold">
            <BadgeCheck className="h-3 w-3" /> Eligible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-0.5 font-semibold">
            <Shield className="h-3 w-3" /> Incomplete
          </span>
        )}
      </div>
    </div>
  );
}

function Badge({ icon, label, needed, ok, onClickConfig }: { icon: React.ReactNode; label: string; needed: boolean; ok: boolean; onClickConfig: () => void }) {
  return (
    <button
      onClick={onClickConfig}
      className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] md:text-xs border ${
        needed ? (ok ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30') : 'bg-gray-700 text-gray-300 border-gray-600'
      }`}
      title="Click to configure/update"
    >
      {icon}
      <span>{label}{needed ? '' : ' (N/A)'}</span>
    </button>
  );
}
