import Link from "next/link";

// V4 top nav — sticky, dark blur, 5-bar gold logo mark, About Us dropdown.
// Buzz is intentionally NOT in the link list (Chase delta · May 22, 2026).

type NavKey =
  | "overview"
  | "deal-intel"
  | "milestones"
  | "meetings"
  | "vault"
  | "team"
  | "advisory-board"
  | "ask";

const NAV_LINKS: ReadonlyArray<{ href: `/${NavKey}`; label: string; key: NavKey }> = [
  { href: "/overview", label: "Overview", key: "overview" },
  { href: "/deal-intel", label: "Deal Intel", key: "deal-intel" },
  { href: "/milestones", label: "Milestones", key: "milestones" },
  { href: "/meetings", label: "Meetings", key: "meetings" },
  { href: "/vault", label: "Vault", key: "vault" },
];

export type TopNavProps = {
  active?: NavKey;
  userInitial?: string;
  userName?: string;
};

export function TopNav({
  active,
  userInitial = "C",
  userName = "Chase",
}: TopNavProps) {
  const aboutActive = active === "team" || active === "advisory-board";

  return (
    <nav className="topnav fade">
      <Link
        href="/mission"
        className="topnav-brand"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="mark" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <div className="name">Baseline Analytics</div>
          <div className="sub">Investor Portal</div>
        </div>
      </Link>

      <div className="topnav-links">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={active === link.key ? "active" : undefined}
          >
            {link.label}
          </Link>
        ))}

        <div className={`dropdown${aboutActive ? " active" : ""}`}>
          <button className="trigger" type="button">
            About Us
          </button>
          <div className="dropdown-menu">
            <Link
              href="/team"
              className={active === "team" ? "active" : undefined}
            >
              Meet the Team
            </Link>
            <Link
              href="/advisory-board"
              className={active === "advisory-board" ? "active" : undefined}
            >
              Advisory Board
            </Link>
          </div>
        </div>

        <Link href="/ask" className={active === "ask" ? "active" : undefined}>
          Ask
        </Link>
      </div>

      <div className="topnav-user">
        <div className="avatar">{userInitial}</div>
        <span>{userName}</span>
      </div>

      <style>{`
        .topnav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 60px; border-bottom: 1px solid var(--hairline-2);
          background: rgba(0,0,0,0.85); backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .topnav-brand { display: flex; align-items: center; gap: 12px; }
        .topnav-brand .mark { width: 28px; height: 36px; display: flex; gap: 2px; align-items: flex-start; }
        .topnav-brand .mark span { width: 3px; background: var(--gold); display: block; }
        .topnav-brand .mark span:nth-child(1) { height: 22px; background: var(--gold-mid); }
        .topnav-brand .mark span:nth-child(2) { height: 32px; }
        .topnav-brand .mark span:nth-child(3) { height: 36px; }
        .topnav-brand .mark span:nth-child(4) { height: 28px; }
        .topnav-brand .mark span:nth-child(5) { height: 20px; background: var(--gold-mid); }
        .topnav-brand .name { font-size: 15px; font-weight: 500; letter-spacing: 0.04em; color: var(--mercury); }
        .topnav-brand .sub { font-size: 11px; letter-spacing: 0.2em; color: var(--gold-mid); text-transform: uppercase; margin-top: 2px; }

        .topnav-links { display: flex; gap: 4px; align-items: center; }
        .topnav-links a, .topnav-links .trigger {
          padding: 8px 16px; border-radius: 4px; text-decoration: none;
          font-size: 15px; color: var(--mercury-dim);
          transition: all 0.2s; cursor: pointer;
        }
        .topnav-links a:hover, .topnav-links .trigger:hover { color: var(--mercury); }
        .topnav-links a.active, .topnav-links .dropdown.active .trigger {
          color: var(--gold); background: rgba(255,198,85,0.08);
        }

        .dropdown { position: relative; }
        .dropdown .trigger {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; border: none;
          font-family: inherit; font-size: 15px; letter-spacing: 0.01em; font-weight: 400;
        }
        .dropdown .trigger::after {
          content: ''; width: 6px; height: 6px;
          border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg); margin-top: -3px;
          transition: transform 0.2s;
        }
        .dropdown:hover .trigger::after,
        .dropdown:focus-within .trigger::after { transform: rotate(225deg); margin-top: 2px; }
        .dropdown-menu {
          position: absolute; top: 100%; left: 0;
          min-width: 180px; padding: 8px 0;
          background: var(--onyx); border: 1px solid var(--hairline-2);
          opacity: 0; pointer-events: none; transform: translateY(-4px);
          transition: opacity 0.18s, transform 0.18s;
          margin-top: 0; z-index: 200;
        }
        .dropdown:hover .dropdown-menu,
        .dropdown:focus-within .dropdown-menu {
          opacity: 1; pointer-events: auto; transform: translateY(0);
        }
        .dropdown-menu a {
          display: block; padding: 10px 18px; font-size: 15px;
          color: var(--mercury-dim); text-decoration: none;
          transition: all 0.15s; border-radius: 0;
        }
        .dropdown-menu a:hover { background: rgba(255,198,85,0.08); color: var(--gold); }
        .dropdown-menu a.active { color: var(--gold); }

        .topnav-user {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 0.16em;
          color: var(--mercury-dim); text-transform: uppercase;
        }
        .topnav-user .avatar {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1px solid var(--gold-mid);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--gold); font-weight: 500;
        }
      `}</style>
    </nav>
  );
}
