import { useState } from 'react';
import {
  Github, Code2, FolderGit2, Award, UserCheck, Shield, Link2, Unlink,
  CheckCircle2, AlertCircle, Clock, Upload, X, FileText, RefreshCw,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader, Badge } from '@/components/ui';
import { dataSources } from '@/data/mockData';
import type { DataSource } from '@/types';

const sourceIcons: Record<DataSource['type'], typeof Github> = {
  github: Github,
  leetcode: Code2,
  project: FolderGit2,
  certificate: Award,
  mentor: UserCheck,
};

const sourceColors: Record<DataSource['type'], string> = {
  github: 'from-ink-700 to-ink-900',
  leetcode: 'from-amber-500 to-amber-700',
  project: 'from-plum-500 to-plum-700',
  certificate: 'from-emerald-500 to-emerald-700',
  mentor: 'from-magenta-500 to-magenta-700',
};

export function DataIngestionPage() {
  const [sources, setSources] = useState<DataSource[]>(dataSources);
  const [showConsent, setShowConsent] = useState<DataSource | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const toggleConnect = (source: DataSource) => {
    if (source.connected) {
      setSources(sources.map((s) => s.id === source.id ? { ...s, connected: false, lastSynced: undefined } : s));
    } else {
      setShowConsent(source);
    }
  };

  const confirmConnect = () => {
    if (showConsent && consentGiven) {
      setSources(sources.map((s) => s.id === showConsent.id ? { ...s, connected: true, lastSynced: new Date().toISOString() } : s));
      setShowConsent(null);
      setConsentGiven(false);
    }
  };

  const connectedCount = sources.filter((s) => s.connected).length;

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Stage 1: Data Ingestion</h1>
        <p className="text-sm text-ink-500">Connect your profiles and upload evidence. All access requires your explicit consent.</p>
      </div>

      {/* Consent banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-plum-200 bg-gradient-to-r from-plum-50/50 to-magenta-50/30 p-4">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-plum-600" />
        <div>
          <p className="text-sm font-semibold text-ink-900">Your data, your control</p>
          <p className="mt-1 text-xs text-ink-600">All integrations are read-only. We never modify your external accounts. You can revoke access at any time. Data is used solely for skill verification and placement readiness assessment.</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <Badge variant="plum">{connectedCount} of {sources.length} Connected</Badge>
        <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Consent Required for Each Source</Badge>
      </div>

      {/* Data source cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {sources.map((source) => {
          const Icon = sourceIcons[source.type];
          return (
            <div key={source.id} className="card card-hover">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${sourceColors[source.type]} text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900">{source.label}</h3>
                    {source.connected ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" /> Connected
                        {source.lastSynced && <span className="text-ink-400"> · Synced {new Date(source.lastSynced).toLocaleDateString()}</span>}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-ink-400">
                        <AlertCircle className="h-3 w-3" /> Not connected
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleConnect(source)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    source.connected
                      ? 'border border-rose-200 text-rose-600 hover:bg-rose-50'
                      : 'bg-gradient-to-r from-plum-600 to-magenta-500 text-white hover:shadow-lg'
                  }`}
                >
                  {source.connected ? (<><Unlink className="h-3.5 w-3.5" /> Revoke</>) : (<><Link2 className="h-3.5 w-3.5" /> Connect</>)}
                </button>
              </div>

              {source.detail && (
                <p className="mt-4 text-sm text-ink-600">{source.detail}</p>
              )}

              {source.url && source.connected && (
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1 text-xs text-plum-600 hover:text-plum-700">
                  <Link2 className="h-3 w-3" /> {source.url}
                </a>
              )}

              {source.connected && (
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs text-ink-500 hover:text-plum-600">
                    <RefreshCw className="h-3 w-3" /> Sync now
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload section */}
      <div className="mt-6 card">
        <SectionHeader title="Upload Certificates & Documents" subtitle="Upload proof of certifications, completed courses, or project documentation" icon={Upload} />
        <button onClick={() => setShowUpload(true)} className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-plum-200 bg-plum-50/30 py-12 transition-colors hover:border-plum-400 hover:bg-plum-50">
          <Upload className="h-10 w-10 text-plum-400" />
          <p className="mt-3 text-sm font-medium text-ink-700">Click to upload certificates</p>
          <p className="text-xs text-ink-400">PDF, PNG, JPG up to 10MB</p>
        </button>

        {/* Already uploaded */}
        <div className="mt-4 space-y-2">
          {[
            { name: 'PostgreSQL Essentials Certificate.pdf', date: '2026-09-15', status: 'verified' },
            { name: 'React Advanced Course Completion.pdf', date: '2026-08-20', status: 'verified' },
            { name: 'AWS Cloud Practitioner.pdf', date: '2026-11-01', status: 'pending' },
          ].map((doc) => (
            <div key={doc.name} className="flex items-center justify-between rounded-xl border border-ink-200 p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-plum-400" />
                <div>
                  <p className="text-sm font-medium text-ink-700">{doc.name}</p>
                  <p className="text-xs text-ink-400">Uploaded {doc.date}</p>
                </div>
              </div>
              <Badge variant={doc.status === 'verified' ? 'success' : 'warning'}>
                {doc.status === 'verified' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {doc.status === 'verified' ? 'Verified' : 'Pending Mentor'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Consent modal */}
      {showConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900">Connect {showConsent.label}</h3>
              <button onClick={() => { setShowConsent(null); setConsentGiven(false); }}><X className="h-5 w-5 text-ink-400" /></button>
            </div>
            <div className="rounded-xl border border-plum-100 bg-plum-50/50 p-4">
              <p className="text-sm text-ink-700">SkillForge is requesting <strong>read-only access</strong> to your {showConsent.label}.</p>
              <ul className="mt-3 space-y-1.5 text-xs text-ink-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" /> We will read your public profile and activity</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" /> We will NOT modify any of your data</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" /> You can revoke access at any time</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" /> Data is used only for skill verification</li>
              </ul>
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} className="h-4 w-4 rounded border-ink-300 text-plum-600 focus:ring-plum-400" />
              I consent to read-only access to my {showConsent.label}
            </label>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { setShowConsent(null); setConsentGiven(false); }} className="btn-secondary flex-1">Cancel</button>
              <button onClick={confirmConnect} disabled={!consentGiven} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900">Upload Certificate</h3>
              <button onClick={() => setShowUpload(false)}><X className="h-5 w-5 text-ink-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Certificate Name</label>
                <input className="input" placeholder="e.g., AWS Cloud Practitioner" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Issuing Organization</label>
                <input className="input" placeholder="e.g., Amazon Web Services" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-700">Issue Date</label>
                <input type="date" className="input" />
              </div>
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-plum-200 bg-plum-50/30 py-6">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-plum-400" />
                  <p className="mt-2 text-xs text-ink-500">Drop file or click to browse</p>
                </div>
              </div>
              <button onClick={() => setShowUpload(false)} className="btn-primary w-full">Upload Certificate</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
