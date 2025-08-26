# InHerWords - Global Gender Equality Atlas

An interactive world map that visualizes gender inequality through the Gender Inequality Index (GII) and provides a platform for women to share their stories and experiences.

## 🌍 Features

- **Interactive World Map**: Explore countries colored by their Gender Inequality Index scores
- **Story Sharing**: Submit personal stories and experiences in a safe, supportive environment
- **Data Visualization**: Clear legend and information about the Gender Inequality Index
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Privacy-Focused**: Anonymous sharing options and secure data handling

## 🚀 Live Demo

Visit the live site: [Your Domain Here]

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet with custom choropleth visualization
- **Data Storage**: Google Sheets integration
- **Deployment**: [Your deployment platform]

## 📊 Data Sources

- Gender Inequality Index data from UN Human Development Reports
- Country boundaries from world.geo.json
- Story pins represent community-submitted experiences

## � Project Structure

```
inherwords-atlas/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── page.tsx         # Homepage with interactive map
│   │   ├── submit/          # Story submission page
│   │   └── api/             # API routes (Google Sheets)
│   └── components/          # React components
│       ├── InteractiveMapClient.tsx  # Main map component
│       ├── SimpleHeader.tsx          # Navigation header
│       └── ...
├── public/                  # Static assets
├── docs/                   # Documentation
└── README.md              # This file
```

## �🔧 Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# See docs/DEPLOYMENT.md for Google Sheets setup

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Contributing

We welcome contributions to improve the platform and support women's voices worldwide.

## 📄 License

This project is created to support women's rights and gender equality awareness.

## 🤝 Contact

For questions or support, please reach out through [your contact method].

---

*"Women's rights are human rights" - Supporting equality and empowerment worldwide.*
