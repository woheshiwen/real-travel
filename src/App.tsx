import { useEffect, useRef } from 'react'
import './App.css'

const journeys = [
  {
    place: 'Faroe Islands',
    season: 'June · 8 days',
    title: 'Cliffs, sheep paths, and weather that sets the pace',
    text: 'Walk between villages where the road ends. Stay with hosts who cook what the Atlantic gives that morning.',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    alt: 'Misty mountain lake in the Faroe Islands',
  },
  {
    place: 'Kyoto',
    season: 'October · 7 days',
    title: 'Side streets after the tour buses leave',
    text: 'Tea with a ceramicist in Gojo, night markets without the itinerary scramble, and mornings that start before the temples fill.',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Quiet Kyoto street with traditional wooden buildings',
    flip: true,
  },
  {
    place: 'Oaxaca',
    season: 'February · 9 days',
    title: 'Markets, mezcal, and mountains outside the postcard',
    text: 'Cook with a family in Teotitlán, hike valleys that never make the guidebooks, and sleep where the city still sounds like itself.',
    image:
      'https://images.unsplash.com/photo-1518659526054-19257aea97cc?auto=format&fit=crop&w=1600&q=80',
    alt: 'Warm-toned street scene in Oaxaca, Mexico',
  },
]

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const nodes = root.querySelectorAll<HTMLElement>('.reveal')
    if (!nodes.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return rootRef
}

export default function App() {
  const rootRef = useReveal()

  return (
    <div className="site" ref={rootRef}>
      <header className="hero">
        <nav className="nav" aria-label="Primary">
          <a className="nav__mark" href="#top">
            Real Travel
          </a>
          <ul className="nav__links">
            <li>
              <a href="#approach">Approach</a>
            </li>
            <li>
              <a href="#journeys">Journeys</a>
            </li>
            <li>
              <a className="nav__cta" href="#plan">
                Plan a trip
              </a>
            </li>
          </ul>
        </nav>

        <div className="hero__media" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2200&q=80"
            alt=""
            fetchPriority="high"
          />
        </div>
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__content" id="top">
          <p className="hero__brand">Real Travel</p>
          <h1 className="hero__headline">Go where the brochure stops talking.</h1>
          <p className="hero__lede">
            Small-group journeys shaped by places as they are — hosts, weather,
            and the long way around.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#journeys">
              Browse journeys
            </a>
            <a className="btn btn--ghost" href="#approach">
              How we travel
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section philosophy" id="approach" aria-labelledby="approach-title">
          <div className="philosophy__media reveal">
            <img
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80"
              alt="Traveler walking a quiet European side street"
            />
          </div>
          <div className="philosophy__copy reveal">
            <p className="section__eyebrow">Our approach</p>
            <h2 className="section__title" id="approach-title">
              Less checklist. More place.
            </h2>
            <p className="section__text">
              We build trips around local rhythms — early markets, empty trails,
              and evenings that aren’t booked solid. Groups stay small so the
              destination still feels like itself.
            </p>
            <ul className="philosophy__points">
              <li>
                <strong>Hosts, not hotels first</strong>
                <span>
                  Sleep and eat with people who live there. The itinerary bends
                  around their recommendations.
                </span>
              </li>
              <li>
                <strong>Slow by design</strong>
                <span>
                  Fewer transfers, longer stays, and room for the day to change
                  when the weather — or a conversation — asks for it.
                </span>
              </li>
              <li>
                <strong>Guides who live nearby</strong>
                <span>
                  Not a script from a bus seat. People who know which trail is
                  muddy and which kitchen is open late.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="section" id="journeys" aria-labelledby="journeys-title">
          <div className="journeys__header reveal">
            <p className="section__eyebrow">Upcoming</p>
            <h2 className="section__title" id="journeys-title">
              Journeys worth the jet lag
            </h2>
            <p className="section__text">
              A few departures we’re running this year. Same promise each time:
              arrive as a guest, leave knowing the place a little better.
            </p>
          </div>

          {journeys.map((journey) => (
            <article
              className={`journey reveal${journey.flip ? ' journey--flip' : ''}`}
              key={journey.place}
            >
              <div className="journey__media">
                <img src={journey.image} alt={journey.alt} loading="lazy" />
              </div>
              <div className="journey__copy">
                <p className="journey__meta">
                  {journey.place} · {journey.season}
                </p>
                <h3 className="journey__title">{journey.title}</h3>
                <p className="journey__text">{journey.text}</p>
                <a className="journey__link" href="#plan">
                  Request details
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="closing reveal" id="plan" aria-labelledby="plan-title">
          <h2 className="closing__title" id="plan-title">
            Tell us where you want to go deep.
          </h2>
          <p className="closing__text">
            Share a region, a season, and how you like to move. We’ll come back
            with a sketch — not a hard sell.
          </p>
          <a className="btn btn--primary" href="mailto:hello@realtravel.example">
            Start a conversation
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>
          <strong>Real Travel</strong> · Journeys with a pulse
        </p>
        <p>© {new Date().getFullYear()} Real Travel</p>
      </footer>
    </div>
  )
}
