# TradeMate - CFD Trading Platform Prototype

[![Deploy to GitHub Pages](https://github.com/Cui-Owen/trademate-prototype/actions/workflows/deploy.yml/badge.svg)](https://github.com/Cui-Owen/trademate-prototype/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://Cui-Owen.github.io/trademate-prototype/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.1.6-blue)](https://tailwindcss.com/)

> A comprehensive, interactive CFD trading platform prototype featuring the innovative **Guided Activation Model™** that transforms novice traders from apprehension to confidence through seamless, educational experiences.

## 🌐 Live Demo

**[View Live Demo →](https://Cui-Owen.github.io/trademate-prototype/)**

Experience the complete TradeMate prototype with interactive onboarding, risk simulation, and educational guidance systems.

## ✨ Key Features

### 🎓 Educational Trading Experience

- **5-Step Guided Onboarding** - Progressive skill building from exploration to execution
- **Risk-Free Environment** - Complete trading simulation with virtual money
- **Contextual Learning** - Jargon-busting tooltips and real-time explanations
- **Hesitation Detection** - Smart UX that provides mentor-like assistance

### 📊 Advanced Risk Management

- **Real-Time Risk Calculator** - Dynamic leverage and position sizing guidance
- **Compliance Integration** - Proactive alerts for high-risk configurations
- **P&L Simulation** - Interactive outcome modeling with visual feedback
- **Educational Risk Warnings** - Plain-English explanations of trading risks

### 🎨 Professional UX/UI

- **Trust-Building Design** - Professional, uncluttered interface with consistent branding
- **Responsive Architecture** - Optimized for desktop, tablet, and mobile devices
- **Accessibility First** - WCAG 2.1 AA compliance with proper ARIA labels
- **Progressive Disclosure** - Complexity introduced gradually as users advance

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks and Context API
- **Styling**: Tailwind CSS for responsive, utility-first design
- **Routing**: React Router for seamless SPA navigation
- **State Management**: Context-based architecture for scalable data flow
- **Deployment**: GitHub Pages with automated CI/CD
- **Development**: Hot reload, ESLint, and modern development tooling

## 🚀 Quick Start

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Cui-Owen/trademate-prototype.git

# Navigate to project directory
cd trademate-prototype

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Logo.js          # Brand identity and navigation
│   ├── Modal.js         # Universal modal system
│   ├── Tooltip.js       # Financial term explanations
│   └── OnboardingChecklist.js # Progress tracking
├── pages/               # Main application pages
│   ├── Welcome.js       # Authentication and sign-up
│   ├── TradingCockpit.js # Main dashboard and navigation
│   ├── AssetDiscovery.js # Educational asset exploration
│   ├── OrderTicket.js   # Trade configuration interface
│   ├── PreTradeConfirmation.js # Risk review and validation
│   ├── GuidanceNudge.js # Hesitation assistance system
│   ├── ComplianceAlert.js # Risk warnings and education
│   └── PostTradeDebrief.js # Learning outcomes and analysis
├── context/             # State management
│   ├── TradingContext.js # Trading data and actions
│   └── UserContext.js   # User preferences and UI state
└── App.js              # Main application router and providers
```

## 🎯 Core Interactive Features

### Risk/Reward Simulator

- Real-time P&L calculations based on leverage (1x-30x)
- Interactive sliders with instant visual feedback
- Scenario modeling for different market movements
- Educational explanations of risk metrics

### Intelligent Guidance System

- **Hesitation Detection**: 5-second hover detection on critical actions
- **Contextual Assistance**: Non-intrusive mentor-like guidance
- **Educational Tooltips**: Clear, beginner-friendly financial term definitions
- **Progress Gamification**: 5-step onboarding with visual achievement tracking

### Compliance-as-a-Feature

- Proactive high-leverage warnings (>20x)
- Educational risk explanations with alternatives
- Clear compliance pathways and recommendations
- Regulatory-friendly design patterns

## 🧪 Testing & Demo

### Demo Credentials

- **Email**: Any valid email format (e.g., `demo@example.com`)
- **Password**: Minimum 6 characters (e.g., `demo123`)
- **Environment**: All trades use virtual money with no real financial risk

### Test Scenarios

1. **Complete User Journey**: Follow the 5-step guided onboarding process
2. **Risk Management**: Set leverage >20x to trigger compliance alerts
3. **Hesitation Detection**: Hover over "Execute Trade" for 5+ seconds
4. **Responsive Design**: Test across mobile, tablet, and desktop viewports
5. **Accessibility**: Navigate using keyboard-only and screen reader testing

## 🎨 Design System

| Element        | Specification | Usage                                        |
| -------------- | ------------- | -------------------------------------------- |
| **Primary**    | `#0A2540`     | Corporate blue for trust and professionalism |
| **Secondary**  | `#F6F9FC`     | Light backgrounds and subtle separations     |
| **Success**    | `#00D2A0`     | Positive actions and encouraging feedback    |
| **Warning**    | `#FFC107`     | Risk alerts and important notifications      |
| **Typography** | Inter         | Clean, readable font family for clarity      |

## 📊 Performance & Security

### Performance Features

- **Optimized Bundle**: Tree-shaking and code splitting
- **CDN Delivery**: GitHub Pages global content delivery
- **Responsive Images**: Optimized assets for different screen densities
- **Lazy Loading**: Components loaded on-demand for faster initial load

### Security Considerations

- **Virtual Environment**: No real financial data or transactions
- **Privacy-First**: Local storage only, no external data transmission
- **Educational Disclaimers**: Clear indication of practice mode
- **GDPR-Ready**: Privacy-focused architecture and data handling

## 🔄 Development Workflow

### Available Scripts

```bash
npm start          # Development server with hot reload
npm run build      # Production build with optimizations
npm run test       # Run test suites
npm run deploy     # Deploy to GitHub Pages
npm run lint       # Code quality checks
```

## Developer Journey

- Setup: `npm ci`
- Run: `npm start`
- Test: `npm test`
- Typecheck: `npm run typecheck`
- Lint/Format: `npm run lint` / `npm run format`

Golden path demo (2 minutes):

1. Start app, open Welcome.
2. Go through Onboarding, navigate to OrderTicket.
3. Place trade; see PreTradeConfirmation and ComplianceAlert if thresholds hit.
4. Close trade and view PostTradeDebrief.

## Architecture (baseline)

- UI: CRA React 18 components under `src/`
- State: Zustand store under `src/state/` for business state; React Query hooks in `src/services/query/` for server/cache state
- Providers: Market data provider interface and adapters `src/providers/` (polling, replay) chosen via `?provider=replay`
- Compliance: Rule engine and rulesets under `src/compliance/`
- Schemas: Zod runtime validation in `src/schema/`; inferred types exported for TypeScript

### Deployment Pipeline

- **Automated CI/CD**: GitHub Actions workflow for seamless deployment
- **Branch Protection**: Main branch protected with automated checks
- **Preview Deployments**: Pull request previews for review
- **Rollback Support**: Easy revert to previous stable versions

## 📈 Future Roadmap

### Phase 1: Enhanced Features

- [ ] Advanced charting integration with TradingView
- [ ] Social trading features and community elements
- [ ] Portfolio management and tracking systems
- [ ] Mobile app development (React Native)

### Phase 2: Production Features

- [ ] Real market data integration
- [ ] AI-powered trading insights and recommendations
- [ ] Advanced risk management tools
- [ ] Multi-asset support (Forex, Commodities, Indices)

## 🤝 Contributing

This project serves as a prototype demonstration. For production implementation:

1. **Authentication**: Implement secure user authentication and authorization
2. **Market Data**: Integrate real-time market data feeds
3. **Trading APIs**: Connect with legitimate trading platforms
4. **Security**: Enhance security measures and compliance features
5. **Testing**: Add comprehensive unit, integration, and e2e testing

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Leading fintech platforms and UX research
- **Educational Approach**: Behavioral psychology and adult learning principles
- **Technical Standards**: React community best practices and accessibility guidelines
- **Regulatory Compliance**: Financial industry standards and user protection guidelines

---

**Built with ❤️ for financial education and user empowerment**

> 💡 **Note**: This is an educational prototype using virtual money. No real financial transactions or risks are involved.
