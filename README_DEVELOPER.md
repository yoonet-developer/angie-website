# Angie Website - Developer Setup Guide

This is the complete Yoonet/Angie website project with Astro + Sanity CMS integration.

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone [YOUR_GITHUB_REPO_URL]
cd angie
npm install
```

### 2. Environment Setup
Create a `.env` file with:
```
SANITY_PROJECT_ID=ox03cu5z
SANITY_DATASET=production
SANITY_API_VERSION=2024-05-01
```

### 3. Run Development Servers
```bash
# Terminal 1: Run Astro website
npm run dev
# Website: http://localhost:4321

# Terminal 2: Run Sanity Studio (optional)
npm run sanity
# Studio: http://localhost:3333
```

## 📁 Project Structure

```
angie/
├── src/
│   ├── components/
│   │   ├── SocialMediaForm.astro     # Main form with multi-step wizard
│   │   ├── IntakeCards.astro         # Dynamic intake cards from Sanity
│   │   ├── Header.astro              # Site navigation
│   │   └── Footer.astro              # Site footer
│   ├── pages/
│   │   ├── social-media-program.astro # Main program page
│   │   └── api/
│   │       └── submit-form.ts        # Form submission API endpoint
│   ├── lib/
│   │   └── sanity.ts                 # Sanity client and queries
│   └── assets/                       # Images and icons
├── schemas/                          # Sanity CMS schemas
│   ├── intake.ts                     # Program intake management
│   ├── software.ts                   # Software tools with skills
│   ├── businessSubmission.ts        # Business applications
│   ├── traineeSubmission.ts         # Trainee applications
│   └── index.ts                      # Schema exports
├── sanity.config.ts                  # Sanity studio configuration
└── astro.config.mjs                  # Astro configuration
```

## 🛠 Key Features

### ✅ Multi-Step Form System
- **Business Application Flow**: Type → Goals → Social Media Handling → Platforms → Contact
- **Trainee Application Flow**: Study Field → Experience → Software Skills (with 1-5 star rating) → Contact  
- **Smart Routing**: Different questions based on applicant type
- **Software Skills Rating**: Click software → Rate 1-5 stars → Select specific skills → Colorful pills display

### ✅ Sanity CMS Integration
- **Dynamic Intake Cards**: Manage program intakes with slots, dates, colors
- **Software Management**: Add/edit software tools and their skill categories
- **Form Submissions**: All form data saves to Sanity (when authentication is set up)

### ✅ Current Form Submission
Currently saves to local `form-submissions.json` file. To enable Sanity submission:
1. Create Sanity token with write permissions
2. Add `SANITY_WRITE_TOKEN=your-token` to `.env`
3. Uncomment Sanity submission code in `src/pages/api/submit-form.ts`

## 🎨 Design System
- **Colors**: Purple/blue gradients, clean whites
- **Components**: Rounded corners, shadows, hover effects
- **Typography**: Bold headers, clean body text
- **Forms**: Multi-step wizard with progress bar
- **Pills**: Colorful skill tags with animations

## 📊 Content Management

### Sanity Studio Access
1. Go to http://localhost:3333
2. Manage content in organized sections:
   - **📋 Form Submissions** → View business & trainee applications
   - **📅 Program Intakes** → Manage intake periods and slots
   - **🛠️ Software Tools** → Add/edit software and skills

### Adding New Intake
1. Go to "Program Intakes" 
2. Create new document:
   - Title: "March 2025"
   - Month: "March", Year: 2025
   - Total Slots: 15, Slots Booked: 0
   - Color: "blue"
   - Sort Order: 4

## 🔧 Development Tasks

### Priority Fixes Needed:
1. **Form Submission Authentication**: Set up Sanity write token
2. **Email Notifications**: Add email sending on form submission  
3. **Form Validation**: Enhanced client-side validation
4. **Mobile Optimization**: Test and improve mobile experience
5. **Loading States**: Better loading indicators throughout

### Enhancement Opportunities:
1. **Admin Dashboard**: View/manage submissions in custom interface
2. **Email Templates**: Automated responses to applicants
3. **Matching System**: Algorithm to match trainees with businesses
4. **Analytics**: Track form completion rates, popular software skills
5. **Multi-language**: Add Filipino language support

## 🚨 Important Notes

- **Sanity Project ID**: `ox03cu5z` (already configured)
- **Form submissions currently save locally** until Sanity auth is set up
- **Server mode required** for API endpoints (`output: 'server'` in astro.config.mjs)
- **All form data captures**: Contact info, preferences, software skills with ratings

## 📞 Support

If you need help:
- Check browser console for errors (F12 → Console)
- Check server logs in terminal
- Sanity Studio logs show content management issues
- Form submission data temporarily saves to `form-submissions.json`

## 🎯 Current Status
- ✅ Website fully functional
- ✅ Multi-step form working
- ✅ Sanity CMS integrated
- ✅ Dynamic content management
- ⚠️ Form submissions need authentication setup
- 🔄 Ready for production deployment