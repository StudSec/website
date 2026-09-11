import { useState } from "react";
import "./App.css";
import logoBackground from "./assets/Logo_background.svg";
import logoMark from "./assets/Logo_no_background.svg";
import banner from "./assets/banner.png";
import boardPhoto from "./assets/board.jpg";
import foundersPhoto from "./assets/FOUNDERS.jpg";

type EventItem = {
  date: string;
  month: string;
  title: string;
  type: string;
  location: string;
  tone: string;
};

const events: EventItem[] = [
  {
    date: "12",
    month: "SEP",
    title: "Web exploitation 101",
    type: "Workshop",
    location: "VU Amsterdam · W&N building",
    tone: "lime",
  },
  {
    date: "19",
    month: "SEP",
    title: "Hack N' Chill #24",
    type: "Community",
    location: "Online · Discord",
    tone: "blue",
  },
  {
    date: "03",
    month: "OCT",
    title: "Team VUBar CTF tryouts",
    type: "CTF",
    location: "VU Amsterdam · Lab 3",
    tone: "orange",
  },
];

const products = [
  {
    name: "StudSec patch",
    price: "€4.50",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Community tee",
    price: "€18.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
  },
];

const board = [
  { name: 'Ugne "Nox" Ubartaite', role: "Chair", email: "ugne@studsec.nl" },
  { name: "Elena Toderascu", role: "Secretary", email: "elena@studsec.nl" },
  { name: "Dace Kebzere", role: "Treasurer", email: "dace@studsec.nl" },
  {
    name: "Franck Leijen",
    role: "External Affairs",
    email: "franck@studsec.nl",
  },
  {
    name: "Kieran Smith",
    role: "Internal Affairs",
    email: "kieran@studsec.nl",
  },
];

const recentEvents = [
  {
    title: "Hack N' Chill",
    detail: "Build, break, and learn together.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Workshop",
    detail: "Practical skills, beginner friendly.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Team VUBar at the CTF",
    detail: "Competition, collaboration, community.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
  },
];

const committees = [
  "Workshopcie",
  "Infracie",
  "Eventscie",
  "Promocie",
  "Scroogecie",
  "VUCTF team",
  "CTF team",
];

const googleCalendarId =
  import.meta.env.VITE_GOOGLE_CALENDAR_ID ||
  "c_e549343504837a8adaaa6db669a128f563ada1ad2587f0c0c1f0814db2606ba7@group.calendar.google.com";
const googleCalendarEmbed = googleCalendarId
  ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(googleCalendarId)}&ctz=Europe%2FAmsterdam`
  : "https://calendar.google.com/calendar/";
const googleCalendarSubscribe =
  import.meta.env.VITE_GOOGLE_CALENDAR_SUBSCRIBE_URL ||
  "https://calendar.google.com/calendar/u/5?cid=Y19lNTQ5MzQzNTA0ODM3YThhZGFhYTZkYjY2OWExMjhmNTYzYWRhMWFkMjU4N2YwYzBjMWYwODE0ZGIyNjA2YmE3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [signupOpen, setSignupOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scrollTo = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      {/* TOP BAR */}
      <header className="topbar">
        <button
          className="brand"
          onClick={() => scrollTo("home")}
          aria-label="StudSec home"
        >
          <img src={logoBackground} alt="" />
          <span>STUDSEC</span>
        </button>
        <nav aria-label="Main navigation">
          {["home", "calendar", "about", "board", "shop"].map((item) => (
            <button
              className={
                activeSection === item ? "nav-link active" : "nav-link"
              }
              key={item}
              onClick={() => scrollTo(item)}
            >
              {item === "calendar"
                ? "Events"
                : item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button className="top-action" onClick={() => setSignupOpen(true)}>
            Join us
          </button>
          <button className="top-action" onClick={() => scrollTo("contact")}>
            Contact
          </button>
          <a
            className="top-action wiki-action"
            href="https://wiki.studsec.nl/"
            target="_blank"
            rel="noreferrer"
          >
            Wiki
          </a>
        </div>
        <button
          className="cart-button"
          onClick={() => scrollTo("shop")}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          Cart <span>{cartCount}</span>
        </button>
      </header>

      <main>
        {/* INTRO PAGE */}
        <section
          className="hero-section"
          id="home"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 75, 115, 0.3), rgba(0, 75, 115, 0.3)), url(${banner})`,
          }}
        >
          <div className="hero-copy">
            <img className="hero-logo-image" src={logoMark} alt="StudSec" />
            <div className="eyebrow hero-readable">
              <span className="status-dot" /> Student association · VU Amsterdam
              · system online
            </div>
            <h1>
              LOWERING THE BARRIER
              <br />
              <em>OF ENTRY TO CYBERSECURITY</em>
            </h1>
            <p className="hero-intro hero-readable">
              StudSec is a student-led cybersecurity association for curious
              minds. Hands-on workshops, open CTFs, and the people to figure it
              out with.
            </p>
            <div className="hero-actions">
              <button
                className="button button-primary"
                onClick={() => setSignupOpen(true)}
              >
                Join the community <span>↗</span>
              </button>
              <button
                className="button button-primary"
                onClick={() => scrollTo("calendar")}
              >
                See upcoming events <span>↓</span>
              </button>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Animated terminal-style illustration"
          >
            <div className="art-grid" />
            <div className="terminal-card">
              <div className="terminal-top">
                <span>studsec@community:~</span>
                <span>● ● ●</span>
              </div>
              <div className="terminal-line">
                <b>$</b> whoami
              </div>
              <div className="terminal-answer">curious_student</div>
              <div className="terminal-line">
                <b>$</b> what_we_do
              </div>
              <div className="terminal-answer">
                learn · build · share
                <span className="cursor" />
              </div>
            </div>
            <button
              className="terminal-signup"
              onClick={() => setSignupOpen(true)}
            >
              Sign up <span>↗</span>
            </button>
          </div>
        </section>
        {/* STATS */}
        <section className="proof-strip" aria-label="StudSec by the numbers">
          <div>
            <strong>420+</strong>
            <span>members</span>
          </div>
          <div>
            <strong>26</strong>
            <span>workshops</span>
          </div>
          <div>
            <strong>24</strong>
            <span>Hack N' Chills</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>ways to learn</span>
          </div>
        </section>
        {/* EVENTS AND CALENDAR */}
        <section className="section calendar-section" id="calendar">
          <div className="section-heading">
            <div>
              <p className="kicker">Put it on your calendar</p>
              <h2>What's happening</h2>
            </div>
            <a
              className="outline-button"
              href={googleCalendarSubscribe}
              target="_blank"
              rel="noreferrer"
            >
              Subscribe in Google Calendar <span>↗</span>
            </a>
          </div>
          <div className="calendar-layout">
            <div className="event-list">
              {events.map((event) => (
                <article className="event-row" key={event.title}>
                  <div className={`date-block ${event.tone}`}>
                    <strong>{event.date}</strong>
                    <span>{event.month}</span>
                  </div>
                  <div className="event-main">
                    <span className="event-type">{event.type}</span>
                    <h3>{event.title}</h3>
                    <p>{event.location}</p>
                  </div>
                  <button
                    className="round-arrow"
                    aria-label={`View ${event.title}`}
                  >
                    ↗
                  </button>
                </article>
              ))}
            </div>
            <div className="calendar-embed">
              <div className="calendar-embed-header">
                <span>STUDSEC CALENDAR</span>
                <span>GOOGLE</span>
              </div>
              {googleCalendarId ? (
                <iframe
                  title="StudSec Google Calendar"
                  src={googleCalendarEmbed}
                />
              ) : (
                <div className="calendar-setup">
                  <strong>Calendar ready to connect</strong>
                  <span>
                    Add the StudSec calendar ID to load the live schedule here.
                  </span>
                </div>
              )}
              <p>
                Subscribe to stay in sync with workshops, CTFs, and community
                events.
              </p>
            </div>
          </div>
        </section>
        {/* ABOUT */}
        <section className="section split-section" id="about">
          <figure className="about-visual founders-visual">
            <img
              src={foundersPhoto}
              alt="Aidan, Philip, and Pahal, StudSec founders"
            />
            <figcaption>OUR FOUNDERS AND THEIR ROOMBA</figcaption>
          </figure>
          <div className="about-copy">
            <p className="kicker"></p>
            <h2>Learning Together</h2>
            <p>
              StudSec was founded by Aidan, Philip, and Pahal with a simple
              belief: the field gets better when more people get to participate.
              No experience required, no jargon at the door.
            </p>
            <p>
              Come for a workshop. Stay for the community. Find your people,
              learn at your pace, and make something safer together.
            </p>
            <button className="text-button">
              Our story <span>↗</span>
            </button>
          </div>
        </section>
        {/* CONTACT AND COMMUNITY */}
        <section className="community-actions" id="contact">
          <div>
            <p className="kicker">Find your people</p>
            <h2>Join the conversation.</h2>
            <p>
              StudSec is a student association. Meet other students, ask
              questions, and hear about the next event where you already spend
              time.
            </p>
          </div>
          <div className="community-links">
            <a
              className="community-link discord"
              href="https://discord.gg/Ce5mrVBzqP"
              target="_blank"
              rel="noreferrer"
            >
              <strong>Discord</strong>
              <span>Join the StudSec server ↗</span>
            </a>
            <a
              className="community-link whatsapp"
              href="https://chat.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <strong>WhatsApp</strong>
              <span>Join the student group ↗</span>
            </a>
            <button
              className="community-link join-link"
              onClick={() => setSignupOpen(true)}
            >
              <strong>Sign up</strong>
              <span>Open the signup placeholder ↗</span>
            </button>
            <button
              className="community-link business-link"
              onClick={() => setBusinessOpen(true)}
            >
              <strong>Business inquiries</strong>
              <span>Contact us for partnerships ↗</span>
            </button>
          </div>
        </section>
        {/* BOARD INFO */}
        <section className="section board-section" id="board">
          <div className="section-heading">
            <div>
              <p className="kicker">The people behind the pixels</p>
              <h2>Meet the board</h2>
            </div>
          </div>
          <figure className="board-photo">
            <img src={boardPhoto} alt="StudSec board" />
            <figcaption>
              Left to right: Elena, Franck, Nox, Kieran, Dace
            </figcaption>
          </figure>
          <div className="board-list">
            {board.map((member) => (
              <article className="board-member" key={member.email}>
                <div>
                  <span className="member-role">{member.role}</span>
                  <h3>{member.name}</h3>
                </div>
                <a href={`mailto:${member.email}`}>{member.email} ↗</a>
              </article>
            ))}
          </div>
        </section>
        {/* COMMITTEES */}
        <section className="section committees-section" id="committees">
          <div className="section-heading">
            <div>
              <p className="kicker">Build with us</p>
              <h2>Our committees</h2>
            </div>
            <p className="section-note">
              There is a place for every kind of curious.
            </p>
          </div>
          <div className="committee-grid">
            {committees.map((committee, index) => (
              <article className="committee-item" key={committee}>
                <span>0{index + 1}</span>
                <h3>{committee}</h3>
                <b>↗</b>
              </article>
            ))}
          </div>
        </section>
        <section className="section carousel-section" id="recent">
          <div className="section-heading">
            <div>
              <p className="kicker">From the community</p>
              <h2>Recent transmissions</h2>
            </div>
            <div className="carousel-controls">
              <button
                className="round-arrow"
                onClick={() =>
                  setCarouselIndex(
                    (carouselIndex + recentEvents.length - 1) %
                      recentEvents.length,
                  )
                }
                aria-label="Previous event"
              >
                ←
              </button>
              <span>
                {String(carouselIndex + 1).padStart(2, "0")} /{" "}
                {String(recentEvents.length).padStart(2, "0")}
              </span>
              <button
                className="round-arrow"
                onClick={() =>
                  setCarouselIndex((carouselIndex + 1) % recentEvents.length)
                }
                aria-label="Next event"
              >
                →
              </button>
            </div>
          </div>
          <article className="carousel-feature">
            <img src={recentEvents[carouselIndex].image} alt="" />
            <div>
              <span className="event-type">Recent event</span>
              <h3>{recentEvents[carouselIndex].title}</h3>
              <p>{recentEvents[carouselIndex].detail}</p>
            </div>
          </article>
        </section>
        {/* RECENT EVENTS */}
        {/* SHOP */}
        <section className="section shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="kicker">Small merch, big signal</p>
              <h2>From the shop</h2>
            </div>
            <button className="outline-button">
              Open shop <span>↗</span>
            </button>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image">
                  <img src={product.image} alt="" />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <span>{product.price}</span>
                  <button
                    onClick={() => setCartCount((count) => count + 1)}
                    className="add-button"
                  >
                    Add to cart <span>+</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* WIKI PLACEHOLDER */}
        <section className="wiki-placeholder" id="wiki">
          <p className="kicker">Knowledge base</p>
          <h2>StudSec Wiki</h2>
          <p>Guides, notes, and shared knowledge for the community.</p>
          <a
            className="outline-button"
            href="https://wiki.studsec.nl/"
            target="_blank"
            rel="noreferrer"
          >
            Open Wiki <span>↗</span>
          </a>
        </section>
      </main>
      {signupOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSignupOpen(false)}
        >
          <section
            className="signup-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close signup dialog"
              onClick={() => setSignupOpen(false)}
            >
              ×
            </button>
            <p className="kicker">Membership placeholder</p>
            <h2 id="signup-title">Sign up for StudSec.</h2>
            <p>
              Our full signup flow is coming soon. Membership costs{" "}
              <strong>€5 per year</strong> and gives you access to all StudSec
              events.
            </p>
            <button
              className="button button-dark"
              onClick={() => setSignupOpen(false)}
            >
              Got it <span>↗</span>
            </button>
          </section>
        </div>
      )}
      {businessOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setBusinessOpen(false)}
        >
          <section
            className="business-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close business dialog"
              onClick={() => setBusinessOpen(false)}
            >
              ×
            </button>
            <p className="kicker">Business contact</p>
            <h2 id="signup-title">Business inquiries.</h2>
            <p>
              Contact us for partnerships at <strong>info.at.studsec.nl</strong>
            </p>
            <button
              className="button button-dark"
              onClick={() => setBusinessOpen(false)}
            >
              Got it <span>↗</span>
            </button>
          </section>
        </div>
      )}
      <footer>
        <span>© StudSec · VU Amsterdam</span>
        <span>Learn openly. Build responsibly.</span>
        <a
          href="https://discord.gg/Ce5mrVBzqP"
          target="_blank"
          rel="noreferrer"
        >
          Discord ↗
        </a>
      </footer>
    </div>
  );
}

export default App;
