# Project: High-Density Enterprise Admin Panel

## 1. Information Architecture & Sitemap

### Dashboard (Control Tower)
- **Global Search**: Orders, AWB, Job, RMA, Ticket.
- **SLA Alerts & KPIs**: Overall stats.
- **Live Feed**: Carrier, Service, Payment updates (Hero cards).

### Orders & Delivery
- **Order Tracking**
- **NDR Desk**: Failed Deliveries (Non-Delivery Reports).
- **RTO Desk**: Regional Transport Office (Return to Origin).
- **Appointment / Reroute Management**
- **Ops Settings**: Serviceability Matrix, Promise Date, Routing Rules.

### Service Operations
- **Requests & Quotes Board**
- **Dispatch / Scheduling Board**: Map + Calendar.
- **Job Compliance Console**: Checklist, Media, OTP.
- **Warranty / Rework / Dispute Management**
- **AMC Tracker**: Contracts, Visits, Alerts.

### Seller Management
- **Onboarding & Verification**
- **Serviceability / SLA Settings**
- **Product & Service Listings**
- **Seller Orders**: Support view.
- **Integrations Health**: Unicommerce, WMS, API.

### Catalog & Moderation
- **Product Moderation Queue**
- **Content Moderation**: Reviews, Q&A.
- **Category & Taxonomy Manager**
- **Brand Approval Queue**

### Pricing & Promotions
- **Promo Rule Builder**
- **Coupon Management**
- **Campaign Manager**: WhatsApp, Email, RCS.
- **A/B Testing Dashboard**
- **Campaign Analytics & ROI**

### Returns & Warranty
- **RMA Console**: Return & Refund Tracking.
- **Refund / Adjustment Requests**
- **Warranty Claims**
- **Audit Logs & GST/E-Way Actions**

### Customer Care
- **Grievance Desk**: Multi-Channel Inbox.
- **Escalation Matrix**: L1 → L2 → Compliance.
- **Ratings & Reviews Governance**
- **IVR Recordings & Playback**

### Finance & Settlements
- **Seller Payouts & Settlements**
- **Ledger & GST Reports**
- **E-Way Bill Dashboard**
- **Dispute Recovery / Waivers**

### Analytics & Insights
- **Operational KPIs**: Orders, SLAs, Returns.
- **Seller Performance Dashboards**
- **Carrier & Route Analytics**
- **Marketing Attribution**
- **Cohort & Conversion Analysis**

### Content & SEO
- **CMS**: Blogs, FAQs, Guides.
- **Schema Validation & Preview**
- **Taxonomy & Metadata Manager**
- **Sitemap & Index Health**

### Integrations Health
- **Payment Gateways**
- **3PL / Carrier Connectors**
- **Search Index / CDN Status**
- **Webhook Delivery Monitor**

### Security & Compliance
- **RBAC & Role Permissions**
- **MFA & Session Logs**
- **Consent & Audit Trails**
- **DPDPA / GDPR Logs**

### IT Operations
- **Monitoring Dashboard**
- **Backup / Restore Management**
- **DR Drill Logs**
- **Alert Rules & Notifications**

### System Settings
- **Holidays & Cut-off Calendar**
- **Tax / GST Matrix**
- **Notification Templates**
- **API Keys & Credentials Vault**

---

## 2. Role-Based Access Control (RBAC) Matrix

| Module / Action | Super | Ops Adm | Commerce Adm | Fin & Comp Adm | Support | Growth |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Control Tower** | RW | RW | R | R | R | R |
| **Orders/Tracking** | RW | RW | R | R | R/W | R |
| **NDR / RTO** | RW | RW | – | – | R | – |
| **Shipments / Pickups** | RW | R | – | – | – | – |
| **Promise-Date / Routing** | RW | R | – | – | – | – |
| **Service Ops / Dispatch** | RW | RW | – | – | – | – |
| **Seller Onboarding** | RW | R | RW | – | – | – |
| **Catalog / Moderation** | RW | R | RW | – | – | – |
| **Promotions / Campaigns** | RW | R | RW | – | – | RW |
| **Grievances** | RW | R | – | – | RW | – |
| **RMA Console** | RW | R | – | RW | RW | – |
| **Finance / Settlements** | RW | R | – | RW | – | – |
| **Integrations / IT Ops** | RW | (flag) | (–) | (–) | – | – |
| **Security / Audit** | RW | – | – | RW | – | – |

*Legend: RW = Read/Write, R = Read Only, A = Approvals, – = No Access, (flag) = via capability flag.*

---

## 3. Role Definitions & Menu Trees

### 1️⃣ Super Admin
**Purpose**: Full visibility + environment configuration.
- **Menu**: Dashboard, Orders & Delivery, Service Ops, Seller Mgmt, Finance & Compliance, Customer Support, Growth & Analytics, System Admin.

### 2️⃣ Operations Admin
**Purpose**: Manage day-to-day operational flows (orders, deliveries, service jobs).
- **Menu**:
    - **Dashboard**: Active Orders, SLA Breaches.
    - **Orders & Delivery**: Orders, NDR, RTO, Shipments.
    - **Service Ops**: Requests, Dispatch, Warranty.
    - **Analytics**: SLA Reports, Carrier Performance.
- **Hidden**: Finance, Seller Config, RBAC, Integrations, Promotions.

### 3️⃣ Commerce Admin
**Purpose**: Manage sellers, listings, and catalog moderation.
- **Menu**:
    - **Dashboard**: Commerce Summary.
    - **Seller Mgmt**: Onboarding, Agreements, Pincodes, Listings, Moderation.
    - **Promotions**: Promo Rules, Pricing Exceptions.
    - **Analytics**: Seller Performance.
- **Hidden**: Finance, Dispatch, NDR/RTO, Support.

### 4️⃣ Finance & Compliance Admin
**Purpose**: Handle RMAs, refunds, settlements, taxation, compliance, and audits.
- **Menu**:
    - **Dashboard**: Finance Summary.
    - **Finance**: RMA/Refunds, Settlements, GST/E-Way.
    - **Compliance**: Audit Logs, Data Retention, Disputes.
    - **Reports**: Accounting, Ledger.
- **Hidden**: Promotions, Seller Onboarding, Dispatch, NDR.

### 5️⃣ Support
**Purpose**: Buyer grievance handling, ticketing, RMA initiation, communications.
- **Menu**:
    - **Dashboard**: Support Dashboard.
    - **Customer Support**: Grievances, Buyer Comms, RMA Initiation, IVR.
    - **Knowledge**: Canned Responses, FAQs.
    - **Analytics**: Ticket Volume.
- **Hidden**: Finance, Commerce, Dispatch.

### 6️⃣ Growth & Analytics
**Purpose**: Run campaigns, promotions, and review platform analytics.
- **Menu**:
    - **Dashboard**: Growth KPIs.
    - **Marketing**: Promotions, Campaigns, Segmentation.
    - **Analytics**: Funnels, Cohorts, ROI.
    - **Exports**: CSV/PDF.
- **Hidden**: NDR/RTO, Dispatch, Seller Onboarding, Finance.

---

## 4. Technical Requirements
- **UI Framework**: High Density, Dashboard-First.
- **State Management**: URL-based persistence for filters/pagination.
- **Real-time**: WebSocket/Polling for SLA alerts.
- **Media**: Lazy loading for galleries.
- **Security**: MFA, Session Timeout, Protected Routes.
