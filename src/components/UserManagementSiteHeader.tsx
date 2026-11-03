import type { ReactNode } from "react";

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="5" r="1.75" />
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="19" cy="5" r="1.75" />
      <circle cx="5" cy="12" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="19" cy="12" r="1.75" />
      <circle cx="5" cy="19" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
      <circle cx="19" cy="19" r="1.75" />
    </svg>
  );
}

function IconBellOutline() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z" strokeLinejoin="round" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" strokeLinecap="round" />
    </svg>
  );
}

function IconTasksOutline() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <path d="M8 4h8l2 2v14H6V4h2z" strokeLinejoin="round" />
      <path d="M8 4v2h10" strokeLinejoin="round" />
      <circle cx="17.5" cy="17.5" r="3.25" fill="var(--prism-surface)" stroke="currentColor" strokeWidth="1.65" />
      <path d="M16.2 17.5l.85.85 1.75-1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChatBubbles() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3v4l4.5-4H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" opacity="0.92" />
      <path
        d="M8 7.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm4 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm4 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"
        opacity="0.55"
      />
    </svg>
  );
}

function IconMegaphoneOutline() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
      <path d="M11 6 6 8v8l5 2V6z" strokeLinejoin="round" />
      <path d="M11 6c2.5 1 4.5 1 7 0v8c-2.5-1-4.5-1-7 0" strokeLinejoin="round" />
      <path d="M6 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2" strokeLinejoin="round" />
    </svg>
  );
}

function IconLeoSpark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

function UtilityIconButton({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} className={`um-icon-btn ${className ?? ""}`.trim()}>
      {children}
    </button>
  );
}

export function UserManagementSiteHeader() {
  return (
    <header className="um-site-header">
      <div className="um-site-header__left">
        <button type="button" aria-label="Open menu" className="um-icon-btn um-icon-btn--menu">
          <IconMenu />
        </button>
        <h1 className="um-site-header__title">User Management</h1>
      </div>

      <div className="um-site-header__utilities">
        <div className="um-site-header__icon-group">
          <UtilityIconButton label="Apps">
            <IconGrid />
          </UtilityIconButton>
          <div className="um-notify-wrap">
            <UtilityIconButton label="Notifications">
              <IconBellOutline />
            </UtilityIconButton>
            <span className="um-notify-badge">New</span>
          </div>
          <UtilityIconButton label="Tasks">
            <IconTasksOutline />
          </UtilityIconButton>
        </div>

        <button type="button" className="um-btn-help" aria-label="Help">
          ?
        </button>

        <button type="button" className="um-btn-chat">
          <IconChatBubbles />
          <span>Chat</span>
        </button>

        <UtilityIconButton label="Announcements">
          <IconMegaphoneOutline />
        </UtilityIconButton>

        <button type="button" className="um-btn-ask-leo">
          <IconLeoSpark />
          <span>Ask Leo</span>
        </button>

        <button type="button" className="um-user-block" aria-label="Account menu">
          <span className="um-user-block__text">
            <span className="um-user-block__name">Alexia Bracken d</span>
            <span className="um-user-block__sep" aria-hidden>
              |
            </span>
            <span className="um-user-block__org">Exxat Sales Golden Data (Nursing)</span>
          </span>
          <IconChevronDown />
        </button>
      </div>
    </header>
  );
}
