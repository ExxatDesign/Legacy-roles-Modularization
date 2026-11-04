import { getModuleTagToneClass, getModuleTone } from "../lib/module-tag-tone";

type ModuleTagProps = {
  name: string;
};

function ModuleMark({ tone }: { tone: string }) {
  return (
    <span className="um-module-tag__mark" aria-hidden="true">
      <ModuleIcon tone={tone} />
    </span>
  );
}

function ModuleIcon({ tone }: { tone: string }) {
  if (tone === "compliance") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <g transform="translate(3.0474 1.5) scale(0.2211)">
          <path d="M81 16.5V51C81 51 76.0058 68.5472 67.583 77.5C59.1771 86.4347 39.8328 94.9656 39.7549 95C39.7549 95 18.2858 83.9264 11.4297 75C4.57363 66.0736 0 48.5 0 48.5V19L41.2451 0L81 16.5ZM61.1279 37.25C59.433 35.4326 56.5851 35.3335 54.7676 37.0283L36.1172 54.4189L30.0879 47.9541C28.393 46.1365 25.5452 46.0366 23.7275 47.7314C21.91 49.4264 21.8109 52.2742 23.5059 54.0918L32.3721 63.5996C32.4137 63.6442 32.457 63.6869 32.5 63.7295C32.5346 63.7692 32.5693 63.8098 32.6055 63.8486C34.3004 65.6658 37.1474 65.765 38.9648 64.0703L60.9062 43.6104C62.7235 41.9154 62.8227 39.0675 61.1279 37.25Z" />
        </g>
      </svg>
    );
  }

  if (tone === "curriculum") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <g transform="translate(1.5 2.3448) scale(0.2414)">
          <path d="M37 80L37.5065 14.9068C37.5065 14.9068 33 7.5 23 4C13 0.5 0.493506 0 0.493506 0L0 70.0621C0 70.0621 17.2159 68.78 23.5 71C29.7841 73.22 37 80 37 80Z" />
          <path d="M50.0066 80L49.5001 14.9068C49.5001 14.9068 54.0066 7.5 64.0066 4C74.0066 0.5 86.5131 0 86.5131 0L87.0066 70.0621C87.0066 70.0621 69.7907 68.78 63.5066 71C57.2225 73.22 50.0066 80 50.0066 80Z" />
        </g>
      </svg>
    );
  }

  if (tone === "sites") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2.5h8.2L18.5 6.8V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V4A1.5 1.5 0 0 1 6 2.5Zm7.4 1.6V7.4h3.3L13.4 4.1ZM7.6 11h8.8v1.7H7.6V11Zm0 3.4h8.8v1.7H7.6v-1.7Zm0 3.4h5.6V19H7.6v-1.2Z" />
      </svg>
    );
  }

  if (tone === "foundation") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.2 8.1 12 3.6l8.8 4.5v1.5H3.2V8.1ZM5.4 11.2h2.3v6.6H5.4v-6.6Zm5.4 0h2.4v6.6h-2.4v-6.6Zm5.5 0h2.3v6.6h-2.3v-6.6ZM3.4 19.1h17.2V21H3.4v-1.9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(1.5 1.2) scale(0.86)">
        <path d="M6 3v5.4a6 6 0 0 0 12 0V3" />
        <path d="M12 14.4V16a3 3 0 0 0 2.8 3H16" />
        <circle cx="18.2" cy="18.6" r="2.15" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function ModuleTag({ name }: ModuleTagProps) {
  const tone = getModuleTone(name);

  return (
    <span className={`um-module-tag ${getModuleTagToneClass(name)}`}>
      <ModuleMark tone={tone} />
      <span className="um-module-tag__label">{name}</span>
    </span>
  );
}
