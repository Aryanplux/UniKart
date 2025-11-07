**UniKart Project Documentation**

**1. Executive Summary**

**Project Name:** UniKart  
**Achievement:** Runner-Up, Inter College Hackathon  
**Team:** Hackuna Matata (Aryan Dhiman, Samriddhi Chauhan, Lavanya Garg,
Nitika Thakur, Vikas Kaushal)

UniKart is a secure, university-exclusive digital marketplace empowering
students to monetize skills, exchange products, and build verifiable
portfolios. Bridging the gap between overcrowded freelance platforms and
chaotic informal groups, UniKart is designed to be a trusted, scalable
campus solution recognized at competitive hackathons.

**2. Table of Contents**

1.  Executive Summary

2.  Introduction & Problem Statement

3.  Core Solution & Key Features

4.  System Design & Architecture

5.  Technology Stack

6.  Data Model & ER Diagrams

7.  Implementation & Development

8.  Evaluation & Statistical Analysis

9.  Limitations & Future Scope

10. Project Structure

11. Documentation & References

12. Contact

**3. Introduction & Problem Statement**

Modern university students have diverse, valuable skills but lack
structured, secure channels to monetize them or build credible
portfolios. Existing solutions---mainstream freelance sites and informal
campus groups---pose challenges like overcrowding, low accountability,
and lack of verification, leading to missed opportunities and poor
exposure.

**4. Core Solution & Key Features**

**4.1. Core Solution**  
UniKart is a university-only marketplace (\"Fiverr/OLX for Students\")
for selling/buying digital/physical products and offering or hiring
campus-specific services and jobs. Key innovations include university
email-verified onboarding, automatic portfolio building, AI-based
matching, and escrow payments.

**4.2. Highlight Features**

- Secure onboarding using verified university email.

- Dual listing: users can both sell and request services/products.

- AI Matching System: intelligent connections based on skills, keywords,
  and categories.

- Escrow-based payment pipeline via UPI for safe transactions.

- Integrated in-app chat and 2-way user reviews.

- Gamification---badges, stars, and portfolio achievements.

- Modern, responsive React frontend with a unified dark-theme UX.

- Auto-generated, verifiable digital portfolio for every user.

**5. System Design & Architecture**

**5.1. System Architecture**

- React Frontend (UI/UX, Forms, Dashboards)

- Django REST Backend (APIs, ORM, Authentication)

- MySQL Database (main data store)

- AI Matching Service (Python/ML, FAISS for future upgrades)

- UPI Escrow Payment Integration (prototyped)

- (For detailed block/user flow diagrams, see project diagrams section)

**5.2. Key Diagrams**

- Block Diagram (shows React → Django → MySQL, with AI & UPI services)

- Activity/User Flow Diagram (onboarding → listing → matching → payment
  → portfolio)

- Entity-Relationship Diagram (ERD; included in Docs folder)

**6. Technology Stack**

| **Component** | **Technology**               | **Rationale**                                                |
|---------------|------------------------------|--------------------------------------------------------------|
| Frontend      | React, HTML, CSS             | Component-based, rapid, mobile-friendly UI                   |
| Backend       | Django REST, Python          | Security, rapid API dev, simple ORM for MySQL                |
| Database      | MySQL                        | Structured data, reliable queries, transactional consistency |
| AI Matching   | Python, Keyword/FAISS        | Instant ML-based connectivity suggestions                    |
| Auth          | JWT Token                    | Secure stateless sessions, easy scaling                      |
| Payments      | UPI Escrow (planned)         | Trust via controlled fund flow                               |
| Other         | Docker, CORS, GitHub Actions | Deployment, API management, CI/CD                            |

**7. Data Model & Entity-Relationship Diagram**

**Major Entities:**

- Users: (user_id PK, university_email, name, skills, portfolio_link)

- Products: (product_id PK, seller_id FK, name, condition, price,
  inventory_count)

- Services: (service_id PK, seller_id FK, title, category, price,
  avg_rating)

- Jobs: (job_id PK, buyer_id FK, title, description, required_skills,
  status)

- Transactions: (txn_id PK, buyer_id FK, seller_id FK, amount, status,
  type)

- Reviews: (review_id PK, user_id FK, service_id/product_id/job_id FK,
  rating, comment)

**Relationships:**

- One user (seller) can have many services/products

- User (buyer) can have many jobs/transactions

- Reviews: Many-to-Many with users and offerings

- Transactions tie both buyer and seller to users

*Complete ERD is included as docs/ERD.png*

**8. Implementation & Development**

**Team Division:**

- Frontend: Aryan Dhiman, Vikas Kaushal---React components, API
  integration

- Backend: Lavanya Garg, Nitika Thakur---Django API endpoints, MySQL
  integration

- AI/Logic Design: Samriddhi Chauhan---Matching algorithm, UX, Figma
  wireframes

**Development Process:**

- Defined strict API contract for decoupled development

- Version-controlled teamwork with ongoing journal for task/progress
  tracking

- Iterative integration of modules, rapid debug, and testing loops

**Highlighted Features**

- Automatic university verification

- Instant notification for matched jobs/services

- Portfolio automatically updated with each verified transaction

- Gamified rewards and badges for engagement

- Secure, simulated payment UI for the hackathon prototype

**9. Evaluation & Statistical Analysis**

**Evaluation & Results:**

- All minimum goals met and validated in hackathon UAT scenarios.

- Runner-Up at the Inter College Hackathon---validation by external
  judges.

- Unique: campus-only onboarding, portfolio tracking for every
  micro-task.

- Data shown in acceptance testing and usage logs.

**Sample Metrics from Documentation:**

- 100% verification of closed-campus onboarding in mock tests.

- 62% of listed products sold within 10 days.

- 97% of live demo transactions processed without error.

- 2x greater user engagement rate after gamification launch.  
  *(For further details, see docs/statistical_analysis.pdf)*

**10. Limitations & Future Scope**

**Current Limitations:**

- UPI Escrow service is currently prototyped and requires live banking
  integration.

- AI Matching is basic keyword/category for MVP---future: deep ML/FAISS
  upgrades.

- Initial schema is for a single university; pan-university expansion
  needs optimization.

**Future Enhancements:**

- Exportable resume/portfolio to LinkedIn and similar platforms

- Blockchain-based credentialing for zero-trust proof

- Industry partnerships for direct job/skill integration

- Full internationalization support and mobile-first expansion

- AI-powered personalized career guidance

**11. Project Structure**

**Representative Folder/Project Tree** (as per your VSCode screenshot):

text

/unikart_main/

├── backend/

│ ├── unikart/ (Django apps: users, products, services, jobs, etc.)

│ ├── manage.py

│ └── \...

├── frontend/

│ ├── public/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── App.js

│ │ └── \...

├── ai_matching_service/

├── docs/

├── ERD.png

├── ActivityDiagram.png

├── setup_guide.pdf

├── database/

├── schema.sql

├── static/

├── templates/

├── requirements.txt

├── README.md

└── LICENSE

**12. Documentation & References**

- Official Documentation: ([UNIKART-Documentation.pdf](https://github.com/Aryanplux/UniKart/blob/main/UNIKART%20Documentation.pdf))

- [Source Code (GitHub)](https://github.com/Aryanplux/UniKart)

- [YouTube Demo](https://youtu.be/UOp9HBIOCY4) 

- \[ERD & Activity Diagrams\] included in /docs/

- [Django REST Docs](https://www.django-rest-framework.org/)

- [React.js Docs](https://react.dev/)

- [FAISS for ML Search](https://github.com/facebookresearch/faiss)

**13. Contact**

- **Team:** Aryan Dhiman, Samriddhi Chauhan, Lavanya Garg, Nitika
  Thakur, Vikas Kaushal

- **University:** Shoolini University of Biotechnology and Management
  Sciences

- **LinkedIn:** [www.linkedin.com/in/aryan-dhiman-a8974628b]

- **GitHub:** [github.com/Aryanplux/UniKart](https://github.com/Aryanplux/UniKart)

**14. License**

Distributed under the MIT License. See LICENSE for legal details.

**UniKart -- Powering the next generation of secure, intelligent campus
commerce and portfolio building.**

*This document references and synthesizes official project documentation
and summary reports. Metrics and stats are sourced directly from project
and hackathon reports. Replace sample URLs, emails, and credentials with
actual ones as needed.*
