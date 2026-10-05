const NewsEvents = () => {
  return (
    <div
      className="responsive-page"
      style={{
        padding: "60px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "var(--bg-main)",
      }}
    >
      <style>
        {`
          .news-card-dynamic {
            height: 450px;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s;
            cursor: pointer;
            text-align: left;
            display: flex;
            flex-direction: column;
          }
          .news-card-dynamic:hover {
            transform: translateY(-10px);
          }
          .news-card-dynamic img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          .news-card-dynamic:hover img {
            transform: scale(1.1);
          }
          .news-card-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);
            padding: 40px 25px 25px;
            color: #fff;
            display: flex;
            flex-direction: column;
          }
          .news-date-badge {
            background: var(--primary);
            color: #fff;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            align-self: flex-start;
            margin-bottom: 15px;
          }
          @media (max-width: 768px) {
            h1 { font-size: 2.2rem !important; margin-bottom: 30px !important; }
            .news-card-dynamic { height: 380px; }
          }
          @media (max-width: 480px) {
            .news-card-dynamic { height: 350px; }
          }
        `}
      </style>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: 900,
          color: "var(--text-main)",
          marginBottom: "50px",
        }}
      >
        News & Events
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {/* News Item 1 */}
        <div className="news-card-dynamic">
          <img
            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600"
            alt="News 1"
          />
          <div className="news-card-overlay">
            <div className="news-date-badge">15 Sep 2026</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                marginBottom: "10px",
                lineHeight: 1.3,
              }}
            >
              Featured in The Battery Magazine
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#ddd",
                opacity: 0.9,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              We're proud to be featured in the September 2026 issue,
              highlighting our journey and contributions to the EV
              ecosystem.
            </p>
          </div>
        </div>

        {/* News Item 2 */}
        <div className="news-card-dynamic">
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600"
            alt="News 2"
          />
          <div className="news-card-overlay">
            <div className="news-date-badge">28 Aug 2026</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                marginBottom: "10px",
                lineHeight: 1.3,
              }}
            >
              Future-Proofing India's Clean Mobility
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#ddd",
                opacity: 0.9,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              Featured on EV Tech News exploring our strategic focus on
              in-house R&D and tech adaptability.
            </p>
          </div>
        </div>

        {/* News Item 3 */}
        <div className="news-card-dynamic">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
            alt="News 3"
          />
          <div className="news-card-overlay">
            <div className="news-date-badge">10 Jul 2026</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                marginBottom: "10px",
                lineHeight: 1.3,
              }}
            >
              Pioneering the Next Frontier
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#ddd",
                opacity: 0.9,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              Motorindia covers our transformation of the landscape from
              e-rickshaws to modern EV infrastructure.
            </p>
          </div>
        </div>

        {/* News Item 4 */}
        <div className="news-card-dynamic">
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600"
            alt="News 4"
          />
          <div className="news-card-overlay">
            <div className="news-date-badge">05 Jun 2026</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                marginBottom: "10px",
                lineHeight: 1.3,
              }}
            >
              Launch of Next-Gen Solid State Batteries
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#ddd",
                opacity: 0.9,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              Announcing our newest lightweight drone and solar batteries
              to the global market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;
