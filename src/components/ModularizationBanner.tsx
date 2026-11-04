import { useCallback, useState } from "react";
import {
  MODULARIZATION_PAGE_BANNER_LEGACY_TITLE,
  MODULARIZATION_PAGE_BANNER_TITLE,
} from "../lib/legacy-role-modularization";
import { ModularizationBannerIllustration } from "./ModularizationBannerIllustration";

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function IconModules() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8.2a4 4 0 0 1 8 0V11" strokeLinecap="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3.5l7 2.5v6.2c0 4.2-2.8 6.8-7 8.3-4.2-1.5-7-4.1-7-8.3V6l7-2.5z" strokeLinejoin="round" />
      <path d="M8.8 12.1l2.1 2.1 4.3-4.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ModularizationBannerProps = {
  /** When true (Only show Legacy roles), use reassurance copy for legacy-only list. */
  legacyFilterActive?: boolean;
};

export function ModularizationBanner({ legacyFilterActive = false }: ModularizationBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const onDismiss = useCallback(() => {
    const next = document.querySelector<HTMLElement>(
      ".um-sub-tabs [aria-selected='true'], .um-toolbar-search input",
    );
    setDismissed(true);
    queueMicrotask(() => next?.focus());
  }, []);

  if (dismissed) {
    return null;
  }

  const title = legacyFilterActive ? MODULARIZATION_PAGE_BANNER_LEGACY_TITLE : MODULARIZATION_PAGE_BANNER_TITLE;

  return (
    <aside className="um-modularization-banner" aria-labelledby="um-modularization-banner-title">
      <div className="um-modularization-banner__card">
        <div className="um-modularization-banner__copy">
          <h2 id="um-modularization-banner-title" className="um-modularization-banner__title">
            {title}
          </h2>
          <ul className="um-modularization-banner__points">
            {legacyFilterActive ? (
              <>
                <li className="um-modularization-banner__point">
                  <span className="um-modularization-banner__slot">
                    <span className="um-modularization-banner__mark um-modularization-banner__mark--modules">
                      <IconModules />
                    </span>
                  </span>
                  <span>
                    Use the new <strong>module specific standard roles</strong>.
                  </span>
                </li>
                <li className="um-modularization-banner__point">
                  <span className="um-modularization-banner__slot">
                    <span className="um-modularization-banner__mark um-modularization-banner__mark--lock">
                      <IconLock />
                    </span>
                  </span>
                  <span>New users can&apos;t be assigned to legacy roles.</span>
                </li>
                <li className="um-modularization-banner__point">
                  <span className="um-modularization-banner__slot">
                    <span className="um-modularization-banner__mark um-modularization-banner__mark--shield">
                      <IconShield />
                    </span>
                  </span>
                  <span>
                    <strong>Don&apos;t worry:</strong> current access stays the same.
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="um-modularization-banner__point">
                  <span className="um-modularization-banner__slot">
                    <span className="um-role-new-tag">New</span>
                  </span>
                  <span>
                    Roles tagged <strong>New</strong> are the newly available roles.
                  </span>
                </li>
                <li className="um-modularization-banner__point">
                  <span className="um-modularization-banner__slot">
                    <span className="um-modularization-banner__mark um-modularization-banner__mark--modules">
                      <IconModules />
                    </span>
                  </span>
                  <span>
                    You can now assign <strong>module specific</strong> roles.
                  </span>
                </li>
                <li className="um-modularization-banner__point">
                  <span className="um-modularization-banner__slot">
                    <span className="um-modularization-banner__mark um-modularization-banner__mark--shield">
                      <IconShield />
                    </span>
                  </span>
                  <span>
                    You can now have <strong>greater access control</strong> over your module specific data.
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
        <ModularizationBannerIllustration variant={legacyFilterActive ? "legacy" : "new"} />
        <button
          type="button"
          className="um-modularization-banner__close"
          aria-label={`Dismiss announcement: ${title}`}
          onClick={onDismiss}
        >
          <IconClose />
        </button>
      </div>
    </aside>
  );
}
