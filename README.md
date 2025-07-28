# 🛣️ StreetScribe

**StreetScribe** is a cross-platform mobile application that empowers community members to report, track, and visualize local infrastructure issues—such as potholes, broken signage, or unsafe walkways—through real-time geolocated submissions. Designed with accessibility, responsiveness, and civic transparency in mind, the app bridges everyday citizen input with streamlined municipal oversight.

---

## 📱 Features

- 📍 **Geolocated Reporting**: Users can submit hazards using real-time GPS tagging.
- 🖼️ **Media Uploads**: Attach images or videos to provide visual context.
- 🗺️ **Interactive Map View**: View reports on a navigable map with filterable layers.
- 📊 **Issue Tracking Dashboard**: Monitor status updates (e.g., "Reported", "In Progress", "Resolved").
- 🔍 **Search and Filter**: Browse submissions by location, issue type, or date.
- 🧭 **Cross-Platform UI**: Built with React Native for seamless experience on iOS and Android.

---

## 🧰 Tech Stack

### Frontend
- **React Native** (Expo)
- **TypeScript**
- **TailwindCSS (via NativeWind)**

### Backend
- **Python Flask** API
- **PostgreSQL** (with PostGIS for spatial queries)
- **SQLAlchemy**

### Infrastructure
- **AWS S3** – Media storage
- **AWS RDS** – Relational database
- **AWS Lambda** *(Planned)* – Image processing hooks
- **Mapbox SDK** – Geospatial map rendering and interaction

---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL & Python 3.10+
- AWS credentials set up (for S3 access)

### 1. Clone the repository
```bash
git clone https://github.com/MoheEdeen/Street-Scribe.git
cd Street-Scribe
