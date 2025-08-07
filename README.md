# TradeMate - CFD Trading Platform Prototype

A comprehensive, interactive CFD trading platform prototype built with React, featuring the innovative "Guided Activation Model™" that transforms novice traders from apprehension to confidence through seamless, educational experiences.

## 🚀 Features

### Core Functionality
- **Guided Onboarding**: Interactive 5-step journey from exploration to execution
- **Risk-Free Practice Trading**: Complete trading simulation with virtual money
- **Educational Tooltips**: Contextual explanations of financial terms
- **Real-Time Risk Assessment**: Dynamic leverage and position sizing guidance
- **Compliance Integration**: Proactive alerts for high-risk configurations
- **Intelligent Guidance**: Hesitation detection with mentor-like assistance

### Technical Highlights
- **React 18** with modern hooks and context API
- **Tailwind CSS** for responsive, professional design
- **React Router** for seamless navigation
- **Context-based State Management** for trading and user data
- **Interactive Components** with real-time calculations
- **Accessibility-First Design** with proper ARIA labels

## 🏗️ Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── Logo.js          # TradeMate branding
│   ├── Modal.js         # Universal modal system
│   ├── Tooltip.js       # Financial term explanations
│   └── OnboardingChecklist.js
├── pages/               # Main application pages
│   ├── Welcome.js       # Sign-up & authentication
│   ├── TradingCockpit.js # Main dashboard
│   ├── AssetDiscovery.js # Educational asset exploration
│   ├── OrderTicket.js   # Trade configuration
│   ├── PreTradeConfirmation.js # Risk review
│   ├── GuidanceNudge.js # Hesitation assistance
│   ├── ComplianceAlert.js # Risk warnings
│   └── PostTradeDebrief.js # Learning outcomes
├── context/             # State management
│   ├── TradingContext.js # Trading data & actions
│   └── UserContext.js   # User preferences & UI state
└── App.js              # Main application router
```

### Design System
- **Primary Color**: #0A2540 (Deep corporate blue)
- **Secondary**: #F6F9FC (Light gray backgrounds)
- **Accent Positive**: #00D2A0 (Encouraging teal)
- **Accent Warning**: #FFC107 (Risk alerts)
- **Typography**: Inter font family for clarity

## 📱 User Journey Flow

1. **Welcome Screen**: Instant engagement with guided sign-up
2. **Trading Cockpit**: Dashboard with progress tracking
3. **Asset Discovery**: Educational exploration with jargon buster
4. **Order Ticket**: Interactive trade configuration with risk simulator
5. **Pre-Trade Confirmation**: Plain-English trade review
6. **Guidance Nudge**: Smart assistance for hesitant users
7. **Compliance Alert**: Proactive risk management
8. **Post-Trade Debrief**: Learning reinforcement and analysis

## � Live Demo

🌐 **[访问在线演示](https://Cui-Owen.github.io/trademate-prototype/)**

体验完整的TradeMate CFD交易平台原型，包括：
- 交互式新手引导流程
- 风险模拟器和实时计算
- 教育性工具提示
- 合规警告系统

## �🛠️ Installation & Setup

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Quick Start
```bash
# Clone and navigate to project
cd trademate-prototype

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
# 自动部署（推荐）
git push origin main

# 手动部署
npm run deploy
```

## 📦 GitHub Pages 部署

本项目已配置自动部署到GitHub Pages：

1. **自动部署**: 每次推送到`main`分支时自动触发
2. **GitHub Actions**: 使用`.github/workflows/deploy.yml`工作流
3. **访问地址**: `https://YOUR_GITHUB_USERNAME.github.io/trademate-prototype/`

### 部署步骤
1. 在GitHub上创建新仓库 `trademate-prototype`
2. 更新`package.json`中的`homepage`字段为您的GitHub Pages URL
3. 推送代码到GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/trademate-prototype.git
   git push -u origin main
   ```
4. 在GitHub仓库设置中启用GitHub Pages (Source: gh-pages branch)
5. 几分钟后即可访问在线演示

## 🎯 Key Interactive Features

### 1. Risk/Reward Simulator
Real-time calculation of potential outcomes based on:
- Leverage selection (1x-30x)
- Position size
- Price movement scenarios
- Interactive sliders with instant feedback

### 2. Jargon Buster Tooltips
Hover over any financial term to see:
- Clear, beginner-friendly definitions
- Visual examples
- Links to detailed explanations
- Context-aware positioning

### 3. Hesitation Detection
Smart UX that detects user uncertainty:
- 5-second hover timer on critical actions
- Contextual guidance messages
- Reassuring educational content
- Non-intrusive mentor assistance

### 4. Compliance-as-a-Feature
Proactive risk management:
- High leverage warnings (>20x)
- Educational risk explanations
- Alternative recommendations
- Clear compliance options

### 5. Progress Gamification
Visual progress tracking:
- 5-step onboarding checklist
- Completion animations
- Achievement badges
- Encouraging feedback

## 🎨 Design Philosophy

### Trust-Building Elements
- Professional, uncluttered interface
- Consistent color psychology
- Clear visual hierarchy
- Accessibility compliance
- Progressive disclosure of complexity

### Educational Integration
- Just-in-time learning
- Contextual explanations
- Interactive demonstrations
- Risk-free practice environment
- Positive reinforcement loops

## 🧪 Testing

### Demo Credentials
- **Email**: Any valid email format
- **Password**: Minimum 6 characters
- **Environment**: All trades use virtual money

### Test Scenarios
1. **Complete Onboarding**: Follow the 5-step guided journey
2. **High Leverage Alert**: Set leverage >20x to trigger compliance
3. **Hesitation Detection**: Hover over "Execute Trade" for 5+ seconds
4. **Trade Outcomes**: Experience both profitable and losing trades
5. **Responsive Design**: Test on mobile, tablet, and desktop

## 📊 Performance Features

### Real-Time Calculations
- Dynamic P&L estimation
- Margin requirement calculation
- Risk level assessment
- Position sizing validation

### Educational Analytics
- Progress tracking
- Learning milestone completion
- Time-to-confidence metrics
- User engagement insights

## 🔒 Security & Compliance

### Practice Mode Safety
- Virtual money only
- No real financial risk
- Educational disclaimers
- Clear practice indicators

### Data Protection
- Local storage for session data
- No sensitive information transmitted
- Privacy-focused design
- GDPR-ready architecture

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
npm install -g serve
serve -s build
```

### Environment Variables
```env
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

## 📈 Future Enhancements

### Phase 1 Extensions
- Advanced charting integration
- Social trading features
- Portfolio management
- Mobile app development

### Phase 2 Features
- AI-powered trading insights
- Advanced risk management tools
- Multi-asset support
- Real-time market data

## 🤝 Contributing

This is a prototype demonstration. For production implementation:
1. Implement proper authentication
2. Add real market data feeds
3. Integrate with trading APIs
4. Enhance security measures
5. Add comprehensive testing

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- **Design Inspiration**: Modern fintech platforms
- **Educational Approach**: Behavioral psychology principles
- **Technical Stack**: React community best practices
- **Accessibility**: WCAG 2.1 AA compliance guidelines

---

## 📞 Support

For questions about this prototype:
- Review the component documentation
- Check the console for development logs
- Test the interactive features step-by-step
- Explore the guided user journey

**Built with ❤️ for TradeMate - Transforming Trading Education**
