const Team = () => {
  const teamMembers = [
    {
      name: "MR. ARUN KAMRA",
      role: "CFO",
      bio: "Mr. Arun Kamra CFO of the company is Chartered Accountant with over 25 years experience in leading Finance and IT functions in Indian and Multinational companies. Arun has work experience in Listed, Private Equity and Privately held entities. Arun has been associated with Lafarge Group, DLF, Shree Digvijay Cements Ltd., Avantha Group, GIVO Ltd. and Delton Cables Ltd. Arun carries rich experience in Capital Markets and 'Merger & Acquisitions'.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      layout: "text-left",
    },
    {
      name: "MR. KUBER SETH",
      role: "VP Operations",
      bio: "Mr. Kuber Seth (VP Operations) play a vital role in team management, strategic implementation of projects. Mr. Kuber is Post Graduate in Business sciences from university of Buffalo. He is an accomplished professional with expertise in Operations & Service Management, Global Business Development, Marketing Projects, Customer and Vendor Relationship Management.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      layout: "image-left",
    },
    {
      name: "MR. MANOJ KUMAR",
      role: "Group Chief Technology Officer (Senior Vice President)",
      bio: "Mr. Manoj Kumar is Group Chief Technology Officer (Senior Vice President) at MotoMax EV, leading technology strategy across BESS/ESS, lithium-ion batteries, BMS, solar and Hybrid/Grid-Tied Inverters, Home Inverters, Power Electronics and EV energy solutions. With 23+ years of global R&D, and product leadership experience, he drives innovation from architecture and engineering through design of hardware/firmware/software, validation, certification, manufacturing and commercialization.",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
      layout: "text-left",
    },
    {
      name: "MR. SARABJIT SINGH",
      role: "Vice President – International Business",
      bio: "Mr. Sarabjit Singh brings over 20 years of leadership experience across national and international markets with global brands such as Samsung, Vodafone, Medicover Healthcare, and Maruti Suzuki. A Commerce graduate from Delhi University and MBA from IIM Indore, with further studies in sustainability and digital, he has expertise in market expansion, brand leadership, and customer engagement.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      layout: "image-left",
    },
    {
      name: "MR. PRADEEP KUMAR",
      role: "Head-Human Resources",
      bio: "Mr. Pradeep Kumar is the Head of Human Resources. An MBA in HR and allied sciences, he brings extensive expertise in managing HR and IR functions. His career includes key roles with Punj Lloyd, Avantha Group, ERA Group, and Larsen & Toubro Limited. At MotoMax EV, Pradeep has been instrumental in building high-performing teams and has played a pivotal role in managing and stabilizing manpower across all plants & Offices.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      layout: "text-left",
    },
    {
      name: "MR. LUCKY MAHENDRU",
      role: "General Manager",
      bio: "Mr. Lucky Mahendru: General Manager – Emerging Businesses & Product development. Holded the degree in B.Tech Automobile from SRM University Chennai. He has worked extensively in Lithium Battery & Charging Infra space in Electric Vehicle – Solar Lightning & Energy Storage Solution – Telecom – Aviation Drones.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      layout: "image-left",
    },
    {
      name: "MR. HARPREET",
      role: "General Manager - Operation",
      bio: "Mr. Harpreet is the General Manager - Operations at MotoMax EV, with extensive experience in the Lithium-ion battery segment. B.Tech graduate from Punjab Technical University, he has played a vital role in setting up, stabilizing, and managing multiple plants of MotoMax EV. His leadership and technical expertise have been instrumental in driving operational excellence.",
      img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=400",
      layout: "text-left",
    },
  ];

  return (
    <div
      className="responsive-page"
      style={{ backgroundColor: "var(--bg-main)", paddingBottom: "80px" }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .hero-container { height: 300px !important; }
            h1 { font-size: 2rem !important; }
            h2 { font-size: 1.8rem !important; }
            h3 { font-size: 1.3rem !important; }
            div[style*="flex-direction: row"], div[style*="flex-direction: row-reverse"] {
              flex-direction: column !important;
            }
            div[style*="flex: 1 1 500px"], div[style*="flex: 1 1 400px"], div[style*="flex: 1 1 300px"] {
              flex: 1 1 100% !important;
              justify-content: center !important;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <div
        className="hero-container"
        style={{ width: "100%", height: "500px", overflow: "hidden" }}
      >
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000"
          alt="Team Meeting"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "20px",
            }}
          >
            Company Operations Led by
            <br />
            Experienced Leadership
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              lineHeight: "1.6",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            Driven by Passionate & Experienced Team Spearheaded by Mr. Samrath
            Jit Singh, our team of dynamic and highly skilled professionals
            brings together diverse expertise and a shared commitment to
            excellence, innovation, and growth.
          </p>
        </div>

        {/* CEO Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "50px",
            marginBottom: "100px",
          }}
        >
          <div
            style={{
              flex: "1 1 400px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
              alt="Mr. Samrath Jit Singh"
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </div>
          <div style={{ flex: "1 1 500px" }}>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                color: "var(--text-main)",
                marginBottom: "5px",
              }}
            >
              MR. SAMRATH JIT SINGH
            </h2>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              Founder and CEO
            </h3>
            <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.8" }}>
              Under the guidance of Mr. Samrath Jit Singh, Founder and CEO,
              MotoMax EV has built a legacy of over two decades in clean tech
              innovation. His vision of creating an inclusive and greener future
              continues to inspire MotoMax EV's mission of powering smarter
              cities, cleaner transportation, and energy independence, one
              battery at a time.
            </p>
          </div>
        </div>

        {/* Other Team Members (Zig-Zag Layout) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "40px",
                flexDirection:
                  member.layout === "image-left" ? "row" : "row-reverse",
              }}
            >
              <div
                style={{
                  flex: "1 1 300px",
                  display: "flex",
                  justifyContent:
                    member.layout === "image-left" ? "flex-start" : "flex-end",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "300px",
                    objectFit: "contain",
                    borderRadius: "15px",
                    border: "1px solid #eee",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  }}
                />
              </div>

              <div style={{ flex: "1 1 400px" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    marginBottom: "5px",
                  }}
                >
                  {member.name}
                </h3>
                <h4
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    marginBottom: "15px",
                  }}
                >
                  {member.role}
                </h4>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.7",
                  }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
