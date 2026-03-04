import { Link } from 'react-router-dom'

/**
 * Main navigation buttons for the homepage.
 * Links to key sections: Karaoke, Venue Hire, Priority Entry, Guest List.
 */
export function NavigationButtons() {
  const navItems = [
    { to: '/karaoke', label: 'Karaoke' },
    { to: '/venue-hire', label: 'Venue Hire' },
    { to: '/priority-entry', label: '25+ Priority' },
    { to: '/guest-list', label: 'Guest List' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <div className="flex flex-col gap-3 w-full min-w-[200px] max-w-[280px]">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="nav-btn font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-center text-base"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
